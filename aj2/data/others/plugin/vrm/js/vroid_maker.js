(function(){

	//表情作成用
	VRoid.three.emoMaker = function (modelID) {
		const vrm = this.model[modelID].vrm
		
		//お気に入りの保存領域を作成
		if (TYRANO.kag.variable.sf.__emoMaker === undefined) {
			TYRANO.kag.variable.sf.__emoMaker = {};
		}
		if (TYRANO.kag.variable.sf.__emoMaker[modelID] === undefined) {
			TYRANO.kag.variable.sf.__emoMaker[modelID] = {};
		}

		const fontColor = "font-weight: bold; color: #000; text-shadow:rgb(255, 255, 255) 0px 2px,rgb(255, 255, 255) 0px -2px,rgb(255, 255, 255) 1px 2px,rgb(255, 255, 255) 1px -2px,rgb(255, 255, 255) 2px 0px,rgb(255, 255, 255) 2px 1px,rgb(255, 255, 255) 2px 2px ,rgb(255, 255, 255) 2px -1px,rgb(255, 255, 255) 2px -2px,rgb(255, 255, 255) -1px 2px,rgb(255, 255, 255) -1px -2px,rgb(255, 255, 255) -2px 0px,rgb(255, 255, 255) -2px 1px,rgb(255, 255, 255) -2px 2px,rgb(255, 255, 255) -2px -1px,rgb(255, 255, 255) -2px -2px;"

		html = "<div id='emoMaker' style='font-size: 20px; overflow-x: hidden; position: absolute; z-index: 9000000001; top: 0; left: 0; width: 320px; height: calc(100% - 90px); background-color: rgba(255, 255, 255, 0.5); margin-top: 90px;'>" +
				"<br>" +
				"<div style='position: fixed; top: 0; left: 0; width: 285px; height: 78px; padding-right: 35px; padding-top: 10px; text-align: right; background-color: rgba(255, 255, 255, 0.5);'>" +
					"<button id='maker_reset' type='button'>リセット</button>　" +
					"<button id='maker_exit' type='button'>閉じる</button><br>" +
					"<button id='maker_import' type='button'>インポート</button>　" +
					"<button id='maker_export' type='button'>エクスポート</button>" +
				"</div>"

				//お気に入りにチェックの付いているやつが先
				let i = 0;
				let arr = []
				for (const key in vrm.expressionManager._expressionMap) {
					if (key == "lookUp" || key == "lookDown" || key == "lookLeft" || key == "lookRight") continue
					if (TYRANO.kag.variable.sf.__emoMaker[modelID]["maker_fav_" + i]) {
						arr[i] = key
						html += "<span id='maker_fav_" + i + "' class='maker_fav' style='cursor: pointer; display: inline-block; height: 1em; line-height: 1em; width: 1em; margin: 0 6px 0 10px; font-size: 24px; transform: translateY(-8px); color: yellow;'>★</span>"
							+ "<textarea readonly rows='1' style='white-space: nowrap; overflow: hidden; resize: none;width: 220px;padding: 5px 10px; font-size: 18px; margin-top: 20px; margin-left: 5px; background:rgba(0,0,0,0); border: 2px solid rgba(255,255,255,0.5); border-radius: 6px;" + fontColor +"'>" + key + "</textarea><br>"
							+ "<input id='maker_range_" + i + "' class='maker_range' type='range' value='0' min='0' max='1' step='0.01' style='cursor: pointer; margin-left: 40px;'><textarea readonly class='maker_textarea' id='maker_text_" + i + "' rows='1' style='resize: none;width: 50px;padding: 5px 10px; font-size: 18px; margin-left: 20px; background:rgba(0,0,0,0); border: 2px solid rgba(255,255,255,0.5); border-radius: 6px;" + fontColor + "'>0</textarea>"
							+ "<br>"
					}
					i++;
				}
				
				i = 0;
				for (const key in vrm.expressionManager._expressionMap) {
					if (key == "lookUp" || key == "lookDown" || key == "lookLeft" || key == "lookRight") continue
					if (!TYRANO.kag.variable.sf.__emoMaker[modelID]["maker_fav_" + i]) {
						arr[i] = key
						html += "<span id='maker_fav_" + i + "' class='maker_fav' style='cursor: pointer; display: inline-block; height: 1em; line-height: 1em; width: 1em; margin: 0 6px 0 10px; font-size: 24px; transform: translateY(-8px);'>☆</span>"
							+ "<textarea readonly rows='1' style='white-space: nowrap; overflow: hidden; resize: none;width: 220px;padding: 5px 10px; font-size: 18px; margin-top: 20px; margin-left: 5px; background:rgba(0,0,0,0); border: 2px solid rgba(255,255,255,0.5); border-radius: 6px;" + fontColor +"'>" + key + "</textarea><br>"
							+ "<input id='maker_range_" + i + "' class='maker_range' type='range' value='0' min='0' max='1' step='0.01' style='cursor: pointer; margin-left: 40px;'><textarea readonly class='maker_textarea' id='maker_text_" + i + "' rows='1' style='resize: none;width: 50px;padding: 5px 10px; font-size: 18px; margin-left: 20px; background:rgba(0,0,0,0); border: 2px solid rgba(255,255,255,0.5); border-radius: 6px;" + fontColor + "'>0</textarea>"
							+ "<br>"
					}
					i++;
				}
				

			html += "</div>"

		if (document.getElementById("emoMaker")) {
			document.getElementById("emoMaker").remove();
		}
		$("#tyrano_base").append(html);

		$("#emoMaker").on('touchmove wheel', (e) => {
			e.stopPropagation();
		});

		$("#maker_reset").on('click', function() {
			arr.forEach((data, i) => {
				$("#maker_range_" + i).val(0);
				$("#maker_text_" + i).html(0).css("background", "rgba(0,0,0,0)");
				vrm.expressionManager.setValue(data, 0);
			});
		});

		$("#maker_import").on('click', function() {
			//import処理

			const input = document.createElement("input");
			input.type = "file";
			 
			input.addEventListener("change", e => {

				var result = e.target.files[0];
				var reader = new FileReader();

				reader.readAsText(result);
				reader.addEventListener("load", () => {

					let json
					try{
						json = JSON.parse(reader.result);
					}catch(e){
						alert("インポートしたファイルの形式が不正です！")
						return
					}
					
					//一旦リセット
					$("#maker_reset").click()
					for (const key in json) {
						arr.forEach((data, i) => {
							if (data == key) {
								$("#maker_range_" + i).val(json[key]);
								$("#maker_text_" + i).html(json[key]);
								if (Number(json[key]) > 0) {
									$("#maker_text_" + i).css("background", "rgba(64,255,255,0.3)")
								} else {
									$("#maker_text_" + i).css("background", "rgba(0,0,0,0)")
								}

								vrm.expressionManager.setValue(key, json[key]);
							}
						});
					}

				});
			});
			 
			//ダイアログを表示
			input.click();

		});

		$("#maker_export").on('click', function() {
			//export処理

			const emoData = {}
			
			arr.forEach((data, i) => {
				const val = $("#maker_range_" + i).val();
				if (val > 0) {
					emoData[data] = Number(val)
				}
			});

			const json = JSON.stringify(emoData, null, 2);
			const link = document.createElement("a");
			link.href = "data:text/plain," + encodeURIComponent(json);
			link.download = "new_emo.json";
			 
			//ファイルを保存
			link.click();

		});

		$("#maker_exit").one('click', function() {
			if (document.getElementById("emoMaker")) {
				document.getElementById("emoMaker").remove();
			}
		});

		$(".maker_range").on('change input', function() {
			const val = $(this).val();
			const id = ($(this).attr('id')).replace("maker_range_", "");
			$("#maker_text_" + id).html(val);
			if (Number(val) > 0) {
				$("#maker_text_" + id).css("background", "rgba(64,255,255,0.3)")
			} else {
				$("#maker_text_" + id).css("background", "rgba(0,0,0,0)")
			}
			
			
			arr.forEach((data, i) => {
				const v = $("#maker_range_" + i).val();
				vrm.expressionManager.setValue(data, v);
			});
		});

		$(".maker_fav").on('click', function() {
			const val = $(this).text();
			if (val == "☆") {
				$(this).text("★").css("color", "yellow");
				TYRANO.kag.evalScript("sf.__emoMaker." + modelID + "." + $(this).attr('id') + " = true");
			} else {
				$(this).text("☆").css("color", "");
				TYRANO.kag.evalScript("sf.__emoMaker." + modelID + "." + $(this).attr('id') + " = false");
			}
		});

	}

})();
