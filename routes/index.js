var express = require('express');
const pool = require('../pool');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// 品牌故事
router.get('/story',function(req,res,next){
  var sql="select * from zcx_brandshow where showsort='品牌故事'";
  pool.query(sql,(err,result)=>{
    if(err){
      next(err);
      return;
    }
    if (result.length>0) {
      res.send({
        code:200,
        result:result
      })
    }else{
      res.send({
        code:404,
        msg:'显示错误！'
      })
    }
  })
})
// 会员礼遇
router.get('/VIP',function(req,res,next){
  var sql="select * from zcx_brandshow where showsort='会员礼遇'";
  pool.query(sql,(err,result)=>{
    if(err){
      next(err);
      return;
    }
    if (result.length>0) {
      res.send({
        code:200,
        result:result
      })
    }else{
      res.send({
        code:404,
        msg:'显示错误！'
      })
    }
  })
})
// 会员加赠
router.get('/vipPresented',function(req,res,next){
  var sql="select * from zcx_brandshow where showsort='会员加赠'";
  pool.query(sql,(err,result)=>{
    if(err){
      next(err);
      return;
    }
    if (result.length>0) {
      res.send({
        code:200,
        result:result
      })
    }else{
      res.send({
        code:404,
        msg:'显示错误！'
      })
    }
  })
})
// 匠心单品
router.get('/danpin',function(req,res,next){
  var sql="select * from zcx_brandshow where showsort='匠心单品'";
  pool.query(sql,(err,result)=>{
    if(err){
      next(err);
      return;
    }
    if (result.length>0) {
      res.send({
        code:200,
        result:result
      })
    }else{
      res.send({
        code:404,
        msg:'显示错误！'
      })
    }
  })
})
// 洁颜家族
router.get('/jieyan',function(req,res,next){
  var sql="select * from zcx_brandshow where showsort='洁颜家族'";
  pool.query(sql,(err,result)=>{
    if(err){
      next(err);
      return;
    }
    if (result.length>0) {
      res.send({
        code:200,
        result:result
      })
    }else{
      res.send({
        code:404,
        msg:'显示错误！'
      })
    }
  })
})
// 付邮试用
router.get('/trial',function(req,res,next){
  var sql="select * from zcx_brandshow where showsort='付邮试用'";
  pool.query(sql,(err,result)=>{
    if(err){
      next(err);
      return;
    }
    if (result.length>0) {
      res.send({
        code:200,
        result:result
      })
    }else{
      res.send({
        code:404,
        msg:'显示错误！'
      })
    }
  })
})
// 明星刷具
router.get('/brush',function(req,res,next){
  var sql="select * from zcx_brandshow where showsort='明星刷具'";
  pool.query(sql,(err,result)=>{
    if(err){
      next(err);
      return;
    }
    if (result.length>0) {
      res.send({
        code:200,
        result:result
      })
    }else{
      res.send({
        code:404,
        msg:'显示错误！'
      })
    }
  })
})
// 首页轮播图
router.get('/indexlunbo',function(req,res,next){
  var sql="select * from zcx_lunbo";
  pool.query(sql,(err,result)=>{
    if(err){
      next(err);
      return;
    }
    if (result.length>0) {
      res.send({
        code:200,
        result:result
      })
    }else{
      res.send({
        code:404,
        msg:'显示错误！'
      })
    }
  })
})
//明星产品/新品
router.get('/indexproduct',function(req,res,next){
  var sql="select * from zcx_starproduct";
  pool.query(sql,(err,result)=>{
    if(err){
      next(err);
      return;
    }
    if (result.length>0) {
      var starproduct=result;
    }
    var sql='select * from zcx_newproduct'
    pool.query(sql,(err,result)=>{
      if(err){
        next(err);
        return;
      }
      if (result.length>0) {
        res.send({
          code:200,
          starproduct,
          result:result
        })
      }
    })
  })
})
module.exports = router;
