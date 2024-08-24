const VRoid = {};

(function(){

	//セーブデータ用のオブジェクト
	TYRANO.kag.stat.VRoid = {layer:{}, model:{}};

	VRoid.three = {
		layer:{},
		model:{},
		vrma: {},

		//表示レイヤーの作成
		// VRoid.three.create("vroidID", "0", null, zIndex)
		create: function (layerID, layer, name, zIndex, visible, antiAlias, light, limitFPS) {
			if (document.getElementById(layerID)) {
				this.error(layerID + " 同一IDのレイヤーは作成できません。")
				return
			}


			//オブジェクトの初期化
			this.layer[layerID] = {};
			const thisLayer = this.layer[layerID];

			//セーブデータ用のオブジェクトを作成
			const statVRoid = TYRANO.kag.stat.VRoid;
			if (!statVRoid.layer[layerID]) {
				statVRoid.layer[layerID] = {};
			}
			
			//const save = statVRoid.layer[layerID];
			const saveLayer = statVRoid.layer[layerID];

			// シーンの準備
			thisLayer.scene = new THREE.Scene()
			thisLayer.scene.name = layerID;

			// ライトの設定 AmbientLight or DirectionalLight
			if (light == "ambient") {
				thisLayer.light = new THREE.AmbientLight(0xffffff)
			} else {
				thisLayer.light = new THREE.DirectionalLight(0xffffff)
			}
			thisLayer.light.position.set(0, 0, -1).normalize()
			//例えばzを1にしたら逆光になる
			//VRoid.three.layer.VRoid.light.position.set(0.5, 0.5, 1).normalize()
			//thisLayer.light.position.set(0.5, 0.5, 1).normalize()
			thisLayer.scene.add(thisLayer.light)

			//カメラの保存オブジェクトを作成
			const defCamera = {
				position: { x: 0, y: 0, z: 0 },
				rotation: { x: 0, y: 0, z: 0 },
			}

			if (!saveLayer.camera) {
				saveLayer.camera = $.extend(true,{}, defCamera);
			}

			if (!saveLayer.light) {
				saveLayer.light = {};
			}
			saveLayer.light.type = light

			saveLayer.layer = layer
			saveLayer.name = name;
			saveLayer.visible = visible;
			saveLayer.zIndex = String(zIndex) || "10";
			if (antiAlias === undefined) {
				saveLayer.antiAlias = true;
			} else {
				saveLayer.antiAlias = antiAlias;
			}
			if (limitFPS === undefined) {
				saveLayer.limitFPS = false;
			} else {
				saveLayer.limitFPS = limitFPS;
			}

			const scWidth = Number(TYRANO.kag.config.scWidth)
			const scHeight = Number(TYRANO.kag.config.scHeight)

			// カメラの準備
			thisLayer.camera = new THREE.PerspectiveCamera(45, scWidth / scHeight, 0.01, 1000)
			thisLayer.camera.position.set(defCamera.position.x, defCamera.position.y, defCamera.position.z)
			thisLayer.camera.rotation.set(defCamera.rotation.x, defCamera.rotation.y, defCamera.rotation.z)


			// レンダラーの準備
			thisLayer.renderer = new THREE.WebGLRenderer({ antialias: saveLayer.antiAlias, alpha: true , preserveDrawingBuffer: false })
			thisLayer.renderer.setSize(scWidth, scHeight)
			
			//色々試した残骸達
			//thisLayer.renderer.physicallyCorrectLights = true;
			//thisLayer.renderer.outputEncoding = THREE.sRGBEncoding;
			//thisLayer.renderer.toneMapping = THREE.ACESFilmicToneMapping;
			//thisLayer.renderer.shadowMap.enabled = true;

			if (saveLayer.antiAlias) {
				if ($.userenv() == 'pc') {
					//PCは1.5倍。それ以上の場合はdevicePixelRatio基準
					thisLayer.renderer.setPixelRatio(Math.max(1.5, window.devicePixelRatio));
				} else {
					//それ以外はクラッシュする可能性があるため1以下固定
					thisLayer.renderer.setPixelRatio(Math.min(1, window.devicePixelRatio));
				}
			} else {
				if ($.userenv() == 'pc') {
					//PCの場合はdevicePixelRatio基準
					thisLayer.renderer.setPixelRatio(window.devicePixelRatio);
				} else {
					//それ以外はクラッシュする可能性があるため1以下固定
					thisLayer.renderer.setPixelRatio(Math.min(1, window.devicePixelRatio));
				}
			}

			// レンダラーに指定した属性を付与
			thisLayer.renderer.domElement.id = layerID;
			thisLayer.renderer.domElement.classList.add(layerID, "VRoidCanvasLayer");

			thisLayer.renderer.domElement.style.position = "absolute";
			thisLayer.renderer.domElement.style.zIndex = saveLayer.zIndex;
			thisLayer.renderer.domElement.style.animationFillMode = "both";
			thisLayer.renderer.domElement.style.pointerEvents = "none";
			if (!visible) {
				thisLayer.renderer.domElement.style.opacity = "0";
			} else {
				thisLayer.renderer.domElement.style.opacity = "1";
			}

			//レイヤーを作成
			const target_layer = TYRANO.kag.layer.getLayer(String(layer) || "0");
			target_layer.append(thisLayer.renderer.domElement);

			//name指定があったらclassを追加
			if (name) {
				$.setName($("#" + layerID), name);
			}
			
			let halfFPS = true;

			// アニメーションループの開始
			cancelAnimationFrame(thisLayer.tickID)
			function tick() {
				if (document.getElementById(layerID)) {

					thisLayer.tickID = requestAnimationFrame(tick)

					halfFPS = !halfFPS
					if (limitFPS && halfFPS) {
						return
					}

					thisLayer.renderer.render(thisLayer.scene, thisLayer.camera)

				} else {
					//idが存在しない場合は処理を終了し、オブジェクトを削除する。
					delete thisLayer;
					cancelAnimationFrame(thisLayer.tickID)
				}
			}
			tick()
		},

		//ライトの設定。色、position、強さ
		light: function (layerID, r, g, b, x, y, z, intensity, func, time, wait, skip, cb) {
			if (document.getElementById(layerID) == false) {
				this.error(layerID + " 指定されたレイヤーIDは存在しません")
				if (cb && typeof cb === 'function') cb()
				return
			}

			//waitのデフォルト値をセット
			if (wait === undefined) wait = true;

			const thisLayer = this.layer[layerID];
			const statVRoid = TYRANO.kag.stat.VRoid;
			const saveLayer = statVRoid.layer[layerID];

			let startTime;
			//現在の値
			const initialValues = {}
			if (r !== undefined) initialValues.r = thisLayer.light.color.r
			if (g !== undefined) initialValues.g = thisLayer.light.color.g
			if (b !== undefined) initialValues.b = thisLayer.light.color.b
			if (x !== undefined) initialValues.x = thisLayer.light.position.x
			if (y !== undefined) initialValues.y = thisLayer.light.position.y
			if (z !== undefined) initialValues.z = thisLayer.light.position.z
			if (intensity !== undefined) initialValues.intensity = thisLayer.light.intensity

			//rgbxyzvalをオブジェクト化。引数のないものは作成されない。
			let targetValues = createTarget(r, g, b, x, y, z, intensity);

			//値の保存
			for (const key in targetValues) {
				saveLayer.light[key] = targetValues[key];
			}

			//時間指定がなければ瞬間変更
			if (!time){
				lightApply(targetValues)
				if (cb && typeof cb === 'function') cb()
				return
			}

			//ライトの適用
			function lightApply(val) {
				for (const key in val) {
					if (key == "r" || key == "g" || key == "b") {
						thisLayer.light.color[key] = val[key]
					} else if (key == "x" || key == "y" || key == "z") {
						thisLayer.light.position[key] = val[key]
					} else if (key == "intensity") {
						thisLayer.light[key] = val[key]
					}
				}
			}

			//配列の作成と計算
			function createTarget(r, g, b, x, y, z, intensity) {
				const target = {}

				if (r !== undefined) {
					target.r = calTarget(r, "r");
				}
				if (g !== undefined) {
					target.g = calTarget(g, "g");
				}
				if (b !== undefined) {
					target.b = calTarget(b, "b");
				}
				
				if (x !== undefined) {
					target.x = calTarget(x, "x");
				}
				if (y !== undefined) {
					target.y = calTarget(y, "y");
				}
				if (z !== undefined) {
					target.z = calTarget(z, "z");
				}

				if (intensity !== undefined) {
					target.intensity = calTarget(intensity, "intensity");
				}
				
				return target;
			}

			//設定値計算（一文字目が演算子の場合にも対応）
			function calTarget(val, name) {
				//先頭2文字を取得
				const str = String(val).slice(0, 2);
				let targetVal;
				let initialVal = initialValues[name];

				if (str == "+=") {
					targetVal = initialVal + Number(val.slice(2))
				} else if (str == "-=") {
					targetVal = initialVal - Number(val.slice(2))
				} else if (str == "*=") {
					targetVal = initialVal * Number(val.slice(2))
				} else if (str == "/=") {
					//0除算回避
					if ( Number(val.slice(2)) ) {
						targetVal = initialVal / Number(val.slice(2))
					}
				} else if (str == "%=") {
					targetVal = initialVal % Number(val.slice(2))
				} else {
					//いずれでもない場合は数字のはず
					targetVal = Number(val)
				}
				
				return targetVal;

			}

			function updateLight(timestamp) {
				startTime = startTime || timestamp;
				let elapsed = timestamp - startTime;
				let progress = Math.min(1, elapsed / time);
				
				//スキップが有効の場合は割り込み処理
				if (skip && TYRANO.kag.stat.is_skip) {
					progress = 1
				}
				
				let easedProgress = selectedEasingFunction(progress);
				let currentValue = {};

				// イージングの計算を適用
				for (const key in initialValues) {
					currentValue[key] = initialValues[key] + (targetValues[key] - initialValues[key]) * easedProgress;
				}

				lightApply(currentValue);

				if (progress < 1) {
					requestId = requestAnimationFrame(updateLight);
				} else {
					//完了時
					if (cb && typeof cb === 'function' && wait) cb()
				}
			}

			let requestId;
			function startAnimation() {
				startTime = null;
				requestId = requestAnimationFrame(updateLight);
			}

			// イージング関数を選択
			let selectedEasingFunction = this.easing[func] || this.easing.default;

			// 最初のフレームを実行
			startAnimation();

			//waitがfalseの時は即NextOrder
			if (cb && typeof cb === 'function' && !wait) cb()

		},


		// jsonのimport カンマ区切りで複数一気に読み込める
		// VRoid.three.import("sample.json", null, "_emotion")
		// VRoid.three.import("usamimi.json", null, "_pose")
		// VRoid.three.import("usamimi2.json", null, "_pose")
		import: function (storage, cb, property) {
			const storageArr = storage.split(',');
			const promises = [];
			
			const emotionObj = this.emotionObj
			const poseJson = this.poseJson

			storageArr.forEach(function(file) {
				file = file.trim();

				// 先頭が./なら削除
				if (file.startsWith("./")) {
					file = file.substring(2);
				}

				// 拡張子を削除してnameにする
				let name;
				const dotIndex = file.lastIndexOf(".");

				// .以降を削除
				if (dotIndex >= 0) {
					name = file.substring(0, dotIndex);
				} else {
					name = file;
				}

				const promise = new Promise(function(resolve, reject) {
					$.getJSON("./data/others/plugin/vrm/" + property + "/" + file).done(function(json) {

						if (property == "_emotion") {
							//表情データの追加
							const expressions = Object.keys(json).map(key => ({
								expressionName: key,
								val: json[key]
							}));

							emotionObj[name] = expressions;

						} if (property == "_pose") {
							//ポーズデータの追加
							poseJson[name] = json;

						}

						resolve();
					}).fail(function(err) { 
						VRoid.three.error(storage + " ファイルが存在しないか、jsonファイルの記述が間違っています。 ");
						resolve();
					});
				});

				promises.push(promise);
			});

			// 全ての処理が終了後にnextorder
			Promise.all(promises).then(function() {
				const statVRoid = TYRANO.kag.stat.VRoid;

				//console.log(JSON.stringify(VRoid.three.emotionObj, null, 2));
				//console.log(JSON.stringify(VRoid.three.poseJson, null, 2));

				if (property == "_emotion") {
					//表情データのセーブ
					statVRoid["emotionObj"] = $.extend(true,{}, emotionObj);

				} if (property == "_pose") {
					//ポーズデータのセーブ
					statVRoid["poseJson"] = $.extend(true,{}, poseJson);

				}
				if (cb && typeof cb === 'function') cb()
			});
		},


		//ロード時の設定やレイヤー復元
		statLoad: function (cb) {
			const statVRoid = TYRANO.kag.stat.VRoid;

			if (statVRoid.emotionObj) {
				this.emotionObj = $.extend(true,{}, statVRoid.emotionObj);
			}
			
			if (statVRoid.poseJson) {
				this.poseJson = $.extend(true,{}, statVRoid.poseJson);
			}

			if (statVRoid.vrma) {
				statVRoid.vrma.forEach(function(storage) {
					VRoid.three.importVRMA(storage)
				});
			}

			
			//AnimationFrameの全キャンセル
			for (const key in this.model) {
				cancelAnimationFrame(this.model[key].tickID)
			}
			for (const key in this.layer) {
				cancelAnimationFrame(this.layer[key].tickID)
			}

			//VRoidCanvasLayerを全部削除する
			const canvasLayer = document.getElementsByClassName("VRoidCanvasLayer");
			const arr = Array.from(canvasLayer);

			arr.forEach(function(elem) {
				elem.parentNode.removeChild(elem);
			});

			// モデルをロードしてから復元する
			if (statVRoid) {
				this.layer = {}
				this.model = {}

				// レイヤーの復元
				const layerPromises = Object.entries(statVRoid.layer).map(([layerID, saveLayer]) => {
					return new Promise((resolve) => {
						this.create(layerID, saveLayer.layer, saveLayer.name, saveLayer.zIndex, saveLayer.visible, saveLayer.antiAlias, saveLayer.light.type, saveLayer.limitFPS);

						//ライトの復元
						this.light(layerID, saveLayer.light.r, saveLayer.light.g, saveLayer.light.b, saveLayer.light.x, saveLayer.light.y, saveLayer.light.z, saveLayer.light.intensity)


						// カメラ設定の復元
						this.move(layerID, saveLayer.camera.position.x, saveLayer.camera.position.y, saveLayer.camera.position.z, 0, null, null, false, false, "position", "camera");
						this.move(layerID, saveLayer.camera.rotation.x, saveLayer.camera.rotation.y, saveLayer.camera.rotation.z, 0, null, null, false, false, "rotation", "camera");

						resolve();
					});
				});

				// レイヤーの復元が終わるまで待つ
				Promise.all(layerPromises).then(() => {
					// モデルをロードしてからシーンの復元をする
					const modelPromises = Object.entries(statVRoid.model).map(([modelID, modelData]) => {
						return new Promise((resolve) => {
							this.load(modelID, modelData.file, () => {
								loadVRoid(modelID);
								resolve();
							}, true);
						});
					});

					// モデルの復元が終わるまで待つ
					Promise.all(modelPromises).then(() => {
						if (cb && typeof cb === 'function') cb()
					});
				});
			}

			const that = this;
			
			function loadVRoid (modelID) {
				//シーンの復元
				const saveModel = TYRANO.kag.stat.VRoid.model[modelID];
				const vrm = that.model[modelID].vrm;

				if (saveModel.layerID) {
					// シーンへの追加
					that.add(saveModel.layerID, modelID, saveModel.pose, saveModel.visible, saveModel.lookingCamera, saveModel.waitingAnimation, saveModel.shake, saveModel.camera.position.x, saveModel.camera.position.y, saveModel.camera.position.z, false, undefined, undefined, undefined, saveModel.camera.rotation.x, saveModel.camera.rotation.y, saveModel.camera.rotation.z)

					//モデルシーンの復元
					that.move(modelID, saveModel.camera.rotation.x, saveModel.camera.rotation.y, saveModel.camera.rotation.z, 0, null, null, false, false, "rotation")

					//表情の復元
					// 各ブレンドシェイプを適用
					if (saveModel.expression) {
						saveModel.expression.forEach(function (data) {
							let expressionName = data.expressionName;
							let currentValue = data.val;

							vrm.expressionManager.setValue(expressionName, currentValue);
						});
					}

					vrm.expressionManager.update();
					
					//LOOP状態のactionの復元
					if (saveModel.mixer && saveModel.mixer.VRMA == true ) that.animation(modelID, saveModel.mixer.storage, saveModel.mixer.rate, 0, saveModel.mixer.fadeIn, saveModel.mixer.fadeOut)
					if (saveModel.mixer && saveModel.mixer.VRMA == false) that.action(modelID, saveModel.mixer.storage, saveModel.mixer.rate, 0, saveModel.mixer.fadeIn, saveModel.mixer.fadeOut)

				}
			}

		},


		//表示レイヤーの破棄
		// VRoid.three.dispose("VRoid")
		dispose: function (layerID) {
		
			if (!this.layer[layerID]) {
				if (document.getElementById(layerID)) {
					document.getElementById(layerID).remove();
				}
				return
			}
		
			const scene = this.layer[layerID].scene
			const renderer = this.layer[layerID].renderer
			const that = this;

			//追加したsceneをすべて削除
			scene.children.forEach((child) => {
				if (child.type === "Group") {
					if (that.model[child.name].vrm.scene) {
						scene.remove(that.model[child.name].vrm.scene);
					}
					
					if (that.model[child.name].mixer) {
						$(model.mixer).off();
					}

					/*
					// 更に子オブジェクトの処理を行う場合
					child.traverse((grandchild) => {
						console.log(grandchild);
					});
					*/
				}
			});

			renderer.forceContextLoss(); // WebGLコンテキストを強制解放
			renderer.dispose(); // WebGLRendererを破棄

			//レイヤーオブジェクトを破棄
			delete this.layer[layerID];

			//canvasの削除
			if (document.getElementById(layerID)) {
				document.getElementById(layerID).remove();
			}
		},

		//表示レイヤーの表示状態の変更
		// VRoid.three.layerAnime("vroidID", "0", null)
		layerAnime: function (layerID, method, time, wait, visible, cb) {
			let layerElem;
		
			//IDの確認。なければ即終了
			if (document.getElementById(layerID)) {
				layerElem = document.getElementById(layerID);
			} else {
				if (cb && typeof cb === 'function') cb()
				return
			}

			//表示状態の保存
			const statVRoid = TYRANO.kag.stat.VRoid;
			const saveLayer = statVRoid.layer[layerID];
			if (visible == "") {
				saveLayer.visible = true;
				visible = "1"
			} else {
				saveLayer.visible = false;
				visible = "0"
			}
			
			
			//時間指定がなければ瞬間変更
			if (!time){
				$("#" + layerID).stop(true, true).css({"animation-duration": "","animation-name": "","opacity": visible})
				if (cb && typeof cb === 'function') cb()
				return
			}
			
			//時間指定がある場合
			$("#" + layerID).stop(true, true).css({"animation-duration": time + "ms", "animation-name": method}).one("animationend", function() {
				$(this).css({"animation-duration": "", "animation-name": "","opacity": visible})
				if (cb && typeof cb === 'function' && wait) cb()
			});

			//waitがfalseの時は即NextOrder
			if (cb && typeof cb === 'function' && !wait) cb()

		},

		
		//モデルのロード。
		// VRoid.three.load("model1", "./data/others/plugin/vrm/model/AliciaSolid.vrm")
		load: function (modelID, file, cb, wait, maker) {
			//waitのデフォルト値をセット
			if (wait === undefined) wait = true;

			if (this.model[modelID]) {
				this.error(id + " 同一IDのキャラクターは作成できません。")
				if (cb && typeof cb === 'function') cb()
				return
			}
			
			//モデル用セーブデータオブジェクト
			const statVRoid = TYRANO.kag.stat.VRoid;
			if (!statVRoid.model[modelID]) {
				statVRoid.model[modelID] = {};
			}
			const saveModel = statVRoid.model[modelID];
			saveModel.file = file;

			this.model[modelID] = {};
			
			this.model[modelID].loader = new THREE.GLTFLoader();
			this.model[modelID].loader.crossOrigin = 'anonymous';
			this.model[modelID].loader.register((parser) => {
				return new THREE.VRMLoaderPlugin(parser, { autoUpdateHumanBones: true } );
			});

			this.model[modelID].loader.load(

				// URL of the VRM you want to load
				file,
				
				//vrm1.0test
				//"./data/others/plugin/vrm/model/vrm_v10.vrm",

				// called when the resource is loaded
				(gltf) => {

					this.model[modelID].vrm = gltf.userData.vrm;
					const vrm = this.model[modelID].vrm

					THREE.VRMUtils.removeUnnecessaryVertices( gltf.scene );
					THREE.VRMUtils.removeUnnecessaryJoints( gltf.scene );
					THREE.VRMUtils.rotateVRM0(vrm);
					
					//Y軸の補正を保存
					this.model[modelID].correctionRotateY = vrm.scene.rotation.y

					vrm.scene.traverse( ( obj ) => {
						obj.frustumCulled = false;
					} );


					//morphTargetDictionaryから表情データを取得
					function findAllKeys(obj, fName, parentKey = '', seen = new Set()) {
						let keys = [];
						for (let key in obj) {
							const fullPath = parentKey ? `${parentKey}.${key}` : key;
							if (key === fName) {
								keys.push(obj[key]);
							}
							if (typeof obj[key] === 'object' && obj[key] !== null && !seen.has(obj[key])) {
								seen.add(obj[key]);
								keys = keys.concat(findAllKeys(obj[key], fName, fullPath, seen));
							}
						}
						return keys;
					}

					const primitives = findAllKeys(vrm.expressionManager._expressions, "primitives");

					let tmp
					tmp = []
					primitives.forEach((child) => {
							
						child.forEach((data) => {
							if (data.morphTargetDictionary) {
								for (const key in data.morphTargetDictionary) {
									if (tmp.indexOf(key) === -1) {
										tmp.push(key)

										const addExpression = new THREE.VRMExpression(key);
										addExpression.addBind(new THREE.VRMExpressionMorphTargetBind({index: data.morphTargetDictionary[key], primitives: child, weight: 1}));
										
										vrm.expressionManager._expressionMap[key] = addExpression;
										vrm.expressionManager._expressions.push(addExpression);
										
										//追加でこれが使えるようになる。
										/*
										if (debug) {
											console.log(key)
										}
										*/
									}
								}
							}
						});
					});
					delete tmp
					//debugが有効ならemoMakerを立ち上げる
					if (maker) {
						this.emoMaker(modelID)
					}
					
					//風の為に揺れ物のデフォルト値を取得
					this.model[modelID].wind = {default:[]}
					const wind = this.model[modelID].wind

					//揺れ物のデフォルト値を取得
					vrm.springBoneManager._objectSpringBonesMap.forEach(element => {
						element.forEach((node) => {
							wind.default.push({
								gravityDir: node.settings.gravityDir,
								gravityPower: node.settings.gravityPower
							});
						});
					});

					/*
					console.log(vrm.meta.metaVersion)
					if (vrm.meta.metaVersion === '0') {
						// vrm.meta: VRM0Meta
					} else if (vrm.meta.metaVersion === '1') {
						// vrm.meta: VRM1Meta
					}
					*/

					if (cb && typeof cb === 'function' && wait) cb()

				},
				// called while loading is progressing
				(progress) => {
					//console.log('Loading model...', 100.0 * (progress.loaded / progress.total), '%')
				},

				// called when loading has errors
				(error) => {
					VRoid.three.error("モデルデータのロード時にエラーが発生しました。")
					if (cb && typeof cb === 'function' && wait) cb()
				}
			)

			//waitがfalseの時は即NextOrder
			if (cb && typeof cb === 'function' && !wait) cb()
		},

		//待機モーションのアップデート
		updateWaitingAnimation: function (vrm, model, s) {
			vrm.humanoid.getNormalizedBoneNode(THREE.VRMHumanBoneName.Neck).rotation.x          = s + model.waitingAnimationVal.Neck
			vrm.humanoid.getNormalizedBoneNode(THREE.VRMHumanBoneName.Chest).rotation.x         = s + model.waitingAnimationVal.Chest
			vrm.humanoid.getNormalizedBoneNode(THREE.VRMHumanBoneName.RightShoulder).rotation.z = s + model.waitingAnimationVal.RightShoulder
			vrm.humanoid.getNormalizedBoneNode(THREE.VRMHumanBoneName.LeftUpperArm).rotation.z  = s + model.waitingAnimationVal.LeftUpperArm

			vrm.humanoid.getNormalizedBoneNode(THREE.VRMHumanBoneName.Spine).rotation.x         = (-1 * s) + model.waitingAnimationVal.Spine
			vrm.humanoid.getNormalizedBoneNode(THREE.VRMHumanBoneName.RightUpperArm).rotation.z = (-1 * s) + model.waitingAnimationVal.RightUpperArm
			vrm.humanoid.getNormalizedBoneNode(THREE.VRMHumanBoneName.LeftShoulder).rotation.z  = (-1 * s) + model.waitingAnimationVal.LeftShoulder
		},
		
		//待機モーションの基準位置を保存する
		saveWaitingAnimationVal: function (vrm, model) {
			model.waitingAnimationVal = {};

			model.waitingAnimationVal.Neck          = vrm.humanoid.getNormalizedBoneNode(THREE.VRMHumanBoneName.Neck).rotation.x
			model.waitingAnimationVal.Chest         = vrm.humanoid.getNormalizedBoneNode(THREE.VRMHumanBoneName.Chest).rotation.x
			model.waitingAnimationVal.Spine         = vrm.humanoid.getNormalizedBoneNode(THREE.VRMHumanBoneName.Spine).rotation.x
			model.waitingAnimationVal.RightShoulder = vrm.humanoid.getNormalizedBoneNode(THREE.VRMHumanBoneName.RightShoulder).rotation.z
			model.waitingAnimationVal.RightUpperArm = vrm.humanoid.getNormalizedBoneNode(THREE.VRMHumanBoneName.RightUpperArm).rotation.z
			model.waitingAnimationVal.LeftShoulder  = vrm.humanoid.getNormalizedBoneNode(THREE.VRMHumanBoneName.LeftShoulder).rotation.z
			model.waitingAnimationVal.LeftUpperArm  = vrm.humanoid.getNormalizedBoneNode(THREE.VRMHumanBoneName.LeftUpperArm).rotation.z
		},

		//モデルの追加
		// VRoid.three.add("vroidID", "model1")
		add: function (layerID, modelID, pose, visible, lookingCamera, waitingAnimation, shake, x, y, z, firstShake, waitingAnimationVal, shakeSpeed, waitingAnimationSpeed, rotx, roty, rotz) {
			const model = this.model[modelID]
			const vrm = this.model[modelID].vrm
			const scene = this.layer[layerID].scene
			const camera = this.layer[layerID].camera
			const that = this;

			if (model.layerID) {
				this.error(id + " 既に追加済みのIDのキャラクターは追加できません")
				return
			}
			
			model.layerID = layerID
			model.isAnimating = false;

			//セーブデータ用
			const statVRoid = TYRANO.kag.stat.VRoid;
			const saveModel = statVRoid.model[modelID];
			saveModel.layerID = layerID
			saveModel.pose = pose
			saveModel.visible = visible
			
			if (lookingCamera !== undefined && lookingCamera !== null) {
				//引数があれば引数を適用
				saveModel.lookingCamera = lookingCamera
			} else if (saveModel.lookingCamera === undefined) {
				//設定がなければ初期値。既にあればそのまま引き継ぎで処理なし。
				saveModel.lookingCamera = false
			}
			
			if (shake !== undefined && shake !== null) {
				saveModel.shake = shake
			} else if (saveModel.shake === undefined) {
				saveModel.shake = true
			}
			
			if (waitingAnimation !== undefined && waitingAnimation !== null) {
				saveModel.waitingAnimation = waitingAnimation
			} else if (saveModel.waitingAnimation === undefined) {
				saveModel.waitingAnimation = true
			}
			
			
			if (waitingAnimationVal !== undefined && waitingAnimationVal !== null) {
				saveModel.waitingAnimationVal = waitingAnimationVal
			} else if (saveModel.waitingAnimationVal === undefined) {
				saveModel.waitingAnimationVal = 15
			}

			if (shakeSpeed !== undefined && shakeSpeed !== null) {
				saveModel.shakeSpeed = shakeSpeed
			} else if (saveModel.shakeSpeed === undefined) {
				saveModel.shakeSpeed = 1
			}

			if (shakeSpeed !== undefined && shakeSpeed !== null) {
				saveModel.shakeSpeed = shakeSpeed
			} else if (saveModel.shakeSpeed === undefined) {
				saveModel.shakeSpeed = 1
			}

			if (waitingAnimationSpeed !== undefined && waitingAnimationSpeed !== null) {
				saveModel.waitingAnimationSpeed = waitingAnimationSpeed
			} else if (saveModel.waitingAnimationSpeed === undefined) {
				saveModel.waitingAnimationSpeed = 1
			}
			
			if (!saveModel.wind) {
				saveModel.wind = {
					enable: false,
					val: 0.5,
					speed: 1,
					x: 1,
					y: 0,
					z: 0,
					rotX: this.layer[model.layerID].camera.rotation.x,
					rotY: this.layer[model.layerID].camera.rotation.y,
					rotZ: this.layer[model.layerID].camera.rotation.z,
				}
			}

			if (!saveModel.lipSync) {
				saveModel.lipSync = {
					isSync: false,
					buf: null,
					micVolume: 2,
					micMinLevel: 0,
					micMix: 0.75,
					fadeOut: 500,
					invalidList: ["aa", "ih", "ou", "ee", "oh"],
					lipData: {
						aa: 1,
						ih: 0,
						ou: 0,
						ee: 0,
						oh: 0,
					}
				}
			}

			saveModel.camera = {
				position: { x: Number(x), y: Number(y), z: Number(z) },
				rotation: { x: Number(rotx), y: Number(roty), z: Number(rotz) },
			};

			if (x) { vrm.scene.position.x = Number(x); }
			if (y) { vrm.scene.position.y = Number(y); }
			if (z) { vrm.scene.position.z = Number(z); }

			if (rotx) { vrm.scene.rotation.x = Number(rotx); }
			if (roty) { vrm.scene.rotation.y = Number(roty); }
			if (rotz) { vrm.scene.rotation.z = Number(rotz); }

			vrm.scene.visible = visible;
			vrm.scene.name = modelID;

			scene.add(vrm.scene);
			const clock = new THREE.Clock();

			//カメラ目線
			vrm.lookAt.autoUpdate = true;
			if (lookingCamera) {
				vrm.lookAt.target = camera;
			}

			//初期ポーズの設定
			if (pose) {
				if (this.poseJson[pose]) {
					poseJson = this.poseJson[pose]
					vrm.humanoid.setNormalizedPose(this.poseCorrection(poseJson, vrm))
				} else {
					this.error(pose + " に設定されたポーズデータがありません。")
				}
			}
			
			//風終了フラグ
			let windEnd = false

			//待機モーションの設定
			this.saveWaitingAnimationVal(vrm, model)

			cancelAnimationFrame(model.tickID)
			function tick() {

				if ( vrm ) {
					model.tickID = requestAnimationFrame(tick);
					const delta = clock.getDelta(); 

					if ( model.mixer && model.mixer.action && model.mixer.action.enabled ) {
						model.mixer.update( delta );
					} else {
						//待機モーション ポーズの変更時は止める
						if (!model.isAnimating && saveModel.waitingAnimation) {
							//waitingValの数字を大きくすると待機モーションの動きが大きくなる
							const waitingVal = saveModel.waitingAnimationVal * 0.001;
							that.updateWaitingAnimation(vrm, model, waitingVal * (Math.sin( Math.PI * (clock.elapsedTime * saveModel.waitingAnimationSpeed))))
						}
					}
					
					//風処理
					if (saveModel.wind.enable) {
						vrm.springBoneManager._objectSpringBonesMap.forEach(element => {
							element.forEach(node => {
								let vec = new THREE.Vector3(saveModel.wind.x, saveModel.wind.y, saveModel.wind.z);
								const euler = new THREE.Euler(saveModel.wind.rotX, saveModel.wind.rotY, saveModel.wind.rotZ, "XYZ");
								vec.applyEuler(euler);
								let currentGravity = node.settings.gravityDir.clone();
								currentGravity.add(vec);
					    		node.settings.gravityDir = currentGravity.normalize();
								node.settings.gravityPower = Math.abs(saveModel.wind.val * (Math.sin( Math.PI * (clock.elapsedTime * saveModel.wind.speed))));
							});
						});
						windEnd = false

					} else {
						if (!windEnd) {
							let i = 0
							vrm.springBoneManager._objectSpringBonesMap.forEach(element => {
								element.forEach(node => {
									node.settings.gravityDir = model.wind.default[i].gravityDir;
									node.settings.gravityPower = model.wind.default[i].gravityPower;
								});
								i++
							});
							windEnd = true
						}
					}

					if (saveModel.shake && !TYRANO.kag.stat.is_skip) {
						//saveModel.shakeSpeedの小さい数字ほど揺れ物の揺れが遅くなる
						vrm.update( delta * saveModel.shakeSpeed );
					} else {
						//大きな数字を渡して実質揺れないようにする。動きが激しいと多少は揺れる
						//スキップ中も揺れない
						vrm.update( 1000 );
					}

				}

			}
			tick()

			//モデル追加時の揺れを抑制する処理
			if (!firstShake) {
				let firstShakeCount = 0
				function firstShakeOff() {

					if ( vrm && firstShakeCount <= 5) {
						requestAnimationFrame(firstShakeOff);
						vrm.update( 1000 );
						firstShakeCount++;
					}

				}
				firstShakeOff()
			}
			
			//風用関数
			function updateWind(val, x, y, z, rotation) {
				vrm.springBoneManager._objectSpringBonesMap.forEach(element => {
					element.forEach(node => {
						let vec = new THREE.Vector3(x, y, z);
						vec.applyEuler(rotation);
						let currentGravity = node.settings.gravityDir.clone();
						currentGravity.add(vec);
			    		node.settings.gravityDir = currentGravity.normalize();
						node.settings.gravityPower = val;
					});
				});
			}

		},

		//シーンに追加したモデルを削除
		// VRoid.three.delete("VRoid", "model1")
		delete: function (modelID) {

			const model = this.model[modelID]
			const vrm = this.model[modelID].vrm

			//セーブデータ用
			const statVRoid = TYRANO.kag.stat.VRoid;
			const saveModel = statVRoid.model[modelID];

			const scene = this.layer[saveModel.layerID].scene

			delete saveModel.layerID


			//action関係の削除
			delete saveModel.mixer
			$(model.mixer).off();

			scene.remove(vrm.scene);

		},
		
		//モデルの設定変更
		modelConfig: function (modelID, lookingCamera, shake, shakeSpeed, waitingAnimation, waitingAnimationVal, waitingAnimationSpeed) {
			const model = this.model[modelID]
			const vrm = this.model[modelID].vrm
			const statVRoid = TYRANO.kag.stat.VRoid;
			const saveModel = statVRoid.model[modelID];
			
			let camera
			if (model.layerID) {
				camera = this.layer[model.layerID].camera
			}

			if (lookingCamera !== undefined && lookingCamera !== null) {
				saveModel.lookingCamera = lookingCamera
				if (camera) {
					if (lookingCamera) {
						vrm.lookAt.target = camera;
					} else {
						delete vrm.lookAt.target
						vrm.lookAt.reset()
					}
				}
			}

			if (shake !== undefined && shake !== null) {
				saveModel.shake = shake
			}

			if (shakeSpeed !== undefined && shakeSpeed !== null) {
				saveModel.shakeSpeed = shakeSpeed
			}
			
			if (waitingAnimation !== undefined && waitingAnimation !== null) {
				saveModel.waitingAnimation = waitingAnimation
			}
			
			if (waitingAnimationVal !== undefined && waitingAnimationVal !== null) {
				saveModel.waitingAnimationVal = waitingAnimationVal
			}

			if (waitingAnimationSpeed !== undefined && waitingAnimationSpeed !== null) {
				saveModel.waitingAnimationSpeed = waitingAnimationSpeed
			}
			
		},

		//モデルの表示 ※仮実装　フェード処理方法が不明
		// VRoid.three.show("model1")
		show: function (modelID, time, func, cb, wait) {
			this.model[modelID].vrm.scene.visible = true;

			//セーブデータ用
			const statVRoid = TYRANO.kag.stat.VRoid;
			const saveModel = statVRoid.model[modelID];
			saveModel.visible = true

			if (cb && typeof cb === 'function') cb()

		},

		//モデルの非表示 ※仮実装　フェード処理方法が不明
		// VRoid.three.hide("model1", time, func, cb, wait)
		hide: function (modelID, time, func, cb, wait) {
			this.model[modelID].vrm.scene.visible = false;

			//セーブデータ用
			const statVRoid = TYRANO.kag.stat.VRoid;
			const saveModel = statVRoid.model[modelID];
			saveModel.visible = false

			if (cb && typeof cb === 'function') cb()

		},

		//モデルに風をあてる 風が出る方向は実行時のカメラ基準
		// VRoid.three.wind("model1", 0.5, 1, 1, 0, 0)
		// VRoid.three.wind("model1", 0.1)
		wind: function (modelID, val, speed, x, y, z) {
			//セーブデータ用
			const statVRoid = TYRANO.kag.stat.VRoid;
			const saveModel = statVRoid.model[modelID];
			const model = this.model[modelID]

			if (val !== undefined) saveModel.wind.val = Number(val)
			if (speed !== undefined) saveModel.wind.speed = Number(speed)
			if (x !== undefined) saveModel.wind.x = Number(x)
			if (y !== undefined) saveModel.wind.y = Number(y)
			if (z !== undefined) saveModel.wind.z = Number(z)

			saveModel.wind.rotX = this.layer[model.layerID].camera.rotation.x
			saveModel.wind.rotY = this.layer[model.layerID].camera.rotation.y
			saveModel.wind.rotZ = this.layer[model.layerID].camera.rotation.z
			saveModel.wind.enable = true

		},

		//風をとめる
		// VRoid.three.stopWind("model1")
		stopWind: function (modelID) {
			//セーブデータ用
			const statVRoid = TYRANO.kag.stat.VRoid;
			const saveModel = statVRoid.model[modelID];

			saveModel.wind.enable = false

		},
		poseCorrection: function (poseJson, vrm) {
			let cprrPose = $.extend(true,{}, poseJson);
		
			if (vrm.meta.metaVersion === '1') {
				Object.keys(poseJson).forEach((key) => {
					if (poseJson[key].rotation) {
						cprrPose[key].rotation[0] = poseJson[key].rotation[0] * (-1)
						cprrPose[key].rotation[2] = poseJson[key].rotation[2] * (-1)
					}
				});
			}
			//} else if (vrm.meta.metaVersion === '0') {}
			return cprrPose
		},
		
		//モデルのポージング
		// VRoid.three.pose("model1", "")
		pose: function (modelID, poseName, time, func, cb, wait, skip) {
			//waitのデフォルト値をセット
			if (wait === undefined) wait = true;

			const model = this.model[modelID]
			const vrm = this.model[modelID].vrm;
			const that = this;

			let startTime;
			let initialValues = {};
			let targetValues = {};
			let requestId;
			let poseJson;
			
			const autoCamera = vrm.lookAt.target && vrm.lookAt.autoUpdate //カメラ目線が有効ならtrue 目線は変更させない
			
			if (this.poseJson[poseName]) {
				poseJson = $.extend(true,{}, this.poseJson[poseName]);
			} else {
				this.error(poseName + " に設定されたポーズデータがありません。")
				if (cb && typeof cb === 'function') cb()
				return;
			}
			
			//モデルのバージョンによってrotation補正
			poseJson = this.poseCorrection(poseJson, vrm)

			//セーブデータ用
			const statVRoid = TYRANO.kag.stat.VRoid;
			const saveModel = statVRoid.model[modelID];

			//直前の変更が終わっていない場合の処理　多分要らない
			if (saveModel.pose) {
				//const savePose = $.extend(true,{}, this.poseJson[saveModel.pose]);
				//savePose = this.poseCorrection(savePose, vrm)
				//vrm.humanoid.setNormalizedPose(savePose)
			}
			cancelAnimationFrame(model.requestId)


			saveModel.pose = poseName

			//時間指定がなければ瞬間変更
			if (!time){
				vrm.humanoid.setNormalizedPose(poseJson)
				
				//待機モーションの再設定
				this.saveWaitingAnimationVal(vrm, model)

				if (cb && typeof cb === 'function') cb()
				return
			}

			//アニメーション中は待機モーションを強制的に止める
			model.isAnimating = true;


			// 初期値と目標値をセットアップ
			const tmpPose = vrm.humanoid.getNormalizedPose();
			//const tmpPose = this.poseCorrection(vrm.humanoid.getNormalizedPose(), vrm);

			for (const key in poseJson) {
				//数値の異なるrotationのみ処理する
				if (tmpPose[key] && array_equal(tmpPose[key].rotation, poseJson[key].rotation) == false ) {
					initialValues[key] = tmpPose[key].rotation;
					targetValues[key] = poseJson[key].rotation;
				}
			}

			//配列の比較用
			function array_equal(arr1, arr2) {
				return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
			}

			function updatePose(timestamp) {
				startTime = startTime || timestamp;
				let elapsed = timestamp - startTime;
				let progress = Math.min(1, elapsed / time);

				//スキップが有効の場合は割り込み処理
				if (skip && TYRANO.kag.stat.is_skip) {
					progress = 1
				}

				let easedProgress = selectedEasingFunction(progress);
				let currentValue = {};

				// イージングの計算を適用
				for (const key in targetValues) {
					currentValue[key] = {rotation: []};

					for (let i = 0; i < initialValues[key].length; i++) {
						currentValue[key].rotation[i] = initialValues[key][i] + (targetValues[key][i] - initialValues[key][i]) * easedProgress;
					}
				}

				vrm.humanoid.setNormalizedPose(currentValue)

				if (progress < 1) {
					model.requestId = requestAnimationFrame(updatePose);
				} else {
					//完了時
					//待機モーションの再設定
					that.saveWaitingAnimationVal(vrm, model)
					model.isAnimating = false;

					if (cb && typeof cb === 'function' && wait) cb()
				}
			}

			function startAnimation() {
				startTime = null;
				model.requestId = requestAnimationFrame(updatePose);
			}

			// イージング関数を選択
			let selectedEasingFunction = this.easing[func] || this.easing.default;

			// 最初のフレームを実行
			startAnimation();

			//waitがfalseの時は即NextOrder
			if (cb && typeof cb === 'function' && !wait) cb()

		},

		//VRMAのimport。
		// VRoid.three.importVRMA("VRMA_01.vrma, VRMA_02.vrma")
		importVRMA: function (storage, wait, cb) {
			//インポートの保存
			const statVRoid = TYRANO.kag.stat.VRoid;
			if (!statVRoid.vrma) statVRoid.vrma = []

			//新しい要素を追加する前に、すでに存在するかどうかをチェック
			if (!statVRoid.vrma.some(exisElem => exisElem === storage)) {
				statVRoid.vrma.push(storage);
			}

			const storageArr = storage.split(',');
			const promises = [];

			storageArr.forEach(function(file) {
				file = file.trim();

				// 先頭が./なら削除
				if (file.startsWith("./")) {
					file = file.substring(2);
				}

				// 拡張子を削除してnameにする
				let name;
				const dotIndex = file.lastIndexOf(".");

				// .以降を削除
				if (dotIndex >= 0) {
					name = file.substring(0, dotIndex);
				} else {
					name = file;
				}

				if (!VRoid.three.vrma[name]) {
					const promise = new Promise(function(resolve, reject) {
					
						const loader = new THREE.GLTFLoader();
						loader.crossOrigin = 'anonymous';
						loader.register((parser) => {
							return new THREE.VRMAnimationLoaderPlugin(parser);
						});

						loader.load(

							"./data/others/plugin/vrm/_vrma/" + file,

							// called when the resource is loaded
							(gltf) => {
								const vrmAnimations = gltf.userData.vrmAnimations
								if (vrmAnimations != null) {
									VRoid.three.vrma[name] = vrmAnimations
								}
								resolve();
							},
							// called while loading is progressing
							(progress) => {
								//console.log('Loading model...', 100.0 * (progress.loaded / progress.total), '%')
							},

							// called when loading has errors
							(error) => {
								console.log(error)
								VRoid.three.error("VRMAデータのロード時にエラーが発生しました。")
								if (cb && typeof cb === 'function' && wait) cb()
								resolve();
							}
						)
					});
					
					promises.push(promise);
				}

			});

			// 全ての処理が終了後にnextorder
			Promise.all(promises).then(function() {
				if (cb && typeof cb === 'function' && wait) cb()
			});
			
			if (cb && typeof cb === 'function' && !wait) cb()
		},

		//登録したVRMAファイルの再生
		//VRoid.three.animation("model1", "VRMA_01")
		animation: function (modelID, vrmaID, rate, loop, fadeIn, fadeOut, wait, skip, cb) {
			const model = this.model[modelID]
			const vrm = this.model[modelID].vrm;
			const statVRoid = TYRANO.kag.stat.VRoid;
			const saveModel = statVRoid.model[modelID];
			
			//ループが0(無限)の時のみセーブデータから再現するため保存
			if (loop === 0) {
				saveModel.mixer = {
					rate: rate,
					storage: vrmaID,
					fadeIn: fadeIn,
					fadeOut: fadeOut,
					VRMA: true,
				}
				
				//無限ループの場合はwaitを強制的にfalse
				wait = false;
			}
			
			model.mixer = new THREE.AnimationMixer(vrm.scene);
			
			//一時的に警告を無効化
			const _warn = console.warn;
			console.warn = function() {};
			const clip = THREE.createVRMAnimationClip(VRoid.three.vrma[vrmaID][0], vrm);
			console.warn = _warn;


			//msをsに変換
			fadeIn *= 0.001
			fadeOut *= 0.001

			//スキップ時は速度を上げる
			if (TYRANO.kag.stat.is_skip && skip) {
				fadeIn *= 0.1
				fadeOut *= 0.1
				rate *= 10
			}

			//実行中の場合はキャンセル
			$(model.mixer).off();
			if ( model.mixer && model.mixer.action && model.mixer.action.enabled ) {
				model.mixer.action.stop();
			}

			model.mixer.timeScale = rate

			model.mixer.action = model.mixer.clipAction( clip )
			model.mixer.action.setLoop(THREE.LoopOnce);
			
			//最後の体勢を維持
			model.mixer.action.clampWhenFinished = true;
			model.mixer.action.fadeIn(fadeIn)
			model.mixer.action.play();
			
			let loopCount = 0
			$(model.mixer).on('finished', function(e) {
				loopCount++;
				if (loop === 0 || loopCount < loop) {
					//0の時は無限ループ もしくはloopCountがloop値よりも小さい場合
					model.mixer.action.reset()
				} else {
					//ループカウント終了時
					model.mixer.action.fadeOut(fadeOut);
					$(model.mixer).off();
					
					setTimeout(() => {
						if (cb && typeof cb === 'function' && wait) cb()
					}, (fadeOut * 1000));
				}
			});

			//waitがfalseの時は読み込んだ後にNextOrder
			if (cb && typeof cb === 'function' && !wait) cb()
		},

		//FBXファイルの再生
		//VRoid.three.action("model1", "FemaleWalk.fbx", 1, 0, 2000, 2000)
		action: function (modelID, storage, rate, loop, fadeIn, fadeOut, wait, skip, cb) {
			const model = this.model[modelID]
			const vrm = this.model[modelID].vrm;
			const statVRoid = TYRANO.kag.stat.VRoid;
			const saveModel = statVRoid.model[modelID];

			//ループが0(無限)の時のみセーブデータから再現するため保存
			if (loop === 0) {
				saveModel.mixer = {
					rate: rate,
					storage: storage,
					fadeIn: fadeIn,
					fadeOut: fadeOut,
					VRMA: false,
				}
				
				//無限ループの場合はwaitを強制的にfalse
				wait = false;
			}
			
			const file = "./data/others/plugin/vrm/_action/" + storage
			
			//msをsに変換
			fadeIn *= 0.001
			fadeOut *= 0.001


			//スキップ時は速度を上げる
			if (TYRANO.kag.stat.is_skip && skip) {
				fadeIn *= 0.1
				fadeOut *= 0.1
				rate *= 10
			}

			//実行中の場合はキャンセル
			$(model.mixer).off();
			if ( model.mixer && model.mixer.action && model.mixer.action.enabled ) {
				model.mixer.action.stop();
			}

			model.mixer = new THREE.AnimationMixer(vrm.scene);
			model.mixer.timeScale = rate;

			loadMixamoAnimation( file, vrm ).then( ( clip ) => {
				model.mixer.action = model.mixer.clipAction( clip )
				//model.mixer.action.setLoop(THREE.Loop);
				model.mixer.action.setLoop(THREE.LoopOnce);
				
				//最後の体勢を維持
				model.mixer.action.clampWhenFinished = true;
				model.mixer.action.fadeIn(fadeIn)
				model.mixer.action.play();

				//waitがfalseの時は読み込んだ後にNextOrder
				if (cb && typeof cb === 'function' && !wait) cb()
				
			}).catch((error) => {
				this.error(storage + " ファイルの読み込みに失敗しました。")
				console.error('Animation loading error:', error);
				//エラーが出た場合は強制NextOrder
				if (cb && typeof cb === 'function') cb()
			});

			let loopCount = 0
			$(model.mixer).on('finished', function(e) {
				loopCount++;
				if (loop === 0 || loopCount < loop) {
					//0の時は無限ループ もしくはloopCountがloop値よりも小さい場合
					model.mixer.action.reset()
				} else {
					//ループカウント終了時
					model.mixer.action.fadeOut(fadeOut);
					$(model.mixer).off();
					
					setTimeout(() => {
						if (cb && typeof cb === 'function' && wait) cb()
					}, (fadeOut * 1000));
				}
			});

		},

		//VRoid.three.stop_action("model1", 2000)
		stop_action: function (modelID, fadeOut, wait, skip, cb) {

			const model = this.model[modelID]
			const statVRoid = TYRANO.kag.stat.VRoid;
			const saveModel = statVRoid.model[modelID];

			//msをsに変換
			fadeOut *= 0.001

			//スキップ時でwait指定がある場合は速度を上げる
			if (TYRANO.kag.stat.is_skip && skip && wait) {
				fadeOut *= 0.1
			}

			delete saveModel.mixer
			$(model.mixer).off();
			model.mixer.action.fadeOut(fadeOut);
			
			setTimeout(() => {
				if (cb && typeof cb === 'function' && wait) cb()
			}, (fadeOut * 1000));

			//waitがfalseの時は即NextOrder
			if (cb && typeof cb === 'function' && !wait) cb()

		},


		//モデルの移動と回転
		// VRoid.three.move("model1", "0", "1", "0", 2000, "easeOutBounce")
		// VRoid.three.move("model1", "0", "+=1", "-=0") //とかもできる
		move: function (objID, x, y, z, time, func, cb, wait, skip, property, setting) {
			//waitのデフォルト値をセット
			if (wait === undefined) wait = true;
			
			let obj;
			let correctionRotateY = 0;
			//objの指定がなければvrmがデフォルト
			if (setting == "camera") {
				obj = this.layer[objID].camera;
			} else {
				obj = this.model[objID].vrm.scene;
				correctionRotateY = this.model[objID].correctionRotateY;
			}
			
			//propertyが不正な場合はpositionに設定される
			if (property !== "rotation") {
				property = "position";
			}

			let startTime;

			//xyzをオブジェクト化。引数のないものは作成されない。
			let isCorrection = false;
			let targetValues = createTarget(x, y ,z);
			let initialValues = createInitial(targetValues);
			let requestId;


			//セーブデータ用
			const statVRoid = TYRANO.kag.stat.VRoid;
			let saveObj;
			if (setting == "camera") {
				saveObj = statVRoid.layer[objID].camera;
			} else {
				saveObj = statVRoid.model[objID].camera;
			}
			for (const key in targetValues) {
				saveObj[property][key] = targetValues[key];
			}

			//補正が必要なパターン
			if (isCorrection) {
				if (targetValues.y !== undefined) targetValues.y += correctionRotateY
			}

			//時間指定がなければ瞬間変更
			if (!time){
				moveApply(targetValues)
				if (cb && typeof cb === 'function') cb()
				return
			}

			//配列の作成と計算
			function createTarget(x, y, z) {
				const target = {}
				
				if (x !== null) {
					target.x = calTarget(x, "x");
				}
				if (y !== null) {
					target.y = calTarget(y, "y");
				}
				if (z !== null) {
					target.z = calTarget(z, "z");
				}
				
				return target;
			}

			//設定値計算（一文字目が演算子の場合にも対応）
			function calTarget(val, xyz) {
				//先頭2文字を取得
				const str = String(val).slice(0, 2);
				let targetVal;
				//let initialVal = vrm.humanoid.getNormalizedBoneNode(THREE.VRMHumanBoneName.Hips).position[xyz];
				let initialVal = obj[property][xyz];

				if (str == "+=") {
					targetVal = initialVal + Number(val.slice(2))
				} else if (str == "-=") {
					targetVal = initialVal - Number(val.slice(2))
				} else if (str == "*=") {
					targetVal = initialVal * Number(val.slice(2))
				} else if (str == "/=") {
					//0除算回避
					if ( Number(val.slice(2)) ) {
						targetVal = initialVal / Number(val.slice(2))
					}
				} else if (str == "%=") {
					targetVal = initialVal % Number(val.slice(2))
				} else {
					//いずれでもない場合は数字のはず
					//直接指定の場合は初期値補正を適用する
					targetVal = Number(val)
					//vrmのrotationを変更する際の補正が必要な判定
					if (setting !== "camera" && property == "rotation" && xyz == "y") {
						isCorrection = true;
					}
				}
				
				return targetVal;
			}

			//現在値の作成　同じ値だった場合は無視される
			function createInitial(xyz) {
				const initial = {}
				for (const key in xyz) {
					const pos = obj[property][key];
					if (key == y) xyz[key] += correctionRotateY
					if (pos !== xyz[key]) {
						initial[key] = pos;
					}
				}
				
				return initial;
			}

			//移動の適用
			function moveApply(xyz) {
				for (const key in xyz) {
					obj[property][key] = xyz[key];
				}
			}

			function updateMove(timestamp) {
				startTime = startTime || timestamp;
				let elapsed = timestamp - startTime;
				let progress = Math.min(1, elapsed / time);
				
				//スキップが有効の場合は割り込み処理
				if (skip && TYRANO.kag.stat.is_skip) {
					progress = 1
				}
				
				let easedProgress = selectedEasingFunction(progress);
				let currentValue = {};

				// イージングの計算を適用
				for (const key in initialValues) {
					currentValue[key] = initialValues[key] + (targetValues[key] - initialValues[key]) * easedProgress;
				}

				moveApply(currentValue);

				if (progress < 1) {
					requestId = requestAnimationFrame(updateMove);
				} else {
					//完了時
					if (cb && typeof cb === 'function' && wait) cb()
				}
			}

			function startAnimation() {
				startTime = null;
				requestId = requestAnimationFrame(updateMove);
			}


			// イージング関数を選択
			let selectedEasingFunction = this.easing[func] || this.easing.default;

			// 最初のフレームを実行
			startAnimation();

			//waitがfalseの時は即NextOrder
			if (cb && typeof cb === 'function' && !wait) cb()

		},

		//モデルの表情変更
		// VRoid.three.emotion("model1", "joy", 1000)
		emotion: function (modelID, eName, time, func, cb, wait, skip, diff, emoID, emoval) {
			//waitのデフォルト値をセット
			if (wait === undefined) wait = true;

			const model = this.model[modelID]
			const vrm = this.model[modelID].vrm;

			let startTime;
			let initialValues = {};
			let targetValues = {};
			let requestId;
			let emotionObj;
			
			//nameとIDどちらも指定していた場合はemoID優先
			if (eName && emoID) {
				eName = ""
			}

			if (eName && this.emotionObj[eName]) {
				emotionObj = this.emotionObj[eName]
			} else if (eName) {
				this.error(eName + " に設定された表情データがありません。")
				if (cb && typeof cb === 'function') cb()
				return;
			} else {
				//emoIDが指定されているパターン。emoIDとemovalをもとにemotionObjの作成
				emotionObj = [{"expressionName": emoID, "val": Number(emoval)}]
			}

			const statVRoid = TYRANO.kag.stat.VRoid;
			const saveModel = statVRoid.model[modelID];

			// 初期値と目標値をセットアップ
			// セーブ用のデータも保存
			if (!diff) {
				//差分が無効の場合はtarget全てに0を入れる
				vrm.expressionManager.expressions.forEach(function (data) {
					targetValues[data.expressionName] = 0;
				});
				//前回の変更が残っていたら止める
				cancelAnimationFrame(model.requestEmoId)
			}


			//現在値の設定
			vrm.expressionManager.expressions.forEach(function (data) {
				initialValues[data.expressionName] = vrm.expressionManager.getValue(data.expressionName);
			});

			//目標値の設定
			emotionObj.forEach(function (data) {
				targetValues[data.expressionName] = data.val;
			});

			//データの保存
			if (!saveModel.expression) {
				//設定がない時は初期化
				let i = 0;
				saveModel.expression = []

				vrm.expressionManager.expressions.forEach(function (data) {
					if (data.expressionName) {
						//saveModel.expression[i] = {expressionName: data.expressionName, val: vrm.expressionManager.getValue(data.expressionName)}
						saveModel.expression[i] = {expressionName: data.expressionName, val: 0}
					}
					i++
				});
				delete i
			}
			//セーブ用データに各ブレンドシェイプを格納
			saveModel.expression.forEach(function (data) {
				let expressionName = data.expressionName;
				let currentValue = targetValues[expressionName];
				if (currentValue !== undefined) {
					data.val = currentValue;
				}
			});

			//時間指定がなければ瞬間変更
			if (!time){
				// 各ブレンドシェイプを適用
				for (const expressionName in targetValues) {
					vrm.expressionManager.setValue(expressionName, targetValues[expressionName]);
				}

				vrm.expressionManager.update();

				if (cb && typeof cb === 'function') cb()
				return;
			}

			function updateExpressions(timestamp) {
				startTime = startTime || timestamp;
				let elapsed = timestamp - startTime;
				let progress = Math.min(1, elapsed / time);

				//スキップが有効の場合は割り込み処理
				if (skip && TYRANO.kag.stat.is_skip) {
					progress = 1
				}

				let easedProgress = selectedEasingFunction(progress);

				// 各ブレンドシェイプに対してアニメーションを適用
				for (const expressionName in targetValues) {
					const initialValue = initialValues[expressionName];
					const targetValue = targetValues[expressionName];

					if (initialValue != targetValue) {
						const currentValue = initialValue + (targetValue - initialValue) * easedProgress;
						vrm.expressionManager.setValue(expressionName, currentValue);
					}
				}
				//vrm.expressionManager.update();

				if (progress < 1) {
					model.requestEmoId = requestAnimationFrame(updateExpressions);
				} else {
					if (cb && typeof cb === 'function' && wait) cb()
				}
			}

			function startAnimation() {
				startTime = null;
				model.requestEmoId = requestAnimationFrame(updateExpressions);
			}

			// イージング関数を選択
			let selectedEasingFunction = this.easing[func] || this.easing.default;

			// 最初のフレームを実行
			startAnimation();

			//waitがfalseの時は即NextOrder
			if (cb && typeof cb === 'function' && !wait) cb()

		},

		preserveDrawingBuffer: function () {
			//preserveDrawingBufferを一時的に有効にしてサムネイル用に撮影可能な画像を用意する
			for (const key in this.layer) {

				const canvasVRoid = this.layer[key].renderer.domElement;

				// WebGL コンテキストを取得
				let gl = canvasVRoid.getContext('webgl2', { preserveDrawingBuffer: true }) || 
						 canvasVRoid.getContext('webgl', { preserveDrawingBuffer: true }) || 
						 canvasVRoid.getContext('experimental-webgl', { preserveDrawingBuffer: true });

				if (!gl) {
					continue;
				}

				// 別の canvas を作成
				const destinationCanvas = document.createElement('canvas');
				const destCtx = destinationCanvas.getContext('2d');

				//ID付与
				destinationCanvas.id = canvasVRoid.id + "_preserveDrawingBuffer";

				//CSSをコピー
				destinationCanvas.style.cssText = canvasVRoid.style.cssText;

				//テンポラリ用のclassを追加
				destinationCanvas.classList.add('tmp_VRoid_preserveDrawingBuffer_class');

				// フレームバッファを作成
				const framebuffer = gl.createFramebuffer();
				gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

				// テクスチャを作成
				const texture = gl.createTexture();
				gl.bindTexture(gl.TEXTURE_2D, texture);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvasVRoid);

				// フレームバッファにテクスチャをアタッチ
				gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

				// フレームバッファからデータを読み込む
				const width = canvasVRoid.width;
				const height = canvasVRoid.height;
				const pixels = new Uint8Array(width * height * 4);
				gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

				// フレームバッファのバインドを解除
				gl.bindFramebuffer(gl.FRAMEBUFFER, null);

				// テクスチャを解放
				gl.deleteTexture(texture);

				// データを別の canvas に描画
				destinationCanvas.width = width;
				destinationCanvas.height = height;
				const imageData = new ImageData(new Uint8ClampedArray(pixels), width, height);
				destCtx.putImageData(imageData, 0, 0);

				const parentElement = canvasVRoid.parentElement;
				parentElement.appendChild(destinationCanvas);

				gl = canvasVRoid.getContext('webgl2', { preserveDrawingBuffer: false }) || 
					 canvasVRoid.getContext('webgl', { preserveDrawingBuffer: false }) || 
					 canvasVRoid.getContext('experimental-webgl', { preserveDrawingBuffer: false });

			}


		},

		//VRoid.three.capture("VRoid", 3)
		capture: function (layerID, rate, timeOut) {
			const thisLayer = this.layer[layerID];
			const tmpPR = thisLayer.renderer.getPixelRatio();
			
			if (timeOut === undefined) timeOut = 500

			if (rate === undefined) rate = 1

			//高画質化
			thisLayer.renderer.setPixelRatio(Number(rate));

			//PixelRatio変更を少し待ってから処理
			setTimeout(() => {
				this.preserveDrawingBuffer()

				const canvas = document.getElementById(layerID + "_preserveDrawingBuffer");

				canvas.toBlob(function(blob) {
					const link = document.createElement('a');
					link.download = layerID + ".png";
					link.href = URL.createObjectURL(blob);
					link.click();

					//PixelRatioを戻す
					thisLayer.renderer.setPixelRatio(tmpPR);

					//取得したらレイヤーの削除
					const tmpCanvasLayer = document.getElementsByClassName("tmp_VRoid_preserveDrawingBuffer_class");
					const tmpCanvasLayerArr = Array.from(tmpCanvasLayer);

					tmpCanvasLayerArr.forEach(function(elem) {
						elem.parentNode.removeChild(elem);
					});
				}, "image/png");

				//テストカメラ時のIDがあったらCSSを戻す
				$("#VRoid_test_camera_capture").css("pointer-events", "")

			}, Number(timeOut));

		},

		
		//生ポーズデータ入力して圧縮
		//VRoid.three.inputJson()
		inputJson: function () {
			$.getJSON("./data/others/plugin/vrm/_pose/input.json").done(function(json) {

				const strJson = JSON.stringify(json, null)

				//console.log(JSON.stringify(json, null, 2));
				console.log(strJson);
				
				const strComp = LZString.compressToBase64(strJson)

				console.log('json = "' + strComp + '"');
				
				const strDeco = LZString.decompressFromBase64(strComp);
				
				console.log(strJson == strDeco);

				const obj = JSON.parse(strDeco);
				console.log(obj);

			}).fail(function(err) { 
				VRoid.three.error(storage + " ファイルが存在しないか、jsonファイルの記述が間違っています。 ");
			});
		},

		//VRoid.three.poseJsonを圧縮して出力（VRoid_import_poseで取り込み時）
		//VRoid.three.convertJson()
		convertJson: function () {

			const strJson = JSON.stringify(VRoid.three.poseJson, null)

			//console.log(JSON.stringify(json, null));
			console.log(strJson);
			
			const strComp = LZString.compressToBase64(strJson)

			console.log('json = "' + strComp + '"');
			
			const strDeco = LZString.decompressFromBase64(strComp);
			
			console.log(strJson == strDeco);

			const obj = JSON.parse(strDeco);
			console.log(obj);

		},

		//圧縮された文字列を展開してjsonオブジェクトを返す
		decodeJson: function (str) {
			const strDeco = LZString.decompressFromBase64(str)
			return JSON.parse(strDeco);
		},

		//VRoid.three.testCamera("VRoid", "model1") //modelIDは省略可
		//VRoid.three.layer.VRoid.camera.position
		testCamera: function (layerID, modelID, cb) {
			//is_stopをtrue ゲームを停止状態にする
			const tmp_is_stop = TYRANO.kag.stat.is_stop;
			TYRANO.kag.stat.is_stop = true
		
			//キーコンフィグを保存して無効にする
			const tmpKeyconfig = TYRANO.kag.stat.enable_keyconfig;
			TYRANO.kag.stat.enable_keyconfig = false;
		
			const thisLayer = this.layer[layerID];
			//cameraの現在値をtargetに渡す
			const lookAt = getCameraLookAt(thisLayer.camera)

			thisLayer.controls = new THREE.OrbitControls(thisLayer.camera, thisLayer.renderer.domElement)

			thisLayer.controls.target.set(lookAt.x, lookAt.y, lookAt.z)
			//以下を設定すると動きはなめらかになるけどlogの出力が増えて邪魔
			//thisLayer.controls.screenSpacePanning = true
			//thisLayer.controls.enableDamping = true;
			
			const $layerID = $("#" + layerID)
			
			//移動前の位置を保存
			const tmpParent = $layerID.parent();
			const tmpIndex = $layerID.css("z-index");
			
			$("#tyrano_base").append("<div id='VRoid_test_camera' style='position: absolute; z-index: 900000001;width: 100%;'></div>")
			$layerID.css({"z-index": "1", "pointer-events": "auto"}).appendTo('#VRoid_test_camera');
			thisLayer.controls.update()


			const pos = thisLayer.camera.position
			const rot = thisLayer.camera.rotation

			function outputLog(pos, rot) {
				console.log("pos.x = " + pos.x + "\n" +
							"pos.y = " + pos.y + "\n" +
							"pos.z = " + pos.z + "\n" +
							"rot.x = " + rot.x + "\n" +
							"rot.y = " + rot.y + "\n" +
							"rot.z = " + rot.z)
				console.log("========")
				/*
				console.log("VRoid.three.layer.VRoid.camera.position.set(" + pos.x + ", " + pos.y + ", " + pos.z + ")\n" +
							"VRoid.three.layer.VRoid.camera.rotation.set(" + rot.x + ", " + rot.y + ", " + rot.z + ")")
				console.log("========")
				*/
				console.log("[VRoid_camera_position layerID=" + layerID + " x=" + pos.x + " y=" + pos.y + " z=" + pos.z + "]\n" +
							"[VRoid_camera_rotation layerID=" + layerID + " x=" + rot.x + " y=" + rot.y + " z=" + rot.z + "]")
				console.log("========")
			}
			outputLog(pos, rot)

			thisLayer.controls.addEventListener("change", () => {
				outputLog(pos, rot)
			});

			let tickID
			function tick() {
				thisLayer.controls.update()
				tickID = requestAnimationFrame(tick)
			}
			tick()

			const scHeight = Number(TYRANO.kag.config.scHeight)

			let html = "<div id='VRoid_test_camera_close' style=' position: absolute; z-index: 2; background-color: rgba(0,0,0,0.5); color:#fff; width: 65px; font-size: 20px;padding: 10px 20px;right: 0;'>CLOSE</div>" +
				"<div id='VRoid_test_camera_capture' style='position: absolute; z-index: 2; background-color: rgba(255,255,255,0.5); color:#000; width: 65px; font-size: 14px; line-height: 1em; padding: 20px;right: 0; top: " + (scHeight - 54)  + "px;'>CAPTURE</div>" +
				"<div id='VRoid_test_camera_range' style='position: absolute; z-index: 2; right: 125px; top: " + (scHeight - 42)  + "px;'><input id='capture_range' type='range' value='1' min='0.5' max='5' step='0.5' style='cursor: pointer; margin-left: 40px;'><textarea readonly id='capture_text' rows='1' style='resize: none;width: 30px;padding: 5px 10px; font-size: 14px; margin-left: 20px; background:rgba(255,255,255,0.8); border: 2px solid rgba(255,255,255,0.5); border-radius: 6px; overflow: hidden;'>x1.0</textarea></div>"

			//modelIDの指定があった場合のみ、ポーズ変更を追加
			if (modelID) {
				html += "<select id='select_pose' style='background-color: rgba(255,255,255,0.8); position: absolute; z-index: 2; right: 120px; width: 144px; height: 39px; text-align: center; font-size: 18px; padding-left: 10px;'>"
					for (const key in VRoid.three.poseJson) {
						html += "<option value='" + key + "' id='" + key + "'>" + key + "</option>"
					}
				html += "</select>"
			}

			$("#VRoid_test_camera").append(html)
			$("#VRoid_test_camera_close").on("click", (e) => {
				// 元の位置に戻す
				cancelAnimationFrame(tickID)
				thisLayer.controls.dispose();
				$layerID.css({"z-index": tmpIndex, "pointer-events": "none"}).appendTo(tmpParent);
				$("#VRoid_test_camera").remove();
				
				//ゲーム変数に保存するために実行
				this.move(layerID, pos.x, pos.y, pos.z, 0, null, null, null, null, "position", "camera")
				this.move(layerID, rot.x, rot.y, rot.z, 0, null, null, null, null, "rotation", "camera")

				//キーコンフィグを戻す
				TYRANO.kag.stat.enable_keyconfig = tmpKeyconfig;

				//is_stopを戻す
				TYRANO.kag.stat.is_stop = tmp_is_stop;
				
				$(document).off(".test_camera")
				
				//nextOrder
				if (cb && typeof cb === 'function') cb()

				e.stopPropagation();
			})

			$("#VRoid_test_camera_capture").on("click", (e) => {
				//スクリーンショット撮影
				$("#VRoid_test_camera_capture").css("pointer-events", "none")
				this.capture("VRoid", $("#capture_range").val())
				e.stopPropagation();
			})

			$("#capture_range").on('change input', function() {
				$("#capture_text").html("x" + $(this).val());
			});
			
			$("#select_pose").change(function() {
				VRoid.three.pose(modelID, $(this).val())
			});

			//↑↓キーを押した時の処理
			$(document).on("keydown.test_camera",function(e){
			console.log(e.which)
				const select = $('#select_pose');
				if (select.length && (e.which == 38 || e.which == 40)) {
					const options = select.find('option');
					let selectedIndex = select.prop('selectedIndex');
					if (e.which == 38 && selectedIndex > 0) {
						selectedIndex--;
					} else if (e.which == 40 && selectedIndex < options.length - 1) {
						selectedIndex++;
					}
					select.prop('selectedIndex', selectedIndex);
					VRoid.three.pose(modelID, select.val())
				}
			});

			let VRoid_test_camera = document.getElementById('VRoid_test_camera');

			VRoid_test_camera.addEventListener('click', function(e){
				e.stopPropagation();
			});

			//カメラの現在の lookAt 方向を取得する関数
			function getCameraLookAt(camera) {
				//カメラの forward ベクトルを取得する
				const forward = new THREE.Vector3(0, 0, -1);
				forward.applyQuaternion(camera.quaternion); // カメラの回転を考慮

				//カメラの位置に forward ベクトルを加算し、lookAt の方向を計算する
				const lookAtDirection = new THREE.Vector3().addVectors(camera.position, forward);
				return lookAtDirection;
			}
		},
		
		//リップシンク
		lipSync: function (pm, modelID, lipSyncData) {
			const vrm = VRoid.three.model[modelID].vrm
			const vo = TYRANO.kag.tmp.map_se[pm.buf]
			const lipList = lipSyncData.invalidList

			const analyser = Howler.ctx.createAnalyser();
			analyser.fftSize = 256;
			
			vo._sounds[0]._node.connect(analyser);

			function tick() {
				if ( vrm ) {

					if (vo && vo.playing()) {
						requestAnimationFrame(tick)
						//無効リストに入っている表情を0に
						for (i = 1; i < lipList.length; i++) {
							vrm.expressionManager.setValue(lipList[i], 0)
						}

						//既存の表情をmicMix値で合成
						const expression = TYRANO.kag.stat.VRoid.model[modelID].expression
						for (const lip in lipSyncData.lipData) {
							let minVal = 0;
							for (let key in expression) {
								if (lip == expression[key].expressionName) {
									minVal = expression[key].val * lipSyncData.micMix;
								}
							}
							vrm.expressionManager.setValue(lip, Math.max(getByteFrequencyDataAverage(analyser, lipSyncData.lipData[lip]), minVal))
						}

					} else {
						const expression = TYRANO.kag.stat.VRoid.model[modelID].expression
						for (let key in expression) {
							for (i = 0; i < lipList.length; i++) {
								if (lipList[i] == expression[key].expressionName) {
									VRoid.three.emotion("model1", "", lipSyncData.fadeOut, "default", null, false, false, true, lipList[i], expression[key].val)
								}
							}
						}

					}

				}
			}
			tick()

			//再生中の音量を正規化して取得
			function getByteFrequencyDataAverage(analyser, val) {
				const bufferLength = analyser.frequencyBinCount;
				const dataArray = new Uint8Array(bufferLength);

				analyser.getByteFrequencyData(dataArray);

				let sum = 0;
				for (let i = 0; i < bufferLength; i++) {
					sum += dataArray[i];
				}

				const average = sum / bufferLength;
				let normalizedValue = average / 255;  // 0から1の範囲に正規化
				
				normalizedValue = normalizedValue * val;  //1～0が入っているはず
				
				//最後にコンフィグvolumeで補正する　ボリューム0.2くらいまではいい感じ
				const voVolume = vo.volume()
				normalizedValue = normalizedValue * (1 + Math.pow(1 - voVolume, 2));
				normalizedValue = Math.min(normalizedValue  * lipSyncData.micVolume, 1);  //micVolumeの値で補正
				
				//閾値以下なら0にする
				if (normalizedValue <= lipSyncData.micMinLevel) normalizedValue = 0

				return normalizedValue
			}
		},

		//エラー処理
		error: function (message) {
				const current_storage = TYRANO.kag.stat.current_scenario;
				const line = parseInt(TYRANO.kag.stat.current_line) + 1;
				const line_str = $.lang("line", { line });
				const error_str = `Error: ${current_storage}:${line_str}\n\n${message}`;
				console.error(error_str)
			if (TYRANO.kag.config["debugMenu.visible"] == "true") {
				$.error_message(error_str);
			}
		},

	}

})();
