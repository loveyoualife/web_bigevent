$(function() {
    let form = layui.form

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        samePwd: function(value) {
          if (value === $('[name=oldPwd]').val()) {
            return '新旧密码不能相同！'
          }
        },
        rePwd: function(value) {
            if(value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
      })


    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            mothod: 'POST',
            url: 'http://big-event-api-t.itheima.net/my/updatepwd',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: $(this).serialize(),
            success: function(res) {
                console.log(res)
                if(res.status !== 0) {
                    return layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})