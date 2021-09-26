// msg传递是否登录成功的信息
function loginDisplay(msg){
  var htrmagDiv=document.getElementsByClassName('htr_mag')[0];
  var htrloginDiv=document.getElementsByClassName('htr_login')[0];
  var htrloginsuccessDiv=document.getElementsByClassName('htr_loginsuccess')[0];
  if (msg=='yes') {
    htrmag.style.display='none';
    htrlogin.style.display='none';
    htrmagDiv.style.display='none';
    htrloginDiv.style.display='none';

    htrloginsuccess.style.display='inline';
    htrloginsuccessDiv.style.display='block';
  }else{
    htrmag.style.display='inline'
    htrlogin.style.display='inline'
    htrmagDiv.style.display='block'
    htrloginDiv.style.display='block'

    htrloginsuccess.style.display='none'
    htrloginsuccessDiv.style.display='none'
  }
}