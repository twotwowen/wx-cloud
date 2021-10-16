// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
			hotList:[],
			placeholderContent:'',
			searchContent:'',
			searchSuggest:[]
    },
		
		//获取默认搜索关键词
		async getSearchDefault() {
			let searchDefault = await wx.$myRequest({
				url:'/search/default'
			})
			this.setData({
				placeholderContent:searchDefault.data.data.showKeyword
			})
		},
		
		//获取热搜列表(详细)
		async getSearchHot() {
			let hotList = await wx.$myRequest({
				url:'/search/hot/detail'
			})
			// console.log(hotList)
			this.setData({
				hotList:hotList.data.data
			})
		},
		
		//搜索建议
		async getSearchSuggest() {
			// 去除两边空格
			let keyword = this.data.searchContent.trim()
			// let inputDebounce = null
			// 有值就发请求
			if(keyword) {
				
				let searchSuggest = await wx.$myRequest({
					url:`/search/suggest?keywords=${keyword}&type=mobile`
				})
				this.setData({
					searchSuggest:searchSuggest.data.result.allMatch
				})
			}
			
		},
		TimeId:-1,//设置防抖id
		//定义防抖函数
		inputDebounce() {
			this.TimeId = setTimeout(() => {
				this.getSearchSuggest()
				console.log('调用了')
			},500)
		
		},
		//监听用户搜索框输入
		handleInputChange() {
			// let Time = null
			//清除定时器
			clearTimeout(this.TimeId)
			console.log('清楚了')
			
			this.inputDebounce()
		},
		//清除搜索框
		handleClear() {
			this.setData({
				searchContent:''
			})
		},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
			//获取默认搜索关键词
			this.getSearchDefault()
			//获取热搜列表(详细)
			this.getSearchHot()
		
			
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