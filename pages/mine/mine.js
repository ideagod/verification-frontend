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
        console.log(this.data.name, this.data.account,this.data.type)
        wx.navigateTo({
            url: '/pages/camera/camera'
        })
    }
});