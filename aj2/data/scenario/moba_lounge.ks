[_tb_system_call storage=system/_moba_lounge.ks]

*lounge

[stopbgm  time="1000"  ]
[tb_hide_message_window  ]
[mask  time="1000"  effect="fadeIn"  color="0x000000"  ]
[chara_hide_all  time="0"  wait="true"  ]
[wait  time="200"  ]
[bg  time="500"  method="crossfade"  storage="lounge.png"  ]
[mask_off  time="1000"  effect="fadeOut"  ]
[playbgm  volume="30"  time="1000"  loop="true"  storage="MusMus-BGM-125.mp3"  ]
[chara_show  name="アズール"  time="100"  wait="true"  left="130"  top="40"  width="350"  height="600"  reflect="false"  storage="chara/1/az1.png"  ]
[chara_show  name="モブ寮生A"  time="100"  wait="false"  storage="chara/8/moba.png"  width="496"  height="600"  left="440"  top="60"  reflect="false"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
#アズール
わざわざモストロにお越しいただいてまことにありがとうございます。[p]
さて、用件はお分かりですよね？[p]
#モブ寮生
前から言ってる通り手持ちがないんですよ、アーシェングロットさん。[p]
もう少し待ってくれませんか？[p]
[_tb_end_text]

[chara_mod  name="アズール"  time="300"  cross="false"  storage="chara/1/az3.png"  ]
[tb_start_text mode=1 ]
#アズール
ずっとそう言い続けて、全然対価の用意を全然していないでしょう！[p]
[_tb_end_text]

[chara_mod  name="アズール"  time="300"  cross="false"  storage="chara/1/az2.png"  ]
[tb_start_text mode=1 ]
#アズール
……支払うつもりがないなら、[p]
[_tb_end_text]

[chara_mod  name="アズール"  time="300"  cross="false"  storage="chara/1/az1.png"  ]
[tb_start_text mode=1 ]
#アズール
心変わりするまでオハナシに付き合っていただきましょう。[p]
#モブ寮生
ふん！無駄だ！[p]
[_tb_end_text]

[chara_hide_all  time="300"  wait="true"  ]
[jump  storage="vs_moba.ks"  target="*moba"  ]
*moba_nakayoshi

[tb_start_text mode=1 ]
#モブ寮生
うっ！うわああああ！！！[p]
#アズール
さあ、お支払いいただきますね？[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
明日には……い、いや今からかき集めてきます。[p]
#アズール
最初から素直に応じておけばよかったんですよ。[p]
[_tb_end_text]

[chara_mod  name="ジェイド"  time="600"  cross="true"  storage="chara/2/j4.png"  ]
[tb_start_text mode=1 ]
#ジェイド
ふふ、さすがアズール。お見事です。[p]
[_tb_end_text]

[mask  time="1000"  effect="fadeIn"  color="0x000000"  ]
[hidemenubutton]

[tb_hide_message_window  ]
[tb_eval  exp="sf.flag1=1"  name="flag1"  cmd="="  op="t"  val="1"  val_2="undefined"  ]
[bg  time="1000"  method="crossfade"  storage="black.png"  ]
[chara_hide_all  time="1000"  wait="true"  ]
[mask_off  time="1000"  effect="fadeOut"  ]
[jump  storage="mostro.ks"  target="*start"  ]
