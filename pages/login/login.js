// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
			phone: "",
			password: ""
			// value:"kk"
    },
		
		handleInput(event) {
			// console.log(event)
			let type = event.target.id
			this.setData({
				[type]:event.detail.value
			})
		},
		async login() {
			let {phone,password} = this.data
			//前端验证
			if(!phone) {
				wx.showToast({
					title: '手机号码不能为空',
					icon: 'none'
				})
				return;
			}
			
			//手机号码正则
			let phoneReg = /^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/ ;
			if(!phoneReg.test(phone)) {
				wx.showToast({
					title: '手机号格式错误',
					icon: 'none'
				})
				return;
			}
			if(!password) {
				wx.showToast({
					title: '密码不能为空',
					icon: 'none'
				})
				return;
			}
			
			//后端验证
			//变量名不能写result
			let results = await wx.$myRequest({
				url:`/login/cellphone?phone=${phone}&password=${password}`
			})
			console.log(results.data)
			if(results.data.code === 200) {
				wx.showToast({
					title: '登录成功'
				})
				//将用户的信息存储至本地
				wx.setStorageSync('userInfo',JSON.stringify(results.data.profile))
				
				//跳转到个人中心页
				wx.reLaunch({
					url: '/pages/personal/personal'
				})
			}else if(results.data.code === 400) {
				wx.showToast({
					title: '手机号错误',
					icon: 'none'
				})
			}else if(results.data.code === 502) {
				wx.showToast({
					title: '密码错误',
					icon: 'none'
				})
			}else {
				wx.showToast({
					title: '登录失败,请重新登录',
					icon: 'none'
				})
			}
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