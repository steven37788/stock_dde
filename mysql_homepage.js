var async = require('async');
var logger = require('./applog').logger;

var titleNumber = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18);
var type = new Array(0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
var titleText  = new Array("股票代码","最新价","涨跌幅","换手率(%)","量比","BBD(万)","成交量","通吃率","DDX","DDY","DDZ","10日DDX","10日DDY","连续","特大单差","大单差","中单差","小单差","单数比");

exports.insertDataBase_homepage = function (data, ddx_update) {

    async.series([
        function(){
            var count = 0;
            async.whilst(
                function () {return count < data.length; },
                function (callback) {

                    var sql = makeSql(data[count], ddx_update);

                    //logger.info(sql);

                    var options = {
                        'sql': sql,
                        'args': ''
                    }

                    execQuery_homepage(options, cb);

                    function cb (error) {
                        logger.info('DB-获取数据库连接异常！');
                        throw error;
                    }

                    count ++;

                    setTimeout(callback, 1000);
                },
                function(err, results){
                    logger.info("dealHomepage end");
                }
            )
        },
        function(){
            logger.info("insertDataBase_homepage end");
        }
    ]);
}

function makeSql(data, ddx_update) {
    var sql;
    for (var i in data) {
        if(i != 0) {
            sql += "'" + data[i] + "'";
        }
        else
        {
            sql = "null," + data[i];
        }


        sql += ',';
    }

    sql += "'" + ddx_update + "'";

    var insertsql = 'insert into t_dde values ' + '(' + sql + ')';

    //logger.info(insertsql);

    return insertsql;
}

/**
 * 数据库模块
 */
var options = {
    host: 'localhost',
    user: 'root',
    password: 'Derman',
    database: 'nodejs',
    port: 3306
};

var mysql = require('mysql');
var pool = mysql.createPool(options);

///**
// * 释放数据库连接
// */
//exports.release = function(connection) {
//	connection.end(function(error) {
//		logger.info('Connection closed');
//	});
//};

/**
 * 执行查询
 */


function execQuery_homepage(options, cb) {

    pool.getConnection(function(error, connection) {
        if (error == null) {
            // 查询参数
            var sql = options['sql'];
            var args = options['args'];
            var handler = options['handler'];

            // 执行查询
            var query = connection.query(sql, function (err, results) {

                if (err) {
                    logger.info('DB-执行查询语句异常！');
                    logger.info(err.message);
                }
                else {
                    //logger.info(results);
                }

                // 返回连接池
                connection.release(function (e) {
                    if (e) {
                        logger.info('DB-关闭数据库连接异常！');
                        logger.info(e.message);
                        //throw error;
                    }
                });
            });
        }
        else {
            cb(error);
        }
    });
};