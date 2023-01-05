let util = require('../../utils/util.js');
Page({
    data: {
        show: false,
        type: 0,
        typeDetail: [{
            title:'登 录',
            text: '工号',
            field: 'account',
        },{
            title:'注 册',
            text: '姓名',
            field: 'name',
        }],
        account:'',
        name:''
    },
    changeType(e){
        this.setData({
            type: e.target.dataset.type
        });
    },

    showPopup() {
        this.setData({
            show: true
        });
    },

    onClose() {
        this.setData({
            show: false,
            type: 0
        });
    },
    getAccount(event) {
        this.setData({
            account: event.detail.value
        })
    },
    getName(event) {
        this.setData({
            name: event.detail.value
        })
    },
    navToVerify() {
        let that = this;
        if(that.data.type == 0){
            util.appRequest({
                method: 'post',
                url: 'checkAccountValid',
                data: { 
                    account: that.data.account,
                },
                success: (res) => {
                  if(res.code == 0){
                    wx.navigateTo({
                        url: `/pages/camera/camera?account=${that.data.account}`
                    })
                  }else{
                    wx.showToast({
                        title: '无此工号',
                        icon: 'error',
                        duration: 2000
                      })
                  }
                }
            });
        }else{
            wx.navigateTo({
                url: `/pages/camera/camera?name=${that.data.name}`
            })
        }
      
      
    }
});