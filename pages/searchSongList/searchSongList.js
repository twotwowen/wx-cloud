// pages/searchSongList/searchSongList.js
import pubsub from 'pubsub-js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
			searchSongList:[],
			index:0
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
				url: `/pages/songDetail/songDetail?id=${event.currentTarget.id}`
			})
			
			
		},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
			//获取所有打开的EventChannel事件(调度中心)
			//const eventChannel = this.getOpenerEventChannel()
			// 监听searchSongList事件，获取上一页面通过eventChannel传送到当前页面的数据
			// eventChannel.on('searchSongList',function(data) {
			// 	console.log(data)
			// })
			
			//订阅消息
			pubsub.subscribe('searchSongList',(msg,searchSongList) => {
				 //console.log(searchSongList)
				this.setData({
					searchSongList
				})
			})
			
			//订阅消息
			pubsub.subscribe('switchMusic',(msg,type) => {
				console.log('search'+type)
				let {searchSongList,index} = this.data
				if(type === 'pre') {
					(index === 0) && (index = searchSongList.length)
					index -= 1
				}else {
					(index === searchSongList.length -1) && (index = -1)
					index += 1
				}
				//更新下标
				this.setData({
					index
				})
				
				let musicId = searchSongList[index].id
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