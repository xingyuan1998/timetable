import Dialog from '../../vant-weapp/dialog/dialog';
const MyColor = "rgb(0,160,0)"
import Notify from '../../vant-weapp/notify/notify';
var notify = require('../../vant-weapp/notify/notify');


Page({
  data: {
    dialogShow:false,
    background:[],
    color:[],
    quick_bg:'white',
    quick_col: 'black',
    classname:'',
    classroom:'',
    teacher:'',
    weeks:[],
    day:1,
    classTime_on:1,
    classTime_fin:1,

    show_day: false,
    columns_day: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    typeIndex_day: 1,
    typeName_day: "星期一",
    docu_title_day: "星期",

    show_jc: false,
    columns_jc: [],
    typeIndex_jc: 1,
    typeName_jc: "第1节课",
    docu_title_jc: "开始时间",

    show_jc_fin: false,
    columns_jc_fin: [],
    typeIndex_jc_fin: 1,
    typeName_jc_fin: "第1节课",
    docu_title_jc_fin: "结束时间",
  },

  onPickerChange_day: function (event) {
    // console.info(event);
    const { picker, value, index } = event.detail;
    // console.info(index);

    this.setData({
      typeIndex_day: index,
      typeName_day: this.data.columns_day[index],
      day: (index + 1)
    })
  },

  onPickerShow_day: function (event) {
    this.setData({ show_day: true });
  },

  onPickerClose_day: function (event) {
    this.setData({ show_day: false });
  },

  onPickerChange_jc: function (event) {
    // console.info(event);
    const { picker, value, index } = event.detail;
    console.info(index);
    this.setData({
      typeIndex_jc: index,
      typeName_jc: this.data.columns_jc[index],
      classTime_on: (index + 1)
    })
  },

  onPickerShow_jc_fin: function (event) {
    this.setData({ show_jc_fin: true });
  },

  onPickerClose_jc_fin: function (event) {
    this.setData({ show_jc_fin: false });
  },

  onPickerChange_jc_fin: function (event) {
    // console.info(event);
    const { picker, value, index } = event.detail;
    // console.info(index);
    this.setData({
      typeIndex_jc_fin: index,
      typeName_jc_fin: this.data.columns_jc_fin[index],
      classTime_fin: (index + 1)
    })
  },

  onPickerShow_jc: function (event) {
    this.setData({ show_jc: true });
  },

  onPickerClose_jc: function (event) {
    this.setData({ show_jc: false });
  },

  onLoad(){
    this.init();
  },

  init:function(){
    var week=[];
    var background = [];
    var color = [];
    var jc = [];
    for (var i = 0; i < 10; i++) {
      jc[i] = "第" + (i + 1) + "节课";
    };
    for(var i=0;i<20;i++){
      week[i] = (i+1);
      background[i] = "white";
      color[i] =  "black";
    }
    this.setData({
      week:week,
      background:background,
      color:color,
      columns_jc: jc,
      columns_jc_fin:jc
    });

  },

  week_choice:function(){
    this.setData({
      dialogShow: true
    });
  },

  change_color:function(e){
    var index = e.currentTarget.dataset.index;
    // console.log(index);
    
    if(this.data.background[index]=="white"){
      var background = this.data.background;
      var color = this.data.color;
      background[index] = MyColor;
      color[index] = "white";
      this.setData({
        background: background,
        color:color
      })
    
    } else if (this.data.background[index] == MyColor) {
      var background = this.data.background;
      var color = this.data.color;
      background[index] = "white";
      color[index] = "black";
      this.setData({
        background: background,
        color: color
      })
    }    
    if (this.data.quick_bg == MyColor){
      this.setData({
        quick_bg: "white",
        quick_col: "black"
      })
    }
  },

  //全选
  choose_all:function(){
    var bg = this.data.quick_bg;
    var col = this.data.quick_col;
    if(bg=="white"){
      bg = MyColor;
      col="white"
      var background = [];
      var color = [];
      for (var i = 0; i <= 20; i++) {
        background[i] = MyColor;
        color[i] = "white";
      }
    } else if (bg == MyColor){
      bg = "white";
      col = "black";
      var background = [];
      var color = [];
      for (var i = 0; i <= 20; i++) {
        background[i] = "white";
        color[i] = "black";
      }
    }
    this.setData({
      quick_bg: bg,
      quick_col: col,
      background: background,
      color: color
    })
  },

  onClose:function(){
    this.setData({
      dialogShow: false
    });    
  },

  onClickIcon_class:function(e){
    //console.log(e.detail);
    this.setData({
      classname: e.detail
    });
  },

  onClickIcon_room: function (e) {
    // console.log(e.detail);
    this.setData({
      classroom: e.detail
    });
  },

  onClickIcon_teacher: function (e) {
    // console.log(e.detail);
    this.setData({
      teacher: e.detail
    });
  },

  getUserInfo(){
    var bg=this.data.background;
    var weeks=[]
    var count=0;
    for(var i=0;i<=20;i++){
      if (bg[i] == MyColor){
        weeks[count] = i;
        count++;
      }
    }
    console.log(weeks)
    this.setData({
      weeks:weeks
    })
  },

  //提交
  add:function(){
    var classname=this.data.classname;
    var classroom=this.data.classroom;
    var teacher=this.data.teacher;
    var weeks=this.data.weeks; 
    var day=this.data.day;
    var classTime_on=this.data.classTime_on;
    var classTime_fin=this.data.classTime_fin;
    var kbAdd={};
    if(classTime_on>classTime_fin||classname==''){
      Notify('开始结束时间有误，课名不能为空');
      return;
    }
    kbAdd.day = day;
    kbAdd.name = classname;
    kbAdd.room = classroom;
    kbAdd.week = weeks;
    kbAdd.teacher = teacher;
    kbAdd.start = classTime_on;
    kbAdd.step = classTime_fin-classTime_on+1; 
    console.log(kbAdd);
    let setClassTmp = wx.getStorageSync("setClass") || [];
    setClassTmp.push(kbAdd);
    wx.setStorageSync("setClass",setClassTmp);
  }
  
})


//还有好多问题，
//1 添加以后是否跳转到timetable（不跳转的话，返回后新的课程不会出现）
//2 误操作多次添加同一个课表会如何做保护
//3 如何删除课程，在哪个页面去实现具体操作
//4 课程的id怎么设置（对应查询课表具体课程信息的问题）
//5 如何操作使得一次添加多个课程。。。
//6 添加课程本身还有错误，添加的是一周，结果全都出现了。。。