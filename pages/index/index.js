//index.js
//获取应用实例

var feaUrl = "https://unsplash.com/napi/photos/curated"
var newUrl = "https://unsplash.com/napi/photos"
var cliendID = "d69927c7ea5c770fa2ce9a2f1e3589bd896454f7068f689d8e41a25b54fa6042"

function fetchData (url, params, onSuccess) {
  wx.request({
    url: url,
    data: params,
    header: {
      "authorization": "Client-ID " + cliendID
    },
    success: onSuccess
  })
}

var app = getApp()
Page({
  data: {
    latests: [],
    modalHidden: true,
    user: {},
    FeaActived: false,
    NewActived: false,
    page: 1
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
    var params = {
      page: 1,
      per_page: 24,
      order_by: 'latest'
    }
    fetchData(newUrl, params, function (res) {
      that.setData({
        latests: res.data,
        FeaActived: false,
        NewActived: true
      })
    })
  },
  loadFeaList: function() {
    var that = this
    var params = {
      page: 1,
      per_page: 24,
      order_by: 'latest'
    }
    fetchData(feaUrl, params, function (res) {
      that.setData({
        latests: res.data,
        FeaActived: true,
        NewActived: false
      })
    })
  },
  loadMore: function(e) {
    var that = this
    that.setData({
      page: that.data.page + 1
    })
    var params = {
      page: this.data.page,
      per_page: 12,
      order_by: 'latest'
    }

    if (that.data.FeaActived) {
      var url = feaUrl
    } else {
      var url = newUrl
    }
    fetchData(url, params, function (res) {
      that.setData({
        latests: that.data.latests.concat(res.data),
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
