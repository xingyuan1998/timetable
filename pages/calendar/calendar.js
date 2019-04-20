Page({

  data: {
    
  },

  showpicture:function(){
    var current = "//icon/image/calendar.png";
    wx.saveImageToPhotosAlbum({
      filePath: current,
      success(res){
        wx.showToast({
          title: '保存成功'
        })
      },
      fail(){
        wx.showToast({
          title: '保存失败'
        })
      }
    })
  }
})