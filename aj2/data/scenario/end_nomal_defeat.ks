[_tb_system_call storage=system/_end_nomal_defeat.ks]

*end_defeat

[stopbgm  time="1000"  ]
[mask  time="1000"  effect="fadeIn"  color="0x000000"  ]
[chara_hide_all  time="1000"  wait="true"  ]
[bg  time="1000"  method="fadeIn"  storage="D_END_yoshiyoshi.png"  ]
[mask_off  time="1000"  effect="fadeOut"  ]
[playbgm  volume="40"  time="1000"  loop="true"  storage="水中.mp3"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
#ジェイド
おやおや、心が折れて海の底に引きこもってしまいましたか。[p]
なんてかわいそうなアズール……。[p]
[_tb_end_text]

[tb_start_text mode=1 ]
#ジェイド
立ち直るまで僕が傍にいて見守ってあげますから、ご安心くださいね。[p]
ふふふふ……[p]
[_tb_end_text]

[tb_start_text mode=1 ]
おわり（よしよしEND）[p]
[_tb_end_text]

[tb_cg  id="yoshiyoshi_end"  ]
[tb_hide_message_window  ]
[stopbgm  time="1000"  ]
[mask  time="1000"  effect="fadeIn"  color="0x000000"  ]
[bg  time="300"  method="crossfade"  storage="black.png"  ]
[mask_off  time="1000"  effect="fadeOut"  ]
[tb_image_hide  time="300"  ]
[jump  storage="title_screen.ks"  target=""  ]
