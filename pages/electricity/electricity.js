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
    console.info(event);
    const { picker, value, index } = event.detail;
    console.info(index);
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

    //检查（编写还有很大问题）
    if (this.data.typeIndex == 3 && this.data.typeIndex_c == 0){
      if(isNaN(check)||check.length!=4){
        console.log("宿舍号有误");
        return false;
      }
    } else if (this.data.typeIndex == 5 && (this.data.typeIndex_c == 0||    this.data.typeIndex_c == 1)){
      if (check.length != 5){
        console.log("宿舍号有误");
        return false;
      }
    }else{
      if(check.length!=5||!isNaN(check[0])){
        console.log("宿舍号有误");
        return false;
      }
    }
    //打包传递
    var elec_info={
      content:this.data.content,
      yuan:this.data.typeName,
      lou:this.data.typeName_c
    };
    //保存到本地缓存中
    wx.setStorageSync("elec_info", elec_info);
    wx.switchTab({
      url: '/pages/index/index',
      // url: '/pages/index/index',
    })

  }
})