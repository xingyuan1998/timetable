// pages/my/my.js
let util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // hasUserInfo: {},
    // userInfo: {}
    user: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let userInfo = wx.getStorageSync('userInfo');
    // if (this.data.canIUse && !userInfo) {
    //   wx.navigateTo({
    //     url: '/pages/login/login',
    //   });
    // } else {
    //   this.setData({ userInfo: userInfo })
    // }
    let userInfo = wx.getStorageSync("user") || null;
    console.log(userInfo);
    if (userInfo != null) {
      this.setData({ user: userInfo });
    } else {
      this.getData();
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
    // this.setData({ userInfo: wx.getStorageSync('userInfo') })
    // console.info(this.data.userInfo)
  },

  getData: function () {
    let that = this;
    util.getReq("user", {}, function (res) {
      console.info(res);
      if (res['code'] === 0) {
        console.info(res['user']);
        wx.setStorageSync("user", res['data']);
        that.setData({ user: res['data'] });
      }
    });
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