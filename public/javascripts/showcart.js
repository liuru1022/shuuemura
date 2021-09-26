function showcart() {
  var noproduct = document.querySelector('.noproduct');
  var noproduct2 = document.querySelector('.noproduct2');
  var hasproduct = document.querySelector('.hasproduct');
  var hasproduct2 = document.querySelector('.hasproduct2');
  var cartcount = document.querySelector('.htr_loginsuccess+a>span:first-child');
  var item_box = document.querySelector('.cartcontent');
  var item_box2 = document.querySelector('.cartcontent2');
  var cartcount2 = document.querySelector('.headcenter_right>a>span:first-child')
  if (iteminfojson) {
    noproduct.style.display = 'none';
    hasproduct.style.display = 'block';
    noproduct2.style.display = 'none';
    hasproduct2.style.display = 'block';
    var iteminfo = JSON.parse(iteminfojson);
    ajax({
      type: 'post',
      url: 'http://127.0.0.1:3000/users/showcart',
      data: `useid=${iteminfo.u_id}`,
      dataType: 'json'
    }).then(res => {
      var cartItem = res.result;
      if (res.result == undefined) {
        noproduct.style.display = 'flex';
        hasproduct.style.display = 'none';
        noproduct2.style.display = 'flex';
        hasproduct2.style.display = 'none';
      } else {
        cartcount.innerHTML = cartItem.length;
        cartcount2.innerHTML = cartItem.length;
        if (cartItem) {
          for (let i = 0; i < cartItem.length; i++) {
            item_box.innerHTML += `
          <div class="cart_item">
                <div>
                  <img src="../img/product/${cartItem[i].img}" alt="">
                  <div>
                    <p>${cartItem[i].product_name}</p>
                    <p>
                      <span style="background-color:${cartItem[i].default_color};"></span>
                      <span>${cartItem[i].default_buy}</span>
                    </p>
                    <span id="removecart" cartid="${cartItem[i].c_id}">删除</span>
                  </div>                  
                </div>
                <div>${cartItem[i].count}</div>
                <div>￥${cartItem[i].totalprice}</div>
              </div>
          `;
          }
          item_box2.innerHTML = item_box.innerHTML;
        }
      }
      // 总价计算
      var cartprices = document.querySelectorAll('.cartcontent>.cart_item>div:last-child');
      var carttotalprice = document.querySelector('.carttolprice>p:last-child');
      var carttotalprice2 = document.querySelector('.carttolprice2>p:last-child');
      var price_result = 0;
      for (const cartprice of cartprices) {
        price_result += parseFloat(cartprice.innerHTML.slice(1));
      }
      carttotalprice.innerHTML = `￥${price_result}`;
      carttotalprice2.innerHTML = carttotalprice.innerHTML;
      // 移除购物车
      var removecarts = document.querySelectorAll('#removecart')
      for (const removecart of removecarts) {
        removecart.onclick = function () {
          var cartid = removecart.getAttribute('cartid');
          ajax({
            type: 'post',
            url: 'http://127.0.0.1:3000/users/removecart',
            data: `c_id=${cartid}`,
            dataType: 'json'
          }).then(res => {
            location.reload();
          })
        }
      }
    })
  } else {
    noproduct.style.display = 'flex';
    hasproduct.style.display = 'none';
    noproduct2.style.display = 'flex';
    hasproduct2.style.display = 'none';
  }
}