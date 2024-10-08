[_tb_system_call storage=system/_vs_mobc.ks]

*mobc

[bg  time="1000"  method="crossfade"  storage="BG02a_80.jpg"  ]
[chara_show  name="モブ寮生C"  time="1000"  wait="true"  storage="chara/10/mobc.png"  width="336"  height="624"  left="317"  top="80"  reflect="false"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
#モブ寮生
しつこいな！払えないものは払えないんだよ！[p]
#アズール
ふむ、仕方ありませんね。素直に代価を支払うつもりになるまで僕とお話をいたしましょうか[p]
[_tb_end_text]

[chara_mod  name="モブ寮生C"  time="300"  cross="true"  storage="chara/10/mobc.png"  ]
[tb_start_text mode=2 ]
#モブ寮生
な、なにをするつもりだ？！[l][r]
[_tb_end_text]

[chara_show  name="ターン"  time="0"  wait="true"  storage="chara/15/turn_1.png"  width="100"  height="100"  left="110"  top="32"  reflect="false"  ]
[chara_show  name="ジェイド"  time="0"  wait="true"  left="719"  top="87"  width="199"  height="199"  reflect="false"  storage="chara/2/j3.png"  ]
[chara_show  name="モブHP"  time="0"  wait="true"  storage="chara/12/mobHP_MAX.png"  width="307"  height="35"  left="300"  top="20"  reflect="false"  ]
[chara_show  name="アズールHP"  time="0"  wait="true"  storage="chara/14/azul_HP.png"  width="190"  height="20"  left="720"  top="311"  reflect="false"  ]
[tb_eval  exp="f.mob_c_HP=5"  name="mob_c_HP"  cmd="="  op="t"  val="5"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP=5"  name="azul_HP"  cmd="="  op="t"  val="5"  val_2="undefined"  ]
*ohanashi

[tb_eval  exp="f.attack_ptn=0"  name="attack_ptn"  cmd="="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="f.turn+=1"  name="turn"  cmd="+="  op="t"  val="1"  val_2="undefined"  ]
[tb_start_tyrano_code]
[if exp= "f.turn==2"]
[_tb_end_tyrano_code]

[chara_mod  name="ターン"  time="100"  cross="true"  storage="chara/15/turn_2.png"  ]
[tb_start_tyrano_code]
[elsif exp= "f.turn==3"]
[_tb_end_tyrano_code]

[chara_mod  name="ターン"  time="100"  cross="true"  storage="chara/15/turn_3.png"  ]
[tb_start_tyrano_code]
[elsif exp= "f.turn==4"]
[_tb_end_tyrano_code]

[chara_mod  name="ターン"  time="100"  cross="true"  storage="chara/15/turn_4.png"  ]
[tb_start_tyrano_code]
[elsif exp= "f.turn==5"]
[_tb_end_tyrano_code]

[chara_mod  name="ターン"  time="100"  cross="true"  storage="chara/15/turn_5.png"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

[chara_mod  name="ジェイド"  time="300"  cross="true"  storage="chara/2/j3.png"  ]
[glink  color="btn_14_black"  storage="vs_mobc.ks"  size="20"  target="*nonoshiru"  x="60"  y="160"  width="170"  height="50"  text="罵る"  _clickable_img=""  ]
[glink  color="btn_14_black"  storage="vs_mobc.ks"  size="20"  text="脅迫する"  target="*kyohaku"  x="60"  y="229"  width="170"  height="50"  _clickable_img=""  ]
[glink  color="btn_14_black"  storage="vs_mobc.ks"  size="20"  text="同情する"  target="*doujo"  x="60"  y="300"  width="170"  height="50"  _clickable_img=""  ]
[s  ]
*nonoshiru

[tb_eval  exp="f.attack_ptn=1"  name="attack_ptn"  cmd="="  op="t"  val="1"  val_2="undefined"  ]
[jump  storage="vs_mobc.ks"  target="*turn"  ]
*kyohaku

[tb_eval  exp="f.attack_ptn=2"  name="attack_ptn"  cmd="="  op="t"  val="2"  val_2="undefined"  ]
[jump  storage="vs_mobc.ks"  target="*turn"  ]
*doujo

[tb_eval  exp="f.attack_ptn=3"  name="attack_ptn"  cmd="="  op="t"  val="3"  val_2="undefined"  ]
[jump  storage="vs_mobc.ks"  target="*turn"  ]
*nakayoshi

[jump  storage="mobc_koushaura.ks"  target="*mobc_nakayoshi"  ]
*HP

[jump  storage="vs_mobc.ks"  target="*5"  cond="f.mob_c_HP==5"  ]
[jump  storage="vs_mobc.ks"  target="*4"  cond="f.mob_c_HP==4"  ]
[jump  storage="vs_mobc.ks"  target="*3"  cond="f.mob_c_HP==3"  ]
[jump  storage="vs_mobc.ks"  target="*2"  cond="f.mob_c_HP==2"  ]
[jump  storage="vs_mobc.ks"  target="*1"  cond="f.mob_c_HP==1"  ]
[jump  storage="vs_mobc.ks"  target="*0"  cond="f.mob_c_HP==0"  ]
[jump  storage="vs_mobc.ks"  target="*0"  cond="f.mob_c_HP<0"  ]
*5

[jump  storage="vs_mobc.ks"  target="*ohanashi"  ]
*4

[chara_mod  name="モブHP"  time="300"  cross="true"  storage="chara/12/mobHP_4.png"  ]
[jump  storage="vs_mobc.ks"  target="*ohanashi"  ]
*3

[chara_mod  name="モブHP"  time="300"  cross="true"  storage="chara/12/mobHP_3.png"  ]
[jump  storage="vs_mobc.ks"  target="*ohanashi"  ]
*2

[chara_mod  name="モブHP"  time="300"  cross="true"  storage="chara/12/mobHP_2.png"  ]
[jump  storage="vs_mobc.ks"  target="*ohanashi"  ]
*1

[chara_mod  name="モブHP"  time="300"  cross="true"  storage="chara/12/mobHP_1.png"  ]
[jump  storage="vs_mobc.ks"  target="*ohanashi"  ]
*0

[chara_mod  name="モブHP"  time="300"  cross="true"  storage="chara/12/mobHP_0.png"  ]
[cm  ]
[tb_start_tyrano_code]
[if exp = "f.turn <= 3"]

[_tb_end_tyrano_code]

[tb_eval  exp="f.jade_enjoy+=1"  name="jade_enjoy"  cmd="+="  op="t"  val="1"  val_2="undefined"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

[jump  storage="mobc_koushaura.ks"  target="*mobc_nakayoshi"  ]
*azul_HP

[jump  storage="vs_mobc.ks"  target="*az_5"  cond="f.azul_HP==5"  ]
[jump  storage="vs_mobc.ks"  target="*az_4"  cond="f.azul_HP==4"  ]
[jump  storage="vs_mobc.ks"  target="*az_3"  cond="f.azul_HP==3"  ]
[jump  storage="vs_mobc.ks"  target="*az_2"  cond="f.azul_HP==2"  ]
[jump  storage="vs_mobc.ks"  target="*az_1"  cond="f.azul_HP==1"  ]
[jump  storage="vs_mobc.ks"  target="*az_0"  cond="f.azul_HP==0"  ]
[jump  storage="vs_mobc.ks"  target="*az_0"  cond="f.azul_HP<0"  ]
*az_5

[jump  storage="vs_mobc.ks"  target="*HP"  ]
*az_4

[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_battle14.mp3"  ]
[chara_mod  name="アズールHP"  time="300"  cross="true"  storage="chara/14/azul_HP_4.png"  ]
[jump  storage="vs_mobc.ks"  target="*HP"  ]
*az_3

[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_battle14.mp3"  ]
[chara_mod  name="アズールHP"  time="300"  cross="true"  storage="chara/14/azul_HP_3.png"  ]
[jump  storage="vs_mobc.ks"  target="*HP"  ]
*az_2

[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_battle14.mp3"  ]
[chara_mod  name="アズールHP"  time="300"  cross="true"  storage="chara/14/azul_HP_2.png"  ]
[jump  storage="vs_mobc.ks"  target="*HP"  ]
*az_1

[chara_mod  name="アズールHP"  time="300"  cross="true"  storage="chara/14/azul_HP_1.png"  ]
[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_battle14.mp3"  ]
[jump  storage="vs_mobc.ks"  target="*HP"  ]
*az_0

[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_battle14.mp3"  ]
[chara_mod  name="アズールHP"  time="300"  cross="true"  storage="chara/14/azul_HP_0.png"  ]
[tb_start_text mode=1 ]
#アズール
こんなはずでは・・・！[p]
[_tb_end_text]

[cm  ]
[jump  storage="end_nomal_defeat.ks"  target="*end_defeat"  ]
*turn

[jump  storage="vs_mobc.ks"  target="*mob_1_turn"  cond="f.turn==1"  ]
[jump  storage="vs_mobc.ks"  target="*mob_2_turn"  cond="f.turn==2"  ]
[jump  storage="vs_mobc.ks"  target="*mob_3_turn"  cond="f.turn==3"  ]
[jump  storage="vs_mobc.ks"  target="*mob_4_turn"  cond="f.turn==4"  ]
[jump  storage="vs_mobc.ks"  target="*mob_5_turn"  cond="f.turn==5"  ]
*mob_1_turn

[tb_start_tyrano_code]
[if exp= "f.attack_ptn==1"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
学園の地理が分かっていればもっと逃げられたのに・・・残念でしたね[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生A
うるせぇ！逃げ切ってやる！[p]
[_tb_end_text]

[tb_eval  exp="f.mob_c_HP-=1"  name="mob_c_HP"  cmd="-="  op="t"  val="1"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=1"  name="azul_HP"  cmd="-="  op="t"  val="1"  ]
[jump  storage="vs_mobc.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==2"]
[_tb_end_tyrano_code]

[tb_image_show  time="0"  storage="default/集中線.png"  width="960"  height="640"  ]
[quake  time="300"  count="3"  hmax="10"  wait="true"  ]
[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/j4.png"  ]
[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_battle12.mp3"  ]
[tb_start_text mode=1 ]
#アズール
どこまで逃げてますか？島の外に出られてもずっと付きまといますよ[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
こえぇよ！[p]
[_tb_end_text]

[tb_image_hide  time="1000"  ]
[tb_eval  exp="f.mob_c_HP-=2"  name="mob_c_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=0"  name="azul_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[jump  storage="vs_mobc.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==3"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
走り回って疲れたでしょう？休憩してはどうですか？[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
休憩したら捕まえるだろうが！[p]
[_tb_end_text]

[tb_eval  exp="f.mob_c_HP-=0"  name="mob_c_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=2"  name="azul_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[jump  storage="vs_mobc.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

*mob_2_turn

[tb_start_tyrano_code]
[if exp= "f.attack_ptn==1"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
逃げ回るだけで解決できるとお思いですか？[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
お前が追いかけてこなけりゃいいんだろ[p]
[_tb_end_text]

[tb_eval  exp="f.mob_c_HP-=0"  name="mob_c_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=2"  name="azul_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[jump  storage="vs_mobc.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==2"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
あなたには力ずくの方が早そうだ[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
やられる前に締めてやるよ！[p]
[_tb_end_text]

[tb_eval  exp="f.mob_c_HP-=1"  name="mob_c_HP"  cmd="-="  op="t"  val="1"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=1"  name="azul_HP"  cmd="-="  op="t"  val="1"  val_2="undefined"  ]
[jump  storage="vs_mobc.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==3"]
[_tb_end_tyrano_code]

[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/j4.png"  ]
[tb_image_show  time="0"  storage="default/集中線.png"  width="960"  height="640"  ]
[quake  time="300"  count="3"  hmax="10"  wait="true"  ]
[tb_start_text mode=1 ]
#アズール
こんなに逃げて疲れたでしょう？ここまでしなくてもいいのではありませんか？[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
うっ！たしかに・・・？[p]
[_tb_end_text]

[tb_image_hide  time="1000"  ]
[tb_eval  exp="f.mob_c_HP-=2"  name="mob_c_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=0"  name="azul_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[jump  storage="vs_mobc.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

*mob_3_turn

[tb_start_tyrano_code]
[if exp= "f.attack_ptn==1"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
学園の地理が分かっていればもっと逃げられたのに・・・残念でしたね[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生A
うるせぇ！逃げ切ってやる！[p]
[_tb_end_text]

[tb_eval  exp="f.mob_c_HP-=1"  name="mob_c_HP"  cmd="-="  op="t"  val="1"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=1"  name="azul_HP"  cmd="-="  op="t"  val="1"  ]
[jump  storage="vs_mobc.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==2"]
[_tb_end_tyrano_code]

[tb_image_show  time="0"  storage="default/集中線.png"  width="960"  height="640"  ]
[quake  time="300"  count="3"  hmax="10"  wait="true"  ]
[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/j4.png"  ]
[tb_start_text mode=1 ]
#アズール
どこまで逃げてますか？島の外に出られてもずっと付きまといますよ[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
こえぇよ！[p]
[_tb_end_text]

[tb_image_hide  time="1000"  ]
[tb_eval  exp="f.mob_c_HP-=2"  name="mob_c_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=0"  name="azul_HP"  cmd="-="  op="t"  val="0"  ]
[jump  storage="vs_mobc.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==3"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
走り回って疲れたでしょう？休憩してはどうですか？[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
休憩したら捕まえるだろうが！[p]
[_tb_end_text]

[tb_eval  exp="f.mob_c_HP-=0"  name="mob_c_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=2"  name="azul_HP"  cmd="-="  op="t"  val="2"  ]
[jump  storage="vs_mobc.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

*mob_4_turn

[tb_start_tyrano_code]
[if exp= "f.attack_ptn==1"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
逃げ回るだけで解決できるとお思いですか？[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
お前が追いかけてこなけりゃいいんだろ[p]
[_tb_end_text]

[tb_eval  exp="f.mob_c_HP-=0"  name="mob_c_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=2"  name="azul_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[jump  storage="vs_mobc.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==2"]
[_tb_end_tyrano_code]

[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/j4.png"  ]
[tb_start_text mode=1 ]
#アズール
あなたには力ずくの方が早そうだ[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
やられる前に締めてやるよ！[p]
[_tb_end_text]

[tb_eval  exp="f.mob_c_HP-=1"  name="mob_c_HP"  cmd="-="  op="t"  val="1"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=1"  name="azul_HP"  cmd="-="  op="t"  val="1"  val_2="undefined"  ]
[jump  storage="vs_mobc.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==3"]
[_tb_end_tyrano_code]

[tb_image_show  time="0"  storage="default/集中線.png"  width="960"  height="640"  ]
[quake  time="300"  count="3"  hmax="10"  wait="true"  ]
[tb_start_text mode=1 ]
#アズール
こんなに逃げて疲れたでしょう？ここまでしなくてもいいのではありませんか？[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
うっ！たしかに・・・？[p]
[_tb_end_text]

[tb_image_hide  time="1000"  ]
[tb_eval  exp="f.mob_c_HP-=2"  name="mob_c_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=0"  name="azul_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[jump  storage="vs_mobc.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

*mob_5_turn

[tb_start_tyrano_code]
[if exp= "f.attack_ptn==1"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
逃げ回るだけで解決できるとお思いですか？[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
お前が追いかけてこなけりゃいいんだろ[p]
[_tb_end_text]

[tb_eval  exp="f.mob_c_HP-=0"  name="mob_c_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=2"  name="azul_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[jump  storage="vs_mobc.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==2"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
あなたには力ずくの方が早そうだ[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
やられる前に締めてやるよ！[p]
[_tb_end_text]

[tb_eval  exp="f.mob_c_HP-=1"  name="mob_c_HP"  cmd="-="  op="t"  val="1"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=1"  name="azul_HP"  cmd="-="  op="t"  val="1"  val_2="undefined"  ]
[jump  storage="vs_mobc.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==3"]
[_tb_end_tyrano_code]

[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/j4.png"  ]
[tb_image_show  time="0"  storage="default/集中線.png"  width="960"  height="640"  ]
[quake  time="300"  count="3"  hmax="10"  wait="true"  ]
[tb_start_text mode=1 ]
#アズール
こんなに逃げて疲れたでしょう？ここまでしなくてもいいのではありませんか？[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
うっ！たしかに・・・？[p]
[_tb_end_text]

[tb_image_hide  time="1000"  ]
[tb_eval  exp="f.mob_c_HP-=2"  name="mob_c_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=0"  name="azul_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[jump  storage="vs_mobc.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

