;メッセージレイヤの定義

		[position width=822 height=252 top=367 left=70 ]


		
			[position page=fore frame="gattai_hakkou1.png" margint=70 marginl=40 marginr=30 marginb=20 vertical=false ]
		

		[ptext name="chara_name_area" layer="message0" color=0xFFFFFF size=24 x=190 y=393 bold="" edge="undefined" shadow="undefined"]

		;キャラクターの表示モードに関する定義
		[chara_config ptext="chara_name_area" pos_mode=true time="600" memory="false" anim="true" effect="easeInQuad" pos_change_time="600" ]

		;キャラクターフォーカスなど
		[chara_config  talk_focus="none" ]

		;クリック待ちボタンについて
		[glyph fix="false" left="0" top="0" ]

		

            
            [button role="sleepgame" graphic="config.png" x="688" y="392" width="70" height="25" visible="false" storage="config.ks"]
            

        

            
            [button role="skip" graphic="skip.png" x="779" y="393" width="70" height="25" visible="false" ]
            

        

		;CG・回想用の共通項目
		[eval exp="sf._tb_cg_noimage='noimage.png'" ]
		[eval exp="sf._tb_replay_noimage='noimage.png'" ]

		;ふきだし用の設定（message1）
		;[position layer="message1" left=160 top=500 width=1000 height=200 radius=15 page=fore visible=true color="white" opacity=255 border_size="3" border_color="black" ]
		;[position layer="message1" page=fore margint="15" marginl="20" marginr="20" marginb="20"]

		[position layer="message1" width=822 height=252 top=367 left=70 ]
		[position layer="message1" page=fore margint=5 marginl=10 marginr=10 marginb=10 vertical=false opacity="180" radius="0" color="0x000000" ]

		