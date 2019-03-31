var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    columns: ['杏苑', '竹苑', '松苑', '桃苑', '梅苑', '研究生苑'],
    typeIndex: 0,
    typeName:"杏苑",
    docu_title: "生活区:",
    
    docu_title_c: "楼栋号:",
    typeName_c: "1号楼",
    show_c: false,
    columns_c: ['1号楼', '2号楼', '3号楼', '4号楼', '5号楼'],
    typeIndex_c: 0,

    content:''
  },


  onPickerChange:function(event){
    // console.info(event);
    const { picker, value, index } = event.detail;
    // console.info(index);

    this.setData({
      typeIndex: index,
      typeName: this.data.columns[index]
    })
  },

  onPickerShow:function(event) {
    this.setData({ show: true });
  },
  
  onPickerClose:function(event){
    this.setData({ show: false });
  },

  onPickerChange_c: function (event) {
    // console.info(event);
    const { picker, value, index } = event.detail;
    // console.info(index);
    this.setData({
      typeIndex_c: index,
      typeName_c: this.data.columns_c[index]
    })
  },

  onPickerShow_c: function (event) {
    this.setData({ show_c: true });
  },

  onPickerClose_c: function (event) {
    this.setData({ show_c: false });
  },

  bindinput:function(e){
    this.setData({
      content:e.detail.value
    });
  },

  submit:function(event){
    //打包信息发给index页面
    //检查是否有问题
    var check = this.data.content;

    var right = true;

    if (check == '') {
      wx.showToast({
        title: '请填写宿舍号',
        icon: 'none',
      })
      return false;
    }

    //检查
    if (this.data.typeIndex == 3 && this.data.typeIndex_c == 0){

      var reg=/^[0-9]{4}$/;
      right = reg.test(check);
    } else if (this.data.typeIndex == 5 && (this.data.typeIndex_c == 0||    this.data.typeIndex_c == 1)){

      var reg=/^[0-9]-[0-9]{3}$/;
      right = reg.test(check);
    }else{

      var reg=/^[A-Za-z][0-9]{4}$/;
      right = reg.test(check);
    }

    if(right==false){
      wx.showToast({
        title: '宿舍号有误',
        icon:'none',
      })
      return false;
    }

    var content = this.data.content;
    content=content.toUpperCase();
    //打包传递(研究生楼传递的数据不同)
    if (this.data.typeIndex == 5 && (this.data.typeIndex_c == 0 || this.data.typeIndex_c == 1)){
      var elec_info = {
        flat: this.data.typeName[0] + this.data.typeName_c[0],
        room: content
      };
    }else{
      var elec_info = {
        flat: this.data.typeName[0] + this.data.typeName_c[0] + "楼",
        room: content
      };
    }
    //console.log(elec_info);
    //保存到本地缓存中
    wx.setStorageSync("elec_info", elec_info);
    

    wx.switchTab({
      url: '/pages/index/index',
      // url: '/pages/index/index',
    })

  },
  back:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})