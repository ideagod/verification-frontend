// camera.js
let util = require('../../utils/util.js');

Page({
  data: {
    name: '',
    account: '',
    type: null,
    helpMessage: '',
    img: 'data:image/png;base64,',
    code: -1
  },
  onLoad: function (options) {
    util.appRequest({
      method: 'post',
      url: 'getResult',
      data: {
        'token': options.token,
      },
      success: (res) => {
        console.log('getResult res:')
        console.log(res)
        //code：0表示注册/登录成功，1表示登录时匹配不到人脸，2表示检测为非活体
        if (res.code == 0) { 
          this.setData({
            helpMessage: `识别成功`,
            img: res.img,
            name: res.name,
            account: res.account,
            code: res.code
          })
        } else if (res.code == 2){
          this.setData({
            helpMessage: `识别为非活体,请到光线充足处重试`,
            code: res.code
          })
        } else{
          this.setData({
            helpMessage: `${res.code == 1 ? '人脸与身份信息不匹配':'识别超时'}`,
            code: res.code
          })
        }
      }
    });
  },
  redirectToHome(){
      wx.redirectTo({
        url: '/pages/mine/mine',
      })
  }
})