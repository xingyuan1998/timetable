Page({
  data:{
    hasSubject:true,
    detail:[]
  },
  onLoad:function(e){
    //console.log(e);
    this.getDetailInfo(e.start,e.day);
    //console.log(this.data.detail);
    //console.log(this.data.hasSubject);
  },

  getDetailInfo:function(start,day){
    var kb = wx.getStorageSync("kb") || null;
    if(kb==null){
      this.setData({hasSubject:false});
      return;
    }
    //console.log(kb);
    let that = this;
    var kblist=[];
    kb.forEach(item => {
      if(start==item["start"]&&day==item["day"]){
        // console.log(item);
        item.showtime = item['start'] + "-" + (item['start'] + item['step'] - 1) + "节";
        kblist.push(item);
      }
    });
    that.setData({ detail: kblist });
  }


})
