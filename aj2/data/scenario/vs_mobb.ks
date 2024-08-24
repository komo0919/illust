[_tb_system_call storage=system/_vs_mobb.ks]

*mobb

[bg  time="0"  method="crossfade"  storage="danwashitsu.png"  ]
[chara_show  name="モブ寮生B"  time="1000"  wait="true"  storage="chara/9/mobb.png"  width="328"  height="613"  left="318"  top="78"  reflect="false"  ]
[tb_show_message_window  ]
[chara_mod  name="モブ寮生B"  time="300"  cross="false"  storage="chara/9/mobb.png"  ]
[tb_start_text mode=2 ]
#モブ寮生
ローズハート寮長より怖くないぞ！[l][r]
[_tb_end_text]

[chara_show  name="ターン"  time="0"  wait="true"  storage="chara/15/turn_1.png"  width="100"  height="100"  left="110"  top="32"  reflect="false"  ]
[chara_show  name="ジェイド"  time="0"  wait="true"  left="719"  top="87"  width="199"  height="199"  reflect="false"  storage="chara/2/j3.png"  ]
[chara_show  name="モブHP"  time="0"  wait="true"  storage="chara/12/mobHP_MAX.png"  width="307"  height="35"  left="300"  top="20"  reflect="false"  ]
[chara_show  name="アズールHP"  time="0"  wait="true"  storage="chara/14/azul_HP.png"  width="190"  height="20"  left="720"  top="311"  reflect="false"  ]
[tb_eval  exp="f.mob_b_HP=5"  name="mob_b_HP"  cmd="="  op="t"  val="5"  val_2="undefined"  ]
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
[glink  color="btn_14_black"  storage="vs_mobb.ks"  size="20"  target="*nonoshiru"  x="60"  y="160"  width="170"  height="50"  text="罵る"  _clickable_img=""  ]
[glink  color="btn_14_black"  storage="vs_mobb.ks"  size="20"  text="脅迫する"  target="*kyohaku"  x="60"  y="229"  width="170"  height="50"  _clickable_img=""  ]
[glink  color="btn_14_black"  storage="vs_mobb.ks"  size="20"  text="同情する"  target="*doujo"  x="60"  y="300"  width="170"  height="50"  _clickable_img=""  ]
[s  ]
*nonoshiru

[tb_eval  exp="f.attack_ptn=1"  name="attack_ptn"  cmd="="  op="t"  val="1"  val_2="undefined"  ]
[jump  storage="vs_mobb.ks"  target="*turn"  ]
*kyohaku

[tb_eval  exp="f.attack_ptn=2"  name="attack_ptn"  cmd="="  op="t"  val="2"  val_2="undefined"  ]
[jump  storage="vs_mobb.ks"  target="*turn"  ]
*doujo

[tb_eval  exp="f.attack_ptn=3"  name="attack_ptn"  cmd="="  op="t"  val="3"  val_2="undefined"  ]
[jump  storage="vs_mobb.ks"  target="*turn"  ]
*HP

[jump  storage="vs_mobb.ks"  target="*5"  cond="f.mob_b_HP==5"  ]
[jump  storage="vs_mobb.ks"  target="*4"  cond="f.mob_b_HP==4"  ]
[jump  storage="vs_mobb.ks"  target="*3"  cond="f.mob_b_HP==3"  ]
[jump  storage="vs_mobb.ks"  target="*2"  cond="f.mob_b_HP==2"  ]
[jump  storage="vs_mobb.ks"  target="*1"  cond="f.mob_b_HP==1"  ]
[jump  storage="vs_mobb.ks"  target="*0"  cond="f.mob_b_HP==0"  ]
[jump  storage="vs_mobb.ks"  target="*0"  cond="f.mob_b_HP<0"  ]
*5

[tb_start_text mode=1 ]
#モブ寮生
フン、オクタヴィネルなんてこんなものですか！[p]
[_tb_end_text]

[jump  storage="vs_mobb.ks"  target="*ohanashi"  ]
*4

[chara_mod  name="モブHP"  time="300"  cross="true"  storage="chara/12/mobHP_4.png"  ]
[jump  storage="vs_mobb.ks"  target="*ohanashi"  ]
*3

[chara_mod  name="モブHP"  time="300"  cross="true"  storage="chara/12/mobHP_3.png"  ]
[jump  storage="vs_mobb.ks"  target="*ohanashi"  ]
*2

[chara_mod  name="モブHP"  time="300"  cross="true"  storage="chara/12/mobHP_2.png"  ]
[jump  storage="vs_mobb.ks"  target="*ohanashi"  ]
*1

[chara_mod  name="モブHP"  time="300"  cross="true"  storage="chara/12/mobHP_1.png"  ]
[jump  storage="vs_mobb.ks"  target="*ohanashi"  ]
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

[jump  storage="mobb_danwashitsu.ks"  target="*mobb_nakayoshi"  ]
*azul_HP

[jump  storage="vs_mobb.ks"  target="*az_5"  cond="f.azul_HP==5"  ]
[jump  storage="vs_mobb.ks"  target="*az_4"  cond="f.azul_HP==4"  ]
[jump  storage="vs_mobb.ks"  target="*az_3"  cond="f.azul_HP==3"  ]
[jump  storage="vs_mobb.ks"  target="*az_2"  cond="f.azul_HP==2"  ]
[jump  storage="vs_mobb.ks"  target="*az_1"  cond="f.azul_HP==1"  ]
[jump  storage="vs_mobb.ks"  target="*az_0"  cond="f.azul_HP==0"  ]
[jump  storage="vs_mobb.ks"  target="*az_0"  cond="f.azul_HP<0"  ]
*az_5

[jump  storage="vs_mobb.ks"  target="*HP"  ]
*az_4

[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_battle14.mp3"  ]
[chara_mod  name="アズールHP"  time="300"  cross="true"  storage="chara/14/azul_HP_4.png"  ]
[jump  storage="vs_mobb.ks"  target="*HP"  ]
*az_3

[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_battle14.mp3"  ]
[chara_mod  name="アズールHP"  time="300"  cross="true"  storage="chara/14/azul_HP_3.png"  ]
[jump  storage="vs_mobb.ks"  target="*HP"  ]
*az_2

[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_battle14.mp3"  ]
[chara_mod  name="アズールHP"  time="300"  cross="true"  storage="chara/14/azul_HP_2.png"  ]
[jump  storage="vs_mobb.ks"  target="*HP"  ]
*az_1

[chara_mod  name="アズールHP"  time="300"  cross="true"  storage="chara/14/azul_HP_1.png"  ]
[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_battle14.mp3"  ]
[jump  storage="vs_mobb.ks"  target="*HP"  ]
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

[jump  storage="vs_mobb.ks"  target="*mob_1_turn"  cond="f.turn==1"  ]
[jump  storage="vs_mobb.ks"  target="*mob_2_turn"  cond="f.turn==2"  ]
[jump  storage="vs_mobb.ks"  target="*mob_3_turn"  cond="f.turn==3"  ]
[jump  storage="vs_mobb.ks"  target="*mob_4_turn"  cond="f.turn==4"  ]
[jump  storage="vs_mobb.ks"  target="*mob_5_turn"  cond="f.turn==5"  ]
*mob_1_turn

[tb_start_tyrano_code]
[if exp= "f.attack_ptn==1"]
[_tb_end_tyrano_code]

[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/j4.png"  ]
[tb_image_show  time="0"  storage="default/集中線.png"  width="960"  height="640"  ]
[quake  time="300"  count="3"  hmax="10"  wait="true"  ]
[tb_start_text mode=1 ]
#アズール
他の寮で逃げ回るなんて、ハーツラビュル寮生として恥を知りなさい！[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
寮に戻りたくない！！[p]
[_tb_end_text]

[tb_image_hide  time="1000"  ]
[tb_eval  exp="f.mob_b_HP-=2"  name="mob_b_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=0"  name="azul_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[jump  storage="vs_mobb.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==2"]
[_tb_end_tyrano_code]

[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_battle12.mp3"  ]
[tb_start_text mode=1 ]
#アズール
このまま寮の外に放りだしてあげましょうか？[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
そっ、そんなことできないだろ！[r][p]
できないですよね・・・？[p]
[_tb_end_text]

[tb_eval  exp="f.mob_b_HP-=0"  name="mob_b_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=2"  name="azul_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[jump  storage="vs_mobb.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==3"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
素直に支払いに応じてくれれば、ローズハート寮長のように厳しく処罰することはありませんよ。[p]
[_tb_end_text]

[chara_mod  name="ジェイド"  time="600"  cross="true"  storage="chara/2/j9.png"  ]
[tb_start_text mode=1 ]
#モブ寮生
後ろにいるリーチの顔を見てから言ってみろ！[p]
[_tb_end_text]

[tb_eval  exp="f.mob_b_HP-=1"  name="mob_b_HP"  cmd="-="  op="t"  val="1"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=1"  name="azul_HP"  cmd="-="  op="t"  val="1"  val_2="undefined"  ]
[jump  storage="vs_mobb.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

*mob_2_turn

[tb_start_tyrano_code]
[if exp= "f.attack_ptn==1"]
[_tb_end_tyrano_code]

[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/j4.png"  ]
[tb_image_show  time="0"  storage="default/集中線.png"  width="960"  height="640"  ]
[quake  time="300"  count="3"  hmax="10"  wait="true"  ]
[tb_start_text mode=1 ]
#アズール
他の寮で逃げ回るなんて、ハーツラビュル寮生として恥を知りなさい！[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
寮に戻りたくない！！[p]
[_tb_end_text]

[tb_image_hide  time="1000"  ]
[tb_eval  exp="f.mob_b_HP-=2"  name="mob_b_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=0"  name="azul_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[jump  storage="vs_mobb.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==2"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
このまま寮の外に放りだしてあげましょうか？[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
そっ、そんなことできないだろ！[r][p]
できないですよね・・・？[p]
[_tb_end_text]

[tb_eval  exp="f.mob_b_HP-=0"  name="mob_b_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=2"  name="azul_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[jump  storage="vs_mobb.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==3"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
素直に支払いに応じてくれれば、ローズハート寮長のように厳しく処罰することはありませんよ。[p]
[_tb_end_text]

[chara_mod  name="ジェイド"  time="600"  cross="true"  storage="chara/2/j9.png"  ]
[tb_start_text mode=1 ]
#モブ寮生
後ろにいるリーチの顔を見てから言ってみろ！[p]
[_tb_end_text]

[tb_eval  exp="f.mob_b_HP-=1"  name="mob_b_HP"  cmd="-="  op="t"  val="1"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=1"  name="azul_HP"  cmd="-="  op="t"  val="1"  val_2="undefined"  ]
[jump  storage="vs_mobb.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

*mob_3_turn

[tb_start_tyrano_code]
[if exp= "f.attack_ptn==1"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
どこまで逃げ隠れるつもりですか？[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
お前が諦めるまで！[p]
[_tb_end_text]

[tb_eval  exp="f.mob_b_HP-=0"  name="mob_b_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=2"  name="azul_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[jump  storage="vs_mobb.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==2"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
あなたを締め上げるといくらかは出てくるでしょうか。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
ひっ！[p]
[_tb_end_text]

[tb_eval  exp="f.mob_b_HP-=1"  name="mob_b_HP"  cmd="-="  op="t"  val="1"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=1"  name="azul_HP"  cmd="-="  op="t"  val="1"  val_2="undefined"  ]
[jump  storage="vs_mobb.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==3"]
[_tb_end_tyrano_code]

[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/j9.png"  ]
[tb_image_show  time="0"  storage="default/集中線.png"  width="960"  height="640"  ]
[quake  time="300"  count="3"  hmax="10"  wait="true"  ]
[tb_start_text mode=1 ]
#アズール
オクタヴィネルのモットーは慈悲です。無理なくお支払いしていただけるようにプランをご一緒に考えますよ。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
本当はそんなに悪いやつじゃない・・・のか・・・？[p]
[_tb_end_text]

[tb_image_hide  time="1000"  ]
[tb_eval  exp="f.mob_b_HP-=2"  name="mob_b_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=0"  name="azul_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[jump  storage="vs_mobb.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

*mob_4_turn

[tb_start_tyrano_code]
[if exp= "f.attack_ptn==1"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
こんな大人数に見られていたら、卒業するまで・・・、いえ卒業してもずっと悪態を語り継がれることでしょうね。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
うう・・・[p]
[_tb_end_text]

[tb_eval  exp="f.mob_b_HP-=1"  name="mob_b_HP"  cmd="-="  op="t"  val="1"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=1"  name="azul_HP"  cmd="-="  op="t"  val="1"  ]
[jump  storage="vs_mobb.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==2"]
[_tb_end_tyrano_code]

[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/j4.png"  ]
[tb_image_show  time="0"  storage="default/集中線.png"  width="960"  height="640"  ]
[quake  time="300"  count="3"  hmax="10"  wait="true"  ]
[tb_start_text mode=1 ]
#アズール
明日から首輪を付けて学業に勤しむあなたが見れるんでしょうね。楽しみです[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
いっ、いやだ！[p]
[_tb_end_text]

[tb_image_hide  time="1000"  ]
[tb_eval  exp="f.mob_b_HP-=2"  name="mob_b_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=0"  name="azul_HP"  cmd="-="  op="t"  val="0"  ]
[jump  storage="vs_mobb.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==3"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
大分反省したのではありませんか？今なら利子はおまけしておきますよ。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
口車に乗らないぞ！[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#アズール
ちっ！[p]
[_tb_end_text]

[tb_eval  exp="f.mob_b_HP-=0"  name="mob_b_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=2"  name="azul_HP"  cmd="-="  op="t"  val="2"  ]
[jump  storage="vs_mobb.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

*mob_5_turn

[tb_start_tyrano_code]
[if exp= "f.attack_ptn==1"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
こんな大人数に見られていたら、卒業するまで・・・、いえ卒業してもずっと悪態を語り継がれることでしょうね。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
うう・・・[p]
[_tb_end_text]

[tb_eval  exp="f.mob_b_HP-=1"  name="mob_b_HP"  cmd="-="  op="t"  val="1"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=1"  name="azul_HP"  cmd="-="  op="t"  val="1"  ]
[jump  storage="vs_mobb.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==2"]
[_tb_end_tyrano_code]

[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/j4.png"  ]
[tb_image_show  time="0"  storage="default/集中線.png"  width="960"  height="640"  ]
[quake  time="300"  count="3"  hmax="10"  wait="true"  ]
[tb_start_text mode=1 ]
#アズール
明日から首輪を付けて学業に勤しむあなたが見れるんでしょうね。楽しみです[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
いっ、いやだ！[p]
[_tb_end_text]

[tb_image_hide  time="1000"  ]
[tb_eval  exp="f.mob_b_HP-=2"  name="mob_b_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=0"  name="azul_HP"  cmd="-="  op="t"  val="0"  ]
[jump  storage="vs_mobb.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==3"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
大分反省したのではありませんか？今なら利子はおまけしておきますよ。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#モブ寮生
口車に乗らないぞ！[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#アズール
ちっ！[p]
[_tb_end_text]

[tb_eval  exp="f.mob_b_HP-=0"  name="mob_b_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=2"  name="azul_HP"  cmd="-="  op="t"  val="2"  ]
[jump  storage="vs_mobb.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

