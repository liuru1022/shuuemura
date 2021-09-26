function colorAndimg() {
    // 点击切换颜色或图片
    // 点击切换颜色及显示对应颜色的图片
    var colorDivs = document.querySelectorAll('.round');
    for (const colorDiv of colorDivs) {
      colorDiv.onclick = function () {
        var colorDivPs = colorDiv.parentElement.children;
        var colorDivPImg = colorDiv.parentElement.parentElement.parentElement.firstElementChild;
        var colorDivCImg = colorDiv.firstElementChild.id;
        for (const colorDivP of colorDivPs) {
          colorDivP.className = colorDivP.className.replace(/\s+ractive/, '');
        }
        colorDiv.className += ` ractive`;
        colorDivPImg.src = colorDivCImg;
      }
    }
    // 点击切换图片及显示效果
    var iconDivs = document.querySelectorAll('.icon-square');
    for (const iconDiv of iconDivs) {
      iconDiv.onclick = function () {
        var iconDivPs = iconDiv.parentElement.children;
        var iconDivPImg = iconDiv.parentElement.parentElement.parentElement.firstElementChild;
        var iconDivCImg = iconDiv.firstElementChild;
        for (const iconDivP of iconDivPs) {
          iconDivP.className = iconDivP.className.replace(/\s+active/, '');
        }
        iconDiv.className += ` active`;
        iconDivPImg.src = iconDivCImg.src;
      }
    }
}