// pages/songDetail/songDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
			songId:'',
			songName:'',
			isPlay:false,
			songDetail:{},
			songUrl:'',
			// picUrl:''
    },
		
		//播放or暂停
		startOrPause() {
			let {isPlay} = this.data
			this.setData({
				isPlay: !isPlay
			})
			this.audioPlayOrPause(this.data.isPlay)
		},
		
		//获取歌曲详细信息
		async getSongDetail(id) {
			let songDetail = await wx.$myRequest({
				url:`/song/detail?ids=${id}`
			})
			// console.log(songDetail)
			this.setData({
				songDetail:songDetail.data.songs
			})
		},
		//获取歌曲url
		async getSongUrl(id) {
			let songUrl = await wx.$myRequest({
				url:`/song/url?id=${id}`
			})
			this.setData({
				songUrl:songUrl.data.data[0].url
			})
		},
		
		//播放歌曲  //不使用音频，使用背景音乐
		// audioPlay() {
		// 	// let {isPlay} = this.data
		// 	// this.setData({
		// 	// 	isPlay: !isPlay
		// 	// })
		// 	this.audioCtx.play()
		// },
		// //暂停歌曲
		// audioPause() {
		// 	// let {isPlay} = this.data
		// 	// this.setData({
		// 	// isPlay: !isPlay
		// 	// })
		// 	this.audioCtx.pause()
		// },
		//播放or暂停
		audioPlayOrPause(isPlay) {
			//创建背景音乐实例
			let backgroundAudioManager = wx.getBackgroundAudioManager()
			backgroundAudioManager.src = this.data.songUrl
			backgroundAudioManager.title = this.data.songName
			if(isPlay) {
				backgroundAudioManager.play()
			}else {
				backgroundAudioManager.pause()
			}
		},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
			// console.log(options)
			//获取歌曲id，并将id保存
			this.setData({
				songId:options.id,
				songName:options.musicname,
				// picUrl:options.picurl
			})
			
			//获取歌曲详细信息
			this.getSongDetail(options.id)
			//获取歌曲url
			this.getSongUrl(options.id)
		
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
			
			//使用wx.createlnnerAudioContext 获取 audio 上下文 context
			// this.audioCtx = wx.createInnerAudioContext('myAudio')
			
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