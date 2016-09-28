//index.js
//获取应用实例

var feaUrl = "https://unsplash.com/napi/photos/curated?page=1&per_page=24&order_by=latest"
var newUrl = "https://unsplash.com/napi/photos?page=1&per_page=24&order_by=latest"
var cliendID = "d69927c7ea5c770fa2ce9a2f1e3589bd896454f7068f689d8e41a25b54fa6042"

function fetchData (url, onSuccess) {
  wx.request({
    url: url,
    header: {
      "authorization": "Client-ID " + cliendID
    },
    success: onSuccess
  })
}

var app = getApp()
Page({
  data: {
    latests: {},
    modalHidden: true,
    user: {},
    FeaActived: false,
    NewActived: false
  },
  modalTap: function(e) {
    var index = e.target.dataset.item
    this.setData({
      user: this.data.latests[parseInt(index)].user,
      modalHidden: false
    })
  },
  loadNewList: function(e) {
    var that = this
    fetchData(newUrl, function (res) {
      that.setData({
        latests: res.data,
        FeaActived: false,
        NewActived: true
      })
    })
  },
  loadFeaList: function() {
    var that = this
    fetchData(feaUrl, function (res) {
      that.setData({
        latests: res.data,
        FeaActived: true,
        NewActived: false
      })
    })
  },
  closeModal: function(e) {
    this.setData({
      user: {},
      modalHidden: true
    })
  },
  onLoad: function () {
    this.loadFeaList()
  }
})
