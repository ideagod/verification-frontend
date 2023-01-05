const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

var HOST_URL = 'http://192.168.0.108:8080/'
const appRequest = (opt) => {
  wx.request({
    url: HOST_URL + opt.url,
    data: opt.data,
    method: opt.method,
    header: {
      'content-type': 'application/json' // 默认值
    },
    dataType: 'json',
    success: function (res) {
        if (opt.success) {
            opt.success(res.data);
        }
    },
    fail: function () {
        if (opt.fail) {
            opt.fail();
        }
    }
  })
}

const uploadFileRequest = (opt) => {
  opt = opt || {};
  opt.url = opt.url || '';
  opt.data = opt.data || null;
  opt.success = opt.success || function () {};
  opt.fail = opt.fail || function () {};
  opt.name = opt.name || 'file';
  wx.uploadFile({
    url: HOST_URL + 'createorLogin',
    filePath: opt.filePath,
    name: opt.name,
    formData: {
      ...opt.data
    },
    success(res) {
      opt.success(res);
    },
    fail: (err) => {
      opt.fail(err);
    }
  })
}

module.exports = {
  formatTime,
  appRequest: appRequest,
  uploadFileRequest
}
