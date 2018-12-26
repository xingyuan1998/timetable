// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgPic:null,
    picChoosed:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: {},
    userInfo: {}
  },

  assignPicChoosed() {
    if (this.data.bgPic) {
      this.setData({
        picChoosed: true
      })
    } else {
      this.setData({
        picChoosed: false
      })
    }
  },
  getAvatar() {
    if (app.globalData.userInfo) {
      let avatarUrl = app.globalData.userInfo.avatarUrl;
      console.info(avatarUrl);
      avatarUrl = avatarUrl.substr(0, avatarUrl.length - 3) + "0";
      this.setData({
        bgPic:avatarUrl
      });
      this.assignPicChoosed();
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          let avatarUrl = res.userInfo.avatarUrl;
          console.info(avatarUrl);
          console.info(avatarUrl.substr(0, avatarUrl.length-3));

          avatarUrl = avatarUrl.substr(0, avatarUrl.length - 3) + "0";

          this.setData({
            userInfo: res.userInfo,
            bgPic: avatarUrl
          });
          this.assignPicChoosed();
        }
      })
    }
  },
  chooseImage(from){
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: [from.target.dataset.way],
      success:(res)=> {
        var tempFilePaths = res.tempFilePaths;
        this.setData({
          bgPic:res.tempFilePaths[0]
        });
        this.assignPicChoosed();
      },
      fail: (res)=>{
        this.assignPicChoosed();
        },
      complete: (res)=>{
        this.assignPicChoosed();
        },
    })
  },
  nextPage(){
      app.globalData.bgPic=this.data.bgPic;
      wx.navigateTo({
        url: '../imageeditor/imageeditor',
      })
  },
  onLoad: function(){
    let userInfo = wx.getStorageSync('userInfo');
    if (this.data.canIUse && !userInfo) {
      wx.redirectTo({
        
        url: '/pages/login/login?url=avatar/index/index',
      });
    }
  },
  onShow: function(){

  }
})