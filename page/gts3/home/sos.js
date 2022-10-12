
import { readFileSync, writeFileSync } from '../../../utils/fs'
const logger = DeviceRuntimeCore.HmLogger.getLogger('helloworld')
import { DEFAULT_TODOLIST } from './../../../utils/constants'
import { gettext } from 'i18n'
import { str_lenght } from './../../../utils/fsjs'

var data;
var context;
var pageChange,page_number,page_now=[1];

Page({
  build() {
    logger.debug('page build invoked')
  },
  onInit() {
    logger.debug('page onInit invoked')
    hmApp.setScreenKeep(true)

// data=str

context=readFileSync('context')
if(context.length==0)
context=0


const fileName = 'raw/nb.txt';
const [fs_stat, err] = hmFS.stat_asset(fileName);
var maxSize
if (err == 0) {
  console.log('--->size:', fs_stat.size);
  if(fs_stat.size != 0){
      maxSize = fs_stat.size;
  }
} else {
  console.log('err:', err)
}
var pageCount= 345 
const file = hmFS.open_asset('raw/nb.txt', hmFS.O_RDONLY);
    const test_buf = new Uint16Array(pageCount);
    const test_buf2 = new Uint16Array(test_buf.length);
    var offsetCurrent = context * pageCount * 2;
    hmFS.seek(file, offsetCurrent, hmFS.SEEK_SET);
    var result = hmFS.read(file, test_buf2.buffer, 0, test_buf2.length * 2);
    for(var i = 0;i < test_buf2.length; i++){
        if(test_buf2[i] == 65279){
            test_buf2[i] = 32;
        } else if(test_buf2[i] == 10 || test_buf2[i] == 13){
            test_buf2[i] = 32;
        }
        if(test_buf2[i] != 0){
            onEnd = false;
        }
    }
        data = String.fromCharCode.apply(null, test_buf2);
        // persent = Math.floor(offsetCurrent * 100 / maxSize) + '%';
        data=(context+1)+".-"+(((context+1)*100)/str_lenght).toFixed(2)+"%"+"\n"+data.replaceAll('\\n','\n')

const one_start = hmUI.createWidget(hmUI.widget.BUTTON, {
  x: 0,
    y: 49-166,
      w: 390,
      h: 166,
  press_src: 'clickdown.png',
  normal_src: 'start.png',
  click_func: up
})

var { width, height } = hmUI.getTextLayout(data, {
  text_size: 30,
  text_width: 390-16-16
})
page_number= Math.ceil(height/345)
hmUI.setScrollView(true, 345,page_number) //345
height=Math.ceil(height/345)*345
    const text = hmUI.createWidget(hmUI.widget.TEXT)
    text.setProperty(hmUI.prop.MORE, {
      x: 16,
      y: 49,
      w: 390-16-16,
      h: height,
      text:data,
      color: 0xffffff,
      text_size: 30,
      text_style:hmUI.text_style.WRAP,
    })
    const one_setting = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 0,
        y:49+height,
          w: 390,
          h: 166,
      press_src: 'clickdown.png',
      normal_src: 'stop.png',
      click_func: down
    })
   
    pageChange=readFileSync('pageChange')
if(pageChange.length==0){  
  writeFileSync('none', false,'pageChange')
// hmApp.reloadPage({ file: 'page/gts3/home/sos' })
}
  if(pageChange!='none'){
    writeFileSync('none', false,'pageChange')
    // hmApp.reloadPage({ file: 'page/gts3/home/sos' })
}
  // hmUI.scrollToPage(Math.ceil(height/345), false)
  hmUI.setStatusBarVisible(false)
  
  hmApp.registerGestureEvent(function (event) {
    page_now.push(hmUI.getScrollCurrentPage())
    // hmUI.showToast({
    //   text: page_now.length+":"+page_now
    // })
    if(event==hmApp.gesture.DOWN){
     if(page_now[page_now.length-1]==1&&page_now[page_now.length-2]==page_now[page_now.length-1])
     up()
    }else if(event==hmApp.gesture.UP){
      if(page_now[page_now.length-1]==page_number&&page_now[page_now.length-2]==page_now[page_now.length-1])
      down()
   }
     return false
   })


    function up(button) {
     // writeFileSync('up', false,'pageChange')
      if(context!=0)
      context--;
      writeFileSync(context, false,'context')
      hmApp.reloadPage({ file: 'page/gts3/home/sos' })
  //     hmApp.goBack()
  // hmApp.gotoPage({ file: 'page/gts3/home/sos' })
    }
    function down(button) {
  //    writeFileSync('down', false,'pageChange')
     if(context+1!=str_lenght)
      context++
      writeFileSync(context, false,'context')
      hmApp.reloadPage({ file: 'page/gts3/home/sos' })
  //     hmApp.goBack()
  // hmApp.gotoPage({ file: 'page/gts3/home/sos' })
    }
    hmApp.registerKeyEvent(function (key, action) {
      if(key==hmApp.key.HOME){
        if(action==hmApp.action.RELEASE){
          writeFileSync('back', false,'pageChange')
           hmApp.gotoHome()
             } 
             return true
      }
    })
//     //注册手势监听 一个 JsApp 重复注册会导致上一个注册的回调失效
//     var button,button_view=0
// hmApp.registerGestureEvent(function (event) {
//     if(event==hmApp.gesture.LEFT){
//       button_view++
//       if(button_view%2==1)
//        button = hmUI.createWidget(hmUI.widget.BUTTON, {
//         x: 0,
//         y: 0,
//         w: 390,
//         h: 450*Math.ceil(height/345),
//         // press_src: rootPath + 'test/normalbtn_h.png',
//         // normal_src: rootPath + 'test/normalbtn_n.png',
//         press_color: 0x000000,
//         normal_color: 0x000000,
//         text: '',
//         click_func: buttonClickFunc
//       })
//       else
//       hmUI.deleteWidget(button)
//     }
//   return false
// })
// function buttonClickFunc(button) {
//   hmUI.deleteWidget(button)
// }
//注册手势监听 一个 JsApp 重复注册会导致上一个注册的回调失效 

      },
      onDestory() {
        // hmSetting.setBrightScreen(10)
        hmApp.unregisterKeyEvent();
        hmApp.setScreenKeep(false);
      // 取消注册手势监听
hmApp.unregisterGestureEvent()
    }   
    })
    

