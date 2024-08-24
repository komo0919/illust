[_tb_system_call storage=system/_mobc_koushaura.ks]

*koushaura

[tb_hide_message_window  ]
[mask  time="1000"  effect="fadeIn"  color="0x000000"  ]
[chara_hide_all  time="0"  wait="true"  ]
[wait  time="200"  ]
[playbgm  volume="20"  time="1000"  loop="true"  storage="MusMus-BGM-125.mp3"  ]
[bg  time="1000"  method="crossfade"  storage="BG02a_80.jpg"  ]
[mask_off  time="1000"  effect="fadeOut"  ]
[chara_show  name="アズール"  time="100"  wait="true"  left="110"  top="70"  width="350"  height="600"  reflect="false"  storage="chara/1/az1.png"  ]
[chara_show  name="モブ寮生C"  time="100"  wait="false"  storage="chara/10/mobc.png"  width="336"  height="624"  left="490"  top="80"  reflect="false"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
#アズール
学園内のどこにも見かけないと思ったらここにいたのですね。追い詰めましたよ[p]
#モブ寮生
ひいっ！アーシェングロット！！！[p]
[_tb_end_text]

[chara_hide_all  time="1000"  wait="true"  ]
[jump  storage="vs_mobc.ks"  target="*mobc"  ]
*mobc_nakayoshi

[tb_start_text mode=1 ]
#モブ寮生
ちゃ、ちゃんと支払います！！だからやめてください！[p]
#アズール
ご理解いただけてなによりです。[p]
[_tb_end_text]

[mask  time="500"  effect="fadeIn"  color="0x000000"  ]
[stopbgm  time="1000"  ]
[hidemenubutton]

[tb_hide_message_window  ]
[bg  time="500"  method="crossfade"  storage="black.png"  ]
[chara_hide_all  time="1000"  wait="true"  ]
[mask_off  time="500"  effect="fadeOut"  ]
[bg  time="500"  method="crossfade"  storage="BG02a_80.jpg"  ]
[playbgm  volume="100"  time="1000"  loop="true"  storage="MusMus-BGM-102.mp3"  ]
[tb_show_message_window  ]
[chara_show  name="アズール"  time="0"  wait="true"  storage="chara/1/az1.png"  width="350"  height="600"  left="81"  top="50"  reflect="false"  ]
[chara_show  name="ジェイド"  time="1000"  wait="true"  left="556"  top="45"  width="238"  height="600"  reflect="false"  storage="chara/2/ja1.png"  ]
[tb_start_text mode=1 ]
#ジェイド
さて、ずいぶん遠くまで来てしまいましたね。急いで戻りましょう。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#アズール
ええ、そうですね。[p]
[_tb_end_text]

[chara_mod  name="アズール"  time="600"  cross="true"  storage="chara/1/az2.png"  ]
[tb_start_text mode=1 ]
#アズール
……ジェイド、手を繋いで戻りませんか？誰も見ていないですし…[p]
[_tb_end_text]

[chara_mod  name="ジェイド"  time="600"  cross="true"  storage="chara/2/ja3.png"  ]
[tb_start_text mode=1 ]
#ジェイド
アズール、どうしたんですか？[p]
……学園の外れとはいえ、誰かに見られるかもしれませんよ？[p]
[_tb_end_text]

[chara_mod  name="アズール"  time="600"  cross="true"  storage="chara/1/az1.png"  ]
[tb_start_text mode=1 ]
#アズール
コホン、……失礼。久しぶりに二人きりで…、つい舞い上がってしまいました…。[p]
いえ、なんでもありませんよ。早く戻りましょう。[p]
[_tb_end_text]

[chara_mod  name="ジェイド"  time="600"  cross="true"  storage="chara/2/ja2.png"  ]
[chara_move  name="ジェイド"  anim="false"  time="300"  effect="linear"  wait="true"  left="370"  top="45"  width="238"  height="600"  ]
[tb_start_text mode=1 ]
#ジェイド
おやおや…ふふふ、嫌とは言っていません[p]
[_tb_end_text]

[chara_mod  name="アズール"  time="600"  cross="true"  storage="chara/1/az3.png"  ]
[tb_start_text mode=1 ]
#アズール
お前なぁ！！[p]
[_tb_end_text]

[wait  time="500"  ]
[chara_mod  name="アズール"  time="600"  cross="true"  storage="chara/1/az2.png"  ]
[mask  time="1000"  effect="fadeIn"  color="0x000000"  ]
[hidemenubutton]

[tb_hide_message_window  ]
[tb_eval  exp="sf.flag3=1"  name="flag3"  cmd="="  op="t"  val="1"  val_2="undefined"  ]
[bg  time="1000"  method="crossfade"  storage="black.png"  ]
[chara_hide_all  time="1000"  wait="true"  ]
[mask_off  time="1000"  effect="fadeOut"  ]
[jump  storage="mostro.ks"  target="*start"  ]
