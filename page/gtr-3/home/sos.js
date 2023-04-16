const device = hmSetting.getDeviceInfo()
function xw(num) { return Math.ceil(num / 454 * device.width) }
function yh(num) { return Math.ceil(num / 454 * device.height) }
import { readFileSync, writeFileSync } from '../../../utils/fs'
const logger = DeviceRuntimeCore.HmLogger.getLogger('helloworld')
import { gettext } from 'i18n'
var data, context, book, modColor, pageChange, page_number, page_now = [1], ta = 0, pageCount = 345;
Page({
  build() { },
  onInit() {
    hmApp.setScreenKeep(true)

    context = readFileSync('context')
    if (context.length == 0) context = 0
    book = readFileSync('book')
    if (book.length == 0) book = '1'
    const fileName = 'raw/nb' + book + '.txt';
    const [fs_stat, err] = hmFS.stat_asset(fileName);
    var maxSize;
    if (err == 0) {
      console.log('--->size:', fs_stat.size);
      if (fs_stat.size != 0) {
        maxSize = fs_stat.size;
      }
    }
    else {
      console.log('err:', err)
    }
    var persent = Math.ceil(maxSize / (690));
    const file = hmFS.open_asset(fileName, hmFS.O_RDONLY);
    const test_buf = new Uint16Array(pageCount);
    const test_buf2 = new Uint16Array(test_buf.length);
    var offsetCurrent = context * pageCount * 2;
    hmFS.seek(file, offsetCurrent, hmFS.SEEK_SET);
    var result = hmFS.read(file, test_buf2.buffer, 0, test_buf2.length * 2);
    for (var i = 0; i < test_buf2.length; i++) {
      if (test_buf2[i] == 65279) {
        test_buf2[i] = 32;
      }
      else if (test_buf2[i] == 10 || test_buf2[i] == 13) {
        test_buf2[i] = 32;
      }
      if (test_buf2[i] != 0) {
        onEnd = false;
      }
    }
    data = String.fromCharCode.apply(null, test_buf2);
    const nowTime = hmSensor.createSensor(hmSensor.id.TIME)
    data = data.replace(/\s+/g, "\n\n    ")
    if (readFileSync('lowMode_status') == [])
      modColor = 0xeeeeee
    else
      modColor = 0x888888
    var { width, height } = hmUI.getTextLayout(data, {
      text_size: 30,
      text_width: xw(382)
    })
    page_number = Math.ceil(height / 321)
    hmUI.setScrollView(true, 321, page_number)
    height = Math.ceil(height / 321) * 321
    const text = hmUI.createWidget(hmUI.widget.TEXT)
    text.setProperty(hmUI.prop.MORE, {
      x: xw(39),
      y: yh(96),
      w: xw(378),
      h: height,
      text: data,
      color: modColor,
      text_size: 30,
      text_style: hmUI.text_style.WRAP,
    })
    const one_start = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: xw(0),
      y: yh(42),
      w: xw(38),
      h: yh(370),
      normal_color: 0x000000,
      press_color: 0x111111,
      text: '<',
      color: modColor,
      radius: 46,
      click_func: up
    })
    const one_menu = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: xw(0),
      y: yh(42),
      w: xw(454),
      h: yh(46),
      normal_color: 0x000000,
      press_color: 0x111111,
      text: (context + 1) + "-" + (((context + 1) * 100) / persent).toFixed(2) + "%" + '-' + nowTime.hour + ':' + nowTime.minute,
      text_size: 25,
      color: modColor,
      radius: 24,
      click_func: menu
    })
    const one_end = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: xw(454 - 38),
      y: yh(42),
      w: xw(38),
      h: yh(370),
      normal_color: 0x000000,
      press_color: 0x111111,
      text: '>',
      color: modColor,
      radius: 46,
      click_func: scroll
    })
    const one_next = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: xw(0),
      y: yh(height + 84),
      w: xw(454),
      h: yh(60),
      normal_color: 0x000000,
      press_color: 0x111111,
      text: 'v',
      text_size: 34,
      color: modColor,
      radius: 46,
      click_func: down
    })
    if (device.width < 300) hmUI.deleteWidget(one_start)
    if (device.width < 300) hmUI.deleteWidget(one_end) // band
    pageChange = readFileSync('pageChange')
    if (pageChange.length == 0) {
      writeFileSync('none', false, 'pageChange')
    }
    if (pageChange != 'none') {
      writeFileSync('none', false, 'pageChange')
    }
    hmApp.registerGestureEvent(function (event) {
      page_now.push(hmUI.getScrollCurrentPage())
      if (event == hmApp.gesture.DOWN) {
        if (page_now[page_now.length - 1] == 1 && page_now[page_now.length - 2] == page_now[page_now.length - 1])
          up()
      }
      else if (event == hmApp.gesture.UP) {
        if (page_now[page_now.length - 1] == page_number && page_now[page_now.length - 2] == page_now[page_now.length - 1])
          down()
      }
      return false
    })

    function up(button) {
      if (context != 0) {
        context--;
        writeFileSync(context, false, 'context')
        hmFS.close(file)
        hmApp.reloadPage({ file: 'page/gtr-3/home/sos' })
      }
      else hmUI.showToast({ text: '前面没有了喵~' })
    }
    function down(button) {
      if (context + 1 != persent) {
        context++;
        writeFileSync(context, false, 'context')
        hmFS.close(file)
        hmApp.reloadPage({ file: 'page/gtr-3/home/sos' })
      }
      else hmUI.showToast({ text: '已经看完了喵~' })
    }
    function menu(button) {
      hmFS.close(file)
      hmApp.gotoPage({ file: 'page/gtr-3/home/menu' })
    }
    function scroll() {
      ta++;
      if (device.width > 300) one_start.setProperty(hmUI.prop.MORE, {
        x: xw(0),
        y: yh(42 + ta * 321),
        w: xw(38),
        h: yh(370)
      });
      if (device.width > 300) one_end.setProperty(hmUI.prop.MORE, {
        x: xw(454 - 38),
        y: yh(42 + ta * 321),
        w: xw(38),
        h: yh(370)
      });
      (hmApp.getLayerY() - 321 > 0 - height) ? (hmApp.setLayerY(hmApp.getLayerY() - 321)) : down()
    }
    hmApp.registerKeyEvent(function (key, action) {
      if (key == hmApp.key.HOME) {
        if (action == hmApp.action.RELEASE) {
          writeFileSync('back', false, 'pageChange')
          hmFS.close(file)
          hmApp.gotoHome()
        }
        return true
      }
    })
    automode = readFileSync('autoMode_status')
    if (automode.length == 0)
      automode_button = false
    else
      automode_button = automode
    if (automode_button) {
      hmSetting.setBrightScreen(1800)
      const timer1 = timer.createTimer(
        4000,
        4000,
        function (option) {
          scroll()
        }
      )
    }
  },
  onDestory() {
    hmApp.unregisterKeyEvent();
    hmApp.unregisterGestureEvent();
  }
})
