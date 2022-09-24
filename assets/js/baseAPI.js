// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
//   // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
//   options.url = ('http://ajax.frontend.itheima.net' + options.url) || options

//   // 统一为有权限的接口，设置 headers 请求头
//   if(options.url.indexOf('/my/') !== -1) {
//     options.headers = {
//       Autorization: localStorage.getItem('token') || ''
//     }
//   }

  // 全局统一拦截 complete 回调函数
  options.complete = function(res) {
    // console.log('')
    // console.log(res)
    // 在 complete 回调函数中，可以使用 res.responseJSON
    // 拿取服务器响应回来的数据
    if(res.responseJSON.status === 1 && res.responseJSON === '身份认证失败') {
        // 1. 强制清除本地存储中的 token
        localStorage.removeItem('token')
        // 2. 强制跳转到登录页面
        location.href = '../login.html'
    }
}
})

