// 引入mysql模块
const mysql = require('mysql')
const pool = mysql.createPool({
  host:'127.0.0.1',
  port:'3306',
  user:'root',
  password:'1234',
  database:'shuuemura',
  // 连接池可创建的最大连接数
  connectionLimit:15
});
module.exports = pool;