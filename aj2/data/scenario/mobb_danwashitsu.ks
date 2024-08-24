[_tb_system_call storage=system/_mobb_danwashitsu.ks]

*danwashitsu

[stopbgm  time="1000"  ]
[tb_hide_message_window  ]
[mask  time="1000"  effect="fadeIn"  color="0x000000"  ]
[chara_hide_all  time="0"  wait="true"  ]
[wait  time="200"  ]
[playbgm  volume="30"  time="1000"  loop="true"  storage="MusMus-BGM-125.mp3"  ]
[bg  time="500"  method="crossfade"  storage="danwashitsu.png"  ]
[mask_off  time="1000"  effect="fadeOut"  ]
[chara_show  name="アズール"  time="100"  wait="true"  left="124"  top="51"  width="350"  height="600"  reflect="false"  storage="chara/1/az3.png"  ]
[chara_show  name="モブ寮生B"  time="100"  wait="false"  storage="chara/9/mobb.png"  width="328"  height="613"  left="475"  top="55"  reflect="false"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
#アズール
ハーツラビュル寮生がオクタヴィネル寮内で逃げ回るなんて許しませんよ。[p]
#モブ寮生
海だからこれ以上逃げ場がない！！[p]
[_tb_end_text]

[chara_mod  name="アズール"  time="300"  cross="false"  storage="chara/1/az2.png"  ]
[tb_start_text mode=1 ]
#アズール
いい機会なので寮生への見せしめにしてやりましょう。[p]
#オクタ寮生
（ひっ！）[p]
[_tb_end_text]

[chara_hide_all  time="300"  wait="true"  ]
[jump  storage="vs_mobb.ks"  target="*mobb"  ]
*mobb_nakayoshi

[tb_start_text mode=1 ]
#モブ寮生
りょ、寮長にはこのことは秘密に……！！[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#アズール
もちろん引き渡しますよ……ふふふ。リドルさんに一つ貸しですね。[p]
[_tb_end_text]

[chara_mod  name="ジェイド"  time="600"  cross="true"  storage="chara/2/j9.png"  ]
[tb_start_text mode=1 ]
#ジェイド
楽しいことが起きそうな予感がして、ワクワクしますね。[p]
[_tb_end_text]

[mask  time="1000"  effect="fadeIn"  color="0x000000"  ]
[hidemenubutton]

[tb_hide_message_window  ]
[tb_eval  exp="sf.flag2=1"  name="flag2"  cmd="="  op="t"  val="1"  val_2="undefined"  ]
[bg  time="1000"  method="crossfade"  storage="black.png"  ]
[chara_hide_all  time="1000"  wait="true"  ]
[mask_off  time="1000"  effect="fadeOut"  ]
[jump  storage="mostro.ks"  target="*start"  ]
