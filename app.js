//app.js
var utils = require('./utils/util.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: utils.rootUrl + 'wx?code=' + res.code,
          success: function (data) {
            console.log(data);
            if(data.data['code'] === 4000){
              wx.showToast({
                title: 'token请求失败',
              });
            } else if (data.data['code'] === 3000){
              ///当前用户没有绑定
              wx.setStorageSync('token', data.data['token']);
              console.info("存储token成功");
              wx.navigateTo({
                url: '../../pages/jwxt/index',
              });
              wx.showToast({
                title: '尚未绑定教务系统请绑定',
                icon: 'none'
              });
            }else if(data.data['code'] == 0){
              wx.setStorageSync('token', data.data['token']);
              console.info("存储token成功");
              // wx.switchTab({
              //   url: '../../pages/index/index',
              // });
            }
            // that.getUser();
          },
          fail: function () {

          }
        })
      }
    });

    utils.getOpen();


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  } ,
  globalData: {
    userInfo: null,
    bgPic: null,
    scale: 1,
    rotate: 0,
    hat_center_x: 0,
    hat_center_x: 0,
    currentHatId: 1
  }
})