
$(function () {

  let info = null
  const id = getCookie('goods_id')

  getGoodsInfo()
  async function getGoodsInfo() {
    const goodsInfo = await $.get('./server/getGoodsInfo.php', { goods_id: id }, null, 'json')

    bindHtml(goodsInfo.info)
    info = goodsInfo.info
  }

  function bindHtml(info) {
    console.log(info)

    $('.enlargeBox').html(`
      <div class="show">
        <img src="${ info.goods_big_logo }" alt="">
        <div class="mask"></div>
      </div>
      <div class="list">
        <p class="active">
          <img src="${ info.goods_small_logo }" alt="">
        </p>
      </div>
      <div class="enlarge" style="background: url(${ info.goods_small_logo }); background-repeat: no-repeat; background-size: 800px 800px; z-index: 999;"></div>
    `)

    $('.goodsInfo').html(`
      <p class="desc">${ info.goods_name }</p>
      <div class="btn-group size">
        <button type="button" class="btn btn-default">S</button>
        <button type="button" class="btn btn-default">M</button>
        <button type="button" class="btn btn-default">L</button>
        <button type="button" class="btn btn-default">XL</button>
      </div>
      <p class="price">
        ￥ <span class="text-danger">${ info.goods_price }</span>
      </p>
      <div class="num">
        <button class="subNum">-</button>
        <input type="text" value="1" class="cartNum">
        <button class="addNum">+</button>
      </div>
      <div>
        <button class="btn btn-success addCart">加入购物车</button>
        <button class="btn btn-warning continue"><a href="./list.html">继续去购物</a></button>
      </div>
    `)

    $('.goodsDesc').html(info.goods_introduce)

    new Enlarge('#box1')

  }

  $('.goodsInfo').on('click', '.addCart', function () {
    const cart = JSON.parse(window.localStorage.getItem('cart')) || []

    const flag = cart.some(item => item.goods_id === id)
    if (flag) {
      const cart_goods = cart.filter(item => item.goods_id === id)[0]
      cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartNum').val() - 0)
    } else {
      info.cart_number = 1
      cart.push(info)
    }

    window.localStorage.setItem('cart', JSON.stringify(cart))
  })

  // 5. ++ -- 的事件
  $('.goodsInfo')
    .on('click', '.subNum', function () {
      // 拿到 input 的 value 值
      let num = $('.cartNum').val() - 0
      // 进行判断, 如果当前是 1, 那么什么都不做
      if (num === 1) return
      // 否则就进行 -- 操作, 然后在设置回去
      $('.cartNum').val(num - 1)
    })
    .on('click', '.addNum', function () {
      // 拿到 input 的 value 值
      let num = $('.cartNum').val() - 0
      // 否则就进行 -- 操作, 然后在设置回去
      $('.cartNum').val(num + 1)
    })
})


