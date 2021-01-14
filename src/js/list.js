
$(function () {

  let list = null
  const list_info = {
    cat_one: 'all',
    cat_two: 'all',
    cat_three: 'all',
    sort_method: '综合',
    sort_type: 'ASC',
    current: 1,
    pagesize: 15
  }

  getGoodsList()
  async function getGoodsList() {
    const goodsList = await $.get('./server/getGoodsList.php', list_info, null, 'json')
    list = goodsList.list

    let str = ''
    goodsList.list.forEach(item => {
      str += `

        <li>
          <img src="${ item.goods_big_logo }" alt="">
          <p data-id="${ item.goods_id }">
            ${ item.goods_name }
          </p>
          <div class="money">
            ￥${ item.goods_price }
          </div>
          <div class="money-one">
            券
          </div>
        </li>
      `
    })
    $('.goodsList > ul').html(str)
  }

  $('.goodsList ul').on('click', 'p', function () {
    const id = $(this).data('id')
    setCookie('goods_id', id)
    window.location.href = './detail.html'
  })

})
