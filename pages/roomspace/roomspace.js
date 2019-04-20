import Dialog from '../../vant-weapp/dialog/dialog';
let util = require("../../utils/util.js");

Page({
  data:{
      show_week: false,
      columns_week: [],
      typeIndex_week: 1,
      typeName_week: "第1周",
      docu_title_week: "周次:",

      show_day: false,
      columns_day: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六','星期日'],
      typeIndex_day: 1,
      typeName_day: "星期一",
      docu_title_day: "星期:",

      show_jc: false,
      columns_jc: [],
      typeIndex_jc: 1,
      typeName_jc: "第1节课",
      docu_title_jc: "节次:",

      show_lh: false,
      columns_lh: ['博1', '博2', '博3', '博4', '博5'],
      typeIndex_lh: 1,
      typeName_lh: "博1",
      docu_title_lh: "楼号:",

      week:1,
      day:1,
      classTime:1,
      flat:'博1',
      roomspace:[]
  },

  onLoad:function(){
    this.oninit();
  },

  oninit: function () {
    var week = [];
    var jc = [];
    for (var i = 0; i < 20; i++) {
      week[i] = "第" + (i + 1) + "周";
    };
    for (var i = 0; i < 10; i++) {
      jc[i] = "第" + (i + 1) + "节课";
    };
    this.setData({
      columns_week:week,
      columns_jc:jc
    });
  },

  onPickerChange_week: function (event) {
    const { picker, value, index } = event.detail;
    this.setData({
      typeIndex_week: index,
      typeName_week: this.data.columns_week[index],
      week:(index+1)
    })
  },

  onPickerShow_week: function (event) {
    this.setData({ show_week: true });
  },

  onPickerClose_week: function (event) {
    this.setData({ show_week: false });
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
    // console.info(index);

    this.setData({
      typeIndex_jc: index,
      typeName_jc: this.data.columns_jc[index],
      classTime:(index+1)
    })
  },

  onPickerShow_jc: function (event) {
    this.setData({ show_jc: true });
  },

  onPickerClose_jc: function (event) {
    this.setData({ show_jc: false });
  },

  onPickerChange_lh: function (event) {
    // console.info(event);
    const { picker, value, index } = event.detail;
    // console.info(index);

    this.setData({
      typeIndex_lh: index,
      typeName_lh: this.data.columns_lh[index],
      flat: this.data.columns_lh[index]
    })
  },

  onPickerShow_lh: function (event) {
    this.setData({ show_lh: true });
  },

  onPickerClose_lh: function (event) {
    this.setData({ show_lh: false });
  },

  // bindinputWeek:function(e){
  //   //console.log(e.detail);
  //   this.setData({
  //     week:e.detail
  //   });
  // },

  // bindinputDay: function (e) {
  //   //console.log(e.detail);
  //   this.setData({
  //     day: e.detail
  //   });
  // },

  // bindinputClass: function (e) {
  //   //console.log(e.detail);
  //   this.setData({
  //     classTime: e.detail
  //   });
  // },

  // bindinputFlat: function (e) {
  //   //console.log(e.detail);
  //   this.setData({
  //     flat: e.detail
  //   });
  // },

  submit:function(){
    var info = {};
    info.zc = Number(this.data.week);
    info.xq = Number(this.data.day);
    info.jc = Number(this.data.classTime);
    info.lh = this.data.flat;
    console.log(info);
    let that=this;
    util.req('room',info,function(e){
      console.log(e);
      that.setData({
        roomspace:e["data"]
      });
      console.log(that.data.roomspace);
      if(e.code==0){
        Dialog.alert({
          message: that.data.roomspace
        });
      }else{
        wx.showToast({
          title: '抓取失败，服务器错误',
          icon: 'none',
        });
      }

      
    })

  }
})