// pages/songComment/songComment.js
import moment from 'moment'
import pubsub from 'pubsub-js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
			newFormatTime:[],
			hotFormatTime:[],
			commentsList:[],
			hotCommentsList:[],
			id:'',
			songInfo:{},
			flag:true, //最新or最热
			isMore:false,
			floorComments:[],//楼层评论
			ownerComment:{},
			floorFormatTime:[],
			ownerFormatTime:0
    },
		
		//发送请求拿到评论数据
		async getCommentList() {
			let commentsList = await wx.$myRequest({
				url:`/comment/music?id=${this.data.id}&limit=30`
			})
			let arrnew =[]
			let arrhot =[]
			for(let i = 0;i < commentsList.data.comments.length;i++) {
				arrnew.push(moment(commentsList.data.comments[i].time).format('lll')) 
			}
			for(let i = 0;i < commentsList.data.hotComments.length;i++) {
				arrhot.push(moment(commentsList.data.hotComments[i].time).format('lll')) 
			}
			this.setData({
				commentsList:commentsList.data.comments,
				hotCommentsList:commentsList.data.hotComments,
				newFormatTime:arrnew,
				hotFormatTime:arrhot
			})
		},
		
		//获取楼层评论
		async getFloorComments(commentId) {
			
			let {id} = this.data
		
			let floorComments = await wx.$myRequest({
				url:`/comment/floor?parentCommentId=${commentId}&id=${id}&type=0`
			})
			let ownerFormatTime = moment(floorComments.data.data.ownerComment.time).format('lll')
			let floorTime = []
			for(let i = 0;i < floorComments.data.data.comments.length;i++) {
				floorTime.push(moment(floorComments.data.data.comments[i].time).format('lll')) 
			}
			this.setData({
				floorComments:floorComments.data.data.comments,
				ownerComment:floorComments.data.data.ownerComment,
				ownerFormatTime,
				floorFormatTime:floorTime
				
			})
		},
		
		//最新or最热
		hotOrNew() {
			let {flag} = this.data
			this.setData({
				flag:!flag
			})
		},
		//更多回复
		moreComments(e) {
			let commentId = e.currentTarget.id
			this.getFloorComments(commentId)
			this.setData({
				isMore:true,
				
			})
			
		},
		//隐藏更多回复
		hoverMoreComments() {
			this.setData({
				isMore:false
			})
		},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
			console.log(options)
			this.setData({
				id:options.id
			})
			
			//订阅
			// pubsub.subscribe('songInfo',(msg,songInfo) => {
			// 	console.log(songInfo)
			// 	this.setData({
			// 		songInfo
			// 	})
			// })
			//获取评论信息
			this.getCommentList()
			
			//获取事件对象
			const eventChannel = this.getOpenerEventChannel()
			
			//监听事件，获得数据
			eventChannel.once('songInfo',(data) => {
				// console.log(data)
				this.setData({
					songInfo:data
				})
			} )
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