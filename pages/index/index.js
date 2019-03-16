//index.js
//获取应用实例
let util = require("../../utils/util.js");
const app = getApp()

Page({
  data: {
    elec_choose_button:true,
    elec_show_text:false,
    motto: 'Hello World',
    hasSubject: false,
    subjects: [],
    currentWeek:16,
    currentDay:4,
    weekName:"第一周"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad:function(option){
    var elec_info=wx.getStorageSync("elec_info")||null;
    console.log(elec_info);
    if(elec_info==null){

    }else{
      this.setData({
        elec_choose_button: false,
        elec_show_text: true,
      });
      // wx.request({
      //   url: '',
      //   data:{
      //     //暂
      //     content:elec_info.content,
      //     yuan: elec_info.yuan,
      //     lou: elec_info.lou
      //   },

      //   success:function (res) {
      //     //处理
      //     wx.hideNavigationBarLoading();
      //   },
      //   fail:function () {
      //     console.log("fail");
      //   },
      //   complete:function () {

      //   }
      // })
      // wx.showNavigationBarLoading();
      util.getReq("ele",{},function(res){
        console.log(res);
      });

    }
  }
  ,
  getTodaySubject: function() {
    let that = this;
    let subjectList = wx.getStorageSync("kb") || [];
    console.info(subjectList);
    if (subjectList.length > 0) {

      let kbListCurWeek = [];
      subjectList.forEach(item => {
        // console.info(item['day']);
        if (this.hasSubject(item['week_list'], this.data.currentWeek) && item['day'] === this.data.currentDay){
          item.showTime = item['start'] + "-" + (item['start'] + item['step'] - 1) + "节";
          console.info(item['day'])
          kbListCurWeek.push(item);
        }
      });
      if(kbListCurWeek.length > 0){
        this.setData({
          hasSubject: true
        });
      }else{
        this.setData({
          hasSubject:false
        })
      }
      this.setData({ subjects: kbListCurWeek });

    }else{
      util.getReq("kb", {}, function (res) {
        console.info(res);
        if (res['code'] === 0) {
          wx.setStorageSync("kb", res['data']['timetable']);
          that.getTodaySubject();
        }
      });
    }
  },
  hasSubject: function (arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        return true;
      }
    }
    return false;
  },
  onShow: function(){
    util.getOpen();
    let currentDay = wx.getStorageSync("currentDay") || 1;
    let currentWeek = wx.getStorageSync("currentWeek") || 1;
    this.setData({ currentWeek: currentWeek, currentDay: currentDay});
    this.getTodaySubject();
  },
  onPullDownRefresh: function(){
    util.getOpen();
    let currentDay = wx.getStorageSync("currentDay") || 1;
    let currentWeek = wx.getStorageSync("currentWeek") || 1;
    this.setData({ currentWeek: currentWeek, currentDay: currentDay });
    this.getTodaySubject();
  },
  onShareAppMessage: function () {

  },
})