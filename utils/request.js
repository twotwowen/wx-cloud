//发送ajax请求
const baseURL = 'http://localhost:3000'
export const myRequest = (options) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseURL + options.url,
            method: options.method || 'GET',
            data: options.data || {},
						header: {
							cookie: wx.getStorageSync('cookies') ? wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1) : ''
						},
            success: (res) => {
							resolve(res)
							// console.log(options)
							// if(options.data.isLogin){//登录请求,将用户cookie存入
							// 	wx.setStorage({
							// 		key: 'cookies',
							// 		data: res.cookies,
							// 	})
							// }
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}