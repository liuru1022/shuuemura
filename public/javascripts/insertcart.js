function insertcart(count) {
      // 加入购物车功能实现
      var insertcarts = document.querySelectorAll('#insertcart');
      for (const insertcart of insertcarts) {
        if (iteminfojson) {
          var u_id = JSON.parse(iteminfojson).u_id;
          insertcart.onclick = function () {
            var feature =
              `<p><span style="background-color: ${insertcart.getAttribute('color')};"></span>${insertcart.getAttribute('buy')}</p>`;
            var preinsertcart = insertcart.previousElementSibling;
            var totalprice = preinsertcart.innerHTML.slice(1);
            var p_id = preinsertcart.id;
            ajax({
              type: 'post',
              url: 'http://127.0.0.1:3000/users/insertcart',
              data: {
                count: count,
                feature: feature,
                totalprice: totalprice,
                p_id: p_id,
                u_id: u_id
              },
              dataType: 'json'
            }).then(res => {
              alert(res.msg);
              location.reload();
            })
          }
        } else {
          insertcart.onclick = function () {
            alert('请先登录！');
          }
        }
      }
}