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
        const version = hmUI.createWidget(hmUI.widget.TEXT)
        version.setProperty(hmUI.prop.MORE, {
            x: 80,
            y: 100,
            w: 356,
            h: 56,
            text: gettext('version'),
            color: 0xffffff,
            text_size: 36,
            align_h: hmUI.align.LEFT
        })
        const text = hmUI.createWidget(hmUI.widget.TEXT)
        text.setProperty(hmUI.prop.MORE, {
            x: 49,
            y: 64 + 100,
            w: 480 - 49 - 49,
            h: 600,
            text: gettext('change_time'),
            color: 0xc08eaf,
            text_size: 30,
            text_style: hmUI.text_style.WRAP,
        })
    },
    onDestory() { }
})
