import { gettext } from 'i18n'
import { DEFAULT_TODOLIST } from './../utils/constants'
AppSettingsPage({
  state: {
    todoList: [],
    props: {},
  },
  addTodoList(val) {
    if(val.length<=345)
    this.state.todoList.push(val)//.replaceAll("　"," "))
    else{
      var txtnum= Math.ceil(val.length/345)
      for(var sb=0;sb<txtnum;sb++)
      this.state.todoList.push((sb+1)+"+-"+val.substring(sb*345,(sb+1)*345+9))//.replaceAll("　"," "))
    }
    this.setItem()
  },
  addTodoListNormal(val) {
     this.state.todoList.push(val)
    this.setItem()
  },
  editTodoList(val, index) {
    if(val.indexOf("　") != -1)
    this.state.todoList[index] = val.replaceAll("　"," ")
    else
    this.state.todoList[index] = val//.replaceAll("　"," ")
    this.setItem()
  },
  deleteTodoList(index) {
    this.state.todoList.splice(index, 1)
    this.setItem()
  },
  deleteTodoList_all(index) {
    this.state.todoList.splice(0)
    this.setItem()
  },
  setItem() {
    const newString = JSON.stringify(this.state.todoList);
    this.state.props.settingsStorage.setItem('todoList', newString)
  },
  setState(props) {
    this.state.props = props
    if (props.settingsStorage.getItem('todoList')) {
      this.state.todoList = JSON.parse(props.settingsStorage.getItem('todoList'))
    } else {
      this.state.todoList = [...DEFAULT_TODOLIST]
    }
    console.log('todoList: ', this.state.todoList)
  },
  build(props) {
    this.setState(props)
    const contentItems = []
    const addBTN =  View({
      style: {
        // borderBottom: '1px solid #eaeaea',
        padding: '6px 0',
        marginBottom: '6px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // border: '1px solid black',
      },
    }, [ View({
      style: {
        fontSize: '12px',
        lineHeight: '30px',
        borderRadius: '30px',
        background: '#409EFF',
        color: 'white',
        textAlign: 'Center',
        padding: '0 15px',
        width: '17%',
      },
    }, [
      TextInput({
        label: gettext('add'),
        rows:9,
        multiline:true,
        onChange: (val) => {
          this.addTodoList(val)
        },
      }),
    ], ),Button({
      label: gettext('delete_all'),
      style: {
        fontSize: '12px',
        borderRadius: '9px',
        background: '#D85E33',
        color: 'white',
      },
      onClick: () => {
        this.deleteTodoList_all()
      },
    }) ], )

    const addBTNNormal = View({
      style: {
        fontSize: '12px',
        lineHeight: '30px',
        borderRadius: '30px',
        background: '#ffffff',
        color: 'black',
        textAlign: 'Center',
        padding: '0 15px',
        margin:'15px 0',
        width: '31%',
      },
    }, [
      TextInput({
        label: gettext('addNormal'),
        rows:3,
        placeholder:gettext('toast'),
        multiline:true,
        onChange: (val) => {
          this.addTodoListNormal(val)
        },
      }),
    ], )
  
    this.state.todoList.forEach((item, index) => {
      contentItems.push(
        View({
          style: {
            borderBottom: '1px solid #eaeaea',
            padding: '6px 0',
            marginBottom: '6px',
            display: 'flex',
            flexDirection: 'row',
          },
        }, [
          View({
            style: {
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              justfyContent: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              alignItems: 'center',
            },
          }, [
            TextInput({
              label: '',
              bold: true,
              multiline:true,
              rows:9,
              value: item,
              subStyle: {
                color: '#333',
                fontSize: '14px',
              },
              maxLength: 20000,
              onChange: (val) => {
                if (val.length > 0 && val.length <= 20000) {
                  this.editTodoList(val, index)
                } else {
                  console.log("todoList can't be empty or too long!")
                }
              },
            }),
          ], ),
          Button({
            label: gettext('delete'),
            style: {
              fontSize: '12px',
              borderRadius: '30px',
              background: '#D85E33',
              color: 'white',
            },
            onClick: () => {
              this.deleteTodoList(index)
            },
          }),
        ], ),
      )
    })
    return View({
      style: {
        padding: '12px 20px',
      },
    }, [
     addBTN,
      contentItems.length > 0 && View({
        style: {
          marginTop: '12px',
          padding: '10px',
          border: '1px solid #eaeaea',
          borderRadius: '6px',
          backgroundColor: 'white',
        },
      }, [...contentItems], ),
      addBTNNormal,
    ], )
  },
})