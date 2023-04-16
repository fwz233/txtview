const device = hmSetting.getDeviceInfo()
function xw(num) { return Math.ceil(num / 454 * device.width) }
function yh(num) { return Math.ceil(num / 454 * device.height) }
import { gettext } from 'i18n'

Page({
    build() { },
    onInit() {
        function back() {
            hmApp.goBack()
        }
        function set() {
            hmApp.gotoPage({ file: 'page/gtr-3/home/changetime' })
        }
        function about() {
            hmApp.gotoPage({ file: 'page/gtr-3/home/about' })
        }
        function debug() {
            hmApp.gotoPage({ file: 'page/gtr-3/home/debug' })
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
        const settingButton = hmUI.createWidget(hmUI.widget.BUTTON, {
            x: xw(227 - 95),
            y: yh(150),
            w: xw(190),
            h: yh(70),
            radius: 22,
            normal_color: 0xc08eaf,
            press_color: 0x505050,
            text: gettext('set'),
            text_size: xw(32),
            click_func: set
        })
        const aboutButton = hmUI.createWidget(hmUI.widget.BUTTON, {
            x: xw(227 - 95),
            y: yh(150 + 80),
            w: xw(190),
            h: yh(70),
            radius: 22,
            normal_color: 0xc08eaf,
            press_color: 0x505050,
            text: gettext('about'),
            text_size: xw(32),
            click_func: about
        })
        const debugButton = hmUI.createWidget(hmUI.widget.BUTTON, {
            x: xw(227 - 95),
            y: yh(150 + 80 + 80),
            w: xw(190),
            h: yh(70),
            radius: 22,
            normal_color: 0xc08eaf,
            press_color: 0x505050,
            text: gettext('debug'),
            text_size: xw(32),
            click_func: debug
        })
    },
    onDestory() { }
})
