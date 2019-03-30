// pages/info/index.js
let util = require("../../utils/util.js");
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    records:[],
    exams:[],
    isUpdate: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({isUpdate: this.isUpdate()});
    this.isUpdate();
    this.getExamInfo();
    this.getRecordInfo();
  },

  getExamInfo: function(){
    let that = this;
    let exams = wx.getStorageSync("exams") || null;
    if(that.data.isUpdate || exams == null){
      util.getReq("exams", {}, function (res) {
        if (res['code'] === 0) {
          console.info(res);
          let exams = res['data']['exams'];
          exams.forEach(item => {
            let examTime = item['time'];
            examTime = examTime.substring(0, 11);
            console.info(examTime);
            examTime = examTime.replace(/-/g, '/');
            let openDate = new Date(examTime).getTime();
            let day = Math.trunc((openDate - new Date().getTime()) / (1000 * 60 * 60 * 24) + 1);
            if (day >= 0) {
              item.relese = "剩余" + day + "天";
            } else {
              item.relese = "已结束";
            }

          });
          wx.setStorageSync("exams", res['data']['exams']);
          that.setData({ exams: res['data']['exams'] });
        }

      });
    }else{
      exams.forEach(item => {
        let examTime = item['time'];
        examTime = examTime.substring(0, 11);
        console.info(examTime);
        examTime = examTime.replace(/-/g, '/');
        let openDate = new Date(examTime).getTime();
        let day = Math.trunc((openDate - new Date().getTime()) / (1000 * 60 * 60 * 24) + 1);
        if (day >= 0) {
          item.relese = "剩余" + day + "天";
        } else {
          item.relese = "已结束";
        }

      });
      that.setData({ exams: exams });
    }

    


  },
  getRecordInfo: function(){
    let that = this;
    let records = wx.getStorageSync("records") || null;

    if (that.data.isUpdate || records == null) {
      util.getReq("record", {}, function (res) {
        if (res['code'] === 0) {
          console.info(res);
          that.setData({ records: res['data']['records'] });
          wx.setStorageSync("records", res['data']['records']);
        }
      });
    }else{
      that.setData({ records: records });
    }

  },

  isUpdate: function(){
    let lastTime = wx.getStorageSync("infoUpdate")||null;
    if (lastTime == null){
      this.setData({ isUpdate:true });
      console.info("lastTime is null");
    }
    if((new Date().getTime() - lastTime ) / (1000 * 60 * 60 * 8) >= 1){
      wx.setStorageSync("infoUpdate", new Date().getTime());
      console.info((new Date().getTime() - lastTime) / (1000 * 60 * 60 * 8));
      this.setData({ isUpdate: true });
    }else{
      this.setData({ isUpdate: false });
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getExamInfo();
    this.getRecordInfo();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})