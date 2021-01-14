$(function () {

  $('#login').validate({
    rules: {
      username: {
        required: true,
        minlength: 5,
        maxlength: 10
      },
      password: {
        required: true,
        minlength: 6,
        maxlength: 12
      }
    },
    messages: {
      username: {
        required: '<br>请填写用户名信息',
        minlength: '<br>最少 5 个字符',
        maxlength: '<br>最多 10 个字符'
      },
      password: {
        required: '<br>请输入您的密码',
        minlength: '<br>最少 5 个字符',
        maxlength: '<br>最多 10 个字符'
      }
    },
    submitHandler (form) {
      const info = $(form).serialize()

      $.post('./server/login.php', info, null, 'json').then(res => {
        console.log(res)

        if (res.code === 0) {
          $('.login_error').removeClass('hide')
        } else if (res.code === 1) {
          setCookie('nickname', res.nickname)
          window.location.href = './index.html'
        }
      })
    }
  })
})
