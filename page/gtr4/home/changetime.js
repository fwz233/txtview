
import { readFileSync, writeFileSync } from './../../../utils/fs'
const logger = DeviceRuntimeCore.HmLogger.getLogger('helloworld')
var Is_start=false
import { gettext } from 'i18n'
Page({
  build() {
    logger.debug('page build invoked')
  },
  onInit() {
    logger.debug('page onInit invoked')
  
    
    const one_start = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 0,
        y:36,
          w: 466,
          h: 64,
      press_src: 'setting_64_down.png',
      normal_src: 'setting_64.png',
      click_func: up
    })
    function up(button) {
       hmApp.goBack()
       if(!sos_screen_button)
   hmApp.gotoPage({ file: 'page/gtr4/home/sos' })
     }
     hmUI.setScrollView(true, 321,2)
     const version = hmUI.createWidget(hmUI.widget.TEXT)
     version.setProperty(hmUI.prop.MORE, {
      x: 69,
      y: 36+64,
   w: 233+123,
   h: 56,
   text:  gettext('version'),
   color: 0xffffff,
   text_size: 36,
   align_h: hmUI.align.LEFT
   })


    const text = hmUI.createWidget(hmUI.widget.TEXT)
text.setProperty(hmUI.prop.MORE, {
  x: 49,
  y: 36+64+56+64,
  w: 466-49-49,
  h: 444,
  text: gettext('cahnge_time'),
  color: 0xc08eaf,
  text_size: 30,
  text_style:hmUI.text_style.WRAP,
})

   
function slideCheckedChangeFunc(slide, checked) {
  if(Is_start){
    writeFileSync(checked, false,'sos_screen')
    sos_screen_button=checked
    if(checked)
    hmUI.showToast({
      text: gettext('notice_3')
      })
      else
      hmUI.showToast({
        text:gettext('notice_4')
        })
      }
    }
      const slideSwitchtext = hmUI.createWidget(hmUI.widget.TEXT)
      slideSwitchtext.setProperty(hmUI.prop.MORE, {
  x: 69,
  y: 36+64+56,
  w: 233,
  h: 64,
  text: gettext('notice_5'),
  color: 0xffffff,
  text_size: 44,
  align_h: hmUI.align.LEFT
})

var sos_screen=readFileSync('sos_screen'),sos_screen_button
if(sos_screen.length==0)
sos_screen_button=false
else
sos_screen_button=sos_screen
      const slideSwitch = hmUI.createWidget(hmUI.widget.SLIDE_SWITCH, {
        x: 69+166+16,
        y: 36+64+56,
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
      Is_start=true
  
    

  },
  onDestory() {
   
}   
})
