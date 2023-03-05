import { readFileSync, writeFileSync } from '../../../utils/fs'
const logger = DeviceRuntimeCore.HmLogger.getLogger('helloworld')
import { gettext } from 'i18n'
import { str_lenght } from './../../../utils/fsjs'
var data, context, pageChange, page_number, page_now = [1];

Page({
  build() {
    logger.debug('page build invoked')
  },
  onInit() {
    logger.debug('page onInit invoked')
    hmApp.setScreenKeep(true)

    context = readFileSync('context')
    if (context.length == 0) context = 0

    const fileName = 'raw/nb.txt';
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
    var pageCount = 345
    const file = hmFS.open_asset('raw/nb.txt', hmFS.O_RDONLY);
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
    // persent = Math.floor(offsetCurrent * 100 / maxSize) + '%';
    const nowTime = hmSensor.createSensor(hmSensor.id.TIME)
    // Show the current time
    data = (context + 1) + "-" + (((context + 1) * 100) / str_lenght).toFixed(2) + "%" + '-' + nowTime.hour + ':' + nowTime.minute + "\n" + data.replaceAll('\\n', '\n')

    const one_start = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 0,
      y: 49 - 166,
      w: 454,
      h: 166,
      press_src: 'clickdown.png',
      normal_src: 'start.png',
      click_func: up
    })

    var { width, height } = hmUI.getTextLayout(data, {
      text_size: 30,
      text_width: 382
    })
    page_number = Math.ceil(height / 321)
    hmUI.setScrollView(true, 321, page_number)
    height = Math.ceil(height / 321) * 321
    const text = hmUI.createWidget(hmUI.widget.TEXT)
    if (readFileSync('lowMode_status') == [])
      modColor = 0xeeeeee
    else
      modColor = 0x888888
    text.setProperty(hmUI.prop.MORE, {
      x: 36,
      y: 96,
      w: 382,
      h: height,
      text: data,
      color: modColor,
      text_size: 30,
      text_style: hmUI.text_style.WRAP,
    })

    const one_end = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 0,
      y: 96 + height,
      w: 454,
      h: 166,
      press_src: 'clickdown.png',
      normal_src: 'stop.png',
      click_func: down
    })

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
      if (context + 1 != str_lenght) {
        context++;
        writeFileSync(context, false, 'context')
        hmFS.close(file)
        hmApp.reloadPage({ file: 'page/gtr-3/home/sos' })
      }
      else hmUI.showToast({ text: '已经看完了喵~' })
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
      let ta = 0
      hmSetting.setBrightScreen(1800)
      const timer1 = timer.createTimer(
        3500,
        3500,
        function (option) {
          ta += 1;
          (ta < page_number) ? (hmApp.setLayerY(hmApp.getLayerY() - 321)) : down()
        }
      )
    }
  },
  onDestory() {
    hmApp.unregisterKeyEvent();
    hmApp.unregisterGestureEvent();
  }
})
