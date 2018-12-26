//获取应用实例
let util = require("../../utils/util.js");
var app = getApp();


Page({
  data: {
    colorArrays: ["#55efc4", "#81ecec", "#55efc4", "#fd79a8", "#74b9ff", "#55efc4", "#81ecec", "#fd79a8"],
    wlist: [],
    currentWeek: 16,
    weekName:"第一周"
  },
  onLoad: function() {
    console.log('onLoad');
    this.getInfo();
    this.getData();
  },
  onClickRight: function() {
    console.log("hheee");
  },
  getInfo: function(){
   let currentDay = wx.getStorageSync("currentDay") || 1;
   let currentWeek = wx.getStorageSync("currentWeek") || 1;
   this.setData({currentWeek:currentWeek});
    // this.setData({ weekName: "第" + currentWeek + "周" });
    wx.setNavigationBarTitle({
      title: "第" + currentWeek + "周"
    })
  },

  getData: function() {
    let that = this;
    let kbList = wx.getStorageSync("kb") || [];
    console.info(kbList.length);
    if(kbList.length > 0){
      let kbListCurWeek = [];
      kbList.forEach(item => {
        if (that.hasSubject(item['week_list'], that.data.currentWeek)) {
          var subject = {}
          subject.xqj = item['day'];
          subject.skjc = item['start'];
          subject.skcd = item['step'];
          subject.kcmc = item['name'] + "@" + item['room'];
          kbListCurWeek.push(subject);
        }
      });
      that.setData({ wlist: kbListCurWeek });
    }else{
      util.getReq("kb", {}, function (res) {
        console.info(res);
        if (res['code'] === 0) {
          wx.setStorageSync("kb", res['data']['timetable']);
          let kbList = res['data']['timetable'];
          let kbListCurWeek = [];
          kbList.forEach(item => {
            if (that.hasSubject(item['week_list'], that.data.currentWeek)) {
              var subject = {}
              subject.xqj = item['day'];
              subject.skjc = item['start'];
              subject.skcd = item['step'];
              subject.kcmc = item['name'] + "@" + item['room'];
              kbListCurWeek.push(subject);
            }
          });
          that.setData({ wlist: kbListCurWeek });


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
  onShareAppMessage: function(){

  },
  onPullDownRefresh: function(){
    this.getInfo();
    this.getData();
  }
})