(function(){
	//ティラノの既存機能拡張用

	if (TYRANO.kag.stat.mp.displayLoading && TYRANO.kag.stat.mp.displayLoading === "false" ) {
		VRoid.displayLoading = false
	} else {
		VRoid.displayLoading = true
	}

	//ロードゲーム拡張
	const _loadGameData = TYRANO.kag.menu.loadGameData;
	TYRANO.kag.menu.loadGameData = function(data, options) {

		if (VRoid.displayLoading) {
			//ゲームの解像度を取得
			const w = 10 + Number(TYRANO.kag.config.scWidth)
			const h = 10 + Number(TYRANO.kag.config.scHeight)

			//ロード用のマスクレイヤーを追加する
			$("#tyrano_base").append(
				"<div id='VRoid_loading_mask' " +

				"style='" +
					"animation-fill-mode: both; " +
					"animation-duration: 300ms; " +
					"z-index: 1000000000; " +
					"position: absolute; " +
					//ロード用の背景も設定できる
					//"background-image: url(\"./data/bgimage/rouka.jpg\"); " +
					"background-repeat: no-repeat; " +
					"background-position: 5px 5px; " +
					"background-color: rgb(0, 0, 0); " +
					"width: " + w + "px; " +
					"height: " + h + "px; " +
					"line-height: " + h + "px; " +
					"top: -5px; " +
					"left: -5px; " +
					"color: #fff; " +
					"font-size: 30px; " +
					"font-family: " + TYRANO.kag.config.userFace + ";" +
					"text-align: center; " +
					"backface-visibility: hidden; " +
				"'>" +
					"<div style='animation-name: fadeInDown; animation-fill-mode: both; animation-duration: 1000ms;'>　Loading...<div id='loading_circle'></div></div>" +
				"</div>"
			);
		}

		_loadGameData.apply(this, arguments);
		VRoid.three.statLoad(cb)
		
		//処理完了時にマスクをフェードアウトさせる。
		function cb() {
			if (VRoid.displayLoading) {
				setTimeout(function() {
					$("#VRoid_loading_mask").css("animation-name", "fadeOut").one('animationend', function() {
						$(this).remove();

						//サムネ用テンポラリの削除
						tmpRemove()
					});
				}, 100);
			} else {
				//サムネ用テンポラリの削除
				tmpRemove()
			}
		}

	};

	//セーブ時のスクリーンショット拡張
	const _snapSave = TYRANO.kag.menu.snapSave;
	TYRANO.kag.menu.snapSave = function(title, call_back, flag_thumb) {

		//preserveDrawingBufferを有効にしてサムネ用データの作成
		VRoid.three.preserveDrawingBuffer();

		if (typeof call_back === "function") {
			// callbackを拡張する
			const _call_back = function() {
				
				//サムネ用テンポラリの削除
				tmpRemove()

				const result = call_back.apply(this, arguments);
				return result;
			};
			
			_snapSave.call(this, title, _call_back, flag_thumb);
		} else {
			// call_backが関数でない場合はそのまま_snapSaveに処理を渡す
			_snapSave.apply(this, arguments);
		}
	};
	
	//サムネ用テンポラリの削除
	function tmpRemove(){
		const tmpCanvasLayer = document.getElementsByClassName("tmp_VRoid_preserveDrawingBuffer_class");
		const tmpCanvasLayerArr = Array.from(tmpCanvasLayer);

		tmpCanvasLayerArr.forEach(function(elem) {
			elem.parentNode.removeChild(elem);
		});
	
	}

	//ロード中のキーコンフィグを強制無効化
	const _doActionTag = TYRANO.kag.key_mouse.doActionTag
	TYRANO.kag.key_mouse.doActionTag = function(action_tag, event) {
		
		if (document.getElementById("VRoid_loading_mask")) {
			return false;
		}
		
		_doActionTag.apply(this, arguments);
	};
	
	//リップシンク実装
	const _play = TYRANO.kag.tag.playbgm.play;
	TYRANO.kag.tag.playbgm.play = async function(pm) {
		_play.apply(this, arguments);
		
		//リップシンク条件を満たしている場合実行
		if (this.kag.stat.VRoid && pm.lipSync !== "false" && pm.target === "se") {
			const saveModel = this.kag.stat.VRoid.model
			for (const modelID in saveModel) {
				if (saveModel[modelID].lipSync && saveModel[modelID].lipSync.isSync && saveModel[modelID].lipSync.buf === Number(pm.buf)) {
					this.kag.tmp.map_se[pm.buf].once("play", () => {
						VRoid.three.lipSync (pm, modelID, saveModel[modelID].lipSync)
					});
				}
			}
		}
	}

})();
