import { BASE_URL } from './https'

function request(method, url, param = {}) {
  uni.showLoading()
  return new Promise(function (resolve, reject) {
    uni.request({
      url: url,
      method: method,
      data: param,
      header: {
        'content-type': 'application/json'
      },
      timeout: 2000,
      success(res) {
        uni.hideLoading()

        // console.log(res)

        /**
         一般返回数据结构

         {
          code: 200, 返回正确 200，错误码自定义
          msg: '',
          data: {
            aa: xxx,
            bb: xxx,
            ...
          }
         }
         */

        switch (res.code) {
          case 200:
            // 正常返回  xxx
            break
            case 401:
            // 非正常返回  xxx
            break
          default:
            // 非默认处理
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
        }
        resolve(res.data)
      },
      fail(erro) {
        uni.hideLoading()
        uni.showToast({
          icon: 'error',
          title: erro.errMsg
        })
        reject(erro)
      }
    })
  })
}

export { request }
