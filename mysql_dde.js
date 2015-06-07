var logger = require('./applog').logger;

//var titleNumber = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18);
//var type = new Array(0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
//var titleText  = new Array("股票代码","最新价","涨跌幅","换手率(%)","量比","BBD(万)","成交量","通吃率","DDX","DDY","DDZ","10日DDX","10日DDY","连续","特大单差","大单差","中单差","小单差","单数比");

exports.insertDataBase_dde = function (data, area, stockcode) {

    var sql = makeSql(data, area, stockcode);

    logger.info(sql);

    var options = {
        'sql' : sql,
        'args' : ''
    }

    //execQuery(options);
    //
    //logger.info('execQuery end');
}

//function makeSql(data, ddx_update) {
//    var sql;
//    for (var i in data) {
//        if(i != 0) {
//            sql += "'" + data[i] + "'";
//        }
//        else
//        {
//            sql = "null," + data[i];
//        }
//
//
//        sql += ',';
//    }
//
//    sql += "'" + ddx_update + "'";
//
//    //var insertsql = 'insert ignore into t_dde values ' + '(' + sql + ')';
//    var insertsql = 'insert ignore into t_dde values ' + '(' + sql + ')';
//
//    //logger.info(insertsql);
//
//    return insertsql;
//}



function makeSql(data, area, stockcode) {

    var now = new Date();
    var openingPrice = data[16];

    for(var i=0; i< openingPrice.length; i++) {
        var ago = 120 - i;
        logger.info(ago + "天前开盘价为" + openingPrice[i]);

        getLastDay(now, ago);
        logger.info("开盘价为" + openingPrice[i]);
    }

}

/**
 * 数据库模块
 */
var options = {
    host: 'localhost',
    user: 'root',
    password: '',
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
function execQuery(options) {
    pool.getConnection(function(error, connection) {

        if(error) {
            logger.info('DB-获取数据库连接异常！');
            throw error;
        }

        // 查询参数
        var sql = options['sql'];
        var args = options['args'];
        var handler = options['handler'];

        // 执行查询
        var query = connection.query(sql, function(error, results) {

            if (error != null) {
                logger.info(error);
            }
            else {
                logger.info(results);
            }

            if(error) {
                logger.info('DB-执行查询语句异常！');
                logger.info(error);
                //throw error;
            }

            // 返回连接池
            connection.release(function(error) {
                if(error) {
                    logger.info('DB-关闭数据库连接异常！');
                    logger.info(error);
                    //throw error;
                }
            });
        });

        //logger.info(query.sql);
    });
};

function getLastDay(dd,dadd)
{
    var a = new Date(dd);
    a = a.valueOf();
    a = a - dadd * 1000 * 60 * 60 * 24;
    a = new Date(a);
    logger.info(a.getFullYear() + "年" + (a.getMonth() + 1) + "月" + a.getDate() + "日");

    return a;
}

