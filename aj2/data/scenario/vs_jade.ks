[_tb_system_call storage=system/_vs_jade.ks]

*vs_jade

[bg  time="0"  method="crossfade"  storage="lounge.png"  ]
[playbgm  volume="20"  time="1000"  loop="true"  storage="MusMus-BGM-156.mp3"  ]
[chara_show  name="ジェイド"  time="1000"  wait="true"  storage="chara/2/ja1.png"  width="240"  height="600"  left="400"  top="68"  reflect="false"  ]
[tb_show_message_window  ]
[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/ja4.png"  ]
[tb_start_text mode=2 ]
#ジェイド
さすがはアズール、痺れるような罵倒…いえ慈悲でした。[p][l][r]
さて、僕ともオハナシいたしませんか？[l][r]
[_tb_end_text]

[tb_start_text mode=2 ]
#アズール
は？[l][r]
[_tb_end_text]

[tb_start_text mode=2 ]
#ジェイド
僕もアズールを打ち負かしたいです。[l][r]
[_tb_end_text]

[tb_start_text mode=2 ]
#アズール
とんだ悪趣味だな……。[l][r]
いいですよ、僕はお前の口の悪さなんて慣れっこなんだよ！[l][r]
[_tb_end_text]

[chara_show  name="ターン"  time="0"  wait="true"  storage="chara/15/turn_1.png"  width="100"  height="100"  left="110"  top="32"  reflect="false"  ]
[chara_show  name="ジェイドLOVE"  time="0"  wait="true"  storage="chara/13/jadeLOVE_0.png"  width="307"  height="35"  left="320"  top="20"  reflect="false"  ]
[chara_show  name="アズール"  time="0"  wait="true"  storage="chara/1/a6.png"  width="200"  height="200"  left="692"  top="98"  reflect="false"  ]
*ohanashi

[chara_mod  name="アズール"  time="0"  cross="true"  storage="chara/1/a6.png"  ]
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

[chara_show  name="アズールHP"  time="0"  wait="true"  storage="chara/14/azul_HP.png"  width="190"  height="20"  left="691"  top="311"  reflect="false"  ]
[chara_mod  name="ジェイド"  time="600"  cross="true"  storage="chara/2/ja1.png"  ]
[glink  color="btn_14_black"  storage="vs_jade.ks"  size="20"  target="*kansha"  text="感謝を伝える"  x="90"  y="160"  width="250"  height=""  _clickable_img=""  ]
[glink  color="btn_14_black"  storage="vs_jade.ks"  size="20"  target="*omoide"  text="思い出に浸る"  x="90"  y="230"  width="250"  height=""  _clickable_img=""  ]
[glink  color="btn_14_black"  storage="vs_jade.ks"  size="20"  target="*suki"  text="好きなところを言う"  x="90"  y="300"  width="250"  height=""  _clickable_img=""  ]
[s  ]
*kansha

[tb_eval  exp="f.attack_ptn=1"  name="attack_ptn"  cmd="="  op="t"  val="1"  val_2="undefined"  ]
[jump  storage="vs_jade.ks"  target="*turn"  ]
*omoide

[tb_eval  exp="f.attack_ptn=2"  name="attack_ptn"  cmd="="  op="t"  val="2"  val_2="undefined"  ]
[jump  storage="vs_jade.ks"  target="*turn"  ]
*suki

[tb_eval  exp="f.attack_ptn=3"  name="attack_ptn"  cmd="="  op="t"  val="3"  val_2="undefined"  ]
[jump  storage="vs_jade.ks"  target="*turn"  ]
*HP

[jump  storage="vs_jade.ks"  target="*0"  cond="f.jade_LOVE==0"  ]
[jump  storage="vs_jade.ks"  target="*1"  cond="f.jade_LOVE==1"  ]
[jump  storage="vs_jade.ks"  target="*2"  cond="f.jade_LOVE==2"  ]
[jump  storage="vs_jade.ks"  target="*3"  cond="f.jade_LOVE==3"  ]
[jump  storage="vs_jade.ks"  target="*4"  cond="f.jade_LOVE==4"  ]
[jump  storage="vs_jade.ks"  target="*5"  cond="f.jade_LOVE==5"  ]
[jump  storage="vs_jade.ks"  target="*5"  cond="f.jade_LOVE>5"  ]
*0

[jump  storage="vs_jade.ks"  target="*ohanashi"  ]
*1

[chara_mod  name="ジェイドLOVE"  time="300"  cross="true"  storage="chara/13/jadeLOVE_1.png"  ]
[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_magical01.mp3"  ]
[chara_mod  name="ジェイド"  time="600"  cross="true"  storage="chara/2/ja2.png"  ]
[tb_start_text mode=1 ]
#ジェイド
ふふ・・・アズールあなたという人は・・・[p]
[_tb_end_text]

[jump  storage="vs_jade.ks"  target="*ohanashi"  ]
*2

[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_magical01.mp3"  ]
[chara_mod  name="ジェイドLOVE"  time="300"  cross="true"  storage="chara/13/jadeLOVE_2.png"  ]
[jump  storage="vs_jade.ks"  target="*ohanashi"  ]
*3

[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_magical01.mp3"  ]
[chara_mod  name="ジェイドLOVE"  time="300"  cross="true"  storage="chara/13/jadeLOVE_3.png"  ]
[jump  storage="vs_jade.ks"  target="*ohanashi"  ]
*4

[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_magical01.mp3"  ]
[chara_mod  name="ジェイドLOVE"  time="300"  cross="true"  storage="chara/13/jadeLOVE_4.png"  ]
[jump  storage="vs_jade.ks"  target="*ohanashi"  ]
*5

[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_magical01.mp3"  ]
[chara_mod  name="ジェイドLOVE"  time="300"  cross="true"  storage="chara/13/jadeLOVE_MAX.png"  ]
[cm  ]
[stopbgm  time="1000"  ]
[jump  storage="end_max_love.ks"  target="*max_love_end"  ]
*azul_HP

[jump  storage="vs_jade.ks"  target="*az_5"  cond="f.azul_HP==5"  ]
[jump  storage="vs_jade.ks"  target="*az_4"  cond="f.azul_HP==4"  ]
[jump  storage="vs_jade.ks"  target="*az_3"  cond="f.azul_HP==3"  ]
[jump  storage="vs_jade.ks"  target="*az_2"  cond="f.azul_HP==2"  ]
[jump  storage="vs_jade.ks"  target="*az_1"  cond="f.azul_HP==1"  ]
[jump  storage="vs_jade.ks"  target="*az_0"  cond="f.azul_HP==0"  ]
[jump  storage="vs_jade.ks"  target="*az_0"  cond="f.azul_HP<0"  ]
*az_5

[jump  storage="vs_jade.ks"  target="*HP"  ]
*az_4

[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_battle14.mp3"  ]
[chara_mod  name="アズールHP"  time="300"  cross="true"  storage="chara/14/azul_HP_4.png"  ]
[jump  storage="vs_jade.ks"  target="*HP"  ]
*az_3

[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_battle14.mp3"  ]
[chara_mod  name="アズールHP"  time="300"  cross="true"  storage="chara/14/azul_HP_3.png"  ]
[jump  storage="vs_jade.ks"  target="*HP"  ]
*az_2

[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_battle14.mp3"  ]
[chara_mod  name="アズールHP"  time="300"  cross="true"  storage="chara/14/azul_HP_2.png"  ]
[jump  storage="vs_jade.ks"  target="*HP"  ]
*az_1

[chara_mod  name="アズールHP"  time="300"  cross="true"  storage="chara/14/azul_HP_1.png"  ]
[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_battle14.mp3"  ]
[jump  storage="vs_jade.ks"  target="*HP"  ]
*az_0

[playse  volume="50"  time="1000"  buf="0"  storage="maou_se_battle14.mp3"  ]
[chara_mod  name="アズールHP"  time="300"  cross="true"  storage="chara/14/azul_HP_0.png"  ]
[tb_start_text mode=1 ]
#アズール
こんなはずでは・・・！[p]
[_tb_end_text]

[cm  ]
[jump  storage="end_jade_defeat.ks"  target="*end_jade_defeat"  ]
*turn

[jump  storage="vs_jade.ks"  target="*jade_1_turn"  cond="f.turn==1"  ]
[jump  storage="vs_jade.ks"  target="*jade_2_turn"  cond="f.turn==2"  ]
[jump  storage="vs_jade.ks"  target="*jade_3_turn"  cond="f.turn==3"  ]
[jump  storage="vs_jade.ks"  target="*jade_4_turn"  cond="f.turn==4"  ]
[jump  storage="vs_jade.ks"  target="*jade_5_turn"  cond="f.turn==5"  ]
*jade_1_turn

[tb_start_tyrano_code]
[if exp= "f.attack_ptn==1"]
[_tb_end_tyrano_code]

[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/ja3.png"  ]
[tb_start_text mode=1 ]
#アズール
いつもサポートをしてくれて助かっています。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#ジェイド
……恐縮です。[p]
[_tb_end_text]

[tb_eval  exp="f.jade_LOVE+=1"  name="jade_LOVE"  cmd="+="  op="t"  val="1"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=1"  name="azul_HP"  cmd="-="  op="t"  val="1"  ]
[jump  storage="vs_jade.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==2"]
[_tb_end_tyrano_code]

[tb_image_show  time="0"  storage="default/集中線.png"  width="960"  height="640"  ]
[quake  time="300"  count="3"  hmax="10"  wait="true"  ]
[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/ja2.png"  ]
[tb_start_text mode=1 ]
#アズール
今日はずっと一緒にいて、あらためてジェイドがいると安心できる気持ちに気づきました。[p]

[_tb_end_text]

[tb_start_text mode=1 ]
#ジェイド
僕もアズールの自信溢れる靴音を聞くと安心します。[p]
[_tb_end_text]

[tb_image_hide  time="1000"  ]
[tb_eval  exp="f.jade_LOVE+=2"  name="jade_LOVE"  cmd="+="  op="t"  val="2"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=0"  name="azul_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[jump  storage="vs_jade.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==3"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#ジェイド
取り立ての様子を拝見していましたが、まだまだアズールにも効率化していただく余地がありますね[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#アズール
そういうなら自分でしてみたらどうですか？見ていてあげますよ。[p]
[_tb_end_text]

[tb_eval  exp="f.jade_LOVE-=0"  name="jade_LOVE"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=2"  name="azul_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[jump  storage="vs_jade.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

*jade_2_turn

[tb_start_tyrano_code]
[if exp= "f.attack_ptn==1"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#ジェイド
何人も支払う前に逃げてしまうなんて、管理が足りないのではありませんか？[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#アズール
その点は否めませんね。後で防止策を強化するとしましょう。協力してもらえますね？[p]
ジェイドの力が必要なんです。[p]
[_tb_end_text]

[tb_eval  exp="f.jade_LOVE+=1"  name="jade_LOVE"  cmd="+="  op="t"  val="1"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=1"  name="azul_HP"  cmd="-="  op="t"  val="1"  ]
[jump  storage="vs_jade.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==2"]
[_tb_end_tyrano_code]

[tb_image_show  time="0"  storage="default/集中線.png"  width="960"  height="640"  ]
[quake  time="300"  count="3"  hmax="10"  wait="true"  ]
[tb_start_text mode=1 ]
#アズール
思い返せばいい気分転換になりましたね。最近忙しかったですし。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#ジェイド
ええ、そうですね。雑魚の皆さんの慌てふためくは表情たまりません。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#アズール
支払いはすぐにしてほしいですが、次回用に少しはストックしておきましょうか。[p]
[_tb_end_text]

[tb_image_hide  time="1000"  ]
[tb_eval  exp="f.jade_LOVE+=2"  name="jade_LOVE"  cmd="+="  op="t"  val="2"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=0"  name="azul_HP"  cmd="-="  op="t"  val="0"  ]
[jump  storage="vs_jade.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==3"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#ジェイド
もし全員に走り回られていたら、完全に取り逃がしていたかもしれませんね。[p]
金勘定をしながらダッシュのトレーニングを取り入れてみては？[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#アズール
できるか！[p]
[_tb_end_text]

[tb_eval  exp="f.jade_LOVE+=0"  name="jade_LOVE"  cmd="+="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=2"  name="azul_HP"  cmd="-="  op="t"  val="2"  ]
[jump  storage="vs_jade.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

*jade_3_turn

[tb_start_tyrano_code]
[if exp= "f.attack_ptn==1"]
[_tb_end_tyrano_code]

[chara_mod  name="アズール"  time="600"  cross="true"  storage="chara/1/a8.png"  ]
[tb_start_text mode=1 ]
#ジェイド
滞納者を呼び出す時は鎖で繋いで海に沈めておいた方がいいですね。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#アズール
回収できなくなるでしょうが！[p]
[_tb_end_text]

[tb_eval  exp="f.jade_LOVE+=0"  name="jade_LOVE"  cmd="+="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=2"  name="azul_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[jump  storage="vs_jade.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==2"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#ジェイド
今回の取り立ては楽しかったです。僕も他の延滞者を匿ってみればまた楽しめるでしょうか。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#アズール
その時は力ずくでお前をねじ伏せてみせますよ。楽しみにしておきなさい。[p]
[_tb_end_text]

[tb_eval  exp="f.jade_LOVE+=1"  name="jade_LOVE"  cmd="+="  op="t"  val="1"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=1"  name="azul_HP"  cmd="-="  op="t"  val="1"  val_2="undefined"  ]
[jump  storage="vs_jade.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==3"]
[_tb_end_tyrano_code]

[chara_mod  name="アズール"  time="600"  cross="true"  storage="chara/1/a7.png"  ]
[tb_image_show  time="0"  storage="default/集中線.png"  width="960"  height="640"  ]
[quake  time="300"  count="3"  hmax="10"  wait="true"  ]
[tb_start_text mode=1 ]
#アズール
こんなに遊びたかったのなら、次回はジェイドに任せましょうか？[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#ジェイド
アズールが見ていてくださるのなら張り切り甲斐もありますね。[p]
[_tb_end_text]

[tb_image_hide  time="1000"  ]
[tb_eval  exp="f.jade_LOVE+=2"  name="jade_LOVE"  cmd="+="  op="t"  val="2"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=0"  name="azul_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[jump  storage="vs_jade.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

*jade_4_turn

[tb_start_tyrano_code]
[if exp= "f.attack_ptn==1"]
[_tb_end_tyrano_code]

[tb_image_show  time="0"  storage="default/集中線.png"  width="960"  height="640"  ]
[quake  time="300"  count="3"  hmax="10"  wait="true"  ]
[chara_mod  name="アズール"  time="600"  cross="true"  storage="chara/1/a7.png"  ]
[tb_start_text mode=1 ]
#アズール
考えればジェイドがいたおかげで上手く取り立てできたのかもしれませんね。[p]
[_tb_end_text]

[chara_mod  name="ジェイド"  time="600"  cross="true"  storage="chara/2/ja3.png"  ]
[tb_start_text mode=1 ]
#ジェイド
アズール、あなた……、もしかして死ぬんですか？なにか不治の病でも？[p]
僕が力になれることはあるでしょうか。[p]
[_tb_end_text]

[chara_mod  name="ジェイド"  time="0"  cross="true"  storage="chara/2/ja4.png"  ]
[chara_mod  name="アズール"  time="600"  cross="true"  storage="chara/1/a8.png"  ]
[tb_start_text mode=1 ]
#アズール
どうして僕が死ぬことになるんだ！[p]
[_tb_end_text]

[tb_image_hide  time="1000"  ]
[tb_eval  exp="f.jade_LOVE+=2"  name="jade_LOVE"  cmd="+="  op="t"  val="2"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=0"  name="azul_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[jump  storage="vs_jade.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==2"]
[_tb_end_tyrano_code]

[chara_mod  name="アズール"  time="600"  cross="true"  storage="chara/1/a8.png"  ]
[tb_start_text mode=1 ]
#アズール
しかし、フロイドが早々に逃げ出したのは困りますね。せめてしっかりモストロをしていてもらいたいものです。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#ジェイド
はぁ……アズール、貴方本心で言っていますか？[p]
[_tb_end_text]

[tb_eval  exp="f.jade_LOVE+=0"  name="jade_LOVE"  cmd="+="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=2"  name="azul_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[jump  storage="vs_jade.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==3"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
まったくお前はとんだ厄介な奴ですね。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#ジェイド
お嫌いではないのでしょう？アズールの性癖が悪いのではありませんか？[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#アズール
ふん……お互い様ですよ。[p]
[_tb_end_text]

[tb_eval  exp="f.jade_LOVE+=1"  name="jade_LOVE"  cmd="+="  op="t"  val="1"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=1"  name="azul_HP"  cmd="-="  op="t"  val="1"  val_2="undefined"  ]
[jump  storage="vs_jade.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

*jade_5_turn

[tb_start_tyrano_code]
[if exp= "f.attack_ptn==1"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#ジェイド
取り立ての様子を拝見していて、あらためて思いましたがアズールの性格の悪さはやはり1等品ですね。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#アズール
後ろでニヤニヤしながら見ていたお前に言われたくありませんが？楽しめたでしょう？[p]
[_tb_end_text]

[tb_eval  exp="f.jade_LOVE+=0"  name="jade_LOVE"  cmd="+="  op="t"  val="0"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=2"  name="azul_HP"  cmd="-="  op="t"  val="2"  val_2="undefined"  ]
[jump  storage="vs_jade.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==2"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
#アズール
ああ……そういえば、他にも一人直近の支払い予定の方がいましたね。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#ジェイド
残業ですか？[p]
[_tb_end_text]

[tb_eval  exp="f.jade_LOVE+=1"  name="jade_LOVE"  cmd="+="  op="t"  val="1"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=1"  name="azul_HP"  cmd="-="  op="t"  val="1"  val_2="undefined"  ]
[jump  storage="vs_jade.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[elsif exp= "f.attack_ptn==3"]
[_tb_end_tyrano_code]

[tb_image_show  time="0"  storage="default/集中線.png"  width="960"  height="640"  ]
[quake  time="300"  count="3"  hmax="10"  wait="true"  ]
[chara_mod  name="アズール"  time="600"  cross="true"  storage="chara/1/a7.png"  ]
[tb_start_text mode=1 ]
#アズール
こうして二人で歩き回るのも楽しかったですが……、来週末くらいに街にデートしに行きませんか？[p]
[_tb_end_text]

[chara_mod  name="ジェイド"  time="600"  cross="true"  storage="chara/2/ja2.png"  ]
[tb_start_text mode=1 ]
#ジェイド
おやおや……。ふふふ……ええ、喜んで。[p]
[_tb_end_text]

[tb_image_hide  time="1000"  ]
[chara_mod  name="アズール"  time="300"  cross="false"  storage="chara/1/a7.png"  ]
[tb_eval  exp="f.jade_LOVE+=2"  name="jade_LOVE"  cmd="+="  op="t"  val="2"  val_2="undefined"  ]
[tb_eval  exp="f.azul_HP-=0"  name="azul_HP"  cmd="-="  op="t"  val="0"  val_2="undefined"  ]
[jump  storage="vs_jade.ks"  target="*azul_HP"  ]
[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

