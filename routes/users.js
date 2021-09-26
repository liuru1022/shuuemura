var express = require('express');
const pool = require('../pool');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
//登录
router.post('/login', (req, res, next) => {
  var obj = req.body;
  var user = obj.usercount;
  var upwd = obj.upwd;
  var sql = "select * from zcx_users where (u_email=? or u_phone=?) and u_pwd=?"
  pool.query(sql, [user, user, upwd], (err, result) => {
    if (err) {
      next(err);
      return;
    }
    if (result.length > 0) {
      res.send({
        code: 200,
        msg: "yes",
        result: result
      })
    } else {
      res.send({
        code: 201,
        msg: "no"
      })
    }
  })
})
//注册
router.post('/register', (req, res, next) => {
  var obj = req.body;
  var u_name = obj.rename;
  var u_pwd = obj.repwd;
  var u_email = obj.rephone;
  var u_phone = obj.rephone;
  var sex = obj.resex;
  var sql ='select * from zcx_users where u_phone=?'
  pool.query(sql,[u_phone],(err,result)=>{
    if (err) {
      next(err);
      return;
    }
    if (result.length>0) {
      res.send({
        code:201,
        msg:'该账号已经有人注册！'
      })
    }else{
      var sql = "insert into zcx_users(u_name,u_pwd,u_email,u_phone,sex) values(?,?,?,?,?)"
      pool.query(sql, [u_name, u_pwd, u_email, u_phone, sex], (err, result) => {
        if (err) {
          next(err);
          return;
        }
        if (result.affectedRows > 0) {
          var msg='注册成功';
        }
        var sql='select * from  zcx_users where u_phone=?'
        pool.query(sql,[u_phone],(err,result)=>{
          if (err) {
            next(err);
            return;
          }
          if (result.length>0) {
            res.send({
              code:200,
              msg,
              result
            })
          }
        })
      })      
    }
  })

})
//购物车显示
router.post('/showcart', (req, res, next) => {
  var obj = req.body;
  var useid = obj.useid;
  var sql = "select * from zcx_cart,zcx_product where zcx_product.product_id=zcx_cart.p_id and u_id=? and c_flag=0"
  pool.query(sql, [useid], (err, result) => {
    if (err) {
      next(err);
      return;
    }
    if (result.length > 0) {
      res.send({
        code: 200,
        msg: "yes",
        result: result
      })
    } else {
      res.send({
        code: 201,
        msg: "no"
      })
    }
  })
})
// 添加购物车
router.post('/insertcart', (req, res, next) => {
  var obj = req.body;
  var count = obj.count;
  var feature = obj.feature;
  var totalprice = obj.totalprice;
  var p_id = obj.p_id;
  var u_id = obj.u_id;
  var sql = 'select * from zcx_cart where u_id=? and p_id=? and c_flag=0;'
  pool.query(sql, [u_id, p_id], (err, result) => {
    if (err) {
      next(err);
      return;
    }
    if (result.length > 0) {
      console.log(result[0].count);
      if (result[0].count >= 5) {
        res.send({
          code: 201,
          msg: '您已达限购数量，去看看其他商品吧♥'
        })
      } else {
        var sql = 'update zcx_cart set count=count+?,totalprice=totalprice+? where u_id=? and p_id=? and c_flag=0;'
        pool.query(sql, [count, totalprice, u_id, p_id], (err, result) => {
          if (err) {
            next(err);
            return;
          }
          if (result.affectedRows > 0) {
            res.send({
              code: 200,
              msg: "添加成功"
            })
          } else {
            res.send({
              code: 201,
              msg: "添加失败"
            })
          }
        })
      }
    } else {
      var sql = "insert into zcx_cart values(null,?,?,?,?,?,0);"
      pool.query(sql, [count, feature, totalprice, p_id, u_id], (err, result) => {
        if (err) {
          next(err);
          return;
        }
        if (result.affectedRows > 0) {
          res.send({
            code: 200,
            msg: "添加成功"
          })
        } else {
          res.send({
            code: 201,
            msg: "添加失败"
          })
        }
      })
    }
  })
})
// 移除购物车
router.post('/removecart',(req,res,next)=>{
  var obj = req.body;
  var c_id = obj.c_id;
  var sql='update zcx_cart set c_flag=1 where c_id=?'
  pool.query(sql,[c_id],(err,result)=>{
    if (err) {
      next(err);
      return;
    }
    if (result.affectedRows > 0) {
      res.send({
        code:200,
        msg:'删除成功'
      })
    }else{
      res.send({
        code:201,
        mag:'删除失败'
      })
    }
  })
})
// 更新购物车
router.post('/updatecart',(req,res,next)=>{
  var obj = req.body;
  var c_id = obj.c_id;
  var count=obj.count;
  var totalprice=obj.totalprice;
  var sql='update zcx_cart set count=?,totalprice=? where c_id=?'
  console.log(obj);
  pool.query(sql,[count,totalprice,c_id],(err,result)=>{
    if (err) {
      next(err);
      return;
    }
    if (result.affectedRows > 0) {
      res.send({
        code:200,
        msg:'更新成功'
      })
    }else{
      res.send({
        code:201,
        mag:'更新失败'
      })
    }
  })
})
module.exports = router;