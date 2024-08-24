[_tb_system_call storage=system/_title_screen.ks]

*title_start

[hidemenubutton]

[tb_clear_images]

[tb_keyconfig  flag="0"  ]
[tb_hide_message_window  ]
[playbgm  volume="30"  time="1000"  loop="true"  storage="MusMus-BGM-097.mp3"  ]
[bg  storage="title.png"  ]
*title

[clickable  storage="title_screen.ks"  x="585"  y="246"  width="299"  height="83"  target="*start"  _clickable_img=""  ]
[clickable  storage="title_screen.ks"  x="582"  y="357"  width="301"  height="84"  target="*load"  _clickable_img=""  ]
[clickable  storage="album.ks"  x="584"  y="470"  width="301"  height="84"  target=""  _clickable_img=""  ]
[s  ]
*start

[stopbgm  time="1000"  ]
[showmenubutton]

[cm  ]
[tb_keyconfig  flag="1"  ]
[jump  storage="scene1.ks"  target=""  ]
[s  ]
*load

[cm  ]
[stopbgm  time="1000"  ]
[showload]

[jump  target="*title"  storage=""  ]
[s  ]
[stopbgm  time="1000"  ]
