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
			videoInfo:[],
			videoId:'',
			videoUpdateTime:[],
			//下拉刷新是否触发
			isTriggered:false
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
				videoList:videoListData.data.datas,
				//关闭下拉刷新
				isTriggered:false
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
		//解决多个视频同时播放问题
		handlePlay(event) {//点击播放与继续播放的回调
			
			let vid = event.currentTarget.id
			this.setData({
				videoId:vid
			})
			//关闭上一个播放的视频，确认点击的视频与正在播放的视频不是同一个视频
		 // this.vid !== vid	&& this.videoContext && this.videoContext.stop() //当this.videoContext对象有值时才调用.stop()
			// this.vid = vid
			//创建控制video标签的实例对象
			this.videoContext = wx.createVideoContext(vid)
			//判断当前的视频之前是否播放过，如果有，则跳转到指定位置
			let {videoUpdateTime} = this.data
			let videoItem =  videoUpdateTime.find(item => item.vid === vid)
			if(videoItem) {
				this.videoContext.seek(videoItem.currentTime)
			}
			
		},
		
		//实现播放跳转到指定位置
		handleTimeUpdate(event){
			// console.log(event)
			let {videoUpdateTime} = this.data
			
			let videoTimeObj = {
				currentTime:event.detail.currentTime,
				vid:event.currentTarget.id
			}
			//判断是否又播放记录
			let videoItem = videoUpdateTime.find(item => item.vid === videoTimeObj.vid)
			if(videoItem) { //之前有
				videoItem.currentTime = event.detail.currentTime
			}else {//之前没有
				videoUpdateTime.push(videoTimeObj)
			}
			
			//更新videoUpdateTime的状态
			this.setData({
				videoUpdateTime
			})
		},
		
		//视频播放结束
		handleEnded(event) {
			//移除记录播放时长数组中当前视频对象
			let {videoUpdateTime} = this.data
			//返回找到的元素下标
			// videoUpdateTime.findIndex(item => item.vid === event.currentTarget.id)
			//移除
			videoUpdateTime.splice(videoUpdateTime.findIndex(item => item.vid === event.currentTarget.id),1)
			//更新
			this.setData({
				videoUpdateTime
			})
		},
		
		//自定义下拉刷新
		handleRefresher() {
			console.log('下拉刷新被触发')
			//获取视频列表数据
			this.getVideoList(this.data.navId)
			
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
    onShareAppMessage: function ({from}) {
			if(from === 'button') {
				return {
					title:'twotwowen-来自button的转发',
					page:'/pages/video/video',
					imageUrl: '/static/image/two.jpg'
				}
			}else {
				return {
					title:'twotwowen-来menu的转发',
					page:'/pages/video/video',
					imageUrl: '/static/image/two.jpg'
				}
			}
    }
})