const device = hmSetting.getDeviceInfo()
function xw(num) { return Math.ceil(num / 454 * device.width) }
function yh(num) { return Math.ceil(num / 454 * device.height) }
// const logger = DeviceRuntimeCore.HmLogger.getLogger('helloworld')
import { readFileSync, writeFileSync } from './../../../utils/fs'
// const { messageBuilder } = getApp()._options.globalData
var sos_screen, pageChange, txtNum, scrollList;
import { gettext } from 'i18n'
Page({
  build() {
    hmApp.setScreenKeep(false);
    // if(readFileSync('magic')=='') hmApp.gotoPage({ file: 'page/gtr-3/home/magic' })
  },
  onInit() {
    // Is_start=readFileSync('is_start')
    //hmUI.setScrollView(true, yh(454), 1)
    const dataList = [
      '1',
      '2',
      '3'
    ];
    function back() {
      if (sos_screen.length == 0)
        sos_screen = false
      if (sos_screen) {
        hmApp.gotoPage({ file: 'page/gtr-3/home/sos' })
      }
    }
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: xw(480 - 60),
      y: yh(220),
      w: xw(32),
      h: yh(32),
      radius: 46,
      normal_color: 0xc08eaf,
      press_color: 0x505050,
      text: '!',
      click_func: back
    })
    scrollList = hmUI.createWidget(hmUI.widget.SCROLL_LIST, {
      x: xw(77),
      y: yh(36),
      w: xw(300),
      h: yh(382),
      item_space: 0,
      item_config: [
        {
          type_id: 0,
          item_bg_radius: 10,
          text_view: [{ x: xw(0), y: yh(0), w: xw(310), h: yh(70), key: 'name', color: 0xc0dfd7, text_size: 30 }],
          text_view_count: 1,
          item_height: 75
        },
        {
          type_id: 1,
          item_bg_color: 0xc08eaf,
          item_bg_radius: 36,
          text_view: [{ x: xw(0), y: yh(0), w: xw(310), h: yh(70), key: 'name', color: 0xffffff, text_size: 44 }],
          text_view_count: 1,
          item_height: 75
        },
        {
          type_id: 2,
          item_bg_color: 0x000000,
          item_bg_radius: 0,
          text_view: [{ x: xw(0), y: yh(0), w: xw(310), h: yh(0), key: 'name', color: 0xffffff, text_size: 0 }],
          text_view_count: 1,
          item_height: 0
        }
      ],
      item_config_count: 3,
      data_array: dataList,
      data_count: dataList.length,
      item_click_func: this.scrollListItemClick,
      data_type_config: [
        {
          start: 0,
          end: 0,
          type_id: 1
        }
      ],
      data_type_config_count: 1
    })

    this.createAndUpdateList(1)

    sos_screen = readFileSync('sos_screen')
    if (sos_screen.length == 0)
      sos_screen = false
    pageChange = readFileSync('pageChange')
    if (pageChange.length == 0)
      pageChange = 'none'
    if (sos_screen && pageChange == 'back') {
      hmApp.gotoPage({ file: 'page/gtr-3/home/sos' })
    }
    var automode = readFileSync('autoMode_status'), automode_button
    if (automode.length == 0)
      automode_button = false
    else
      automode_button = automode
    if (automode_button) {
      hmSetting.setBrightScreenCancel()
      hmUI.showToast({ text: '已恢复亮屏时间' })
    }
  },
  onDestory() {
    //writeFileSync('', false, 'magic')
    writeFileSync('back', false, 'pageChange')
  },
  
  createAndUpdateList(sb) {
    var text
    if (sb == 0) {
      // text=str  
      // txtNum= str.length;
    }
    else if (sb == 1) {
      text = []
      txtNum = 100;
    }
    var text_type_config = [
      {
        start: 0,
        end: 0,
        type_id: 1
      }
    ]
    for (var txt = 0; txt < txtNum; txt++) {
      if (sb == 0)
        text[txt] = (txt + 1) + (((txt + 1) * 100) / txtNum).toFixed(2) + "%"
      if (sb == 1)
        text.push(txt + '%')
      text_type_config.push({
        start: txt + 1,
        end: txt + 1,
        type_id: 0
      })
    }

    text.unshift(gettext('setting'))

    scrollList.setProperty(hmUI.prop.UPDATE_DATA, {
      data_type_config: text_type_config,
      data_type_config_count: text_type_config.length,
      data_array: text,
      data_count: text.length, // 数据长度
      on_page: 1 // 刷新数据后停留在当前页面，不设置或者设为0则回到list顶部
    })
  }, scrollListItemClick(list, index) {
    var book = readFileSync('book')
    if (book.length == 0) book = '1'
    const fileName = 'raw/nb' + book + '.txt';
    const [fs_stat, err] = hmFS.stat_asset(fileName);
    var maxSize;
    if (err == 0) {
      if (fs_stat.size != 0) {
        maxSize = fs_stat.size;
      }
    }
    else {
      maxSize = 0
      console.log('err:', err)
    }
    var persent = Math.ceil(maxSize / (690));
    if (index != 0 && index != txtNum + 1) {
      // writeFileSync('down', false,'pageChange')
      const protectDialog = hmUI.createDialog({
        title: gettext('protect') + (index - 1) + '%?',
        show: true,
        auto_hide: false,
        click_linster: ({ type }) => {
          if (type) {
            writeFileSync(Math.round(persent / 100 * (index - 1)), false, 'context')
            hmApp.gotoPage({ file: 'page/gtr-3/home/sos' })
          }
          protectDialog.show(false)
        }
      })
    }
    else if (index == 0) {
      hmApp.gotoPage({ file: 'page/gtr-3/home/menu' })
    }
    else if (index == txtNum + 1) {
      hmUI.showToast({
        text: gettext('save_notic')
      })
    }
  }
})
