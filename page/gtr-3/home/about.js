import { gettext } from 'i18n'
const device = hmSetting.getDeviceInfo()
function xw(num) { return Math.ceil(num / 454 * device.width) }
function yh(num) { return Math.ceil(num / 454 * device.height) }

Page({
    build() { },
    onInit() {
        function back() {
            hmApp.goBack()
        }
        const backButton = hmUI.createWidget(hmUI.widget.BUTTON, {
            x: xw(0),
            y: yh(36),
            w: xw(454),
            h: yh(64),
            press_src: 'setting_64_down.png',
            normal_src: 'setting_64.png',
            click_func: back
        })
        const img = hmUI.createWidget(hmUI.widget.IMG, {
            x: xw(148),
            y: yh(112),
            src: 'icon.png'
          })
        const version = hmUI.createWidget(hmUI.widget.TEXT)
        version.setProperty(hmUI.prop.MORE, {
            x: xw(0),
            y: yh(278),
            w: xw(444),
            h: yh(56),
            text: gettext('version'),
            color: 0xffffff,
            text_size: 34,
            align_h: hmUI.align.CENTER_H
        })
        const text = hmUI.createWidget(hmUI.widget.TEXT)
        text.setProperty(hmUI.prop.MORE, {
            x: xw(35),
            y: yh(320),
            w: xw(454 - 70),
            h: yh(600),
            text: gettext('change_time'),
            color: 0xa08eaf,
            text_size: 30,
            text_style: hmUI.text_style.WRAP,
        })
    },
    onDestory() { }
})
