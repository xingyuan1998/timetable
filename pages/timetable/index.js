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
    this.getTimeTableInfo();
  },
  onClickRight: function() {
    console.log(this.data.weekName);
  },
  getInfo: function(){
   let currentDay = wx.getStorageSync("currentDay") || 1;
   let currentWeek = wx.getStorageSync("currentWeek") || 1;
   this.setData({currentWeek:currentWeek});
    //  this.setData({ weekName: "第" + currentWeek + "周" });
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

  getTimeTableInfo: function () {
    let that = this;
    let kb = wx.getStorageSync("kb") || null;

    if (that.data.isUpdate || kb == null) {
      console.info("need to update")
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
              subject.id = item['id'];
              kbListCurWeek.push(subject);
            }
          });
          that.setData({ wlist: kbListCurWeek });

        }
      });
    } else {
      console.info("not need update")
      // let kbList = kb;
      let kbList = wx.getStorageSync("kb") || [];
      let kbListCurWeek = [];
      kbList.forEach(item => {
        if (that.hasSubject(item['week_list'], that.data.currentWeek)) {
          var subject = {}
          subject.xqj = item['day'];
          subject.skjc = item['start'];
          subject.skcd = item['step'];
          subject.kcmc = item['name'] + "@" + item['room'];
          subject.id = item['id'];
          kbListCurWeek.push(subject);
        }
      });
      that.setData({ wlist: kbListCurWeek });
    }

  },

  isUpdate: function () {
    let lastTime = wx.getStorageSync("TimeTableUpdate") || null;
    if (lastTime == null) {
      this.setData({ isUpdate: true });
      console.info("lastTime is null");
    }
    if ((new Date().getTime() - lastTime) / (1000 * 60 * 60 * 8) >= 1) {
      wx.setStorageSync("TimeTableUpdate", new Date().getTime());
      console.info((new Date().getTime() - lastTime) / (1000 * 60 * 60 * 8));
      this.setData({ isUpdate: true });
    } else {
      this.setData({ isUpdate: false });
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

  showCardView:function(e){
    //console.log(e);
    wx.navigateTo({
      url: '../../pages/timetable_detail/timetable_detail?start=' + e.currentTarget.dataset.index + "&day=" + e.currentTarget.dataset.statu,
    })

  },

  onShareAppMessage: function(){

  },
  onPullDownRefresh: function(){
    this.getInfo();
    this.getData();
  }
})