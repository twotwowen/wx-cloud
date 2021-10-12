// pages/video/video.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
			videoGroupList:[],
			navId:0,
			videoList:'',
			videoUrl:[],
			videoInfo:[]
    },
		
		//获取导航数据
		async getVideoGroupListData() {
			let videoGroupListData = await wx.$myRequest({
				url:'/video/group/list'
			})
			
			let num = videoGroupListData.data.data[0].id
			this.setData({
				videoGroupList: videoGroupListData.data.data.splice(0,14),
				navId:num
			})
			
			//获取视频列表数据
			this.getVideoList(this.data.navId)
		},
		//点击切换导航的回调
		changeNav(event) {
			let navId = event.target.id//通过id向event传参的时候，，如果传的是number会自动转化为string
			this.setData({
				navId:navId*1,
				// videoList:[]
			})
			//显示正在加载
			wx.showLoading({
				title:'正在加载'
			})
			this.getVideoList(this.data.navId)
		},
		//获取视频列表数据
		async getVideoList(navId) {
			let videoListData = await wx.$myRequest({
				url:`/video/group?id=${navId}`
			})
			console.log(videoListData)
			this.setData({
				videoList:videoListData.data.datas
			})
			
			//调用获取视频播放地址函数
			this.getVideoUrl()
			
			//关闭加载提示
			wx.hideLoading()
		},
		//获取视频地址的url
		
		async getVideoUrl() {
			let arr = []
			let arr1 = []
			for (let i = 0; i < this.data.videoList.length; i++) {
				// this.data.videoList[i]
				let videoUrl = await wx.$myRequest({
				url:`/video/url?id=${this.data.videoList[i].data.vid}`
			})
				
				arr.push(videoUrl.data.urls[0].url)
				//向videoList中添加url属性
				// this.data.videoList[i].url = videoUrl.data.urls[0].url
				//url,海报,描述汇总
				
				arr1.push({
					url:videoUrl.data.urls[0].url,
					title:this.data.videoList[i].data.title,
					poster:this.data.videoList[i].data.coverUrl
				})
				
			}
			this.setData({
				videoUrl:arr,
				videoInfo:arr1
			})
		},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
			
			//获取导航视频标签列表
			this.getVideoGroupListData()
			//显示正在加载
			wx.showLoading({
				title:'正在加载'
			})
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})