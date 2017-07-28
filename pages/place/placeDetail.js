// pages/discovery/placeDetail.js
Page({
  data:{
    place:{},
  
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
     
     place:options,
      
   });

    
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  //点击添加活动
  addAction:function(){
    wx.navigateTo({
      url: '../action/createAction?areaAddress=' + this.data.place.address + '&areaName=' + this.data.place.title
    })
  }

  
})