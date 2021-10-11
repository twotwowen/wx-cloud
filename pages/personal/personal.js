// pages/personal/personal.js
// 手指移动
let startY = 0; //手指起使的坐标
let moveY = 0; //手指移动的坐标
let moveDistance = 0; //手指移动的距离
Page({

    /**
     * 页面的初始数据
     */
    data: {
			navs:[
				{
					icon:"iconfont icon-wodexiaoxi",
					index:0,
					text:'我的消息'
				},
				{
					icon:"iconfont icon-wodehaoyou",
					index:1,
					text:'我的好友'
				},
				{
					icon:"iconfont icon-icon03",
					index:2,
					text:'个人主页'
				},
				{
					icon:"iconfont icon-gexingzhuangban",
					index:3,
					text:'个性装扮'
				}
				
			],
			
			coverTransform: 'translateY(0)',
			coverTransition: ''
		},
		handleTouchStart(event) {
			// console.log('start')
			// console.log(event)
			//获取手指起使坐标
			startY = event.touches[0].clientY
			this.setData({
				coverTransition: ''
			})
		},
		handleTouchMove(event) {
			// console.log('move')
			//计算移动的距离
			moveY = event.touches[0].clientY
			moveDistance = moveY - startY
			if(moveDistance <= 0) {
				return
			}
			if(moveDistance >= 80) {
				moveDistance = 80
			}
			this.setData({
				coverTransform: `translateY(${moveDistance}rpx)`
			})
		},
		handleTouchEnd() {
			console.log('end')
			this.setData({
				coverTransform: `translateY(0)`,
				coverTransition: 'transform .5s linear'
			})
		},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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