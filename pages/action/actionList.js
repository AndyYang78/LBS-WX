// pages/action/action.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require('../../common/util.js')
Page({
  data:{ 

    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    toutiao: [
      '乘风破浪，开张大吉！',
      '合作伙伴招募,乘风破浪，开张大吉！新人大礼包，速速领取！',
      '合作伙伴招募'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
      tabs: [ "热门", "最新"],
      activeIndex: "0",
      sliderOffset: 0,
      sliderLeft: 0,
      item1:"",
      actObj:{},
       },
      
      
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2
                });

                 //查询活动清单
                that.actionList();
            }
        });   
  },

  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示,从后台j进入前台时刷新页面
    this.actionList();
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  onPullDownRefresh:function(){
    this.actionList();
    wx.stopPullDownRefresh();
  }, 

  tabClick: function (e) {
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });
  },

  primary: function (e) {
        wx.navigateTo({
          url: 'createAction'
        })
      },

  actionList:function(){
    var that = this;
    wx.request({
      url: 'https://littlebearsports.com/bearsport/service/activity/activityMaintain', 
       data: {
         "operationCode": "FA"
        },
        header: {
          'content-type': 'application/json'
         },
        method: 'POST', 
        success: function(res) {
          console.log("message", res.data);
          let actList = res.data.listData;
          for (var i = 0; i < actList.length; i++) {
            actList[i].actDate = util.formatOnlyDate(new Date(actList[i].actDate),"-")
          }
          console.log("aa:",actList[0]);
           if(actList.length > 0){
               that.setData({ 
                actObj: actList 
               });  
           }
         },
         fail:function(res){
           console.log("查询活动失败");
         }
       })
  }
  })