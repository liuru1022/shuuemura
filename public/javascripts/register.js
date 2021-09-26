function register() {
  var registerDiv = document.querySelector('.default-dialog');
  var body = document.getElementsByTagName('body')[0];
  btn_register.onclick = function () {
    registerDiv.style.display = 'block'
    body.style.overflowY = 'hidden'
  }
  register_close.onclick = function () {
    registerDiv.style.display = 'none'
    body.style.overflowY = 'auto'
  }
  // 验证注册信息
  var rephone = document.getElementsByName('rephone')[0];
  var repwd = document.getElementsByName('repwd')[0];
  var tworepwd = document.getElementsByName('tworepwd')[0];
  var recode = document.getElementsByName('recode')[0];
  var rename = document.getElementsByName('rename')[0];
  rephone.onblur = function () {
    var spanchahao = this.nextElementSibling;
    var spanduihao = this.nextElementSibling.nextElementSibling;
    var resultphone = regphone.test(this.value);
    var resultemail = regemail.test(this.value);
    if (resultphone == true || resultemail == true) {
      spanduihao.style.opacity = 1;
      spanchahao.style.opacity = 0;
    } else {
      spanduihao.style.opacity = 0;
      spanchahao.style.opacity = 1;
    }
  }
  repwd.onblur = function () {
    var spanchahao = this.nextElementSibling;
    var spanduihao = this.nextElementSibling.nextElementSibling;
    var regpwd = /^\d{6}$/
    var resultpwd = regpwd.test(this.value);
    if (resultpwd == true) {
      spanduihao.style.opacity = 1;
      spanchahao.style.opacity = 0;
    } else {
      spanduihao.style.opacity = 0;
      spanchahao.style.opacity = 1;
    }
  }
  tworepwd.onblur = function () {
    var spanchahao = this.nextElementSibling;
    var spanduihao = this.nextElementSibling.nextElementSibling;
    if (tworepwd.value == repwd.value) {
      spanduihao.style.opacity = 1;
      spanchahao.style.opacity = 0;
    } else {
      spanduihao.style.opacity = 0;
      spanchahao.style.opacity = 1;
    }
  }
  recode.onblur = function () {
    var spanchahao = this.nextElementSibling;
    var spanduihao = this.nextElementSibling.nextElementSibling;
    if (recode.value == '5877') {
      spanduihao.style.opacity = 1;
      spanchahao.style.opacity = 0;
    } else {
      spanduihao.style.opacity = 0;
      spanchahao.style.opacity = 1;
    }
  }
  var sexradios = document.querySelectorAll('.test-label>input');
  var resex = '';
  register.onclick = function () {
    for (const sexradio of sexradios) {
      if (sexradio.checked) {
        resex = sexradio.value;
      }
    }
    if (myagree.checked) {
      ajax({
        type: 'post',
        url: 'http://127.0.0.1:3000/users/register',
        data: {
          rephone: rephone.value,
          repwd: repwd.value,
          rename: rename.value,
          resex: resex
        },
        dataType: 'json'
      }).then(res => {
        var user_info = res.result[0];
        var putuserinfo = JSON.stringify(user_info);
        window.localStorage.setItem('user', putuserinfo);
        htrloginsuccess.firstElementChild.innerHTML = user_info.u_name;
        displayname.innerHTML = user_info.u_name;
        loginDisplay('yes')
        alert(res.msg)
        location.reload();
      })
    } else {
      alert('请同意下方协议方可完成注册')
    }
  }
}