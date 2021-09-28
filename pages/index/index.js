// index.js
// 获取应用实例
const app = getApp()
Page({
    data: {

    },

    onLoad() {
        this.getSwiper()

    },
    //请求网络
    async getSwiper() {
        const res = await wx.$myRequest({
            url: '/banner'
        })
        console.log(res.data.banners);
    }

})