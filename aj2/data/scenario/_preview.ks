[_tb_system_call storage=system/_preview.ks ]

[mask time=10]
[mask_off time=10]
[tb_eval  exp="sf.flag1=0"  name="flag1"  cmd="="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="sf.flag2=0"  name="flag2"  cmd="="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="sf.flag3=0"  name="flag3"  cmd="="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="f.jade_enjoy=0"  name="jade_enjoy"  cmd="="  op="t"  val="0"  val_2="undefined"  ]
*start

[tb_eval  exp="f.turn=0"  name="turn"  cmd="="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="sf.jade_touch=0"  name="jade_touch"  cmd="="  op="t"  val="0"  val_2="undefined"  ]
[playbgm  volume="20"  time="1000"  loop="true"  storage="MusMus-BGM-146.mp3"  ]
[tb_start_tyrano_code]
[skipstop]
[_tb_end_tyrano_code]

[tb_start_tyrano_code]
[jump  storage="vs_jade.ks"  target="vs_jade"  cond="f.jade_enjoy==3 && sf.flag1==1  &&  sf.flag2==1   &&  sf.flag3==1""]
[_tb_end_tyrano_code]

[tb_start_tyrano_code]
[jump  storage="end_nomal.ks"  target="nomal_end"  cond="sf.flag1==1  &&  sf.flag2==1   &&  sf.flag3==1""]
[_tb_end_tyrano_code]

[bg  time="300"  method="fadeIn"  storage="lounge.png"  cross="false"  ]
[tb_start_tyrano_code]
[if exp = "f.battle_tips == 0]
[_tb_end_tyrano_code]

[tb_image_show  time="1000"  storage="default/戦闘Tips.png"  width="960"  height="640"  x="0"  y="0"  _clickable_img=""  name="img_11"  ]
[tb_start_tyrano_code]
[eval exp = "f.battle_tips = 1]
[_tb_end_tyrano_code]

[l  ]
[tb_image_hide  time="1000"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

[chara_show  name="ジェイド"  time="100"  wait="true"  storage="chara/2/ja1.png"  width="240"  height="600"  left="363"  top="51"  reflect="false"  ]
[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/ja1.png"  ]
[tb_show_message_window  ]
[showmenubutton]

[tb_start_text mode=3 ]
#ジェイド
どなたにお話をしに行きましょうか[r]
[_tb_end_text]

[clickable  storage="mostro.ks"  x="420"  y="176"  width="114"  height="201"  target="*touch"  _clickable_img=""  ]
[tb_start_tyrano_code]
[glink  color="btn_14_black"  storage="moba_lounge.ks"  size="20"  text="ラウンジ"  x="650"  y="124"  width="200"  height=""  _clickable_img="" target="*lounge" cond="sf.flag1 == 0" ]
[glink  color="btn_14_black"  storage="mobb_danwashitsu.ks"  size="20"  text="談話室"  x="650"  y="216"  width="200"  height=""  _clickable_img="" target="*danwashitsu" cond="sf.flag2 == 0" ]
[glink  color="btn_14_black"  storage="mobc_koushaura.ks"  size="20"  text="学園"  x="650"  y="309"  width="200"  height=""  _clickable_img=""  target="*koushaura" cond="sf.flag3 == 0" ]
[_tb_end_tyrano_code]

[chara_show  name="ジェイドENJOY"  time="0"  wait="true"  storage="chara/16/jade_enjoy_0.png"  width="164"  height="165"  left="75"  top="159"  reflect="false"  ]
[clickable  storage="mostro.ks"  x="75"  y="160"  width="165"  height="165"  target="*enjoy"  _clickable_img=""  ]
[tb_start_tyrano_code]
[if exp = "f.jade_enjoy == 1]
[_tb_end_tyrano_code]

[chara_mod  name="ジェイドENJOY"  time="600"  cross="true"  storage="chara/16/jade_enjoy_1.png"  ]
[tb_start_tyrano_code]
[elsif exp = "f.jade_enjoy == 2]
[_tb_end_tyrano_code]

[chara_mod  name="ジェイドENJOY"  time="600"  cross="true"  storage="chara/16/jade_enjoy_2.png"  ]
[tb_start_tyrano_code]
[elsif exp = "f.jade_enjoy == 3]
[_tb_end_tyrano_code]

[chara_mod  name="ジェイドENJOY"  time="600"  cross="true"  storage="chara/16/jade_enjoy_3.png"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

[s  ]
*touch

[tb_eval  exp="f.jade_touch+=1"  name="jade_touch"  cmd="+="  op="t"  val="1"  val_2="undefined"  ]
[jump  storage="mostro.ks"  target="*10"  cond="f.jade_touch>6"  ]
[jump  storage="mostro.ks"  target="*3"  cond="f.jade_touch>3"  ]
[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/ja2.png"  ]
[tb_start_text mode=1 ]
#ジェイド
フフ、くすぐったいですアズール。[p]
[_tb_end_text]

[jump  storage="mostro.ks"  target="*start"  ]
*3

[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/ja2.png"  ]
[tb_start_text mode=1 ]
#ジェイド
アズール……ここでそんな…いけません。[p]
[_tb_end_text]

[jump  storage="mostro.ks"  target="*start"  ]
*10

[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/ja4.png"  ]
[tb_start_text mode=1 ]
#ジェイド
しつこいんですよ。[p]
[_tb_end_text]

[jump  storage="mostro.ks"  target="*start"  ]
*enjoy

[tb_start_text mode=1 ]
#ジェイド
ハート・……ですか？僕にはなにも見えませんが？[p]
もしかしたら素早く３ターンで取り立てを完了すると、なにか溜まるのかもしれません[p]
[_tb_end_text]

[jump  storage="mostro.ks"  target="*start"  ]
