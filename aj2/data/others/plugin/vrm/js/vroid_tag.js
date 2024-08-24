(function(){
	//VRoid用タグ
	
	//VRoid表示用のレイヤー作成
	//[VRoid_new layerID="VRoid"]
	TYRANO.kag.ftag.master_tag.VRoid_new = {
		vital: ["layerID"],
		pm: {
			layer: "0",
			name: "",
			zindex: "10",
			visible: "true",
			antialias: "auto",
			light: "directional",
			limitFPS: "auto",
		},

		start: function(pm) {
			//"false"を明示的に渡される以外はtrueを設定する。
			pm.visible = pm.visible !== "false";

			if (pm.antialias == "auto") {
				//"auto"はPCの場合true それ以外はfalseに設定する
				pm.antialias = $.userenv() == 'pc';
			} else {
				//"false"を明示的に渡される以外はtrueを設定する。
				pm.antialias = pm.antialias !== "false";
			}
			
			if (pm.limitFPS == "auto") {
				//"auto"はPCの場合false それ以外はtrueに設定する(antialiasと逆)
				pm.limitFPS = $.userenv() != 'pc';
			} else {
				//"false"を明示的に渡される以外はtrueを設定する。
				pm.limitFPS = pm.limitFPS !== "false";
			}

			VRoid.three.create(pm.layerID, pm.layer, pm.name, pm.zindex, pm.visible, pm.antialias, pm.light, pm.limitFPS)
			this.kag.ftag.nextOrder();
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_new.kag = TYRANO.kag;

	TYRANO.kag.ftag.master_tag.VRoid_light = {
		vital: ["layerID"],
		pm: {
			r: undefined,
			g: undefined,
			b: undefined,
			x: undefined,
			y: undefined,
			z: undefined,
			val: undefined,
			easing: "default",
			time: "0",
			wait: "true",
			skip: "false",
		},

		start: function(pm) {
			//"false"を明示的に渡される以外はtrueを設定する。
			pm.wait = pm.wait !== "false";

			//"true"を明示的に渡される以外はfalseを設定する。
			pm.skip = pm.skip === "true";

			//skip時はtimeを0に変更する
			if (this.kag.stat.is_skip && pm.skip) {pm.time = 0;}

			VRoid.three.light(pm.layerID, pm.r, pm.g, pm.b, pm.x, pm.y, pm.z, pm.val, pm.easing, Number(pm.time), pm.wait, pm.skip, cb)

			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_light.kag = TYRANO.kag;


	//VRoid表示用のレイヤーの表示
	//[VRoid_layer_show layerID="VRoid"]
	TYRANO.kag.ftag.master_tag.VRoid_layer_show = {
		vital: ["layerID"],
		pm: {
			method: "fadeIn",
			time: "0",
			wait: "true",
			skip: "false",
		},

		start: function(pm) {
			//"false"を明示的に渡される以外はtrueを設定する。
			pm.wait = pm.wait !== "false";

			//"true"を明示的に渡される以外はfalseを設定する。
			pm.skip = pm.skip === "true";

			//skip時はtimeを0に変更する
			if (this.kag.stat.is_skip && pm.skip) {pm.time = 0;}

			VRoid.three.layerAnime(pm.layerID, pm.method, Number(pm.time), pm.wait, "", cb)

			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_layer_show.kag = TYRANO.kag;

	//VRoid表示用のレイヤーの非表示
	//[VRoid_layer_hide layerID="VRoid"]
	TYRANO.kag.ftag.master_tag.VRoid_layer_hide = {
		vital: ["layerID"],
		pm: {
			method: "fadeOut",
			time: "0",
			wait: "true",
			skip: "false",
		},

		start: function(pm) {
			//"false"を明示的に渡される以外はtrueを設定する。
			pm.wait = pm.wait !== "false";

			//"true"を明示的に渡される以外はfalseを設定する。
			pm.skip = pm.skip === "true";

			//skip時はtimeを0に変更する
			if (this.kag.stat.is_skip && pm.skip) {pm.time = 0;}

			VRoid.three.layerAnime(pm.layerID, pm.method, Number(pm.time), pm.wait, "none", cb)

			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_layer_hide.kag = TYRANO.kag;

	//VRoid表示用のレイヤーの破棄
	//[VRoid_dispose layerID="VRoid"]
	TYRANO.kag.ftag.master_tag.VRoid_dispose = {
		vital: ["layerID"],
		pm: {
		},

		start: function(pm) {
			VRoid.three.dispose(pm.layerID)
			this.kag.ftag.nextOrder();
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_dispose.kag = TYRANO.kag;

	//表情データのインポート ファイル名がnameになる
	//[VRoid_import_emotion storage="sample.json"]
	TYRANO.kag.ftag.master_tag.VRoid_import_emotion = {
		vital: ["storage"],
		pm: {
		},

		start: function(pm) {
			VRoid.three.import(pm.storage, cb, "_emotion")

			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_import_emotion.kag = TYRANO.kag;

	//ポーズデータのインポート ファイル名がnameになる
	//[VRoid_import_pose storage="usamimi.json"]
	TYRANO.kag.ftag.master_tag.VRoid_import_pose = {
		vital: ["storage"],
		pm: {
		},

		start: function(pm) {
			VRoid.three.import(pm.storage, cb, "_pose")

			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_import_pose.kag = TYRANO.kag;

	//レイヤーのキャプチャ rateがでかいときはtimeout増やした方がいいかも
	//[VRoid_capture layerID="VRoid" rate=3]
	TYRANO.kag.ftag.master_tag.VRoid_capture = {
		vital: ["layerID"],
		pm: {
			rate: "1",
			timeout: "500",
		},

		start: function(pm) {
			VRoid.three.capture(pm.layerID, pm.rate, pm.timeout)
			this.kag.ftag.nextOrder();
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_capture.kag = TYRANO.kag;

	//カメラを移動させる
	//[VRoid_camera_position layerID="VRoid" z=-0.5 easing="easeOutBack" time=1000]
	TYRANO.kag.ftag.master_tag.VRoid_camera_position = {
		vital: ["layerID"],
		pm: {
			x: null,
			y: null,
			z: null,
			time: "0",
			easing: "default",
			wait: "true",
			skip: "false",
		},

		start: function(pm) {
		
			//"false"を明示的に渡される以外はtrueを設定する。
			pm.wait = pm.wait !== "false";

			//"true"を明示的に渡される以外はfalseを設定する。
			pm.skip = pm.skip === "true";

			//skip時はtimeを0に変更する
			if (this.kag.stat.is_skip && pm.skip) {pm.time = 0;}

			VRoid.three.move(pm.layerID, pm.x, pm.y, pm.z, Number(pm.time), pm.easing, cb, pm.wait, pm.skip, "position", "camera")

			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_camera_position.kag = TYRANO.kag;


	//カメラを回転させる
	//[VRoid_camera_rotation layerID="VRoid" z=-0.5 easing="easeOutBack" time=1000]
	TYRANO.kag.ftag.master_tag.VRoid_camera_rotation = {
		vital: ["layerID"],
		pm: {
			x: null,
			y: null,
			z: null,
			time: "0",
			easing: "default",
			wait: "true",
			skip: "false",
		},

		start: function(pm) {
			if (pm.x == "default") { pm.x = 0 }
			if (pm.y == "default") { pm.y = Math.PI }
			if (pm.z == "default") { pm.z = 0 }
		
			//"false"を明示的に渡される以外はtrueを設定する。
			pm.wait = pm.wait !== "false";

			//"true"を明示的に渡される以外はfalseを設定する。
			pm.skip = pm.skip === "true";

			//skip時はtimeを0に変更する
			if (this.kag.stat.is_skip && pm.skip) {pm.time = 0;}

			VRoid.three.move(pm.layerID, pm.x, pm.y, pm.z, Number(pm.time), pm.easing, cb, pm.wait, pm.skip, "rotation", "camera")

			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_camera_rotation.kag = TYRANO.kag;

	//テストカメラを起動する modelIDを指定した場合はposeのテストも可能
	//VRoid_emo_makerとの同時起動も可能。VRoid_emo_makerはシナリオ非同期、VRoid_camera_testはシナリオ同期なので
	//VRoid_emo_makerを先に起動させている必要あり。
	//[VRoid_camera_test layerID="VRoid" modelID="model1"]
	TYRANO.kag.ftag.master_tag.VRoid_camera_test = {
		vital: ["layerID"],
		pm: {
			modelID: "",
		},

		start: function(pm) {

			VRoid.three.testCamera(pm.layerID, pm.modelID, cb)

			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_camera_test.kag = TYRANO.kag;


	//モデルのロード
	//[VRoid_load modelID="model1" storage="AliciaSolid.vrm"]
	TYRANO.kag.ftag.master_tag.VRoid_load = {
		vital: ["modelID", "storage"],
		pm: {
			wait: "true",
			maker: "false",
		},

		start: function(pm) {
			const storage = "./data/others/plugin/vrm/model/" + pm.storage

			//"false"を明示的に渡される以外はtrueを設定する。
			pm.wait = pm.wait !== "false";

			//"true"を明示的に渡される以外はfalseを設定する。
			pm.maker = pm.maker === "true";

			VRoid.three.load(pm.modelID, storage, cb, pm.wait, pm.maker)
			
			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_load.kag = TYRANO.kag;

	//emoMakerの表示
	//[VRoid_emo_maker modelID="model1"]
	TYRANO.kag.ftag.master_tag.VRoid_emo_maker = {
		vital: ["modelID"],
		pm: {
		},

		start: function(pm) {

			VRoid.three.emoMaker(pm.modelID)
			this.kag.ftag.nextOrder();

		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_emo_maker.kag = TYRANO.kag;

	//モデルをレイヤーに追加
	//[VRoid_add layerID="VRoid" modelID="model1" pose="pose3" shake=false]
	TYRANO.kag.ftag.master_tag.VRoid_add = {
		vital: ["layerID", "modelID"],
		pm: {
			pose: "default",
			visible: "true",
			x: null,
			y: null,
			z: null,
			rotx: null,
			roty: null,
			rotz: null,
			firstShake: "false",
			lookingCamera: null,			//false
			waitingAnimation: null,			//true
			shake: null,					//true
			waitingAnimationVal: null,		//15
			shakeSpeed: null,				//1
			waitingAnimationSpeed: null,	//1
		},

		start: function(pm) {
			//"false"を明示的に渡される以外はtrueを設定する。
			pm.visible = pm.visible !== "false";

			//"true"を明示的に渡される以外はfalseを設定する。
			pm.firstShake = pm.firstShake === "true";


			//"true"を明示的に渡される以外はfalseを設定する。
			if (pm.lookingCamera !== null) {
				pm.lookingCamera = pm.lookingCamera === "true";
			}

			//"false"を明示的に渡される以外はtrueを設定する。
			if (pm.waitingAnimation !== null) {
				pm.waitingAnimation = pm.waitingAnimation !== "false";
			}

			//"false"を明示的に渡される以外はtrueを設定する。
			if (pm.shake !== null) {
				pm.shake = pm.shake !== "false";
			}

			if (pm.waitingAnimationVal !== null) {
				//数字に型変換
				pm.waitingAnimationVal = Number(pm.waitingAnimationVal);
			}

			if (pm.shakeSpeed !== null) {
				//数字に型変換
				pm.shakeSpeed = Number(pm.shakeSpeed);
			}

			if (pm.waitingAnimationSpeed !== null) {
				//数字に型変換
				pm.waitingAnimationSpeed = Number(pm.waitingAnimationSpeed);
			}

			VRoid.three.add(pm.layerID, pm.modelID, pm.pose, pm.visible, pm.lookingCamera, pm.waitingAnimation, pm.shake, pm.x, pm.y, pm.z, pm.firstShake, pm.waitingAnimationVal, pm.shakeSpeed, pm.waitingAnimationSpeed, pm.rotx, pm.roty, pm.rotz)

			//最初のrequestAnimationFrameのタイミングで表示される。
			requestAnimationFrame(cb)

			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_add.kag = TYRANO.kag;

	//モデルをレイヤーから削除
	//[VRoid_delete modelID="model1"]
	TYRANO.kag.ftag.master_tag.VRoid_delete = {
		vital: ["modelID"],
		pm: {
		},

		start: function(pm) {
			VRoid.three.delete(pm.modelID)
			this.kag.ftag.nextOrder();
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_delete.kag = TYRANO.kag;

	//モデルに風をあてる
	//[VRoid_wind modelID="model1"]
	TYRANO.kag.ftag.master_tag.VRoid_wind = {
		vital: ["modelID"],
		pm: {
		},

		start: function(pm) {

			VRoid.three.wind(pm.modelID, pm.val, pm.speed, pm.x, pm.y, pm.z)
			this.kag.ftag.nextOrder();

		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_wind.kag = TYRANO.kag;


	//風をとめる
	//[VRoid_stop_wind modelID="model1"]
	TYRANO.kag.ftag.master_tag.VRoid_stop_wind = {
		vital: ["modelID"],
		pm: {
		},

		start: function(pm) {

			VRoid.three.stopWind(pm.modelID)
			this.kag.ftag.nextOrder();

		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_stop_wind.kag = TYRANO.kag;


	//モデルの状態を変更する
	//[VRoid_model_config modelID="model1"]
	TYRANO.kag.ftag.master_tag.VRoid_model_config = {
		vital: ["modelID"],
		pm: {
			lookingCamera: null,
			waitingAnimation: null,
			shake: null,
			waitingAnimationVal: null,
			shakeSpeed: null,
			waitingAnimationSpeed: null,
		},

		start: function(pm) {
			if (pm.lookingCamera !== null) {
				//"true"を明示的に渡される以外はfalseを設定する。
				pm.lookingCamera = pm.lookingCamera === "true";
			}

			if (pm.waitingAnimation !== null) {
				//"false"を明示的に渡される以外はtrueを設定する。
				pm.waitingAnimation = pm.waitingAnimation !== "false";
			}

			if (pm.shake !== null) {
				//"false"を明示的に渡される以外はtrueを設定する。
				pm.shake = pm.shake !== "false";
			}

			if (pm.waitingAnimationVal !== null) {
				//数字に型変換
				pm.waitingAnimationVal = Number(pm.waitingAnimationVal);
			}

			if (pm.shakeSpeed !== null) {
				//数字に型変換
				pm.shakeSpeed = Number(pm.shakeSpeed);
			}

			if (pm.waitingAnimationSpeed !== null) {
				//数字に型変換
				pm.waitingAnimationSpeed = Number(pm.waitingAnimationSpeed);
			}

			VRoid.three.modelConfig(pm.modelID, pm.lookingCamera, pm.shake, pm.shakeSpeed, pm.waitingAnimation, pm.waitingAnimationVal, pm.waitingAnimationSpeed)
			this.kag.ftag.nextOrder();
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_model_config.kag = TYRANO.kag;

	//モデルの表示状態を表示にする
	//pm用意してるけど瞬間表示以外できない
	//[VRoid_show modelID="model1"]
	TYRANO.kag.ftag.master_tag.VRoid_show = {
		vital: ["modelID"],
		pm: {
			time: "0",
			easing: "default",
			wait: "true",
			skip: "false",
		},

		start: function(pm) {
			//"false"を明示的に渡される以外はtrueを設定する。
			pm.wait = pm.wait !== "false";

			//"true"を明示的に渡される以外はfalseを設定する。
			pm.skip = pm.skip === "true";
			
			//skip時はtimeを0に変更する
			if (this.kag.stat.is_skip && pm.skip) {pm.time = 0;}

			VRoid.three.show(pm.modelID, Number(pm.time), pm.easing, cb, pm.wait)

			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_show.kag = TYRANO.kag;

	//モデルの表示状態を非表示にする
	//pm用意してるけど瞬間表示以外できない
	//[VRoid_hide modelID="model1"]
	TYRANO.kag.ftag.master_tag.VRoid_hide = {
		vital: ["modelID"],
		pm: {
			time: "0",
			easing: "default",
			wait: "true",
			skip: "false",
		},

		start: function(pm) {
			//"false"を明示的に渡される以外はtrueを設定する。
			pm.wait = pm.wait !== "false";

			//"true"を明示的に渡される以外はfalseを設定する。
			pm.skip = pm.skip === "true";

			//skip時はtimeを0に変更する
			if (this.kag.stat.is_skip && pm.skip) {pm.time = 0;}

			VRoid.three.hide(pm.modelID, Number(pm.time), pm.easing, cb, pm.wait)

			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_hide.kag = TYRANO.kag;


	//モデルのポーズを変更する
	//表情も同時に変更できる
	//[VRoid_pose modelID="model1" pose="pose1"]
	TYRANO.kag.ftag.master_tag.VRoid_pose = {
		vital: ["modelID"],
		pm: {
			pose: "default",
			emo: null,
			emoID: "",
			emoval: "100",
			emo_diff: "false",
			time: "0",
			easing: "default",
			wait: "true",
			skip: "false",
		},

		start: function(pm) {
			//"false"を明示的に渡される以外はtrueを設定する。
			pm.wait = pm.wait !== "false";

			//"true"を明示的に渡される以外はfalseを設定する。
			pm.skip = pm.skip === "true";

			//skip時はtimeを10に変更する
			if (this.kag.stat.is_skip && pm.skip) {pm.time = 10;}

			//emoかemoIDが指定されていたら表情も同時に変更する
			if (pm.emo || pm.emoID) {

				//"true"を明示的に渡される以外はfalseを設定する。
				pm.emo_diff = pm.emo_diff === "true";

				VRoid.three.emotion(pm.modelID, pm.emo, Number(pm.time), pm.easing, null, pm.wait, pm.skip, pm.emo_diff, pm.emoID, pm.emoval)
			}

			VRoid.three.pose(pm.modelID, pm.pose, Number(pm.time), pm.easing, cb, pm.wait, pm.skip)

			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_pose.kag = TYRANO.kag;

	//VRMAをインポートする
	//[VRoid_import_VRMA storage="VRMA_01.vrma, VRMA_02.vrma"]
	TYRANO.kag.ftag.master_tag.VRoid_import_VRMA = {
		vital: ["storage"],
		pm: {
			wait: "true",
		},

		start: function(pm) {
			//"false"を明示的に渡される以外はtrueを設定する。
			pm.wait = pm.wait !== "false";

			VRoid.three.importVRMA(pm.storage, pm.wait, cb)

			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_import_VRMA.kag = TYRANO.kag;

	//VRMAを再生する
	//[VRoid_animation modelID="model1" name="VRMA_01"]
	TYRANO.kag.ftag.master_tag.VRoid_animation = {
		vital: ["modelID", "name"],
		pm: {
			rate: "1",
			loop: "1",	//実質false
			fadeIn: "0",
			fadeOut: "0",
			wait: "true",
			skip: "false",
		},

		start: function(pm) {
			//"false"を明示的に渡される以外はtrueを設定する。
			pm.wait = pm.wait !== "false";

			//"true"を明示的に渡される以外はfalseを設定する。
			pm.skip = pm.skip === "true";
			
			//loopにtrueとfalseを渡したときの処理
			if (pm.loop === "true") pm.loop = 0
			if (pm.loop === "false") pm.loop = 1

			VRoid.three.animation(pm.modelID, pm.name, Number(pm.rate), Number(pm.loop), Number(pm.fadeIn), Number(pm.fadeOut), pm.wait, pm.skip, cb)

			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_animation.kag = TYRANO.kag;

	//loop中のVRoid_actionや、wait=falseで処理中の再生を停止する
	//[VRoid_stop_animation modelID="model1" fadeOut=1000]
	TYRANO.kag.ftag.master_tag.VRoid_stop_animation = {
		vital: ["modelID"],
		pm: {
			fadeOut: "0",
			wait: "true",
			skip: "false",
		},

		start: function(pm) {
			//"false"を明示的に渡される以外はtrueを設定する。
			pm.wait = pm.wait !== "false";

			//"true"を明示的に渡される以外はfalseを設定する。
			pm.skip = pm.skip === "true";

			VRoid.three.stop_action(pm.modelID, Number(pm.fadeOut), pm.wait, pm.skip, cb)

			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_stop_animation.kag = TYRANO.kag;


	//FBXファイルを再生する
	//[VRoid_action modelID="model1" storage="sample.fbx"]
	TYRANO.kag.ftag.master_tag.VRoid_action = {
		vital: ["modelID", "storage"],
		pm: {
			rate: "1",
			loop: "1",	//実質false
			fadeIn: "0",
			fadeOut: "0",
			wait: "true",
			skip: "false",
		},

		start: function(pm) {
			//"false"を明示的に渡される以外はtrueを設定する。
			pm.wait = pm.wait !== "false";

			//"true"を明示的に渡される以外はfalseを設定する。
			pm.skip = pm.skip === "true";
			
			//loopにtrueとfalseを渡したときの処理
			if (pm.loop === "true") pm.loop = 0
			if (pm.loop === "false") pm.loop = 1

			VRoid.three.action(pm.modelID, pm.storage, Number(pm.rate), Number(pm.loop), Number(pm.fadeIn), Number(pm.fadeOut), pm.wait, pm.skip, cb)

			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_action.kag = TYRANO.kag;

	//loop中のVRoid_actionや、wait=falseで処理中の再生を停止する
	//[VRoid_stop_action modelID="model1" fadeOut=1000]
	TYRANO.kag.ftag.master_tag.VRoid_stop_action = {
		vital: ["modelID"],
		pm: {
			fadeOut: "0",
			wait: "true",
			skip: "false",
		},

		start: function(pm) {
			//"false"を明示的に渡される以外はtrueを設定する。
			pm.wait = pm.wait !== "false";

			//"true"を明示的に渡される以外はfalseを設定する。
			pm.skip = pm.skip === "true";

			VRoid.three.stop_action(pm.modelID, Number(pm.fadeOut), pm.wait, pm.skip, cb)

			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_stop_action.kag = TYRANO.kag;

	//モデルの表情を変更する
	//[VRoid_emo modelID="model1" name="happy"]
	TYRANO.kag.ftag.master_tag.VRoid_emo = {
		vital: ["modelID"],
		pm: {
			emo: "default",
			emoID: "",
			emoval: "1",
			time: "0",
			easing: "default",
			wait: "true",
			skip: "false",
			diff: "false",
		},

		start: function(pm) {
			//"false"を明示的に渡される以外はtrueを設定する。
			pm.wait = pm.wait !== "false";

			//"true"を明示的に渡される以外はfalseを設定する。
			pm.skip = pm.skip === "true";

			//"true"を明示的に渡される以外はfalseを設定する。
			pm.diff = pm.diff === "true";

			//skip時はtimeを0に変更する
			if (this.kag.stat.is_skip && pm.skip) {pm.time = 0;}

			VRoid.three.emotion(pm.modelID, pm.emo, Number(pm.time), pm.easing, cb, pm.wait, pm.skip, pm.diff, pm.emoID, pm.emoval)

			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_emo.kag = TYRANO.kag;

	//モデルを移動させる
	//[VRoid_position modelID="model1" z=-0.5 easing="easeOutBack" time=1000]
	TYRANO.kag.ftag.master_tag.VRoid_position = {
		vital: ["modelID"],
		pm: {
			x: null,
			y: null,
			z: null,
			time: "0",
			easing: "default",
			wait: "true",
			skip: "false",
		},

		start: function(pm) {
			//"false"を明示的に渡される以外はtrueを設定する。
			pm.wait = pm.wait !== "false";

			//"true"を明示的に渡される以外はfalseを設定する。
			pm.skip = pm.skip === "true";

			//skip時はtimeを0に変更する
			if (this.kag.stat.is_skip && pm.skip) {pm.time = 0;}

			VRoid.three.move(pm.modelID, pm.x, pm.y, pm.z, Number(pm.time), pm.easing, cb, pm.wait, pm.skip, "position")

			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_position.kag = TYRANO.kag;

	//モデルを回転させる
	//[VRoid_rotation modelID="model1" z=-0.5 easing="easeOutBack" time=1000]
	TYRANO.kag.ftag.master_tag.VRoid_rotation = {
		vital: ["modelID"],
		pm: {
			x: null,
			y: null,
			z: null,
			time: "0",
			easing: "default",
			wait: "true",
			skip: "false",
		},

		start: function(pm) {
			//"false"を明示的に渡される以外はtrueを設定する。
			pm.wait = pm.wait !== "false";

			//"true"を明示的に渡される以外はfalseを設定する。
			pm.skip = pm.skip === "true";

			//skip時はtimeを0に変更する
			if (this.kag.stat.is_skip && pm.skip) {pm.time = 0;}

			VRoid.three.move(pm.modelID, pm.x, pm.y, pm.z, Number(pm.time), pm.easing, cb, pm.wait, pm.skip, "rotation")

			//callback用のnextOrderを用意する
			function cb() {
				TYRANO.kag.ftag.nextOrder();
			}
		}
	};

	TYRANO.kag.ftag.master_tag.VRoid_rotation.kag = TYRANO.kag;

	TYRANO.kag.ftag.master_tag.VRoid_lip_config = {
		vital: ["modelID"],
		pm: {
		},

		start: function(pm) {
			if (this.kag.stat.VRoid.model[pm.modelID].lipSync){
				const lipSync = this.kag.stat.VRoid.model[pm.modelID].lipSync
				
				if (pm.isSync !== undefined) lipSync.isSync = pm.isSync === "true"

				if (pm.buf !== undefined) {
					if (isNaN(pm.buf)) {
						if (pm.buf == "null") lipSync.buf = null
					} else {
						lipSync.buf = Number(pm.buf)
					}
				}
				
				//入力感度
				if (pm.micVolume !== undefined) lipSync.micVolume = Number(pm.micVolume)

				//入力閾値
				if (pm.micMinLevel !== undefined) lipSync.micMinLevel = Number(pm.micMinLevel)

				//既存表情データのミックス値
				if (pm.micMix !== undefined) lipSync.micMix = Number(pm.micMix)

				//口パクから元に戻る時間
				if (pm.fadeOut !== undefined) lipSync.fadeOut = Number(pm.fadeOut)

				//カンマ区切りで前後をトリムして無効リストに入れる配列を挿入
				if (pm.invalidList !== undefined) lipSync.invalidList = pm.invalidList.split(',').map(s => s.trim());

				if (pm.aa !== undefined) lipSync.lipData.aa = Math.max(0, Math.min(1, Number(pm.aa)));
				if (pm.ih !== undefined) lipSync.lipData.ih = Math.max(0, Math.min(1, Number(pm.ih)));
				if (pm.ou !== undefined) lipSync.lipData.ou = Math.max(0, Math.min(1, Number(pm.ou)));
				if (pm.ee !== undefined) lipSync.lipData.ee = Math.max(0, Math.min(1, Number(pm.ee)));
				if (pm.oh !== undefined) lipSync.lipData.oh = Math.max(0, Math.min(1, Number(pm.oh)));
			}

			this.kag.ftag.nextOrder();
		},
		
		kag: TYRANO.kag
	};

})();

/*
	TYRANO.kag.ftag.master_tag.VRoid = {
		vital: ["name"],
		pm: {
			parameter: "",
		},

		start: function(pm) {
			this.kag.ftag.nextOrder();
		},
		
		kag: TYRANO.kag
	};
*/
