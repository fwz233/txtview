const device = hmSetting.getDeviceInfo()
function xw(num) { return Math.ceil(num / 454 * device.width) }
function yh(num) { return Math.ceil(num / 454 * device.height) }
import { gettext } from 'i18n'
import { readFileSync, writeFileSync } from './../../../utils/fs'
Page({
    build() { },
    onInit() {
        function magic(){
            writeFileSync('0',false,'magic')
            hmApp.gotoPage({ file: 'page/gtr-3/home/index.page' })
        }
        const appname = hmUI.createWidget(hmUI.widget.BUTTON, {
            x: xw(0),
            y: yh(40),
            w: xw(454),
            h: yh(40),
            normal_color: 0x000000,
            press_color: 0x000000,
            text: '训练',
            text_size: 32,
            color: 0xffffff,
            radius: 46,
            click_func: magic
          })
        const tip = hmUI.createWidget(hmUI.widget.TEXT)
        tip.setProperty(hmUI.prop.MORE, {
            x: xw(0),
            y: yh(230),
            w: xw(454),
            h: yh(50),
            text: '当前暂无训练计划',
            color: 0x232323,
            text_size: 28,
            align_h: hmUI.align.CENTER_H
        })
       
    },
    onDestory() { }
})
