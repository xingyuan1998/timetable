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
    weekName:"第一周",
    elec:0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad:function(option){
    var elec_info=wx.getStorageSync("elec_info")||null;
    if(elec_info==null){

    }else{
      console.log(elec_info);
      var that=this;
      wx.showNavigationBarLoading();
      util.getReq("ele",elec_info,function(res){
        that.setData({
          elec_choose_button: false,
          elec_show_text: true,
        });
        console.log(res);
        if (res.code==1){
          that.setData({
            elec_choose_button: true,
            elec_show_text: false,
          });
          wx.showToast({
            title: '抓取失败',
            icon: 'none',
          });
          return;
        }else{
          that.setData({ elec: res.data.ele });
          wx.hideNavigationBarLoading();
        }
      });

    }
  },

  getTodaySubject: function() {
    let that = this;
    let subjectList = wx.getStorageSync("kb") || [];
    //console.info(subjectList);   //本地数据查看
    if (subjectList.length > 0) {

      let kbListCurWeek = [];
      subjectList.forEach(item => {

        //console.info(item['day']);
        if (this.hasSubject(item['week_list'], this.data.currentWeek) && item['day'] === this.data.currentDay){
          item.showTime = item['start'] + "-" + (item['start'] + item['step'] - 1) + "节";
          //console.info(item['day'])
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