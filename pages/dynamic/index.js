var app = getApp();
var util = require('../../utils/util.js');
var page = 1;
var list = new Array();
Page({
  data: {
    seecomment: false,
    reply: '',
    list: [],
    nomore: false,
  },
  add: function () {
    wx.navigateTo({
      url: '/pages/dynamic/add',
    })
  },
  previeimg: function (e) {
    var that = this;
    console.log(e);
    wx.previewImage({
      current: e.currentTarget.id,
      urls: that.data.list[e.currentTarget.dataset.name].img
    })
  },
  getList: function () {
    var that = this;
    util.getReq('dynamic', { 'page': page },
      function (data) {
        console.info(data);
        console.info(data.length == 0);
        if (!data) {
          that.setData({ nomore: true })
          return false;
        }
        console.log(data.data);
        data.data.forEach(item => {
          if (item.images != "") {
            var images = JSON.parse(item.images.replace(/'/g, '"'))
          } else {
            var images = []
          }
          var li = {
            avatarUrl: item.user.avatar,
            content: item.content,
            id: item.id,
            img: images,
            nickName: item.user.nickname,
            time: item.create_time,
            zan: item.good,
            comments: item.comments,
          }
          list.push(li);
        });
        that.setData({
          list: list
        });
      })
  },
  onShow: function (options) {
    // this.getList();
    // this.get_msg();
  },
  onReachBottom: function () {
    if (!this.data.nomore) {
      page++;
      this.getList();
    }
  },
  seecomment: function (e) {
    console.log(e);
    var reply_content = (!e.target.dataset.name) ? '' : '回复' + e.target.dataset.name;
    var reply_user = (!e.target.dataset.user) ? null : e.target.dataset.user.id;
    console.log(reply_content);
    this.setData({
      'reply_content': reply_content,
      'seecomment': true,
      'nowid': e.currentTarget.id,
      'reply': reply_user
    });
  },
  comment: function (e) {
    var that = this;
    var content = e.detail.value;
    if (content == '') {
      return false;
    }
    var req_data = {
      'dynamic': that.data.list[that.data.nowid].id,
      'is_reply': 0,
      'type': 'show',
      'content': e.detail.value, 
      'images':''
    }
    if (that.data.reply_uid) {
      req_data.reply = that.data.reply;
    }
    util.req('dynamic/comment', req_data, function (data) {
      console.log(data);
      var list = that.data.list;
      list[that.data.nowid].comments = (list[that.data.nowid].comments) ? list[that.data.nowid].comments : (new Array());
      list[that.data.nowid].comments.push({
        id: data.id,
        iid: that.data.list[that.data.nowid].id,
        content: e.detail.value,
        uid: data.uid,
        reply: (that.data.reply_content).replace('回复', '')
      })
      console.log(list[that.data.nowid].comments)
      that.setData({
        list: list
      });
    })
  },
  onLoad: function () {
    this.getList();
  },
  hidecomment: function () {
    this.setData({
      'seecomment': false
    });
  },
  onPullDownRefresh: function () {
    page = 1;
    list = [];
    this.getList();
    wx.stopPullDownRefresh();
  }
})