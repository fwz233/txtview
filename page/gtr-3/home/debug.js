const device = hmSetting.getDeviceInfo()
function xw(num) { return Math.ceil(num / 454 * device.width) }
function yh(num) { return Math.ceil(num / 454 * device.height) }
import { writeFileSync } from './../../../utils/fs'
import { gettext } from 'i18n'

Page({
    build() { },
    onInit() {
        function back() {
            hmApp.goBack()
        }
        function f1(){
            hmUI.showToast({ text: '已切换' })
            writeFileSync('1', false, 'book')
        }
        function f2(){
            hmUI.showToast({ text: '已切换' })
            writeFileSync('2', false, 'book')
        }
        function f3(){
            hmUI.showToast({ text: '已切换' })
            writeFileSync('3', false, 'book')
        }
        function f4(){
            hmUI.showToast({ text: '已切换' })
            writeFileSync('4', false, 'book')
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
        const Button_1 = hmUI.createWidget(hmUI.widget.BUTTON, {
            x: xw(227 - 90),
            y: yh(130),
            w: xw(180),
            h: yh(60),
            radius: 22,
            normal_color: 0xc08edf,
            press_color: 0x111111,
            text: '1',
            text_size: xw(32),
            click_func: f1
        })
        const Button_2 = hmUI.createWidget(hmUI.widget.BUTTON, {
            x: xw(227 - 90),
            y: yh(130 + 70),
            w: xw(180),
            h: yh(60),
            radius: 22,
            normal_color: 0xc08edf,
            press_color: 0x111111,
            text: '2',
            text_size: xw(32),
            click_func: f2
        })
        const Button_3 = hmUI.createWidget(hmUI.widget.BUTTON, {
            x: xw(227 - 90),
            y: yh(130 + 140),
            w: xw(180),
            h: yh(60),
            radius: 22,
            normal_color: 0xc08edf,
            press_color: 0x111111,
            text: '3',
            text_size: xw(32),
            click_func: f3
        })
        const Button_4 = hmUI.createWidget(hmUI.widget.BUTTON, {
            x: xw(227 - 90),
            y: yh(130 + 210),
            w: xw(180),
            h: yh(60),
            radius: 22,
            normal_color: 0xc08edf,
            press_color: 0x111111,
            text: '4',
            text_size: xw(32),
            click_func: f4
        })
    },
    onDestory() { }
})
