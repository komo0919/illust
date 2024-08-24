[_tb_system_call storage=system/_title_screen.ks]

[hidemenubutton]

[tb_clear_images]

[tb_keyconfig  flag="0"  ]
[tb_hide_message_window  ]
[bg  storage="title.png"  ]
*title

[clickable  storage="title_screen.ks"  x="591"  y="295"  width="299"  height="83"  target="*start"  _clickable_img=""  ]
[clickable  storage="title_screen.ks"  x="588"  y="422"  width="301"  height="84"  target="*load"  _clickable_img=""  ]
[s  ]
*start

[showmenubutton]

[cm  ]
[tb_keyconfig  flag="1"  ]
[jump  storage="scene1.ks"  target=""  ]
[s  ]
*load

[cm  ]
[showload]

[jump  target="*title"  storage=""  ]
[s  ]
