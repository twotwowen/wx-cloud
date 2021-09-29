// index.js
// 获取应用实例
const app = getApp()
Page({
    data: {
        swipers: [],
				recommended:[],
				navIcon:[
					{
						icon:"iconfont icon-tuijian",
						index:0,
						text:'每日推荐'
					},
					{
						icon:"iconfont icon-gedan",
						index:1,
						text:'歌单'
					},
					{
						icon:"iconfont icon-paihangbang",
						index:2,
						text:'排行榜'
					},
					{
						icon:"iconfont icon-diantai",
						index:3,
						text:'电台'
					},
					{
						icon:"iconfont icon-zhibo",
						index:4,
						text:'直播'
					}
					
				]
				
    },

    onLoad() {
        this.getSwiper()
				this.getRecommend()
    },
    //请求轮播图
    async getSwiper() {
        const res = await wx.$myRequest({
            url: '/banner'
        })
        this.setData({
            swipers: res.data.banners
        })

        //console.log(res.data.banners);
    },
		
		//请求推荐歌单
		async getRecommend() {
			const res = await wx.$myRequest({
				url:'/personalized?limit=10'
			})
			this.setData({
				recommended: res.data.result
			})
			// console.log(res)
		}
		

})