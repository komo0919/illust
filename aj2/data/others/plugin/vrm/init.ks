[iscript]
	if (TG.config.use3D !== "true") {
		console.log(TG.config.use3D)
		alert("VRoidプラグインを使用するには\n「data/system/Config.tjs」の\n「use3D」を「true」に設定してください。")
	}
[endscript]

[loadcss file="./data/others/plugin/vrm/js/loading.css"]
[loadjs storage="./plugin/vrm/js/three-vrm.min.js"]
[loadjs storage="./plugin/vrm/js/three-vrm-animation.min.js"]
[loadjs storage="./plugin/vrm/js/vroid.js"]
[loadjs storage="./plugin/vrm/js/vroid_maker.js"]
[loadjs storage="./plugin/vrm/js/vroid_tag.js"]
[loadjs storage="./plugin/vrm/js/ex_tyrano.js"]
[loadjs storage="./plugin/vrm/js/easing.js"]
[loadjs storage="./plugin/vrm/js/pose.js"]
[loadjs storage="./plugin/vrm/js/emotion.js"]
[loadjs storage="./plugin/vrm/js/mixamo/FBXLoader.js"]
[loadjs storage="./plugin/vrm/js/mixamo/loadMixamoAnimation.js"]
[loadjs storage="./plugin/vrm/js/mixamo/mixamoVRMRigMap.js"]
[loadjs storage="./plugin/vrm/js/mixamo/fflate.min.js"]

[return]
[s]
;==================================================================
;ティラノスクリプト向けVRoidプラグイン  Ver 1.3.0  2024/06/04
;
;   制作 （猫）milkcat
;     HP  https://milkcat.jp/
;Twitter  https://twitter.com/nekomilkcat
;==================================================================
