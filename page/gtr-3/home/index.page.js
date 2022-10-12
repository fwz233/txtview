;const logger = DeviceRuntimeCore.HmLogger.getLogger('helloworld')
import { readFileSync, writeFileSync } from './../../../utils/fs'
import { str_lenght } from './../../../utils/fsjs'
const { messageBuilder } = getApp()._options.globalData
import { DEFAULT_TODOLIST } from './../../../utils/constants'
var data,sos_screen,pageChange;
var txtNum,scrollList;
import { gettext } from 'i18n'
//var Is_start=false
Page({
  build() {
    logger.debug('page build invoked')
  },
  onInit() {
    logger.debug('page onInit invoked')
    // this.onMessage()
    // this.getTodoList()
    
 // Is_start=readFileSync('is_start')

 hmUI.setScrollView(true, 454, 1) 
  



const dataList = [
'1',
'2',
'3'
]
 scrollList = hmUI.createWidget(hmUI.widget.SCROLL_LIST, {
  x: 72,
  y: 36,
  h: 454-36-36,
  w: 454-144,
  item_space: 0,
  item_config: [
    {
      type_id: 0,
      item_bg_radius: 10,
      text_view:[{ x: 0, y: 0, w: 454-144, h: 70,key: 'name', color: 0xc0dfd7, text_size: 30 }],
      text_view_count: 1,
      item_height: 75
    },
    {
      type_id: 1,
      item_bg_color: 0xc08eaf,
      item_bg_radius: 36,
      text_view:[{ x: 0, y: 0, w:  454-144, h: 70,key: 'name', color: 0xffffff, text_size: 44 }],
      text_view_count: 1,
      item_height: 75
    },
    {
      type_id: 2,
      item_bg_color: 0x000000,
      item_bg_radius: 0,
      text_view:[{ x: 0, y: 0, w:  454-144, h: 0,key: 'name', color: 0xffffff, text_size: 0 }],
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
      end:0,
      type_id: 1
    }
  ],
  data_type_config_count: 1
})

this.createAndUpdateList(1)

sos_screen=readFileSync('sos_screen')
if(sos_screen.length==0)
sos_screen=false
pageChange=readFileSync('pageChange')
if(pageChange.length==0)
pageChange='none'
if(sos_screen&&pageChange=='back'){
  hmApp.gotoPage({ file: 'page/gtr-3/home/sos' })
}

  },
  onDestory() {
    writeFileSync('back', false,'pageChange')
  },createAndUpdateList(sb) {

    var text
      if(sb==0){
        // text=str  
        // txtNum= str.length;
      }else if(sb==1){
        text=[]
        txtNum=100;
    }



var text_type_config=[
  {
    start: 0,
    end: 0,
    type_id: 1
  }
]
var start_text_type_config=-1,end_text_type_config;
for(var txt=0;txt<txtNum;txt++){
  // text[txt]=text[txt].substring(0,9)
  if(sb==0)
  text[txt]=(txt+1)+"-"+(((txt+1)*100)/txtNum).toFixed(2)+"%"
  if(sb==1)
  text.push((txt+1)+"%")

  text_type_config.push({
   start: txt+1,
   end: txt+1,
   type_id: 0
 })
}


text.unshift(gettext('setting'))

scrollList.setProperty(hmUI.prop.UPDATE_DATA, {
  data_type_config: text_type_config,
  data_type_config_count: text_type_config.length,
  data_array: text,
  //数据长度
  data_count: text.length,
  //刷新数据后停留在当前页面，不设置或者设为0则回到list顶部
  on_page: 1
})

  //     hmUI.showToast({
  //   text: '666+'+sb
  // })
}, scrollListItemClick(list, index) {
  if(index!=0&&index!=txtNum+1){
  writeFileSync(index-1, false,'context')
 //writeFileSync('down', false,'pageChange')
  hmApp.gotoPage({ file: 'page/gtr-3/home/sos' })
}else  if(index==0){
    hmApp.gotoPage({ file: 'page/gtr-3/home/changetime' })
  }else if(index==txtNum+1){
    hmUI.showToast({
  text:  gettext('save_notic')
})
// this.createAndUpdateList(0)
}
}
})
