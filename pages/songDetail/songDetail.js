// pages/songDetail/songDetail.js
const appInstance = getApp()
import pubsub from 'pubsub-js'
import moment from 'moment'
Page({

    /**
     * 页面的初始数据
     */
    data: {
			songId:'',
			// songName:'',
			isPlay:false,
			songDetail:{},
			songUrl:'',
			// picUrl:''
			currentTime:'00:00',
			durationTime:'00:00',
			currentWidth:0
    },
		//去往评论页
		toSongComment() {
			let {songId} = this.data
			let songInfo = {
				picUrl:this.data.songDetail[0].al.picUrl,
				name:this.data.songDetail[0].name,
				ar:this.data.songDetail[0].ar[0].name
			}
			wx.navigateTo({
				url:`/pages/songComment/songComment?id=${songId}`,
				success:function(res) {
					//通过eventchannel向被打开页面传输数据
					res.eventChannel.emit('songInfo',{data:songInfo})
				}
			})
		},
		
		//播放or暂停
		startOrPause() {
			//获取歌曲url
			this.getSongUrl(this.data.songId)
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
			// 音乐总时长
			let durationTime = moment(songDetail.data.songs[0].dt).format('mm:ss')
			this.setData({
				songDetail:songDetail.data.songs,
				durationTime
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
		
			this.backgroundAudioManager.src = this.data.songUrl
			this.backgroundAudioManager.title = this.data.songDetail[0].name
			
		
		},
		
		
		
		
		//播放or暂停
		audioPlayOrPause(isPlay) {
			
			
			if(isPlay) {
				
				this.backgroundAudioManager.play()
			}else {
				this.backgroundAudioManager.pause()
			}
		},
		
		//点击切歌的回调
		handleSwitch(event) {
			//获取切歌的类型
			let type = event.currentTarget.id
			//关闭当前播放音乐
			this.backgroundAudioManager.stop();
			// this.backgroundAudioManager.onPause(() => {
			// 	this.setData({
			// 		isPlay:false
			// 	})
			// 	appInstance.globalData.isMusicPlay = this.data.isPlay
			// })
			
			//订阅来自recommendSong页面
			pubsub.subscribe('musicId',(msg,musicId) =>{
				this.setData({
					songId:musicId
				})
				//获取歌曲详细信息
				this.getSongDetail(musicId)
				//获取歌曲url
				this.getSongUrl(musicId)
				
				//自动播放当前音乐
				this.audioPlayOrPause(true)
				
				//取消订阅
				pubsub.unsubscribe()
			})
			//发布
			pubsub.publish('switchMusic',type)
			
		},
		
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
			// console.log(options)
			//获取歌曲id，并将id保存
			this.setData({
				songId:options.id,
				// songName:options.musicname,
				// picUrl:options.picurl
			})
			
			//获取歌曲详细信息
			this.getSongDetail(options.id)
			//获取歌曲url
			// this.getSongUrl(options.id)
			//创建背景音乐实例
			this.backgroundAudioManager = wx.getBackgroundAudioManager()
		
			//解决页面销毁音乐播放状态的问题
			if(appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === this.data.songId) {
				this.setData({
					isPlay:true
				})
			}
			//监视音乐播放暂停/播放/停止
			this.backgroundAudioManager.onPlay(() => {
				this.setData({
					isPlay:true
				})
				//修改全局播放状态
				appInstance.globalData.isMusicPlay = this.data.isPlay
				appInstance.globalData.musicId = this.data.songId
			})
			this.backgroundAudioManager.onPause(() => {
				this.setData({
					isPlay:false
				})
				appInstance.globalData.isMusicPlay = this.data.isPlay
			})
			this.backgroundAudioManager.onStop(() => {
				this.setData({
					isPlay:false
				})
				appInstance.globalData.isMusicPlay = this.data.isPlay
			})
			
			//监听音乐自然结束
			this.backgroundAudioManager.onEnded(() => {
				//自动切换下一首
				pubsub.publish('switchMusic','next')
				//将实时进度条的长度还原成0
				this.setData({
					currentWidth:0,
					currentTime:'00；00'
				})
			})
			
			//修改音乐实时播放进度
			this.backgroundAudioManager.onTimeUpdate(() => {
				// console.log('总'+this.backgroundAudioManager.duration)
				// console.log('实时'+this.backgroundAudioManager.currentTime)
				//格式化
				let currentTime = moment(this.backgroundAudioManager.currentTime * 1000).format('mm:ss')
				let currentWidth = this.backgroundAudioManager.currentTime / this.backgroundAudioManager.duration *450
				//更新
				this.setData({
					currentTime,
					currentWidth
				})
			})
			//发布
			// let songInfo = {
			// 	picUrl:this.data.songDetail[0].al.picUrl,
			// 	name:this.data.songDetail[0].name,
			// 	ar:this.data.songDetail[0].ar[0].alias.name
			// }
			// pubsub.publish('songInfo',songInfo)
		
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
			
			// 使用wx.createlnnerAudioContext 获取 audio 上下文 context
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