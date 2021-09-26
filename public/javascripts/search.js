function search(content,paixu) {
  var onesortHTML = document.querySelector('.searchpro_mainleft>p:first-child');
  var twosortHTML = document.querySelector('.searchpro_mainleft>div:nth-child(2)');
  var contentimg = document.querySelector('.searchpro_content>img');
  var prolistHTML = document.querySelector('.product_main');
  
  var prolist_HTML = '';
  var twosortlistHTML ='';
  ajax({
    type: 'post',
    url: 'http://127.0.0.1:3000/product/search',
    data: `searchcontent=${content}&paixu=${paixu}`,
    dataType: 'json'
  }).then(res => {
    if (res.code == 201) {
      prolistHTML.innerHTML = `
      <div style="margin: 100px 0;width:900px;text-align: center;">
        <img src="../img/icon/没有数据.png" alt="">
        <h2>${res.msg}</h2>
      </div>
      `;
    } else {
      var onesort = res.onesort;
      var twosorts = res.twosort;
      var prolist = res.prolist;
      contentimg.src = `../img/other/${res.sortimg}`;
      onesortHTML.innerHTML = onesort;
      for (const twosort of twosorts) {
        twosortlistHTML +=
          `<p onclick="window.location.href='searchpro.html?search=${twosort.twosort}'">${twosort.twosort}</p>`;
      }
      twosortHTML.innerHTML=twosortlistHTML;
      for (let i = 0; i < prolist.length; i++) {
        prolist_HTML += `
      <div class="product_card">
            <img src="../img/product/${prolist[i].img}" alt="" id="${prolist[i].product_id}" onclick="window.location.href='details.html?id=${prolist[i].product_id}'">
            ${prolist[i].search_select}
            <b>${prolist[i].product_name}</b>
              <div class="star">
                <img src="../img/icon/Star1.png" alt=""><img src="../img/icon/Star1.png" alt=""><img
                  src="../img/icon/Star1.png" alt=""><img src="../img/icon/Star1.png" alt=""><img
                  src="../img/icon/Star1.png" alt="">
              </div>
              <span id="${prolist[i].product_id}">¥${prolist[i].price}</span>
            <button class="btn-black" color="${prolist[i].default_color}" buy="${prolist[i].default_buy}" id="insertcart">立即购买</button>
          </div>
      `;
      }
      prolistHTML.innerHTML = prolist_HTML;
      //调用切换颜色和图片的DOM
      colorAndimg();
      insertcart(1);
    }
  })
}