Page({
  showpicture: function () {
    var current = "//icon/image/bus.png";
    wx.saveImageToPhotosAlbum({
      filePath: current,
      success(res) {
        wx.showToast({
          title: '保存成功'
        })
      },
      fail() {
        wx.showToast({
          title: '保存失败'
        })
      }
    })
  }
})