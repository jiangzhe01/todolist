/**
 * 数据库操作
 */

var mysql = require('mysql');
var config = require('config-lite')(__dirname)

exports.handleBase = function(sql, data, callback)  {
   var connection = mysql.createConnection({
       host: config.mysql.host,
       user: config.mysql.user,
       password: config.mysql.password,
       database: config.mysql.database
   })
   connection.connect();
   connection.query(sql, data, function(error, result, fields) {
      if(error)   return;
      callback(result)
   })
   
}
