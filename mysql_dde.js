var logger = require('./applog').logger;
var mysql = require('mysql');
var math = require('mathjs');

//var titleNumber = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18);
//var type = new Array(0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
//var titleText  = new Array("股票代码","最新价","涨跌幅","换手率(%)","量比","BBD(万)","成交量","通吃率","DDX","DDY","DDZ","10日DDX","10日DDY","连续","特大单差","大单差","中单差","小单差","单数比");

exports.insertDataBase_dde = function (data, area, stockcode) {

    var openingPrices = data[16]; //开盘价
    var closeingPrices = data[0]; //收盘价
    var highestPrices = data[17]; //最高价
    var floorPrices = data[18]; //最低价
    var increases = data[9]; //涨幅
    var volumes = data[1]; //成交量
    var takeRates = data[19]; //通吃率
    var bbds = data[2]; //BBD(万元)
    var ddxs = data[10]; //大单动向(ddx)
    var ddys = data[3]; //涨跌动因(ddy)
    var listRates = data[4]; //单数比，卖出单数／买入单数

    var sListDiffs = data[5]; //小单差（越小越好）
    var sInflows = multiply(data[1], data[5]);//小单流入金额
    sInflows = multiply_num(sInflows, 0.01);

    var mListDiffs = data[6]; //中单差
    var mInflows = multiply(data[1], data[6]); //中单流入金额
    mInflows = multiply_num(mInflows, 0.01);

    var xListDiffs = data[7]; //大单差
    var xInflows = multiply(data[1], data[7]); //大单流入金额
    xInflows = multiply_num(xInflows, 0.01);

    var xxListDiffs = data[8]; //特大单差
    var xxInflows = multiply(data[1], data[8]); //特大单流入金额
    xxInflows = multiply_num(xxInflows, 0.01);

    store_t_dayData(openingPrices, closeingPrices, highestPrices, floorPrices, increases, volumes, takeRates, bbds,
    ddxs, ddys, listRates, sListDiffs, sInflows, mListDiffs, mInflows, xListDiffs, xInflows, xxListDiffs, xxInflows,
        stockcode, data);
};

function multiply(a, b){
    if(a.length != b.length) {
        console.log("a的长度"+ a.length + "!=" + "b的长度" + b.length);
        return;
    }
    var arrC = [];
    for (var i = 0; i < a.length; i++) {
       arrC[i] = a[i] * b[i];
    }
    return arrC;
}

function multiply_num(a, num){
    var arrC = [];
    for (var i = 0; i < a.length; i++) {
        arrC[i] = a[i] * num;
    }
    return arrC;
}

function ForNum(srcStr,nAfterDot){
    var srcStr,nAfterDot,i,j,dotPos,strLen;
    var resultStr,nTen;
    srcStr = ""+srcStr+"";
    strLen = srcStr.length;
    dotPos = srcStr.indexOf(".",0);
    if (dotPos == -1){
        resultStr = srcStr+".";
        for (i=0;i<nAfterDot;i++){
            resultStr = resultStr+"0";
        }
        return resultStr;
    } else{
        if ((strLen - dotPos - 1) >= nAfterDot){
            nAfter = dotPos + nAfterDot + 1;
            nTen =1;
            for(j=0;j<nAfterDot;j++){
                nTen = nTen*10;
            }
            resultStr = Math.round(parseFloat(srcStr)*nTen)/nTen;
            return resultStr;
        } else{
            resultStr = srcStr;
            for (i=0;i<(nAfterDot - strLen + dotPos + 1);i++){
                resultStr = resultStr+"0";
            }
            return resultStr;
        }
    }
}

function store_t_dayData (openingPrices, closeingPrices, highestPrices, floorPrices, increases, volumes, takeRates,
    bbds, ddxs, ddys, listRates, sListDiffs, sInflows, mListDiffs, mInflows, xListDiffs, xInflows,
                          xxListDiffs, xxInflows, stockcode, data) {

    var volumeSql = 'INSERT INTO t_daydata VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

    logger.info("开盘价包含的天数为" + openingPrices.length);
    logger.info("收盘价包含的天数为" + closeingPrices.length);
    logger.info("最高价包含的天数为" + highestPrices.length);
    logger.info("最低价包含的天数为" + floorPrices.length);
    logger.info("涨幅包含的天数为" + increases.length);
    logger.info("成交量包含的天数为" + volumes.length);
    logger.info("通吃率包含的天数为" + takeRates.length);
    logger.info("BBD包含的天数为" + bbds.length);
    logger.info("DDX包含的天数为" + ddxs.length);
    logger.info("DDY包含的天数为" + ddys.length);
    logger.info("单数比包含的天数为" + listRates.length);
    logger.info("小单差包含的天数为" + sListDiffs.length);
    logger.info("小单流入金额包含的天数为" + sInflows[0].length);
    logger.info("中单差包含的天数为" + mListDiffs.length);
    logger.info("中单流入金额包含的天数为" + mInflows.length);
    logger.info("大单差包含的天数为" + xListDiffs.length);
    logger.info("大单流入金额包含的天数为" + xInflows.length);
    logger.info("特大单差包含的天数为" + xxListDiffs.length);
    logger.info("特大单流入金额包含的天数为" + xxInflows.length);


    for(var i=0; i< volumes.length; i++) {

        //日期
        var date = data[15][i];

        var openingPrice = openingPrices[i];

        var closeingPrice = closeingPrices[i];

        var highestPrice = highestPrices[i];

        var floorPrice = floorPrices[i];

        var increase = increases[i];

        var volume = volumes[i];

        var takeRate = takeRates[i];

        var bbd = bbds[i];

        var ddx = ddxs[i];

        var ddy = ddys[i];

        var listRate = listRates[i];

        var sListDiff = sListDiffs[i];

        var sInflow = sInflows[i];

        var mListDiff = mListDiffs[i];

        var mInflow = mInflows[i];

        var xListDiff = xListDiffs[i];

        var xInflow = xInflows[i];

        var xxListDiff = xxListDiffs[i];

        var xxInflow = xxInflows[i];

        var volumeSqlParams = [openingPrice, closeingPrice, highestPrice, floorPrice, increase, volume, takeRate,
            bbd, ddx, ddy, listRate, sListDiff, sInflow, mListDiff, mInflow, xListDiff, xInflow, xxListDiff, xxInflow,
            stockcode, date];

        var options = {
            'sql': volumeSql,
            'args': volumeSqlParams
        }

        logger.info(volumeSqlParams);

        execQuery(options);
    }
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

        // 执行查询
        //var query = connection.query(sql, function(error, results) {
        var query = connection.query(sql, args, function(error, results) {

            if (error != null) {
                logger.info('DB-执行查询语句异常！');
                logger.info(error.message);
            }
            else {
                //logger.info(results);
            }

            // 返回连接池
            connection.release(function(error) {
                if(error) {
                    logger.info('DB-关闭数据库连接异常！');
                    logger.info(error.message);
                    //throw error;
                }
            });
        });

        //logger.info(query.sql);
    });
};

//function getLastDay(dd,dadd)
//{
//    var a = new Date(dd);
//    a = a.valueOf();
//    a = a - dadd * 1000 * 60 * 60 * 24;
//    a = new Date(a);
//    logger.info(a.getFullYear() + "年" + (a.getMonth() + 1) + "月" + a.getDate() + "日");
//
//    return a;
//}

