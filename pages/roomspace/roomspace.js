import Dialog from '../../vant-weapp/dialog/dialog';
let util = require("../../utils/util.js");

Page({
  data:{
      week:'',
      day:'',
      classTime:'',
      flat:''
  },

  bindinputWeek:function(e){
    //console.log(e.detail);
    this.setData({
      week:e.detail
    });
  },

  bindinputDay: function (e) {
    //console.log(e.detail);
    this.setData({
      day: e.detail
    });
  },

  bindinputClass: function (e) {
    //console.log(e.detail);
    this.setData({
      classTime: e.detail
    });
  },

  bindinputFlat: function (e) {
    //console.log(e.detail);
    this.setData({
      flat: e.detail
    });
  },

  submit:function(){
    var info = {};
    info.zc = Number(this.data.week);
    info.xq = Number(this.data.day);
    info.jc = Number(this.data.classTime);
    info.lh = this.data.flat;
    console.log(info);
    util.getReq('room',info,function(e){
      console.log(e);
    })
    Dialog.alert({
      message: ''
    })
  }
})