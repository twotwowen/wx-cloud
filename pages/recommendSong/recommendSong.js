// pages/recommendSong/recommendSong.js
import pubsub from 'pubsub-js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
			recommendList:[],
			day:'',
			month:'',
			index:0
    },
		
		//获取每日推荐列表
		async getRecommendList() {
			let recommendList = await wx.$myRequest({
				url:'/recommend/songs'
			})
			// console.log(recommendList)
			this.setData({
				recommendList:recommendList.data.data.dailySongs
			})
		},
		
		//跳转到音乐播放界面
		handleToSongDetail(event) {
			// console.log(event)
			// console.log('点击了item')
			//将index传入data中
			let index = event.currentTarget.dataset.index
			this.setData({
				index
			})
			//跳转至指定页面
			wx.navigateTo({
				url: `/pages/songDetail/songDetail?id=${event.currentTarget.id}&musicname=${event.currentTarget.dataset.musicname}`
			})
			
			
		},
		test() {
			console.log('点击了icon')
			//使用catchtap阻止事件冒泡
		},
		
		
		
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
			this.getRecommendList()
		 //判断用户是否登录
			let userIinfo = wx.getStorageSync('userInfo');
			if(!userIinfo){
				wx.showToast({
					title: '请先进行登录',
					icon: 'none',
					success: ()=>{
						//跳转至登录界面
						wx.reLaunch({
							url: '/pages/login/login',
						})
					}
				})
			}
			//获取日期
			let nowTime = new Date()
			this.setData({
				day:nowTime.getDate(),
				month:nowTime.getMonth()+1
			})
			
			//订阅消息
			pubsub.subscribe('switchMusic',(msg,type) => {
				console.log('recommend'+type)
				let {recommendList,index} = this.data
				if(type === 'pre') {
					(index === 0) && (index = recommendList.length)
					index -= 1
				}else {
					(index === recommendList.length -1) && (index = -1)
					index += 1
				}
				//更新下标
				this.setData({
					index
				})
				
				let musicId = recommendList[index].id
				//将音乐id传回给songDetail页面
				pubsub.publish('musicId',musicId)
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