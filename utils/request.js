//发送ajax请求
const baseURL = 'http://localhost:3000'
export const myRequest = (options) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseURL + options.url,
            method: options.method || 'GET',
            data: options.data || {},
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}