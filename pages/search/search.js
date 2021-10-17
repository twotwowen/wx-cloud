// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
			hotList:[],
			placeholderContent:'',
			searchContent:'',
			searchSuggest:[],
			historyList:[],//历史搜索记录
			searchSongList:[]//搜索推荐
    },
		
		//输入框监听键盘回车和点击搜索图标
		search() {
			console.log('回车')
			//按下搜索图标或回车后，将搜索记录保存本地
			let {historyList,searchContent} = this.data
			//将搜索关键字添加到本地记录
			if(searchContent.trim() === '') {
				return
			}
			if(historyList.indexOf(searchContent) !== -1) {
				historyList.splice(historyList.indexOf(searchContent),1)
				
			}
			// unshift () 方法将把它的参数插入 arrayObject 的头部
			historyList.unshift(searchContent)
			
			//刷新记录
			this.setData({
				historyList
			})
			
			//存储到本地
			wx.setStorageSync('searchHistory',historyList)
			//获取搜索歌曲推荐
			this.getSearchSongList(searchContent)
			let searchSongList = this.data.searchSongList
			//跳转至搜索关键词列表
		
			wx.navigateTo({
				url:'/pages/searchSongList/searchSongList',
				success:function(res) {
					// console.log(searchSongList)
					// 通过eventChannel向被打开页面传送数据
					res.eventChannel.emit('searchSongList',{data:searchSongList})
				}
			})
			// this.toSearchSongList()
		},
		//跳转至搜索关键词列表
		// toSearchSongList() {
		// 	let searchSongList = this.data.searchSongList
		// 	wx.navigateTo({
		// 		url:'/pages/searchSongList/searchSongList',
		// 		success:function(res) {
		// 			// console.log(searchSongList)
		// 			// 通过eventChannel向被打开页面传送数据
		// 			res.eventChannel.emit('searchSongList',{data:searchSongList})
		// 		}
		// 	})
		// },
		//获取搜索结果
		async getSearchSongList(searchContent) {
			let searchSongList = await wx.$myRequest({
				url:`/cloudsearch?keywords=${searchContent}`
			})
			// console.log(searchSongList)
			this.setData({
				searchSongList:searchSongList.data.result.songs
			})
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
			},300)
		
		},
		//监听用户搜索框输入
		handleInputChange() {
			// let Time = null
			//清除定时器
			clearTimeout(this.TimeId)
			console.log('清楚了')
			
			this.inputDebounce()
			if(!this.data.searchContent) {
				this.setData({
					searchSuggest:''
				})
			}
		},
		//清除搜索框
		handleClear() {
			this.setData({
				searchContent:'',
				searchSuggest:''
			})
		},
		//获取历史记录
		getSearchHistory() {
			let historyList = wx.getStorageSync('searchHistory')
			if(historyList) {
				this.setData({
					historyList
				})
			}
		},
		//删除搜索历史记录
		handleDelete(){
		  //是否确认清空
		  wx.showModal({
		    content: '确认清空记录吗?',
		    success: (res)=>{
		      if(res.confirm){
		        this.setData({
		          historyList: []
		        })
		        wx.removeStorageSync('searchHistory');
		      }
		    }
		  })
		},
		//点击热搜榜关键词进行搜索
		//点击历史搜索记录对关键词进行搜索
		//对点击的搜索建议进行搜索
		searchSong(e) {
			let keyword = e.currentTarget.dataset.keyword
			this.getSearchSongList(keyword)
		},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
			//获取默认搜索关键词
			this.getSearchDefault()
			//获取热搜列表(详细)
			this.getSearchHot()
			//获取历史记录
			this.getSearchHistory()
			
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