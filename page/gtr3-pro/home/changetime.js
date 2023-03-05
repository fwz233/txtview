import { readFileSync, writeFileSync } from './../../../utils/fs'
const logger = DeviceRuntimeCore.HmLogger.getLogger('helloworld')
var Is_start = false
import { gettext } from 'i18n'

Page({
  build() {
    logger.debug('page build invoked')
  },
  onInit() {
    logger.debug('page onInit invoked')
    function back() {
      hmApp.goBack()
    }
    const one_start = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 0,
      y: 36,
      w: 480,
      h: 64,
      press_src: 'setting_64_down.png',
      normal_src: 'setting_64.png',
      click_func: back
    })
    hmUI.setScrollView(true, 370, 2)
    function slideCheckedChangeFunc(slide, checked) {
      if (Is_start) {
        writeFileSync(checked, false, 'sos_screen')
        sos_screen_button = checked
      }
    }
    function lowMode(slide, checked) {
      writeFileSync(checked, false, 'lowMode_status')
      lowmode = checked
    }
    function autoMode(slide, checked) {
      writeFileSync(checked, false, 'autoMode_status')
      automode = checked
    }

    const sliderText = hmUI.createWidget(hmUI.widget.TEXT), sliderText_2 = hmUI.createWidget(hmUI.widget.TEXT), sliderText_3 = hmUI.createWidget(hmUI.widget.TEXT)
    sliderText.setProperty(hmUI.prop.MORE, {
      x: 69,
      y: 156,
      w: 233,
      h: 64,
      text: gettext('notice_5'),
      color: 0xffffff,
      text_size: 44,
      align_h: hmUI.align.LEFT
    })
    sliderText_2.setProperty(hmUI.prop.MORE, {
      x: 69,
      y: 156 + 76,
      w: 233,
      h: 64,
      text: gettext('notice_7'),
      color: 0xffffff,
      text_size: 44,
      align_h: hmUI.align.LEFT
    })
    sliderText_3.setProperty(hmUI.prop.MORE, {
      x: 69,
      y: 156 + 76 + 76,
      w: 233,
      h: 64,
      text: gettext('notice_8'),
      color: 0xffffff,
      text_size: 44,
      align_h: hmUI.align.LEFT
    })

    var sos_screen = readFileSync('sos_screen'), lowmode = readFileSync('lowMode_status'), automode = readFileSync('autoMode_status')
    var sos_screen_button, lowmode_button, automode_button
    if (sos_screen.length == 0)
      sos_screen_button = false
    else
      sos_screen_button = sos_screen
    if (lowmode.length == 0)
      lowmode_button = false
    else
      lowmode_button = lowmode
    if (automode.length == 0)
      automode_button = false
    else
      automode_button = automode

    const slider = hmUI.createWidget(hmUI.widget.SLIDE_SWITCH, {
      x: 69 + 166 + 16,
      y: 156,
      w: 128,
      h: 64,
      select_bg: 'switch/switch_on.png',
      un_select_bg: 'switch/switch_off.png',
      slide_src: 'switch/switch_cricle.png',
      slide_select_x: 64,
      slide_un_select_x: 0,
      checked: sos_screen_button,
      checked_change_func: slideCheckedChangeFunc
    })
    const slider_2 = hmUI.createWidget(hmUI.widget.SLIDE_SWITCH, {
      x: 69 + 166 + 16,
      y: 156 + 76,
      w: 128,
      h: 64,
      select_bg: 'switch/switch_on.png',
      un_select_bg: 'switch/switch_off.png',
      slide_src: 'switch/switch_cricle.png',
      slide_select_x: 64,
      slide_un_select_x: 0,
      checked: lowmode_button,
      checked_change_func: lowMode
    })
    const slider_3 = hmUI.createWidget(hmUI.widget.SLIDE_SWITCH, {
      x: 69 + 166 + 16,
      y: 156 + 76 + 76,
      w: 128,
      h: 64,
      select_bg: 'switch/switch_on.png',
      un_select_bg: 'switch/switch_off.png',
      slide_src: 'switch/switch_cricle.png',
      slide_select_x: 64,
      slide_un_select_x: 0,
      checked: automode_button,
      checked_change_func: autoMode
    })
    const lala = ["fwz233在这里摸鱼", "Himekawa在这里睡觉", "CuberQAQ在这里跳大神", "Sky233在这里摆烂"]
    const lalala = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 14,
      y: 680,
      w: 400,
      h: 36,
      color: 0x888888,
      text_size: 28,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: lala[Math.floor((Math.random() * 4))]
    })
    Is_start = true
  },
  onDestory() { }
})
