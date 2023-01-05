// camera.js
let util = require('../../utils/util.js');

Page({
    data: {
        name: '',
        account: '',
        type: null,
        helpMessage: '请移动人脸到框内',
    },
    onLoad: function (options) {
        this.setData({
            name: options.name || '',
            account: options.account || '',
            type: !!options.name ? 0 : 1,
            ctx: wx.createCameraContext()
        })
        setTimeout(() => {
            // this.data.ctx.setZoom({
            //     zoom: '2',
            //     success: (res) => {
            //         console.log(res)
            //     }
            // })
            this.takePhoto()
        }, 2000)
    },
    takePhoto() {
        let that = this;
        this.data.ctx.takePhoto({
            quality: 'high',
            success: (res) => {
                console.log(res)
                wx.uploadFile({
                    url: 'http://192.168.0.108:8080/createOrLogin',
                    filePath: res.tempImagePath,
                    name: 'img',
                    formData: {
                        'type': that.data.type,
                        'account': that.data.account,
                        'name': that.data.name
                    },
                    success(res) {
                        console.log('uploadFileSuccess--', JSON.parse(res.data))
                        let r = JSON.parse(res.data);
                        if (!!r.code && r.code != 0) {
                            that.setData({
                                helpMessage:`${r.code == 3? '人脸未居中': '检测不到人脸' }`
                            })
                            that.takePhoto()
                        } else {
                            that.setData({
                                helpMessage:``
                            })
                            wx.showLoading({
                              title: '识别中,请稍后',
                            })
                            setTimeout(function () {
                                wx.hideLoading();
                                wx.redirectTo({
                                    url: `/pages/result/result?token=${r.token}`
                                })
                            }, 2000)
                        }
                    },
                    fail: (err) => {
                        console.log(err);
                    }
                })
                this.setData({
                    src: res.tempImagePath
                })
            }
        })
    },
    error(e) {
        console.log(e.detail)
    }
})