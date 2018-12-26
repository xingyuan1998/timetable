// pages/jwxt/index.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      'username':"",
      "password":""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  formSubmit: function(){
    if (this.data.username.length == 0){
      wx.showToast({
        title: '用户名不能为空'
      });
      return;
    }
    if(this.data.password.length == 0){
      wx.showToast({
        title: 'password能为空',
      });
      return;
    }
    console.info(this.data.username + this.data.password);

    util.req("bd", {
      'username': this.data.username,
      "password": this.data.password
    }, function(res){
        console.info(res);
        if(res['code'] === 0){
          wx.switchTab({
            url: '/pages/index/index',
          })
        }else{
          wx.showToast({
            title: "登录失败, 可能是账户密码错误",
            icon: "none"
          });
        }
    });


  },
  bindUserNameInput: function (e) {
    this.setData({
      username: e.detail.value
    });
  },
  bindPasswordInput: function(e){
    this.setData({
      password: e.detail.value
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})