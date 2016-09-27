//index.js
var app = getApp()
Page({
  data: {
    title: {}
  },
  onLoad: function (options) {
    this.setData({
      title: options.title
    })
    console.log(this)
  }
})
