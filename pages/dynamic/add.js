// pages/comment/index.js
var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    files: [],
    content: '',
    gender: 1,
    checked:false,
    show:false,
    columns: ['表白墙', '二手货', '卖室友', '找小伙伴', '拼车'],
    typeIndex: 0,
    typeName:"表白墙"
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        res.tempFilePaths.forEach(function (item) {
          wx.uploadFile({
            url: util.rootUrl + 'upload',
            filePath: item,
            name: 'file',
            header: {
              "token": wx.getStorageSync("token")
            },
            success: function (res) {
              console.log(JSON.parse(res.data));
              var data = JSON.parse(res.data)
              that.setData({
                files: that.data.files.concat(data.file_name)
              })
            },
            fail: function () {
              util.isError('图片上传失败', that);
            }
          })
        })
      }
    })
  },
  bindinput: function (e) {
    this.setData({
      content: e.detail.value
    });
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  deleteImg: function (e) {
    var imgs = this.data.files;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      files: imgs
    });
  },
  submit: function () {
    var that = this;
    var content = that.data.content;
    //console.log(content);return false;
    if (content == '' && ((that.data.files).length == 0)) {
      util.isError('请输入内容或者至少选择一张图片', that);
      return false;
    }
    let types = ["show", "show", "show", "show", "show"]
    util.req('dynamic/', {
      'content': content,
      'images': JSON.stringify(that.data.files),
      'type':types[that.data.typeIndex],
      'anonymous':that.data.checked?1:0
    }, function (data) {
      wx.navigateTo({
        url: '/pages/dynamic/index',
      })
    })



  },
  onChange(event) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: event.detail });
  },
  onPickerChange(event) {
    console.info(event);
    const { picker, value, index } = event.detail;
    console.info(index);
    this.setData({
      typeIndex:index,
      typeName:this.data.columns[index]
    })
  },
  onPickerClose() {
    this.setData({ show: false });
  },
  onPickerShow(){
    this.setData({ show: true });
  }
})