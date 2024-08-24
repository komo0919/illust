[_tb_system_call storage=system/_scene1.ks]

[cm  ]
[bg  storage="lounge.png"  time="1000"  ]
[tb_show_message_window  ]
[chara_show  name="アズール"  time="1000"  wait="true"  storage="chara/1/az3.png"  width="350"  height="600"  left="281"  top="41"  reflect="false"  ]
[tb_start_tyrano_code]
[font size=30  bold="true"]
[_tb_end_tyrano_code]

[delay  speed="30"  ]
[tb_image_show  time="0"  storage="default/集中線.png"  width="960"  height="640"  ]
[quake  time="250"  count="3"  hmax="10"  wait="true"  ]
[tb_start_text mode=1 ]
#アズール
いつまで経っても取引相手から対価が支払われない！！！[p]
[_tb_end_text]

[tb_start_tyrano_code]
[resetfont]
[_tb_end_tyrano_code]

[delay  speed="60"  ]
[tb_image_hide  time="300"  ]
[playbgm  volume="30"  time="1000"  loop="true"  storage="MusMus-BGM-102.mp3"  ]
[chara_show  name="ジェイド"  time="0"  wait="false"  storage="chara/2/ja1.png"  width="238"  height="600"  left="70"  top="44"  reflect="false"  ]
[chara_show  name="フロイド"  time="0"  wait="true"  storage="chara/3/fl1.png"  width="349"  height="600"  left="604"  top="41"  reflect="false"  ]
[tb_start_text mode=1 ]
#フロイド
うっせーな。なに大声出してんの？[p]
#アズール
悩みを解決してさしあげた生徒から、期限になっても対価が支払われなくて困っているんです。[p]
モストロに呼び集めましたが催促してものらりくらりと躱してきて完全にこちらを舐めくさっていますね。[p]
#ジェイド
残念ですが、中には逃げている方もいらっしゃるようですね[p]
#アズール
お前達！！取り立てに行きますよ！！！[p]
[_tb_end_text]

[chara_mod  name="ジェイド"  time="100"  cross="false"  storage="chara/2/ja3.png"  ]
[tb_start_text mode=2 ]
#ジェイド
営業中ですし誰かはラウンジ残らないといけませんね。[l][r]
それなら僕が残りましょう。[l][r]
[_tb_end_text]

[cm  ]
[chara_mod  name="フロイド"  time="600"  cross="false"  storage="chara/3/fl3.png"  ]
[tb_start_text mode=1 ]
#フロイド
えー捕まえに行ったら逃げ回られるじゃん。[p]
ぜってぇめんどいからオレこっちにいる～。[p]
アズールはジェイドと２人で追いかけっこしてきてよ。[p]
[_tb_end_text]

[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/ja2.png"  ]
[tb_start_text mode=1 ]
#ジェイド
フロイド……！仕方ありませんね、僕が行きます。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#アズール
まったくフロイド、お前という奴は！！ジェイドも甘やかしすぎですよ。[p]
急ぐ用件ですし、そんなこと言うならジェイドと行ってきますが、フロイド！ちゃんと働いていてくださいよ？[p]
[_tb_end_text]

[cm  ]
[chara_mod  name="フロイド"  time="300"  cross="false"  storage="chara/3/fl3.png"  ]
[tb_start_text mode=1 ]
#フロイド
はーい、分かってるってば。[p]
[_tb_end_text]

[chara_mod  name="アズール"  time="0"  cross="false"  storage="chara/1/az2.png"  ]
[chara_mod  name="フロイド"  time="0"  cross="false"  storage="chara/3/fl2.png"  ]
[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/ja1.png"  ]
[tb_start_text mode=1 ]
#アズール
約束を守れない悪いお客様は、完膚なきまでに懲らしめてやりましょう。[p]
ジェイド、見てなさいフフフ………[p]
[_tb_end_text]

[cm  ]
[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/ja1.png"  ]
[tb_start_text mode=1 ]
#ジェイド
はい。アズールの本領発揮を楽しみにしています。[p]
[_tb_end_text]

[mask  time="1000"  effect="fadeIn"  color="0x000000"  ]
[stopbgm  time="1000"  ]
[showmenubutton]

[tb_hide_message_window  ]
[chara_hide_all  time="100"  wait="true"  ]
[mask_off  time="1000"  effect="fadeOut"  ]
[jump  storage="mostro.ks"  target=""  ]
[s  ]
