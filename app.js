// app.js
//自己定义的网络请求方法
import { myRequest } from 'utils/request.js'
wx.$myRequest = myRequest

App({
	// 创建页面实例
	globalData:{
		isMusicPlay:false,
		musicId:''
	},
    onLaunch() {

    },

})