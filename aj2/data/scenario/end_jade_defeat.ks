[_tb_system_call storage=system/_end_jade_defeat.ks]

*end_jade_defeat

[stopbgm  time="1000"  ]
[mask  time="1000"  effect="fadeIn"  color="0x000000"  ]
[chara_hide_all  time="1000"  wait="true"  ]
[playbgm  volume="100"  time="1000"  loop="true"  storage="MusMus-BGM-173.mp3"  ]
[mask_off  time="1000"  effect="fadeOut"  ]
[bg  time="300"  method="crossfade"  storage="lounge.png"  ]
[chara_show  name="アズール"  time="300"  wait="false"  storage="chara/1/az3.png"  width="350"  height="600"  left="117"  top="86"  reflect="false"  ]
[chara_show  name="ジェイド"  time="300"  wait="true"  storage="chara/2/ja1.png"  width="240"  height="600"  left="592"  top="72"  reflect="false"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
#アズール
なっ……！[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#ジェイド
この程度で僕が動揺するとでも思ったんですか？[p]
アズールの舌先三寸なら見慣れております。[p]
[_tb_end_text]

[chara_mod  name="ジェイド"  time="600"  cross="true"  storage="chara/2/ja4.png"  ]
[tb_start_text mode=1 ]
#ジェイド
さあ、僕の願いを叶えていただくお時間です。[p]
[_tb_end_text]

[chara_hide_all  time="300"  wait="true"  ]
[bg  time="1000"  method="fadeIn"  storage="C_END_mashroom_1.png"  ]
[tb_cg  id="mashroom_end"  ]
[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/ja3.png"  ]
[tb_start_text mode=1 ]
#ジェイド
たくさんありますから食べてください。[p]
マッシュルームにアワビ茸、はなびらたけ、ツキヨタケ……定番どころから珍しいキノコまでよりどりみどりですよ。[p]
僕が満足するまで、じっくり味わってくださいね。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#フロイド
なんでオレまで！[p]
[_tb_end_text]

[bg  time="1000"  method="fadeIn"  storage="C_END_mashroom_2.png"  ]
[tb_start_text mode=1 ]
#ジェイド
毒を持つキノコは、しっかりと解毒して調理しておりますのでご安心くださいね。[p]
もしかしたら運悪く当たってしまうかもしれませんが……。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#アズール
くっ！キノコが次から次へと湧いてくる！もうこりごりだ！[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#
おわり（キノコフルコースEND）[p]
[_tb_end_text]

[tb_hide_message_window  ]
[mask  time="1000"  effect="fadeIn"  color="0x000000"  ]
[bg  time="300"  method="crossfade"  storage="black.png"  ]
[mask_off  time="1000"  effect="fadeOut"  ]
[tb_image_hide  time="300"  ]
[jump  storage="title_screen.ks"  target=""  ]
