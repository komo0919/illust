;(function () {
    /**
     * セーブ後か判定用変数
     */
    let is_reload = false
    let is_keyconfig = TYRANO.kag.stat.enable_keyconfig

    let submitOk = ""
    let submitCancel = ""
    let audio_obj = null

    /**
     * ホバー時ファイル存在確認
     */
    const checkFile = function () {
        const sl = TYRANO.kag.variable.sf._saveload
        //ページ画像以外
        const img = [
            "back_img",
            "slot_bg_auto",
            "slot_bg",
            "lock_img_lock",
            "lock_img_unlock",
            "delete_img_delete",
            "delete_img_undelete",
            "comment_button_img",
        ]
        img.forEach(function (item) {
            if (sl[item]) {
                $.ajax(`data/image/${sl[item].replace(".png", "_h.png")}`)
                    .done(function (result) {
                        sl[item + "_h"] = sl[item].replace(".png", "_h.png")
                    })
                    .fail(function () {
                        sl[item + "_h"] = sl[item]
                    })
            }
        })

        //ページ画像
        if (sl.slot !== 0) {
            //ページ分割ありの場合
            $.ajax(`data/image/${sl.page_img.replace("{page}", "1").replace(".png", "_h.png")}`)
                .done(function (result) {
                    sl["page_img_h"] = sl.page_img.replace(".png", "_h.png")
                })
                .fail(function () {
                    sl["page_img_h"] = sl.page_img
                })
            $.ajax(`data/image/${sl.page_img.replace("{page}", "1").replace(".png", "_a.png")}`)
                .done(function (result) {
                    sl["page_img_a"] = sl.page_img.replace(".png", "_a.png")
                })
                .fail(function () {
                    sl["page_img_a"] = sl.page_img
                })
        }
    }
    checkFile()

    const setMessage = (message, num) => {
        return message.replace("{num}", num)
    }

    /**
     * ページ移動
     * @param {jQuery} j_save
     * @param {jQuery} elm $(this)
     * @param {num} page
     * @param {String} type "save" or "load"
     */
    const changePage = function (j_save, elm, page, type) {
        page = page === undefined ? 0 : page
        j_save.find(`.save_list_item[data-page=${page}]`).show()
        j_save.find(`.save_list_item:not([data-page=${page}])`).hide()
        // //現在のページ番号と対応するスロットのみ表示する
        // if (page != $(elm).attr("data-page")) {
        //     $(elm).hide()
        // } else {
        //     $(elm).show()
        // }
        //現在のページ番号を保存する
        if (type == "save" || TYRANO.kag.variable.sf._saveload.memory == 2) {
            TYRANO.kag.variable.sf._save_page = page
        } else if (type == "load") {
            TYRANO.kag.variable.sf._load_page = page
        }
        TYRANO.kag.saveSystemVariable()
    }

    /**
     * ページャー表示
     * @param {jQuery} j_save
     * @param {num} page
     */
    const displayPage = function (j_save, page) {
        $(j_save)
            .find(".area_page_list img")
            .each(function () {
                const src = $(this).attr("data-normal")
                const hov = $(this).attr("data-hover")
                const act = $(this).attr("data-active")
                if ($(this).attr("data-page") == page) {
                    //アクティブページはアクティブ用画像にする
                    $(this).attr("src", act)
                } else {
                    //それ以外は通常時画像
                    $(this).attr("src", src)
                }
            })
    }

    /**
     * ページ番号セット
     * @param {jQuery} elm $(this)
     */
    const setDataPage = function (elm) {
        //        let num = Number.isNaN(parseInt($(elm).attr("data-num"))) ? 0 : parseInt($(elm).attr("data-num")) + 1
        const num = parseInt($(elm).attr("data-num"))
        let page = returnPage(num)
        $(elm).attr("data-page", page)
    }

    /**
     * 各セーブスロットにページ情報を付与
     * @returns {num} page
     */
    const setPage = function () {
        var page = []
        if (TYRANO.kag.variable.sf._saveload.slot != 0) {
            const auto_slot = 0 //TYRANO.kag.variable.sf._saveload.auto ? 1 : 0
            const total_slot = parseInt(TYRANO.kag.config.configSaveSlotNum) + auto_slot
            for (var i = 0; i < total_slot / TYRANO.kag.variable.sf._saveload.slot; i++) {
                page.push({num: i})
            }
        }
        return page
    }

    /**
     * スロット番号をもとにページ番号を返す
     * @param {num} num
     * @returns {num} page
     */
    const returnPage = function (num) {
        let page = 0
        if (TYRANO.kag.variable.sf._saveload.slot != 0) {
            page = Math.floor(num / TYRANO.kag.variable.sf._saveload.slot)
        }
        return page
    }

    /**
     * 実際のページ遷移処理
     * @param {jQuery} j_save
     */
    const movePage = function (j_save) {
        j_save.find(".page").on("click", function (e) {
            playSe(TYRANO.kag.variable.sf._saveload.page_se)
            let page = $(this).attr("data-page")
            //j_save.find(".save_display_area").each(function () {
            changePage(j_save, this, page, "save")
            //})
            displayPage(j_save, page)
        })
    }

    /**
     * 日付ゼロ埋め
     * @returns {string} date
     */
    const zeroDate = function () {
        var nowdate = new Date()
        var year = nowdate.getFullYear()
        var mon = ("00" + (nowdate.getMonth() + 1)).slice(-2)
        var date = ("00" + nowdate.getDate()).slice(-2)
        return year + "/" + mon + "/" + date
    }

    /**
     * 時間ゼロ埋め
     * @returns {string} time
     */
    const zeroTime = function () {
        var nowdate = new Date()
        var h = ("00" + nowdate.getHours()).slice(-2)
        var m = ("00" + nowdate.getMinutes()).slice(-2)
        var s = ("00" + nowdate.getSeconds()).slice(-2)
        return h + ":" + m + ":" + s
    }

    /**
     * SEを鳴らす
     * @param {string} se filepath at sound/
     * @param {function} cb
     */
    const playSe = function (se, cb) {
        //指定されたバッファまたはデフォルトSEボリューム取得
        const sebuf = TYRANO.kag.stat.map_se_volume[TYRANO.kag.variable.sf._saveload.sebuf] || TYRANO.kag.config.defaultSeVolume
        const volume = parseInt(sebuf) / 100
        if (se === undefined) {
            //未定義の場合はSEなしと同じ動作にする
            se = ""
        }
        if (volume === 0) {
            //SEミュートの場合はSEなしと同じ動作にする
            se = ""
        }
        if (se != "") {
            //iPhoneかつ拡張子がoggの場合、m4aに変換
            if ($.userenv() === "iphone" && se.indexOf(".ogg") > 0) {
                se = se.replace(".ogg", ".m4a")
            }
            if (audio_obj !== null) {
                audio_obj.stop()
                audio_obj.unload()
            }
            audio_obj = new Howl({
                src: `./data/sound/${se}`,
                volume: volume,
                onend: (e) => {
                    if (typeof cb == "function") {
                        cb()
                    }
                },
                onloaderror: (e) => {
                    //エラー時はスルー
                    if (typeof cb == "function") {
                        cb()
                    }
                },
            })
            audio_obj.play()
        } else {
            if (typeof cb == "function") {
                cb()
            }
        }
    }

    /**
     * メニュー画面からゲーム画面へ遷移時効果
     * @param {function} cb
     */
    const hideSaveLoad = function (cb) {
        $(".menu_mask").fadeIn(TYRANO.kag.variable.sf._saveload.masktime, function () {
            const layer_menu = TYRANO.kag.layer.getMenuLayer()
            layer_menu.fadeOut(TYRANO.kag.variable.sf._saveload.fadetime, function () {
                layer_menu.hide()
                layer_menu.empty()
                if (that.kag.stat.visible_menu_button == true) {
                    $(".button_menu").show()
                }
                if (typeof cb == "function") {
                    is_clicked = false
                    cb()
                }
            })
        })
    }

    /**
     * スロット番号表示
     * @param {jQuery} j_save
     * @returns false
     */
    const displayNum = function (j_save) {
        const sl = TYRANO.kag.variable.sf._saveload
        if (!sl.num) {
            return false
        }
        j_save.find(".save_list_item_num").each(function () {
            if (Number.isNaN(parseInt($(this).attr("data-num")))) {
                $(this).html(sl.num_format.replace("{num}", ""))
            } else {
                const num = parseInt($(this).attr("data-num")) + 1
                $(this).html(sl.num_format.replace("{num}", num.toString().padStart(sl.num_length, "0")))
            }
        })
    }

    /**
     * コメント入力欄表示
     * @param {jQuery} elm $(this)
     * @param {array} array_save save data
     */
    const setComment = function (elm, array_save) {
        if (TYRANO.kag.variable.sf._saveload.comment) {
            $(elm)
                .find(".save_list_item_comment")
                .each(function () {
                    if (Number.isNaN(parseInt($(this).attr("data-num")))) {
                        $(elm).find(".save_list_item_comment").hide()
                        $(elm).find(".save_list_item_submit").hide()
                    } else {
                        $(this).on("click", function (e) {
                            //コメント欄をクリックしてもセーブorロードはさせない
                            e.stopPropagation()
                        })
                    }
                })
            $(elm)
                .find(".save_list_item_submit")
                .each(function () {
                    $(this).on("click", function (e) {
                        if (Number.isNaN(parseInt($(this).attr("data-num")))) {
                            $(elm).find(".save_list_item_comment").hide()
                            $(elm).find(".save_list_item_submit").hide()
                        } else {
                            //更新ボタンクリックしたらコメント保存
                            e.stopPropagation()
                            playSe(TYRANO.kag.variable.sf._saveload.comment_se)
                            let array = array_save.data
                            let num = $(elm).attr("data-num")
                            let comment = $(".save_list_item_comment[data-num=" + num + "]").attr("value")
                            array[num].comment = comment
                            $.setStorage(that.kag.config.projectID + "_tyrano_data", array_save, that.kag.config.configSave)
                        }
                    })
                })
        } else {
            //コメント欄非表示
            $(elm).find(".save_list_item_comment").hide()
            $(elm).find(".save_list_item_submit").hide()
        }
    }

    //
    /**
     * セーブデータ保護・削除ボタン表示
     * @param {jQuery} n j_save
     * @param {array} array_save
     * @param {string} type "save" or
     * @param {function} cb
     */
    const setProtectDelete = function (n, array_save, type, cb, cb_close) {
        that = TYRANO
        let array = array_save.data
        //削除ボタン表示するか
        if (!TYRANO.kag.variable.sf._saveload.delete) {
            n.find(".save_list_item_delete").each(function () {
                $(this).hide()
            })
        } else {
            n.find(".save_list_item_delete").each(function () {
                if (Number.isNaN(parseInt($(this).attr("data-num")))) {
                    $(this).hide()
                } else {
                    let slot_data = array[$(this).attr("data-num")].save_date
                    if (slot_data == "") {
                        $(this).hide()
                    } else {
                        $(this).show()
                    }
                }
            })
        }
        //保護ボタン表示するか
        if (!TYRANO.kag.variable.sf._saveload.lock) {
            n.find(".save_list_item_lock").each(function () {
                $(this).hide()
            })
        } else {
            n.find(".save_list_item_lock").each(function () {
                if (Number.isNaN(parseInt($(this).attr("data-num")))) {
                    $(this).hide()
                } else {
                    let slot_data = array[$(this).attr("data-num")].save_date
                    if (slot_data == "") {
                        $(this).hide()
                    } else {
                        $(this).show()
                    }
                }
            })
        }

        //セーブデータ保護
        n.find(".save_list_item_lock").each(function () {
            $(this).on("click", function (e) {
                playSe(TYRANO.kag.variable.sf._saveload.lock_se)
                var num = $(this).attr("data-num")
                let img = $(this).attr("src")
                let img_lock = $(this).attr("data-src")
                let img_unlock = $(this).attr("data-src-u")
                let trash = $(this).next()
                let img_trash = trash.attr("data-src")
                let img_untrash = trash.attr("data-src-u")
                const sl = TYRANO.kag.variable.sf._saveload
                if (array[num].save_date != "") {
                    array[num].lock = !array[num].lock
                    if (array[num].lock) {
                        $(this).attr("src", img_lock)
                        $(this).attr("data-lock", "true")
                        trash.attr("data-delete", "false")
                        trash.attr("src", img_untrash)
                        $(this).attr("data-hover", `data/image/${sl.lock_img_lock_h}`)
                        trash.attr("data-hover", `data/image/${sl.delete_img_undelete_h}`)
                        $(this).attr("data-normal", img_lock)
                        trash.attr("data-normal", img_untrash)
                    } else {
                        $(this).attr("src", img_unlock)
                        $(this).attr("data-lock", "false")
                        trash.attr("data-delete", "true")
                        trash.attr("src", img_trash)
                        $(this).attr("data-hover", `data/image/${sl.lock_img_unlock_h}`)
                        trash.attr("data-hover", `data/image/${sl.delete_img_delete_h}`)
                        $(this).attr("data-normal", img_unlock)
                        trash.attr("data-normal", img_trash)
                    }
                    $.setStorage(that.kag.config.projectID + "_tyrano_data", array_save, that.kag.config.configSave)
                    e.stopPropagation()
                }
            })
        })
        //セーブデータ削除
        n.find(".save_list_item_delete").each(function () {
            $(this).on("click", function (e) {
                var num = parseInt($(this).attr("data-num"))
                let del = $(this).attr("data-delete")
                if (del == "false") {
                    //セーブデータ保護されている場合、何もしない
                } else {
                    const deleteSave = function () {
                        TYRANO.kag.menu.clearSave(num)
                        if (TYRANO.kag.variable.sf._newslot == num) {
                            TYRANO.kag.variable.sf._newslot = null
                            TYRANO.kag.saveSystemVariable()
                        }
                        //モーダルボタン一旦戻す
                        const that = TYRANO.kag.ftag.master_tag.dialog_config
                        that.j_ok.text(submitOk)
                        that.j_cancel.text(submitCancel)
                        //セーブ情報更新して画面再表示
                        if (type == "save") {
                            TYRANO.kag.menu.displaySave(cb, cb_close)
                        } else {
                            TYRANO.kag.menu.displayLoad(cb)
                        }
                    }

                    //削除する
                    playSe(TYRANO.kag.variable.sf._saveload.delete_se)
                    if (TYRANO.kag.variable.sf._saveload.dialog_delete) {
                        //ダイアログあり
                        const that = TYRANO.kag.ftag.master_tag.dialog_config
                        that.j_ok.text("削除する")
                        that.j_cancel.text("削除しない")
                        $.confirm(
                            setMessage(TYRANO.kag.variable.sf._saveload.message_delete, parseInt(num) + 1),
                            function () {
                                //OK
                                deleteSave()
                            },
                            function () {
                                //Cancel
                            }
                        )
                    } else {
                        //ダイアログなし
                        deleteSave()
                    }
                }
                e.stopPropagation()
            })
        })
    }

    /**
     * 最新セーブデータ画像表示
     * @param {jQuery} j_save
     */
    const displayNew = function (j_save) {
        if (TYRANO.kag.variable.sf._saveload.new) {
            j_save.find(".save_list_item_new").each(function () {
                if (Number.isNaN(parseInt($(this).attr("data-num")))) {
                    $(this).hide()
                } else {
                    const num = $(this).attr("data-num")
                    const isSaveData = j_save.find(".save_list_item_date").text() !== ""
                    const img = j_save.find(".save_list_item_thumb img")
                    //最新セーブデータ表示する場合かつ該当スロットにセーブデータが存在する場合
                    if (TYRANO.kag.variable.sf._newslot == num && isSaveData) {
                        $(this).show()
                    } else {
                        //最新セーブデータを削除した場合、最新セーブデータ画像は表示されなくなる
                        $(this).hide()
                    }
                }
            })
        } else {
            //最新セーブデータ表示しない
            j_save.find(".save_list_item_new").each(function () {
                $(this).hide()
            })
        }
    }

    /**
     * ボタンホバー時効果をセット
     * @param {jQuery} j_save
     */
    const hoverButton = function (j_save) {
        let tmp_src = ""
        const sf = TYRANO.kag.variable.sf._saveload
        //戻るボタン、保護ボタン、削除ボタン、コメント更新ボタン
        $(j_save)
            .find(".menu_close_image,.save_list_item_lock,.save_list_item_delete,.save_list_item_submit")
            .on("mouseenter", function () {
                //SE
                if ($(this).hasClass("menu_close_image")) {
                    //戻る
                    playSe(sf.back_enterse)
                } else if ($(this).hasClass("save_list_item_lock")) {
                    //保護
                    playSe(sf.lock_enterse)
                } else if ($(this).hasClass("save_list_item_delete")) {
                    //削除
                    playSe(sf.delete_enterse)
                } else if ($(this).hasClass("save_list_item_submit")) {
                    //コメント更新
                    playSe(sf.save_enterse)
                }

                //ボタン画像変更
                const img = $(this).attr("data-hover")
                $(this).attr("src", img)
            })
        $(j_save)
            .find(".menu_close_image,.save_list_item_lock,.save_list_item_delete,.save_list_item_submit")
            .on("mouseleave", function () {
                //もとにもどす
                const img = $(this).attr("data-normal")
                $(this).attr("src", img)
            })

        //ページ表示
        $(j_save)
            .find(".area_page_list img")
            .on("mouseenter", function () {
                playSe(sf.page_enterse)
                tmp_src = $(this).attr("src")
                if (tmp_src.indexOf("_a.png") < 0) {
                    //アクティブじゃない場合のみ画像変更
                    const img = $(this).attr("data-hover")
                    $(this).attr("src", img)
                }
            })
        $(j_save)
            .find(".area_page_list img")
            .on("mouseleave", function () {
                //もとにもどす
                if ($(this).attr("src").indexOf("_a.png") < 0) {
                    //アクティブじゃない場合のみ画像変更
                    const img = $(this).attr("data-normal")
                    $(this).attr("src", img)
                }
            })

        //スロット
        $(j_save)
            .find(".save_display_area")
            .on("mouseenter", function () {
                const img = $(this).find(".save_list_item_bg").attr("data-hover")
                $(this).find(".save_list_item_bg").attr("src", img)
                if ($(j_save).hasClass("save")) {
                    //セーブ
                    playSe(sf.save_enterse)
                } else if ($(j_save).hasClass("load")) {
                    //ロード
                    playSe(sf.load_enterse)
                }
            })
        $(j_save)
            .find(".save_display_area")
            .on("mouseleave", function () {
                //もとに戻す
                const img = $(this).find(".save_list_item_bg").attr("data-normal")
                $(this).find(".save_list_item_bg").attr("src", img)
            })
    }

    /**
     *  モーダルウィンドウ
     *  ティラノデフォルトのものとは別に定義しておく
     *  @param str {string}             メッセージ
     *  @param cb_ok {function}         OKクリック時のコールバック
     *  @param cb_cancel {function}     Cancelクリック時のコールバック
     *  @param str_ok {string}          OKボタンテキスト
     *  @param str_cancel {string}      Cancelボタンテキスト
     */
    const confirm = (str, cb_ok, cb_cancel, str_ok, str_cancel) => {
        //TYRANO.kag.stat.enable_keyconfig = false
        // let ok = $(".remodal").find(".remodal-confirm").html()
        // let cancel = $(".remodal").find(".remodal-cancel").html()
        // if (str_ok) {
        //     $(".remodal").find(".remodal-confirm").html(str_ok)
        // }
        // if (str_cancel) {
        //     $(".remodal").find(".remodal-cancel").html(str_cancel)
        // }
        // $(".remodal_title").html(str)
        // $(".remodal").find(".remodal-cancel").show()
        // $(".remodal").find(".remodal-confirm").show()
        // var inst = $("[data-remodal-id=modal]").remodal()
        // inst.open()
        // /////////OK /////////////
        // $(document).off("closed", ".remodal")
        // $(document).off("confirmation", ".remodal")
        // $(document).on("confirmation", ".remodal", function (e) {
        //     $(document).off("confirmation", ".remodal")
        //     $(document).off("cancellation", ".remodal")
        //     if (typeof cb_ok == "function") {
        //         TYRANO.kag.stat.enable_keyconfig = is_keyconfig
        //         cb_ok()
        //     }
        // })
        // ///////キャンセル//////////////
        // $(document).off("cancellation", ".remodal")
        // $(document).on("cancellation", ".remodal", function (e) {
        //     $(document).off("confirmation", ".remodal")
        //     $(document).off("cancellation", ".remodal")
        //     if (typeof cb_cancel == "function") {
        //         TYRANO.kag.stat.enable_keyconfig = is_keyconfig
        //         cb_cancel()
        //     }
        // })
        // //ボタン文言をもとに戻す
        // $(document).one("closed", ".remodal", function () {
        //     $(".remodal").find(".remodal-confirm").html(ok)
        //     $(".remodal").find(".remodal-cancel").html(cancel)
        // })
    }

    /**
     * メニュー画面表示用
     * ティラノデフォルトの関数とは別に定義しておく
     * @param {*} j_menu
     * @param {*} cb
     * @param {*} that
     */
    preloadImgCallback = function (j_menu, cb, that) {
        var img_storage = []
        j_menu.find("img").each(function () {
            if ($(this).attr("src") != "") {
                //srcがあるもののみ
                img_storage.push($(this).attr("src"))
            }
        })
        //ロードが全て完了したら、ふわっと出す
        var sum = 0
        for (var i = 0; i < img_storage.length; i++) {
            that.kag.preload(img_storage[i], function () {
                sum++
                if (img_storage.length == sum) {
                    cb()
                    //return false
                }
            })
        }
        if (img_storage.length == 0) {
            cb()
        }
    }

    /**
     * 各種スタイル指定
     * @param {jQuery} j_save
     */
    const setStyle = function (j_save) {
        let sl = TYRANO.kag.variable.sf._saveload
        //背景画像
        if ($(j_save).find(".img_bg_base").attr("data-type") == "save") {
            $(j_save)
                .find(".img_bg_base")
                .attr({
                    src: `data/image/${sl.bg_save}`,
                })
        } else {
            $(j_save)
                .find(".img_bg_base")
                .attr({
                    src: `data/image/${sl.bg_load}`,
                })
        }
        //スクロールバー
        $(j_save)
            .find(".area_save_list")
            .css({
                "--scroll-width": `${sl.scroll_width}px`,
                "--scroll-thumb-radius": `${sl.scroll_thumb_radius}px`,
                "--scroll-thumb-color": convertColor(sl.scroll_thumb_color),
                "--scroll-base-radius": `${sl.scroll_base_radius}px`,
                "--scroll-base-color": convertColor(sl.scroll_base_color),
            })

        //戻るボタン
        $(j_save)
            .find(".menu_close")
            .css({
                top: `${sl.back_y}px`,
                left: `${sl.back_x}px`,
            })
        $(j_save)
            .find(".menu_close img")
            .attr({
                src: `data/image/${sl.back_img}`,
                "data-hover": `data/image/${sl.back_img_h}`,
                "data-normal": `data/image/${sl.back_img}`,
            })
        $(j_save)
            .find(".menu_close_image")
            .css({
                width: `${sl.back_width}px`,
                height: `${sl.back_height}px`,
            })

        //ページャー
        let pager = "row"
        if (sl.page_vertical) {
            pager = "column"
        }
        $(j_save)
            .find(".area_page_list")
            .css({
                top: `${sl.page_y}px`,
                left: `${sl.page_x}px`,
                "flex-direction": pager,
            })
        if (sl.page_vertical) {
            $(j_save)
                .find(".area_page_list")
                .find("img.page:not(:first-child)")
                .css({
                    "margin-top": `${sl.page_margin}px`,
                })
        } else {
            $(j_save)
                .find(".area_page_list")
                .find("img.page:not(:first-child)")
                .css({
                    "margin-left": `${sl.page_margin}px`,
                })
        }
        $(j_save)
            .find(".area_page_list")
            .find("img")
            .each(function () {
                let num = parseInt($(this).attr("data-page")) + 1
                let img = `data/image/${sl.page_img.replace("{page}", num)}`
                let img_h = `data/image/${sl.page_img_h.replace("{page}", num)}`
                let img_a = `data/image/${sl.page_img_a.replace("{page}", num)}`
                $(this).attr({
                    src: img,
                    "data-normal": img,
                    "data-hover": img_h,
                    "data-active": img_a,
                })
            })
        //セーブリストラッパー
        $(j_save)
            .find(".area_save_list")
            .css({
                top: `${sl.area_y}px`,
                left: `${sl.area_x}px`,
                display: "flex",
                "justify-content": "flex-start",
            })
        //セーブリスト全体
        let slot_vertical = "row"
        if (sl.slot_vertical == true) {
            slot_vertical = "column"
        }
        $(j_save)
            .find(".save_list")
            .css({
                width: (sl.slot_width + sl.slot_marginx) * sl.slot_column + 20 + "px",
                height: `calc(${TYRANO.kag.config.scHeight}px - ${sl.area_y}px - ${sl.slot_marginy}px)`,
                "flex-direction": slot_vertical,
            })
        //セーブスロット
        $(j_save)
            .find(".save_list_item")
            .css({
                //"backgroung-image": `data/image/${sl.slot_bg}` ,
                width: `${sl.slot_width}px`,
                height: `${sl.slot_height}px`,
                "justify-content": "space-between",
                "margin-right": `${sl.slot_marginx}px`,
                "margin-bottom": `${sl.slot_marginy}px`,
            })
        $(j_save)
            .find(".save_list_item_bg")
            .attr({
                src: `data/image/${sl.slot_bg}`,
                "data-normal": `data/image/${sl.slot_bg}`,
                "data-hover": `data/image/${sl.slot_bg_h}`,
            })
        // if (sl.slot_bg_auto === "") {
        //     sl.slot_bg_auto = sl.slot_bg
        //     sl.slot_bg_auto_h = sl.slot_bg_h
        // }
        // $(j_save)
        //     .find(".save_list_item_bg[data-num=auto]")
        //     .attr({
        //         src: `data/image/${sl.slot_bg_auto}`,
        //         "data-normal": `data/image/${sl.slot_bg_auto}`,
        //         "data-hover": `data/image/${sl.slot_bg_auto_h}`,
        //     })
        //スロット番号
        if (sl.num) {
            $(j_save)
                .find(".save_list_item_num")
                .css({
                    top: `${sl.num_y}px`,
                    left: `${sl.num_x}px`,
                    width: `${sl.num_width}px`,
                    height: `${sl.num_height}px`,
                    color: convertColor(sl.num_color),
                    "justify-content": replaseAlign(sl.num_align),
                    "font-size": `${sl.num_size}px`,
                })
        } else {
            $(j_save).find(".save_list_item_num").css({
                display: "none",
            })
        }
        //サムネイル
        if (TYRANO.kag.config.configThumbnail == "true") {
            $(j_save)
                .find(".save_list_item_thumb")
                .css({
                    top: `${sl.thumb_y}px`,
                    left: `${sl.thumb_x}px`,
                    width: `${sl.thumb_width}px`,
                    height: replaceLength(sl.thumb_height),
                })
            $(j_save)
                .find(".save_list_item_thumb img")
                .each(function () {
                    if ($(this).attr("data-thumb") == "false") {
                        if (sl.thumb_noimage != "") {
                            $(this).attr("src", `data/image/${sl.thumb_noimage}`)
                        } else {
                            $(this).css({
                                display: "none",
                            })
                        }
                    }
                })
        }
        //日付
        if (sl.date) {
            $(j_save)
                .find(".save_list_item_date")
                .css({
                    top: `${sl.date_y}px`,
                    left: `${sl.date_x}px`,
                    width: `${sl.date_width}px`,
                    height: `${sl.date_height}px`,
                    color: convertColor(sl.date_color),
                    "text-align": sl.date_align,
                    "font-size": `${sl.date_size}px`,
                })
        } else {
            $(j_save).find(".save_list_item_date").css({
                display: "none",
            })
        }
        //ログテキスト
        if (sl.text) {
            $(j_save)
                .find(".save_list_item_text")
                .css({
                    top: `${sl.text_y}px`,
                    left: `${sl.text_x}px`,
                    width: `${sl.text_width}px`,
                    height: `${sl.text_height}px`,
                    color: convertColor(sl.text_color),
                    "text-align": sl.text_align,
                    "font-size": `${sl.text_size}px`,
                })
        } else {
            $(j_save)
                .find(".save_list_item")
                .each(function () {
                    if ($(this).attr("data-umu") != "") {
                        $(this).find(".save_list_item_text").css({
                            display: "none",
                        })
                    } else {
                        $(this)
                            .find(".save_list_item_text")
                            .css({
                                top: `${sl.text_y}px`,
                                left: `${sl.text_x}px`,
                                width: `${sl.text_width}px`,
                                height: `${sl.text_height}px`,
                                color: convertColor(sl.text_color),
                                "text-align": sl.text_align,
                                "font-size": `${sl.text_size}px`,
                            })
                    }
                })
        }
        //追加表示変数
        $(j_save)
            .find(".save_list_item_data")
            .css({
                top: `${sl.var_y}px`,
                left: `${sl.var_x}px`,
                width: `${sl.var_width}px`,
                height: `${sl.var_height}px`,
                color: convertColor(sl.var_color),
                "text-align": sl.var_align,
                "font-size": `${sl.var_size}px`,
            })
        //データ保護ボタン
        $(j_save)
            .find(".save_list_item_lock")
            .css({
                top: `${sl.lock_y}px`,
                left: `${sl.lock_x}px`,
                width: replaceLength(sl.lock_width),
                height: replaceLength(sl.lock_height),
            })
        $(j_save)
            .find(".save_list_item_lock")
            .each(function () {
                if ($(this).attr("data-lock") == "true") {
                    $(this).attr({
                        src: `data/image/${sl.lock_img_lock}`,
                        "data-src": `data/image/${sl.lock_img_lock}`,
                        "data-src-u": `data/image/${sl.lock_img_unlock}`,
                        "data-hover": `data/image/${sl.lock_img_lock_h}`,
                        "data-normal": `data/image/${sl.lock_img_lock}`,
                    })
                } else {
                    $(this).attr({
                        src: `data/image/${sl.lock_img_unlock}`,
                        "data-src": `data/image/${sl.lock_img_lock}`,
                        "data-src-u": `data/image/${sl.lock_img_unlock}`,
                        "data-hover": `data/image/${sl.lock_img_unlock_h}`,
                        "data-normal": `data/image/${sl.lock_img_unlock}`,
                    })
                }
            })
        //データ削除ボタン
        $(j_save)
            .find(".save_list_item_delete")
            .css({
                top: `${sl.delete_y}px`,
                left: `${sl.delete_x}px`,
                width: replaceLength(sl.delete_width),
                height: replaceLength(sl.delete_height),
            })
        $(j_save)
            .find(".save_list_item_delete")
            .each(function () {
                if ($(this).attr("data-delete") == "true") {
                    $(this).attr({
                        src: `data/image/${sl.delete_img_delete}`,
                        "data-src": `data/image/${sl.delete_img_delete}`,
                        "data-src-u": `data/image/${sl.delete_img_undelete}`,
                        "data-hover": `data/image/${sl.delete_img_delete_h}`,
                        "data-normal": `data/image/${sl.delete_img_delete}`,
                    })
                } else {
                    $(this).attr({
                        src: `data/image/${sl.delete_img_undelete}`,
                        "data-src": `data/image/${sl.delete_img_delete}`,
                        "data-src-u": `data/image/${sl.delete_img_undelete}`,
                        "data-hover": `data/image/${sl.delete_img_undelete_h}`,
                        "data-normal": `data/image/${sl.delete_img_undelete}`,
                    })
                }
            })
        //最新データ表示
        $(j_save)
            .find(".save_list_item_new")
            .css({
                top: `${sl.new_y}px`,
                left: `${sl.new_x}px`,
                width: replaceLength(sl.new_width),
                height: replaceLength(sl.new_height),
            })
        $(j_save)
            .find(".save_list_item_new")
            .attr({
                src: `data/image/${sl.new_img}`,
            })
        //コメント入力欄
        if (sl.comment) {
            $(j_save)
                .find(".save_list_item_comment")
                .css({
                    top: `${sl.comment_y}px`,
                    left: `${sl.comment_x}px`,
                    width: replaceLength(sl.comment_width),
                    height: replaceLength(sl.comment_height),
                    "font-size": `${sl.comment_size}px`,
                })
            $(j_save).find(".save_list_item_comment").attr({
                placeholder: sl.comment_placeholder,
            })
            //更新ボタン
            $(j_save)
                .find(".save_list_item_submit")
                .css({
                    top: `${sl.comment_button_y}px`,
                    left: `${sl.comment_button_x}px`,
                    width: replaceLength(sl.comment_button_width),
                    height: replaceLength(sl.comment_button_height),
                })
            $(j_save)
                .find(".save_list_item_submit")
                .attr({
                    src: `data/image/${sl.comment_button_img}`,
                    "data-hover": `data/image/${sl.comment_button_img_h}`,
                    "data-normal": `data/image/${sl.comment_button_img}`,
                })
        }
    }

    /**
     * align文字列をflexに対応させる
     * @param {"left" or "center" or "right"} align
     * @returns {String}
     */
    const replaseAlign = function (align) {
        if (align.toLowerCase() == "left") {
            align = "flex-start"
        } else if (align.toLowerCase() == "right") {
            align = "flex-end"
        }
        return align
    }

    /**
     * length文字列を数値に変換する
     * @param {number or "auto"} length
     * @returns {String}
     */
    const replaceLength = function (length) {
        if ((length + "").toLowerCase() !== "auto") {
            length = length + "px"
        }
        return length
    }

    /**
     * カラーコード変換
     * @param {String} color
     * @returns {String}
     */
    const convertColor = function (color) {
        if (!color) return false
        return color.replace("0x", "#")
    }

    /**
     *
     * 既存関数オーバーライド
     *
     */

    /**
     * セーブデータ削除
     * @param {num} num
     * @param {function} cb
     */
    tyrano.plugin.kag.menu.clearSave = function (num, cb) {
        var array_save = this.getSaveData()
        var json = {}
        json.title = $.lang("not_saved")
        // ラストテキスト
        json.current_order_index = 0
        json.save_date = ""
        json.img_data = ""
        json.stat = {}
        array_save.data[num] = json
        $.setStorage(TYRANO.kag.config.projectID + "_tyrano_data", array_save, TYRANO.kag.config.configSave)
    }
    TYRANO.kag.menu.clearSave = tyrano.plugin.kag.menu.clearSave

    /**
     * セーブ画面表示
     * @param {jQuery} j_obj j_save
     * @param {function} cb
     */
    const setMenu = function (j_obj, cb) {
        //元のモーダルボタン
        submitOk = !is_reload ? $("#remodal-confirm").text() : submitOk
        submitCancel = !is_reload ? $("#remodal-cancel").text() : submitCancel

        const that = TYRANO
        let layer_menu = TYRANO.kag.layer.getMenuLayer()

        is_keyconfig = TYRANO.kag.stat.enable_keyconfig

        //戻るボタンクリック時
        const j_menu = TYRANO.kag.layer.getMenuLayer()
        const target_selector = ".menu_close"
        j_obj
            .find(target_selector)
            .on("mouseenter", function () {
                playSe(TYRANO.kag.variable.sf._saveload.back_enterse)
            })
            .click((e) => {
                const closeEvent = () => {
                    j_menu.empty()
                    TYRANO.kag.stat.enable_keyconfig = is_keyconfig
                    //モーダルボタン戻す
                    const that = TYRANO.kag.ftag.master_tag.dialog_config
                    that.j_ok.text(submitOk)
                    that.j_cancel.text(submitCancel)
                    if (typeof cb === "function") {
                        cb()
                    }
                    1 == TYRANO.kag.stat.visible_menu_button && $(".button_menu").show()
                    e.stopPropagation()
                }
                playSe(TYRANO.kag.variable.sf._saveload.back_se)
                if (TYRANO.kag.variable.sf._saveload.fademask) {
                    //暗転有り
                    j_menu.find(".menu_mask").fadeIn(TYRANO.kag.variable.sf._saveload.fadetime, () => {
                        j_menu.fadeOut(TYRANO.kag.variable.sf._saveload.fadetime, () => {
                            closeEvent()
                        })
                    })
                } else {
                    //暗転なし
                    j_menu.fadeOut(TYRANO.kag.variable.sf._saveload.fadetime, () => {
                        closeEvent()
                    })
                }
            })
            .focusable()

        //最初に画面を表示するとき
        if (layer_menu.css("display") == "none") {
            layer_menu.empty()
            layer_menu.show()
        }

        let mask_time = 0
        let fade_time = 0
        if (TYRANO.kag.variable.sf._saveload.fademask && !is_reload) {
            //画面フェード時に暗転を挟む場合
            if (TYRANO.kag.variable.sf._saveload.maskimage != "") {
                //マスク画像指定あり
                j_obj.find(".menu_mask").css({
                    display: "block",
                    "background-image": `url(data/image/${TYRANO.kag.variable.sf._saveload.maskimage})`,
                })
            } else {
                //マスク色指定あり
                j_obj.find(".menu_mask").css({
                    display: "block",
                    "background-color": convertColor(TYRANO.kag.variable.sf._saveload.maskcolor),
                })
                $(".menu_mask").css("display", "block")
            }
            mask_time = TYRANO.kag.variable.sf._saveload.fadetime
            fade_time = TYRANO.kag.variable.sf._saveload.fadetime
        } else {
            //マスク用オブジェクトに透明色を指定、マスク時間は0にしておく
            j_obj.find(".menu_mask").css({
                "background-color": "transparent",
            })
            fade_time = TYRANO.kag.variable.sf._saveload.fadetime
        }
        //opacity変化させる際にz-indexを反映させるため
        j_obj.css({
            opacity: 0.99,
            "z-index": 0,
        })
        //戻す
        j_obj.css({
            opacity: 1,
        })
        is_reload = false
        layer_menu.append(j_obj)
        j_obj.hide()

        preloadImgCallback(
            layer_menu,
            function () {
                layer_menu.find(".block_menu").fadeOut(fade_time)
                j_obj.fadeIn(fade_time, function () {
                    //メニュー用レイヤー内の最終オブジェクト以外のオブジェクトは消す
                    //マスク用オブジェクトをフェードアウト
                    $(".layer_menu>*:not(:last())").remove()
                    $(".menu_mask").fadeOut(mask_time)
                })
            },
            that
        )
    }

    /**
     * セーブ画面作成
     * @param {function} cb
     * @returns
     */
    TYRANO.kag.menu.displaySave = function (cb, cb_close) {
        const that = this
        that.kag.unfocus()
        this.kag.setSkip(false)

        //セーブデータ配列
        const array_save = that.getSaveData()
        const normal_save = array_save.data
        for (var i = 0; i < normal_save.length; i++) {
            normal_save[i].num = i
        }
        const auto_slot = 0
        // const auto_slot = TYRANO.kag.variable.sf._saveload.auto ? 1 : 0
        // const auto_save = []
        // if (TYRANO.kag.variable.sf._saveload.auto) {
        //     if (!TYRANO.kag.variable.sf.system.autosave) {
        //         auto_save.push({
        //             save_date: "",
        //             title: $.lang("not_saved"),
        //             img_data: "",
        //         })
        //     } else {
        //         auto_save.push(JSON.parse($.getStorage(that.kag.config.projectID + "_tyrano_auto_save", that.kag.config.configSave)))
        //     }
        //     auto_save[0].num = "auto"
        // }
        // const array = auto_save.concat(normal_save)
        const array = normal_save

        TYRANO.kag.stat.enable_keyconfig = true

        //セーブ画面作成本体
        //const dsave = function () {
        let array_page = setPage()
        that.kag.html(
            "save",
            {
                array_save: array,
                array_page: array_page,
                novel: $.novel,
            },
            function (html_str) {
                var j_save = $(html_str)
                now_page = 0
                if (TYRANO.kag.variable.sf._saveload.memory != 0) {
                    now_page = TYRANO.kag.variable.sf._save_page || 0
                }
                //フォントをゲームで指定されているフォントにする。
                j_save.find(".save_list").css("font-family", that.kag.config.userFace)
                j_save.find(".save_display_area").each(function () {
                    setDataPage(this)
                    setComment(this, array_save)

                    let is_clicked = false
                    //セーブスロットクリック
                    $(this)
                        .on("click", function (e) {
                            if (is_clicked) {
                                return false
                            }
                            //複数回クリック抑止
                            is_clicked = true

                            const num = $(this).attr("data-num")
                            const umu = $(this).attr("data-umu")

                            if (num === "auto") {
                                return false
                            }
                            const scrollPos = $(".area_save_list").scrollTop()
                            /**
                             * セーブ実行
                             */
                            const saveas = function () {
                                that.doSave(num, function (save_data) {
                                    const layer_menu = that.kag.layer.getMenuLayer()
                                    if (!TYRANO.kag.variable.sf._saveload.hold) {
                                        //セーブ後画面保持しない
                                        hideSaveLoad()
                                    } else {
                                        is_reload = true
                                        //セーブ後画面保持する
                                        that.displaySave(cb, cb_close)
                                        is_clicked = false
                                        that.snap = null
                                        $(".area_save_list").scrollTop(scrollPos)
                                    }
                                })
                            }
                            //上書き確認ダイアログ表示あり
                            if (array[parseInt(num) + auto_slot].lock == true) {
                                is_clicked = false
                                //スロット保護されている場合は何もしない
                                return false
                            }

                            playSe(TYRANO.kag.variable.sf._saveload.save_se)
                            if (TYRANO.kag.variable.sf._saveload.dialog_overwrite && umu != "") {
                                const that = TYRANO.kag.ftag.master_tag.dialog_config
                                that.j_ok.text("上書きしてセーブ")
                                that.j_cancel.text("セーブしない")
                                $.confirm(setMessage(TYRANO.kag.variable.sf._saveload.message_overwrite, parseInt(num) + 1), saveas, function () {
                                    //Cancelの場合、何もしない
                                    is_clicked = false
                                    if (typeof cb === "function") {
                                        cb()
                                    }
                                })
                            } else {
                                //var layer_menu = that.kag.layer.getMenuLayer()
                                saveas()
                            }
                        })
                        .focusable()
                })
                //上下ボタンは表示しない
                j_save.find(".button_smart").hide()

                changePage(j_save, this, now_page, "save")
                //ページ移動
                movePage(j_save)

                setProtectDelete(j_save, array_save, "save", cb, cb_close)

                setStyle(j_save)
                displayNum(j_save)
                displayNew(j_save)
                hoverButton(j_save)
                displayPage(j_save, now_page)
                setMenu(j_save, cb_close || cb)
            }
        )
        //}

        //dsave()
    }
    tyrano.plugin.kag.menu.displaySave = TYRANO.kag.menu.displaySave

    //ロード画面作成
    TYRANO.kag.menu.displayLoad = function (cb) {
        let that = this
        this.kag.stat.is_skip = false

        //セーブデータ配列
        const array_save = that.getSaveData()
        const normal_save = array_save.data
        for (var i = 0; i < normal_save.length; i++) {
            normal_save[i].num = i
        }
        const auto_slot = 0
        // const auto_slot = TYRANO.kag.variable.sf._saveload.auto ? 1 : 0
        // const auto_save = []
        // if (TYRANO.kag.variable.sf._saveload.auto) {
        //     if (!TYRANO.kag.variable.sf.system.autosave) {
        //         auto_save.push({
        //             save_date: "",
        //             title: $.lang("not_saved"),
        //             img_data: "",
        //         })
        //     } else {
        //         auto_save.push(JSON.parse($.getStorage(that.kag.config.projectID + "_tyrano_auto_save", that.kag.config.configSave)))
        //     }
        //     auto_save[0].num = "auto"
        // }
        // const array = auto_save.concat(normal_save)
        const array = normal_save

        let array_page = setPage()

        TYRANO.kag.stat.enable_keyconfig = true

        this.kag.html(
            "load",
            {
                array_save: array,
                array_page: array_page,
                novel: $.novel,
            },
            function (html_str) {
                let j_save = $(html_str)
                let now_page = 0
                if (TYRANO.kag.variable.sf._saveload.memory == 1) {
                    now_page = TYRANO.kag.variable.sf._load_page || 0
                } else {
                    now_page = TYRANO.kag.variable.sf._save_page || 0
                }
                //フォント設定
                j_save.find(".save_list").css("font-family", that.kag.config.userFace)

                j_save.find(".save_display_area").each(function () {
                    setDataPage(this)
                    setComment(this, array_save)

                    let is_clicked = false
                    //セーブスロットクリック
                    $(this)
                        .on("click", function (e) {
                            if (is_clicked) {
                                return false
                            }
                            is_clicked = true
                            const num = Number.isNaN(parseInt($(this).attr("data-num"))) ? -1 : parseInt($(this).attr("data-num"))
                            const umu = $(this).attr("data-umu")
                            //セーブデータが存在しない場合
                            if (array[num + auto_slot]["save_date"] == "") {
                                return false
                            }
                            const load = (num) => {
                                //セーブデータロード
                                // if (num < 0) {
                                //     that.loadAutoSave()
                                // } else {
                                that.loadGame(num)
                                // }
                                //画面フェードして消す
                                hideSaveLoad()
                            }
                            playSe(TYRANO.kag.variable.sf._saveload.load_se)
                            if (TYRANO.kag.variable.sf._saveload.dialog_load) {
                                const that = TYRANO.kag.ftag.master_tag.dialog_config
                                that.j_ok.text("ロードする")
                                that.j_cancel.text("ロードしない")
                                //ダイアログあり
                                $.confirm(
                                    setMessage(TYRANO.kag.variable.sf._saveload.message_load, parseInt(num) + 1),
                                    //OK
                                    function () {
                                        load(num)
                                    },
                                    function () {
                                        is_clicked = false
                                        //Cancel
                                        if (typeof cb === "function") {
                                            cb()
                                        }
                                    }
                                )
                            } else {
                                //ダイアログなし
                                load(num)
                            }
                        })
                        .focusable()
                })

                //上下ボタンは表示しない
                j_save.find(".button_smart").hide()

                changePage(j_save, this, now_page, "load")
                //ページ移動
                movePage(j_save)

                setProtectDelete(j_save, array_save, "load", cb)
                setStyle(j_save)
                displayNum(j_save)
                displayNew(j_save)
                hoverButton(j_save)
                displayPage(j_save, now_page)

                setMenu(j_save, cb)
            }
        )
    }
    tyrano.plugin.kag.menu.displayLoad = TYRANO.kag.menu.displayLoad

    //セーブを実行する
    TYRANO.kag.menu.doSave = function (num, cb) {
        let array_save = this.getSaveData()
        let data = {}
        const that = this

        const snapSave = function () {
            //ここはサムネイルイメージ作成のため、callback指定する
            that.snapSave(that.kag.stat.current_save_str, function () {
                data = that.snap
                //NO DATAテキスト
                data.no_data = $.lang("not_saved")
                //日付
                data.save_date = that.getDateStr()
                //ロック状態
                data.lock = false
                //追加表示変数
                if (TYRANO.kag.variable.sf._saveload.exvar !== "") {
                    array_var = TYRANO.kag.variable.sf._saveload.exvar.split(",")
                    data.data_text = ""
                    for (let i = 0; i < array_var.length; i++) {
                        data.data_text += TYRANO.kag.embScript(array_var[i])
                        if (i < array_var.length - 1) {
                            data.data_text += TYRANO.kag.variable.sf._saveload.exvar_join
                        }
                    }
                }
                //最新セーブデータ表示用
                TYRANO.kag.variable.sf._newslot = num
                array_save.data[num] = data
                $.setStorage(that.kag.config.projectID + "_tyrano_data", array_save, that.kag.config.configSave)

                // ティラノイベント"storage-save"を発火
                that.kag.trigger("storage-save")

                if (typeof cb == "function") {
                    //終わったタイミングでコールバックを返す
                    cb(data)
                }
            })
        }

        if (TYRANO.kag.variable.sf._saveload.dialog_save) {
            if (TYRANO.kag.variable.sf._saveload.dialog_overwrite && array_save.data[num].save_date !== "") {
                //上書き確認ダイアログありかつ既にセーブデータあり
                //ダイアログなし
                snapSave()
            } else {
                //ダイアログあり
                const that = TYRANO.kag.ftag.master_tag.dialog_config
                that.j_ok.text("セーブする")
                that.j_cancel.text("セーブしない")
                // TYRANO.kag.ftag.master_tag.dialog_config.changeButton(
                //     {
                //         text: "セーブする",
                //     },
                //     true
                // )
                // TYRANO.kag.ftag.master_tag.dialog_config.changeButton(
                //     {
                //         text: "セーブしない",
                //     },
                //     false
                // )
                $.confirm(
                    setMessage(TYRANO.kag.variable.sf._saveload.message_save, parseInt(num) + 1),
                    //OK
                    snapSave,
                    function () {
                        if (typeof cb === "function") {
                            cb()
                        }
                    }
                )
            }
        } else {
            //ダイアログなし
            snapSave()
        }
    }
    tyrano.plugin.kag.menu.doSave = TYRANO.kag.menu.doSave

    TYRANO.kag.menu.doSetAutoSave = function () {
        var data = this.snap
        data.save_date = this.getDateStr()
        //追加表示変数
        if (TYRANO.kag.variable.sf._saveload.exvar !== "") {
            array_var = TYRANO.kag.variable.sf._saveload.exvar.split(",")
            data.data_text = ""
            for (let i = 0; i < array_var.length; i++) {
                data.data_text += TYRANO.kag.embScript(array_var[i])
                if (i < array_var.length - 1) {
                    data.data_text += TYRANO.kag.variable.sf._saveload.exvar_join
                }
            }
        }
        $.setStorage(this.kag.config.projectID + "_tyrano_auto_save", data, this.kag.config.configSave)
        this.kag.trigger("storage-atosave")
        TYRANO.kag.variable.sf.system.autosave = true
        this.kag.layer.getMenuLayer().hide()
    }
    tyrano.plugin.kag.menu.doSetAutoSave = TYRANO.kag.menu.doSetAutoSave

    /**
     * ティラノビルダー対応
     * コンポーネント用
     */
    let sf = TYRANO.kag.variable.sf
    //基本設定
    TYRANO.kag.tag.saveload_ex_components = {
        start: function (mp) {
            sf._saveload.dialog_overwrite = mp.dialog_overwrite == "true" ? true : false
            sf._saveload.dialog_save = mp.dialog_save == "true" ? true : false
            sf._saveload.dialog_load = mp.dialog_load == "true" ? true : false
            sf._saveload.dialog_delete = mp.dialog_delete == "true" ? true : false
            sf._saveload.fadetime = mp.fadetime != null ? parseInt(mp.fadetime) : 0
            sf._saveload.fademask = mp.fademask == "true" ? true : false
            sf._saveload.maskcolor = mp.maskcolor || "black"
            sf._saveload.maskimage = mp.maskimage || ""
            sf._saveload.masktime = mp.fademask == "true" ? parseInt(mp.fadetime) : 0
            sf._saveload.memory = mp.memory != null ? parseInt(mp.memory) : 0
            sf._saveload.hold = mp.hold == "true" ? true : false
            sf._saveload.sebuf = mp.sebuf != null ? parseInt(mp.sebuf) : 0

            //デザインカスタマイズ
            sf._saveload.bg_save = mp.bg_save || "../others/plugin/saveload_ex/image/bg.png"
            sf._saveload.bg_load = mp.bg_load || "../others/plugin/saveload_ex/image/bg.png"
            TYRANO.kag.ftag.nextOrder()
        },
    }
    TYRANO.kag.ftag.master_tag.saveload_ex_components = TYRANO.kag.tag.saveload_ex_components
    TYRANO.kag.ftag.master_tag.saveload_ex_components.kag = TYRANO.kag

    //スクロールバー
    TYRANO.kag.tag.saveload_ex_components_scroll = {
        start: function (mp) {
            sf._saveload.scroll_width = mp.scroll_width != null ? parseInt(mp.scroll_width) : 12
            sf._saveload.scroll_thumb_radius = mp.scroll_thumb_radius != null ? parseInt(mp.scroll_thumb_radius) : 0
            sf._saveload.scroll_thumb_color = mp.scroll_thumb_color || "#9B0D49"
            sf._saveload.scroll_base_radius = mp.scroll_base_radius != null ? parseInt(mp.scroll_base_radius) : 0
            sf._saveload.scroll_base_color = mp.scroll_base_color || "transparent"
            TYRANO.kag.ftag.nextOrder()
        },
    }
    TYRANO.kag.ftag.master_tag.saveload_ex_components_scroll = TYRANO.kag.tag.saveload_ex_components_scroll
    TYRANO.kag.ftag.master_tag.saveload_ex_components_scroll.kag = TYRANO.kag

    //戻るボタン
    TYRANO.kag.tag.saveload_ex_components_back = {
        start: function (mp) {
            sf._saveload.back_width = mp.width != null ? parseInt(mp.width) : "auto"
            sf._saveload.back_height = mp.height != null ? parseInt(mp.height) : "auto"
            sf._saveload.back_x = mp.x != null ? parseInt(mp.x) : 1000
            sf._saveload.back_y = mp.y != null ? parseInt(mp.y) : 20
            sf._saveload.back_img = mp.storage || "../others/plugin/saveload_ex/image/back.png"
            sf._saveload.back_se = mp.back_se || ""
            sf._saveload.back_enterse = mp.back_enterse || ""
            TYRANO.kag.ftag.nextOrder()
        },
    }
    TYRANO.kag.ftag.master_tag.saveload_ex_components_back = TYRANO.kag.tag.saveload_ex_components_back
    TYRANO.kag.ftag.master_tag.saveload_ex_components_back.kag = TYRANO.kag

    //ページ表示
    TYRANO.kag.tag.saveload_ex_components_page = {
        start: function (mp) {
            sf._saveload.page_img = mp.page_img || "../others/plugin/saveload_ex/image/{page}.png"
            sf._saveload.page_x = mp.x != null ? parseInt(mp.x) : 300
            sf._saveload.page_y = mp.y != null ? parseInt(mp.y) : 30
            sf._saveload.page_vertical = mp.page_vertical == "true" ? true : false
            sf._saveload.page_margin = mp.page_margin != null ? parseInt(mp.page_margin) : 0
            sf._saveload.page_se = mp.page_se || ""
            sf._saveload.page_enterse = mp.page_enterse || ""
            TYRANO.kag.ftag.nextOrder()
        },
    }
    TYRANO.kag.ftag.master_tag.saveload_ex_components_page = TYRANO.kag.tag.saveload_ex_components_page
    TYRANO.kag.ftag.master_tag.saveload_ex_components_page.kag = TYRANO.kag

    //セーブスロット
    TYRANO.kag.tag.saveload_ex_components_slot = {
        start: function (mp) {
            sf._saveload.slot = mp.slot != null ? parseInt(mp.slot) : 0
            sf._saveload.area_x = mp.x != null ? parseInt(mp.x) : 300
            sf._saveload.area_y = mp.y != null ? parseInt(mp.y) : 130
            sf._saveload.slot_width = mp.width != null ? parseInt(mp.width) : 684
            sf._saveload.slot_height = mp.height != null ? parseInt(mp.height) : 144
            sf._saveload.slot_marginx = mp.slot_marginx != null ? parseInt(mp.slot_marginx) : 0
            sf._saveload.slot_marginy = mp.slot_marginy != null ? parseInt(mp.slot_marginy) : 20
            sf._saveload.slot_column = mp.slot_column != null ? parseInt(mp.slot_column) : 1
            sf._saveload.slot_bg = mp.slot_bg || "../others/plugin/saveload_ex/image/culumn1.png"
            sf._saveload.slot_vertical = mp.slot_vertical == "true" ? true : false
            sf._saveload.save_se = mp.save_se || ""
            sf._saveload.save_enterse = mp.save_enterse || ""
            sf._saveload.load_se = mp.load_se || ""
            sf._saveload.load_enterse = mp.load_enterse || ""
            TYRANO.kag.ftag.nextOrder()
        },
    }
    TYRANO.kag.ftag.master_tag.saveload_ex_components_slot = TYRANO.kag.tag.saveload_ex_components_slot
    TYRANO.kag.ftag.master_tag.saveload_ex_components_slot.kag = TYRANO.kag

    //セーブNo
    TYRANO.kag.tag.saveload_ex_components_num = {
        start: function (mp) {
            sf._saveload.num = mp.num == "true" ? true : false
            sf._saveload.num_width = mp.width != null ? parseInt(mp.width) : 60
            sf._saveload.num_height = mp.height != null ? parseInt(mp.height) : 144
            sf._saveload.num_x = mp.x != null ? parseInt(mp.x) : 0
            sf._saveload.num_y = mp.y != null ? parseInt(mp.y) : 0
            sf._saveload.num_color = mp.num_color || "#e5e5e5"
            sf._saveload.num_align = mp.num_align || "left"
            sf._saveload.num_size = mp.num_size || 24
            TYRANO.kag.ftag.nextOrder()
        },
    }
    TYRANO.kag.ftag.master_tag.saveload_ex_components_num = TYRANO.kag.tag.saveload_ex_components_num
    TYRANO.kag.ftag.master_tag.saveload_ex_components_num.kag = TYRANO.kag

    //セーブサムネイル
    TYRANO.kag.tag.saveload_ex_components_thumb = {
        start: function (mp) {
            sf._saveload.thumb_width = mp.width != null ? parseInt(mp.thumb_width) : 144
            sf._saveload.thumb_height = mp.height != null ? parseInt(mp.thumb_height) : "auto"
            sf._saveload.thumb_x = mp.x != null ? parseInt(mp.thumb_x) : 60
            sf._saveload.thumb_y = mp.y != null ? parseInt(mp.thumb_y) : 0
            sf._saveload.thumb_noimage = mp.thumb_noimage || "../others/plugin/saveload_ex/image/noimage.png"
            TYRANO.kag.ftag.nextOrder()
        },
    }
    TYRANO.kag.ftag.master_tag.saveload_ex_components_thumb = TYRANO.kag.tag.saveload_ex_components_thumb
    TYRANO.kag.ftag.master_tag.saveload_ex_components_thumb.kag = TYRANO.kag

    //日付
    TYRANO.kag.tag.saveload_ex_components_date = {
        start: function (mp) {
            sf._saveload.date_width = mp.width != null ? parseInt(mp.width) : 300
            sf._saveload.date_height = mp.height != null ? parseInt(mp.height) : 30
            sf._saveload.date_x = mp.x != null ? parseInt(mp.x) : 210
            sf._saveload.date_y = mp.y != null ? parseInt(mp.y) : 10
            sf._saveload.date_color = mp.date_color || "#e5e5e5"
            sf._saveload.date_align = mp.date_align || "left"
            sf._saveload.date_size = mp.date_size || 24
            TYRANO.kag.ftag.nextOrder()
        },
    }
    TYRANO.kag.ftag.master_tag.saveload_ex_components_date = TYRANO.kag.tag.saveload_ex_components_date
    TYRANO.kag.ftag.master_tag.saveload_ex_components_date.kag = TYRANO.kag

    //メッセージ
    TYRANO.kag.tag.saveload_ex_components_text = {
        start: function (mp) {
            sf._saveload.text_width = mp.width != null ? parseInt(mp.width) : 300
            sf._saveload.text_height = mp.height != null ? parseInt(mp.height) : 50
            sf._saveload.text_x = mp.x != null ? parseInt(mp.x) : 210
            sf._saveload.text_y = mp.y != null ? parseInt(mp.y) : 60
            sf._saveload.text_color = mp.text_color || "#e5e5e5"
            sf._saveload.text_align = mp.text_align || "left"
            sf._saveload.text_size = mp.text_size || 24
            TYRANO.kag.ftag.nextOrder()
        },
    }
    TYRANO.kag.ftag.master_tag.saveload_ex_components_text = TYRANO.kag.tag.saveload_ex_components_text
    TYRANO.kag.ftag.master_tag.saveload_ex_components_text.kag = TYRANO.kag

    //追加表示変数
    TYRANO.kag.tag.saveload_ex_components_var = {
        start: function (mp) {
            sf._saveload.exvar = mp.exvar || ""
            sf._saveload.exvar_join = mp.exvar_join || ""
            sf._saveload.var_width = mp.width != null ? parseInt(mp.width) : 300
            sf._saveload.var_height = mp.height != null ? parseInt(mp.height) : 30
            sf._saveload.var_x = mp.x != null ? parseInt(mp.x) : 210
            sf._saveload.var_y = mp.y != null ? parseInt(mp.y) : 30
            sf._saveload.var_color = mp.var_color || "#e5e5e5"
            sf._saveload.var_align = mp.var_align || "left"
            sf._saveload.var_size = mp.var_size || 24
            TYRANO.kag.ftag.nextOrder()
        },
    }
    TYRANO.kag.ftag.master_tag.saveload_ex_components_var = TYRANO.kag.tag.saveload_ex_components_var
    TYRANO.kag.ftag.master_tag.saveload_ex_components_var.kag = TYRANO.kag

    //セーブデータ保護
    TYRANO.kag.tag.saveload_ex_components_lock = {
        start: function (mp) {
            sf._saveload.lock = mp.lock == "true" ? true : false
            sf._saveload.lock_width = mp.width != null ? parseInt(mp.width) : "auto"
            sf._saveload.lock_height = mp.height != null ? parseInt(mp.height) : "auto"
            sf._saveload.lock_x = mp.x != null ? parseInt(mp.x) : 590
            sf._saveload.lock_y = mp.y != null ? parseInt(mp.y) : 5
            sf._saveload.lock_img_lock = mp.lock_img_lock || "../others/plugin/saveload_ex/image/lock.png"
            sf._saveload.lock_img_unlock = mp.lock_img_unlock || "../others/plugin/saveload_ex/image/unlock.png"
            sf._saveload.lock_se = mp.lock_se || ""
            sf._saveload.lock_enterse = mp.lock_enterse || ""
            TYRANO.kag.ftag.nextOrder()
        },
    }
    TYRANO.kag.ftag.master_tag.saveload_ex_components_lock = TYRANO.kag.tag.saveload_ex_components_lock
    TYRANO.kag.ftag.master_tag.saveload_ex_components_lock.kag = TYRANO.kag

    //セーブデータ削除
    TYRANO.kag.tag.saveload_ex_components_delete = {
        start: function (mp) {
            sf._saveload.delete = mp.delete == "true" ? true : false
            sf._saveload.delete_width = mp.width != null ? parseInt(mp.width) : "auto"
            sf._saveload.delete_height = mp.height != null ? parseInt(mp.height) : "auto"
            sf._saveload.delete_x = mp.x != null ? parseInt(mp.x) : 640
            sf._saveload.delete_y = mp.y != null ? parseInt(mp.y) : 5
            sf._saveload.delete_img_delete = mp.delete_img_delete || "../others/plugin/saveload_ex/image/delete.png"
            sf._saveload.delete_img_undelete = mp.delete_img_undelete || "../others/plugin/saveload_ex/image/undelete.png"
            sf._saveload.delete_se = mp.delete_se || ""
            sf._saveload.delete_enterse = mp.delete_enterse || ""
            TYRANO.kag.ftag.nextOrder()
        },
    }
    TYRANO.kag.ftag.master_tag.saveload_ex_components_delete = TYRANO.kag.tag.saveload_ex_components_delete
    TYRANO.kag.ftag.master_tag.saveload_ex_components_delete.kag = TYRANO.kag

    //最新画像表示
    TYRANO.kag.tag.saveload_ex_components_new = {
        start: function (mp) {
            sf._saveload.new = mp.new == "true" ? true : false
            sf._saveload.new_width = mp.width != null ? parseInt(mp.width) : "auto"
            sf._saveload.new_height = mp.height != null ? parseInt(mp.height) : "auto"
            sf._saveload.new_x = mp.x != null ? parseInt(mp.x) : 3
            sf._saveload.new_y = mp.y != null ? parseInt(mp.y) : 0
            sf._saveload.new_img = mp.new_img || "../others/plugin/saveload_ex/image/new.png"
            TYRANO.kag.ftag.nextOrder()
        },
    }
    TYRANO.kag.ftag.master_tag.saveload_ex_components_new = TYRANO.kag.tag.saveload_ex_components_new
    TYRANO.kag.ftag.master_tag.saveload_ex_components_new.kag = TYRANO.kag

    //コメント
    TYRANO.kag.tag.saveload_ex_components_comment = {
        start: function (mp) {
            sf._saveload.comment = mp.comment == "true" ? true : false
            sf._saveload.comment_width = mp.width != null ? parseInt(mp.width) : 380
            sf._saveload.comment_height = mp.height != null ? parseInt(mp.height) : "auto"
            sf._saveload.comment_x = mp.x != null ? parseInt(mp.x) : 210
            sf._saveload.comment_y = mp.y != null ? parseInt(mp.y) : 110
            sf._saveload.comment_button_img = mp.comment_button_img || "../others/plugin/saveload_ex/image/unlock.png"
            sf._saveload.comment_button_width = mp.comment_button_width != null ? parseInt(mp.comment_button_width) : "auto"
            sf._saveload.comment_button_height = mp.comment_button_height != null ? parseInt(mp.comment_button_height) : "auto"
            sf._saveload.comment_button_x = mp.comment_button_x != null ? parseInt(mp.comment_button_x) : 610
            sf._saveload.comment_button_y = mp.comment_button_y != null ? parseInt(mp.comment_button_y) : 110
            sf._saveload.comment_placeholder = mp.comment_placeholder || "コメント"
            sf._saveload.comment_size = mp.comment_size || 20
            sf._saveload.comment_se = mp.comment_se || ""
            sf._saveload.comment_enterse = mp.comment_enterse || ""
            TYRANO.kag.ftag.nextOrder()
        },
    }
    TYRANO.kag.ftag.master_tag.saveload_ex_components_comment = TYRANO.kag.tag.saveload_ex_components_comment
    TYRANO.kag.ftag.master_tag.saveload_ex_components_comment.kag = TYRANO.kag

    //ファイル存在確認
    TYRANO.kag.tag.saveload_ex_components_fileset = {
        start: function (mp) {
            checkFile()
            TYRANO.kag.ftag.nextOrder()
        },
    }
    TYRANO.kag.ftag.master_tag.saveload_ex_components_fileset = TYRANO.kag.tag.saveload_ex_components_fileset
    TYRANO.kag.ftag.master_tag.saveload_ex_components_fileset.kag = TYRANO.kag
})()
