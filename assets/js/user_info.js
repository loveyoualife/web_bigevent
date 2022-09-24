$(function() {
    let form = layui.form

    form.verify({
        nickname: function(value) {
            if(value.length > 6) {
                return '昵称长度必须在 1~6 个字符之间！'
            }
        }
    })
    
    userinfo()

    // 初始化用户的基本信息
    function userinfo() {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3007/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                // console.log(res)
                if(res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // 调用 form.val() 快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 需要重置表单的数据
    $('#btnReset').on('click', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        userinfo()
    })

    // 监听表单的监听事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        // 发起 ajax 数据请求
        $.ajax({
            mothod: 'POST',
            url: 'http://ajax.frontend.itheima.net/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: $(this).serialize(),
            success: function(res) {
                console.log(res)
                if(res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面中的方法，重新渲染用户的头像和用户信息
                window.parent.getUserInfo()
            }
        })
    })
})