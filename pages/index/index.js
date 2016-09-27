//index.js
//获取应用实例
function fetchLatest (onSuccess) {
  wx.request({
    url: 'https://unsplash.com/napi/feeds/home',
    header: {
      "authorization": "Client-ID d69927c7ea5c770fa2ce9a2f1e3589bd896454f7068f689d8e41a25b54fa6042"
    },
    success: onSuccess
  })
}

var app = getApp()
Page({
  data: {
    latests: {},
    modalHidden: true,
    user: {}
  },
  modalTap: function(e) {
    var index = e.target.dataset.item
    this.setData({
      user: this.data.latests[parseInt(index)].user,
      modalHidden: false
    })
  },
  closeModal: function(e) {
    this.setData({
      user: {},
      modalHidden: true
    })
  },
  onLoad: function () {
    var that = this
    fetchLatest(function (res) {
      console.log(res.data.photos)
      that.setData({
        latests: res.data.photos
      })
    })
  }
})
