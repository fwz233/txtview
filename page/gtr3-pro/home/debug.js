import { gettext } from 'i18n'

Page({
    build() { },
    onInit() {
        function back() {
            hmApp.goBack()
        }
        const backButton = hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 0,
            y: 36,
            w: 454,
            h: 64,
            press_src: 'setting_64_down.png',
            normal_src: 'setting_64.png',
            click_func: back
        })
        /*
        const autoModeSetting = hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 227 - 95,
            y: 150 + 80 + 80,
            w: 190,
            h: 70,
            radius: 22,
            normal_color: 0xc08eaf,
            press_color: 0x707070,
            text: gettext('debug'),
            text_size: 32,
            click_func: debug
        })
        */
    },
    onDestory() { }
})
