// jQuery 的入口函数
$(function () {

  // 1. 根据 cookie 中的信息
  // 判断用户信息面板中显示哪一个内容
  const nickname = getCookie('nickname')

  // 2. 根据 nickname 信息进行判断
  if (nickname) {
    // 表示存在, 不是 undefined
    $('.off').addClass('hide')
    $('.on').removeClass('hide').text(`欢迎您: ${nickname}`)
  } else {
    // 表示不存在, 是 undefined
    $('.off').removeClass('hide')
    $('.on').addClass('hide')
  }
})
