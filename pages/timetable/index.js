//获取应用实例
let util = require("../../utils/util.js");
var app = getApp();


Page({
  data: {
    colorArrays: ["#55efc4", "#81ecec", "#55efc4", "#fd79a8", "#74b9ff", "#55efc4", "#81ecec", "#fd79a8"],
    wlist: [],
    currentWeek: 16,
    copyWeek: 16,
    weekName: "第一周",
    activeName: '0',
    show: false,
    columns: [],
    typeIndex: 0
  },

  onChange: function (event) {
    this.setData({
      activeName: event.detail,
    });

  },

  onPickerChange: function (event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      typeIndex: index,
    });
  },

  onClose(event) {
    if (event.detail === 'confirm') {
      this.setData({
        show: false,
        currentWeek: this.data.typeIndex + 1,
        weekName: "第" + (this.data.typeIndex + 1) + "周"
      });
      console.log(this.data.weekName);
      wx.setNavigationBarTitle({
        title: "第" + this.data.currentWeek + "周",
      })
      this.getTimeTableInfo();
    } else {
      this.setData({
        show: false
      });
    }
  },

  OpenDialog: function () {
    this.setData({
      activeName: 0,
      show: true
    });

  },

  returnCurrentWeek: function () {
    this.setData({
      currentWeek: this.data.copyWeek
    });
    wx.setNavigationBarTitle({
      title: "第" + this.data.currentWeek + "周",
    })
    this.getTimeTableInfo();
  },

  onLoad: function () {
    console.log('onLoad');
    this.getInfo();
    this.getTimeTableInfo();
  },
  onClickRight: function () {
    console.log(this.data.weekName);
  },
  getInfo: function () {
    let currentDay = wx.getStorageSync("currentDay") || 1;
    let currentWeek = wx.getStorageSync("currentWeek") || 1;
    this.setData({
      currentWeek: currentWeek
    });
    //  this.setData({ weekName: "第" + currentWeek + "周" });
    wx.setNavigationBarTitle({
      title: "第" + currentWeek + "周"
    })
    var week = [];
    for (var i = 1; i <= 20; i++) {
      week.push("第" + i + "周");
    }
    this.setData({
      columns: week,
      copyWeek: currentWeek
    });
  },

  /*  getData: function() {
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

  */

  getTimeTableInfo: function () {
    let that = this;
    let kb = wx.getStorageSync("kb") || null;
    // console.log(kb)
    //新的改动
    let setclass = wx.getStorageSync("setClass") || null;
    // console.log(setclass);
    //结束
    if (that.data.isUpdate || kb == null) {
      console.info("need to update")
      util.getReq("kb", {}, function (res) {
        // console.info(res);
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
            };

          });
          //新的改动
          if (setclass != null) {
            setclass.forEach(item => {
              if (that.hasSubject(item['week_list'], that.data.currentWeek)) {
                var subject = {}
                subject.xqj = item['day'];
                subject.skjc = item['start'];
                subject.skcd = item['step'];
                subject.kcmc = item['name'] + "@" + item['room'];
                subject.id = item['id'];
                //不完善。。。
                kbListCurWeek.push(subject);
              }
            })
          }
          //结束
          that.setData({
            wlist: kbListCurWeek
          });

        }
      });
    } else {
      console.info("not need update")
      // let kbList = kb;
      let kbList = wx.getStorageSync("kb") || [];
      // console.log(kbList)
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
      //新的改动
      if (setclass != null) {
        setclass.forEach(item => {
          if (that.hasSubject(item['week_list'], that.data.currentWeek)) {
            var subject = {}
            subject.xqj = item['day'];
            subject.skjc = item['start'];
            subject.skcd = item['step'];
            subject.kcmc = item['name'] + "@" + item['room'];
            subject.id = item['id'];
            //不完善。。。
            kbListCurWeek.push(subject);
          }
        })
      }
      //结束
      that.setData({
        wlist: kbListCurWeek
      });
    }


  },

  isUpdate: function () {
    let lastTime = wx.getStorageSync("TimeTableUpdate") || null;
    if (lastTime == null) {
      this.setData({
        isUpdate: true
      });
      console.info("lastTime is null");
    }
    if ((new Date().getTime() - lastTime) / (1000 * 60 * 60 * 8) >= 1) {
      wx.setStorageSync("TimeTableUpdate", new Date().getTime());
      console.info((new Date().getTime() - lastTime) / (1000 * 60 * 60 * 8));
      this.setData({
        isUpdate: true
      });
    } else {
      this.setData({
        isUpdate: false
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

  showCardView: function (e) {
    //console.log(e);
    wx.navigateTo({
      url: '../../pages/timetable_detail/timetable_detail?start=' + e.currentTarget.dataset.index + "&day=" + e.currentTarget.dataset.statu,
    })

  },

  add_class: function () {
    wx.navigateTo({
      url: '../../pages/class_add/class_add'
    })

  },

  onShareAppMessage: function () {

  },
  onPullDownRefresh: function () {
    this.getInfo();
    // this.getData();
  }
})