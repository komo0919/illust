[_tb_system_call storage=system/_end_judge.ks]

*judge

[bg  time="300"  method="crossfade"  storage="bar00.jpg"  ]
[playbgm  volume="20"  time="1000"  loop="true"  storage="MusMus-BGM-092.mp3"  ]
[chara_show  name="アズール"  time="300"  wait="false"  storage="chara/1/az1.png"  width="350"  height="600"  left="78"  top="50"  reflect="false"  ]
[chara_show  name="ジェイド"  time="300"  wait="true"  storage="chara/2/ja1.png"  width="238"  height="600"  left="500"  top="51"  reflect="false"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
#ジェイド
お疲れさまです。全員捕まえましたね。[p]
#アズール
手間をかけさせられた分も上増ししておきましょう。[p]
[_tb_end_text]

[chara_mod  name="アズール"  time="300"  cross="false"  storage="chara/1/az1.png"  ]
[tb_start_text mode=1 ]
#アズール
ジェイドも付いて来てくれてご苦労さまでした。[p]
#ジェイド
いえ、アズールの舌先三寸を見れて楽しかったです。[p]
[_tb_end_text]

[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/ja3.png"  ]
[tb_start_text mode=1 ]
#アズール
……僕も久しぶりにジェイドと2人きりの時間を楽しめましたよ。[p]
なにかジェイドにも礼をしないといけませんね。欲しいものはありますか？[p]

[_tb_end_text]

[chara_mod  name="ジェイド"  time="0"  cross="false"  storage="chara/2/ja2.png"  ]
[tb_start_text mode=1 ]
#ジェイド
それなら…、もう少し一緒にいていただくのはダメでしょうか？[p]
[_tb_end_text]

[chara_mod  name="アズール"  time="300"  cross="false"  storage="chara/1/az2.png"  ]
[tb_start_text mode=1 ]
#アズール
……では、VIPルームで紅茶を淹れてくれませんか[p]
[_tb_end_text]

[chara_mod  name="ジェイド"  time="300"  cross="false"  storage="chara/2/ja2.png"  ]
[tb_start_text mode=1 ]
#ジェイド
もちろん。ポットとお茶菓子も持っていきますね。[p]
[_tb_end_text]

[mask  time="1000"  effect="fadeIn"  color="0x000000"  ]
[tb_hide_message_window  ]
[chara_hide_all  time="300"  wait="true"  ]
[bg  time="300"  method="crossfade"  storage="black.png"  ]
[bg  time="300"  method="crossfade"  storage="A_END_teatime.png"  ]
[tb_cg  id="nomal_end"  ]
[mask_off  time="1000"  effect="fadeOut"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
#
おわり（ティータイムEND）[p]
[_tb_end_text]

[tb_hide_message_window  ]
[mask  time="1000"  effect="fadeIn"  color="0x000000"  ]
[tb_image_hide  time="300"  ]
[bg  time="300"  method="crossfade"  storage="black.png"  ]
[mask_off  time="1000"  effect="fadeOut"  ]
[jump  storage="title_screen.ks"  target=""  ]
