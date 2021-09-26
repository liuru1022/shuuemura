var express = require('express');
const pool = require('../pool');
var router = express.Router();
//显示商品详情
router.post('/detail',(req,res,next)=>{
  var obj = req.body;
  var id=obj.proid;
  var sql = "select * from zcx_product where product_id=?"
  pool.query(sql,[id],(err,result)=>{
    if (err) {
      next(err);
      return;
    }
    if (result.length>0) {
      res.send({
        code:200,
        msg:"yes",
        result:result
      })
    } else {
      res.send({
        code:201,
        msg:"no"
      })
    }
  })
})
//搜索商品
router.post('/search',(req,res,next)=>{
  var obj = req.body;
  var searchcontent=`%${obj.searchcontent}%`;
  if (obj.paixu=='desc') {
  var sql = "SELECT * from zcx_product,zcx_productsort where zcx_product.productsort_id=zcx_productsort.productsort_id and (onesort LIKE ? or twosort LIKE ? or product_name LIKE ?) order by price desc;"
  }else{
  var sql = "SELECT * from zcx_product,zcx_productsort where zcx_product.productsort_id=zcx_productsort.productsort_id and (onesort LIKE ? or twosort LIKE ? or product_name LIKE ?) order by price asc;"
  }
  pool.query(sql,[searchcontent,searchcontent,searchcontent],(err,result)=>{
    if (err) {
      next(err);
      return;
    }
    if (result.length>0) {
      var prolist=result;
    }
    var sql="SELECT onesort,sortimg from zcx_productsort where onesort LIKE ? or twosort LIKE ?;"
    pool.query(sql,[searchcontent,searchcontent],(err,result)=>{
      if(err){
        next(err);
        return;
      }
      if (result.length>0) {
        var onesort=result[0].onesort;
        var sortimg=result[0].sortimg;
      }
      var sort=`%${onesort}%`
      var sql="SELECT twosort from zcx_productsort where onesort LIKE ?;"
      pool.query(sql,[sort],(err,result)=>{
        if (err) {
          next(err);
          return;
        }
        if(result.length>0){
          res.send({
            code:200,
            prolist,
            onesort,
            sortimg,
            twosort:result
          })
        }else{
          res.send({
            code:201,
            msg:'该产品未上线，搜索其他产品试试吧！♥'
          })
        }
      })
    })
  })
})
module.exports = router;