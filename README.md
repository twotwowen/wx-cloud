# 🎶music原生小程序(使用网易云音乐API)

---
## 首页，登入页，个人中心页，推荐歌曲页，搜索页，搜索列表展示页，歌曲详情页，歌曲评论页，视频页

### 完成功能点

#### 首页
- promise封装请求并挂载到全局
- 异步请求首页数据，进行渲染
- 封装标题组件,以便复用
- 路由跳转
- 可滚动区域添加视口高度
- 不同场景合理利用swiper与scroll-view
- 遍历数据渲染
- .
- .
- .

#### 视频页
- 页面加载通过登录用户的cookie发请求获取动态导航数据与视频数据
- 头部导航点击动态移动
- 可拖拉进度条定位
- 解决视频同时播放bug
- 实现播放跳转到指定位置
- 实时记录播放进度
- 利用image代替video,提高性能
- 添加showLoading提升用户体验
- 添加播放记录
- 视频播放结束，移除播放记录
- 页面跳转到搜索页
- 转发分享
- .
- .
- .

#### 个人中心页
- wx:if条件渲染,游客or用户
- 点击头像跳转登录页
- 更新userInfo状态
- 获取用户播放记录的功能
- 解决scroll-view点击穿透
- 监听手指触摸的位置,用于定位遮挡区域,进行下拉或上移
- .
- .
- .

#### 登录页
- 流式布局绘制页面
- 利用正则表达式进行前端验证
- 使用URL参数传值,option取值
- 调用接口进行后端验证
- 结果错误用showToast提示
- setStorage对用户的cookie进行本地存储
- 对input值与data进行双向绑定
- 登入成功跳转至个人中心页
- .
- .
- .

#### 搜索页
- 页面加载时进行异步请求数据
- 添加历史记录功能
- 清空历史记录,showModal进行询问
- 关键字模糊匹配
- json格式转化
- 添加搜索记录至本地
- 获取搜索建议隐藏搜索界面
- 点击热搜，历史记录，搜索建议均可搜索,跳转至搜索结果列表
- input值为空,空格不进行搜索
- 监听input频繁输入进行防抖处理
- .
- .
- .

#### 搜索结果页
- 点击任意item跳转对应音乐界面
- 使用data-进行传参
- 利用pubsub-js订阅消息,传输数据
- 发布歌曲详情页需要数据
- 监听音乐详情页切歌,匹配对应musicId
- 音乐切歌后,实时更新index下标
- .
- .
- .

#### 推荐列表页
- 异步获取数据,添加至页面data
- 发布/订阅数据
- URL传参
- 使用catchtap阻止事件冒泡
- 实时更新日期
- 判断用户是否登录
- wx:for数据遍历渲染页面
- 调节视口滚动区域
- .
- .
- .

#### 歌曲详情页
- 获取上一个页面的参数,进行不同参数的渲染
- 点击播放/暂停更新磁盘转动状态
- 通过eventchannel向被打开页面传输数据
- 进度条实时播放进度与播放时长相对应
- 点击上一首/下一首切歌
- 解决backgroundAudioManager自动播放bug
- 切歌时关闭上一首,自动播放当前歌曲
- 解决页面销毁音乐播放状态的问题
- 给全局变量传值
- 监视音乐播放暂停/播放/停止
- 监听音乐自然结束,自动切换下一首播放,更新进度条
- 实时更新背景音乐src与title
- 订阅pubsub.subscribe来自上一个页面的歌曲id
- 发布pubsub.publish切歌类型type
- 使系统控制栏与播放状态一致
- .
- .
- .

#### 歌曲评论页
- 利用调度中心,监听事件获得数据eventChannel.once
- 异步获取歌曲评论信息,楼层评论信息
- 动态展现歌曲图片,歌曲名称,歌曲作者
- 对时间进行格式化
- 点击更多评论,弹出遮盖层
- 遮盖层定位,头部置顶原生评论
- 点击最热/最新切换展示数据
- 设置flag开关是否显示遮挡层
- 解决scroll-view滚动穿透
	1. 操作Page组件,overflow动态设置hidden or visible or auto
	2. 遮罩层设置catchtouchmove="{{true}}"
	3. 添加视口高度
- .
- .
- .


### 项目展示(更多图片请前往showImage文件夹查看)
![index](/showImage/index.gif) <br/>
![personalAndLogin](/showImage/personalAndLogin.gif) <br/>
![search](/showImage/search.gif) <br/>
![songComment](/showImage/songComment.gif) <br/>
![songDetail](/showImage/songDetail1.gif) <br/>
![songDetail](/showImage/songDetail2.gif) <br/>
![video](/showImage/video.gif) <br/>
![recommendSong](/showImage/recommendSong.gif)

