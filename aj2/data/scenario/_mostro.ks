[_tb_system_call storage=system/__mostro.ks]

[tb_eval  exp="sf.flag1=0"  name="flag1"  cmd="="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="sf.flag2=0"  name="flag2"  cmd="="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="sf.flag3=0"  name="flag3"  cmd="="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="sf.jade_touch=0"  name="jade_touch"  cmd="="  op="t"  val="0"  val_2="undefined"  ]
*start

[tb_start_tyrano_code]
[jump  storage="end_judge.ks"  target="*judge"  cond="sf.flag1==1  &&  sf.flag2==1   &&  sf.flag3==1""]
[_tb_end_tyrano_code]

[playbgm  volume="20"  time="1000"  loop="true"  storage="MusMus-BGM-146.mp3"  ]
[bg  time="300"  method="fadeIn"  storage="bar00.jpg"  cross="false"  ]
[chara_show  name="ジェイド"  time="100"  wait="true"  storage="chara/2/j.png"  width="400"  height="588"  left="276"  top="50"  reflect="false"  ]
[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/j.png"  ]
[tb_show_message_window  ]
[showmenubutton]

[tb_start_text mode=3 ]
#ジェイド
どなたにお話をしに行きましょうか[r]
[_tb_end_text]

[clickable  storage="mostro.ks"  x="420"  y="176"  width="114"  height="201"  target="*touch"  _clickable_img=""  ]
[tb_start_tyrano_code]
[glink  color="btn_14_black"  storage="lounge.ks"  size="20"  text="ラウンジ"  x="650"  y="124"  width="200"  height=""  _clickable_img="" target="*lounge" cond="sf.flag1 == 0" ]
[glink  color="btn_14_black"  storage="danwashitsu.ks"  size="20"  text="談話室"  x="650"  y="216"  width="200"  height=""  _clickable_img="" target="*danwashitsu" cond="sf.flag2 == 0" ]
[glink  color="btn_14_black"  storage="koushaura.ks"  size="20"  text="学園"  x="650"  y="309"  width="200"  height=""  _clickable_img=""  target="*koushaura" cond="sf.flag3 == 0" ]
[_tb_end_tyrano_code]

[s  ]
*touch

[tb_eval  exp="sf.jade_touch+=10"  name="jade_touch"  cmd="+="  op="t"  val="10"  val_2="undefined"  ]
[tb_start_tyrano_code]
[jump  storage="mostro.ks"  target="*1-10"  cond="sf.jade_touch>=1  &&  sf.jade_touch<=10"]
[jump  storage="mostro.ks"  target="*11-50"  cond="sf.jade_touch>=11  && sf.jade_touch<=50"]
[jump  storage="mostro.ks"  target="*51-"  cond="sf.jade_touch>50"]
[_tb_end_tyrano_code]

*1-10

[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/j5.png"  ]
[tb_start_text mode=1 ]
#ジェイド
フフ、くすぐったいですアズール[p]
[_tb_end_text]

[jump  storage="mostro.ks"  target="*start"  ]
*11-50

[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/j6.png"  ]
[tb_start_text mode=1 ]
#ジェイド
アズール……ここでそんな…いけません[p]
[_tb_end_text]

[jump  storage="mostro.ks"  target="*start"  ]
*51-

[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/j7.png"  ]
[tb_start_text mode=1 ]
#ジェイド
しつこいんですよ[p]
[_tb_end_text]

[jump  storage="mostro.ks"  target="*start"  ]
