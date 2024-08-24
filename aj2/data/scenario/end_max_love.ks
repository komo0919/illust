[_tb_system_call storage=system/_end_max_love.ks]

*max_love_end

[stopbgm  time="1000"  ]
[mask  time="1000"  effect="fadeIn"  color="0x000000"  ]
[chara_hide_all  time="1000"  wait="true"  ]
[playbgm  volume="100"  time="1000"  loop="true"  storage="MusMus-BGM-092.mp3"  ]
[mask_off  time="1000"  effect="fadeOut"  ]
[bg  time="300"  method="crossfade"  storage="lounge.png"  ]
[chara_show  name="アズール"  time="300"  wait="false"  storage="chara/1/az2.png"  width="350"  height="600"  left="117"  top="70"  reflect="false"  ]
[chara_show  name="ジェイド"  time="300"  wait="true"  storage="chara/2/ja3.png"  width="240"  height="600"  left="592"  top="60"  reflect="false"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
#アズール
さぁ、ジェイド。ご満足いただけましたか？[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#ジェイド
好意を伝えるなんて、まったく悪趣味極まりない支配人ですね……。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#アズール
ふふ、良かったでしょう。[p]
[_tb_end_text]

[chara_mod  name="アズール"  time="300"  cross="false"  storage="chara/1/az1.png"  ]
[tb_start_text mode=1 ]
#アズール
まだ続けたいならいくらでも相手をしましょう。[p]
ジェイドが恥ずかしがるまで夜通し囁いても構いません。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#ジェイド
真っ赤になるのは蛸だけで十分ですよ。[p]
[_tb_end_text]

[chara_mod  name="アズール"  time="600"  cross="true"  storage="chara/1/az3.png"  ]
[tb_start_text mode=1 ]
#アズール
ああもう！まだ減らず口を言えるのか！[p]
[_tb_end_text]

[chara_hide_all  time="300"  wait="true"  ]
[bg  time="1000"  method="fadeIn"  storage="B_END_kiss.png"  ]
[tb_cg  id="max_love_end"  ]
[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/ja3.png"  ]
[tb_start_text mode=1 ]
#ジェイド
んっ！？[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#アズール
どうしても口から漏れるのであれば塞いでやればいいだけです！[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#ジェイド
……ずいぶん真っ赤な蛸ですね…。僕もでしょうか。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#
おわり（MAXイチャイチャEND）[p]
[_tb_end_text]

[tb_hide_message_window  ]
[mask  time="1000"  effect="fadeIn"  color="0x000000"  ]
[bg  time="300"  method="crossfade"  storage="black.png"  ]
[mask_off  time="1000"  effect="fadeOut"  ]
[bg  time="1000"  method="crossfade"  storage="end.png"  ]
[l  ]
[tb_image_hide  time="300"  ]
[jump  storage="title_screen.ks"  target=""  ]
