import { gettext } from 'i18n'

Page({
    build() { },
    onInit() {
        function back() {
            hmApp.goBack()
        }
        function set() {
            hmApp.gotoPage({ file: 'page/gtr3-pro/home/changetime' })
        }
        function about() {
            hmApp.gotoPage({ file: 'page/gtr3-pro/home/about' })
        }
        function debug() {
            hmUI.showToast({ text: '仅对Pro版开放' })
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
        const settingButton = hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 227 - 95,
            y: 150,
            w: 190,
            h: 70,
            radius: 22,
            normal_color: 0xc08eaf,
            press_color: 0x707070,
            text: gettext('set'),
            text_size: 32,
            click_func: set
        })
        const aboutButton = hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 227 - 95,
            y: 150 + 80,
            w: 190,
            h: 70,
            radius: 22,
            normal_color: 0xc08eaf,
            press_color: 0x707070,
            text: gettext('about'),
            text_size: 32,
            click_func: about
        })
        const debugButton = hmUI.createWidget(hmUI.widget.BUTTON, {
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
    },
    onDestory() { }
})
