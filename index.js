var async = require('async');
var util = require('util');

var myUtil = require('./dde.js');
var logger = require('./applog').logger;
var mysql_homepage = require('./mysql_homepage.js');
var mysql_dde = require('./mysql_dde.js');

var rooturl = "http://www.dingniugu.com";
var qurl = "http://www.dingniugu.com/ddxdata/ddedata.php?";


var index_url = qurl + 'pid=8&order=-1'+ "&rand=" + Math.round(Math.random() * 10000);
var index_url1 = qurl + 'pid=50&order=-1'+ "&rand=" + Math.round(Math.random() * 10000);

var arrHomePageIndexURLStr = new Array();
var arrFunc = new Array();

var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}

function sortByNumber(n,s,p, myArray)
{
    if(typeof myArray=="undefined"){
        logger.info('eval 未起效。 请检查js文件。');
        return false;
    }

    myArray.sort(function sortFun(x, y){
            return s*(parseFloat(x[n])-parseFloat(y[n]));
        }
    );
}

var dealHomepage = function(myArray, ddx_update) {

    if(typeof myArray=="undefined"){
        logger.info('eval 未起效。');

        return false;
    } else {

        async.series([
            function(callback) {
                logger.info("dealHomepage start");

                if(typeof ddx_update=="undefined"){
                    logger.info('ddx_update 没有数值，请检查。');
                    return false;
                }

                sortByNumber(8, -1, 1, myArray);

                callback(null, 'one');

            },
            function(callback) {
                mysql_homepage.insertDataBase_homepage(myArray, ddx_update);

                setTimeout(function(){
                    callback(null, 'two');
                }, 100)
            }
        ],

        function(err, results) {

        });
    }
}

function getHomePageData () {
    var count = 0;
    async.whilst (
        function () { return count < 30; },
        function (callback) {

            logger.info(">---- begin request data in Page number is = " + count.toString());

            var index_url = qurl + 'pid=' + count.toString() + '&order=-1&rand=' + Math.round(Math.random() * 10000);
            logger.info(index_url);
            arrHomePageIndexURLStr.push(index_url); //only for print

            myUtil.loadRequest(index_url, dealHomepage, 'dealHomepage');

            count++;
            setTimeout(callback, 1000);
        },
        function (err) {
            logger.info("request homepage data end");
        }
    );
}

function getBase64Code(stockcode) {
    var b = new Buffer(stockcode);
    var s = b.toString('base64');
    return s;
}

function getUrlFromCode(stockcode) {
    var url = "";
    var urlbase = "YcaWN0aW9uPWRhdGEmc3RvY2tjb2RlPV";
    var section = stockcode.substring(0, 3);
    if (section == "600" || section == "601" || section == "603") {
        url = urlbase + "NI";
        url += getBase64Code(stockcode).substring(0, 2);
        url += "Atc";
        url += getBase64Code(stockcode).substring(2, 8)
    }
    else if (section == "000" || section == "200") {
        url = urlbase + "Na";
        url += getBase64Code(stockcode).substring(0, 2);
        url += "Atc";
        url += getBase64Code(stockcode).substring(2, 8);

    }
    else if (section == "300") {
        url = urlbase + "Na";
        url += getBase64Code(stockcode).substring(0, 2);
        url += "Atc";
        url += getBase64Code(stockcode).substring(2, 8);
    }
    else {
        var info = util.format("有异常情况，股票代码为%s", stockcode);
        logger.info(info);
    }

    return url;
}



function getStockCode () {
    var stock_url = rooturl + '/newdata/stockcode.js';

    myUtil.loadRequest(stock_url, dealStockArray, 'dealStockArray');
}

var dealStockArray = function(stockCodeArray, RecordCount) {

    if(typeof stockCodeArray =="undefined"){
        logger.info('eval 未起效。');

        return false;
    } else {

        logger.info("dealStock Array start ---->");

        //logger.info(stockCodeArray);
        logger.info("today stock total number is " + RecordCount + "\n");

        var i = 0;
        async.whilst(
            function () { return i < RecordCount; },
            //function () { return i < 1; },
            function (callback) {
                var keyvaluepair = stockCodeArray[i];

                logger.info("typeof keyvaluepair is " + typeof(keyvaluepair))

                var stockcode = keyvaluepair[0];

                logger.info("股票数据循环开始，分析股票代码为" + stockcode);


                //var stockcode = "600035"; 以一个股票进行测试，一般要有120条数据入库

                logger.info("stockcode is " + stockcode);

                var stockurl = "";
                async.series([
                        function (callback) {
                            logger.info("getStockData stock is " + stockcode);
                            var url = rooturl;
                            var encodeurl = getUrlFromCode(stockcode);
                            logger.info(encodeurl);

                            var section = stockcode.substring(0, 3);

                            url += "/ddedata/gegu_ddedata.php?stockcode=";
                            url += encodeurl;
                            url += "&u=&code="
                            url += stockcode;
                            url += "&text=";

                            if (section == "600" || section == "601" || section == "603") {

                                url += "SH";
                            }
                            else if (section == "000" || section == "200") {

                                url += "SZ";

                            }
                            else if (section == "300") {
                                url += "SZ";
                            }
                            else {
                                var info = util.format("有异常情况，股票代码为%s", stockcode);
                                logger.info(info);
                            }

                            stockurl = url;

                            logger.info('编码股票url结束! 股票url为' + stockurl);

                            callback(null, null);
                        },

                        function (callback) {

                            myUtil.loadRequest(stockurl, dealStockData, 'dealStockData', stockcode);

                            callback(null, null);
                        }
                    ],
                    function (err, result) {
                        if (err) {
                            logger.info('处理错误! 股票代码为' + stockcode);
                        }
                        else {
                            logger.info('处理成功! 股票代码为' + stockcode + "\n");
                        }
                    }
                );

                logger.info("股票数据循环结束，分析股票代码为" + stockcode);

                i++;

                setTimeout(callback, 1000);
            },
            function (err, result) {
                if(err) {
                    logger.info(err);
                }
                else {
                    loginfo = "getStockData end stockCodeArray [indexcode] is " + i.toString();
                    logger.info(loginfo);
                }
            }
        );
    }
}

var dealStockData = function(data, stockcode) {

    if(typeof data=="undefined"){
        logger.info('eval 未起效。');

        return false;
    } else {

        logger.info("<< -- dealStock Data start stockcode is " + stockcode);

        //logger.info(data);
        //logger.info(area);

        mysql_dde.insertDataBase_dayData(data, stockcode);

        logger.info("dealStock Data end stockcode is " + stockcode + " -- >>\n");
    }
}


//取首页数据，一共发送30个首页的派生的URL, 每一页包含的每一行代表一个股票每日多次更新的最后数据，我们一般只要在收盘后更新一次入库就可以了。
getHomePageData ();

//按照股票的列表，依次取股票的120天来，每个开盘日的数据。Daydata。
getStockCode();


