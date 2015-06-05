//var async = require('async');

var myUtil = require('./dde.js');
var logger = require('./applog').logger;
var mysql = require('./mysql.js');

var rooturl = "http://www.dingniugu.com";
var qurl = "http://www.dingniugu.com/ddxdata/ddedata.php?";


var index_url = qurl + 'pid=8&order=-1'+ "&rand=" + Math.round(Math.random() * 10000);
var index_url1 = qurl + 'pid=50&order=-1'+ "&rand=" + Math.round(Math.random() * 10000);

var arrStr = new Array();
var arrFunc = new Array();

var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}

var data = '';
function getData() {
    return data;
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

    logger.info('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
}

function sortData(myArray) {

    sortByNumber(8, -1, 1, myArray);

    data =  myArray;
}

var dealData1 = function(myArray, ddx_update) {

    if(typeof myArray=="undefined"){
        logger.info('eval 未起效。');
        logger.info(body);

        return false;
    } else {

        //logger.info(myArray);
        logger.info("*****************\n");

        if(typeof ddx_update=="undefined"){
            logger.info('ddx_update 没有数值，请检查。');
            return false;
        }

        sortData(myArray);

        var data = getData ();
        //logger.info(data);
        mysql.insertDataBase(data, ddx_update);

        logger.info("MyUtil.loadHomePage end\n");
    }
}

function getHomePageData () {
    for (var i = 0; i < 6; i++) {
        var index_url = qurl + 'pid=' + i.toString() + '&order=-1&rand=' + Math.round(Math.random() * 10000);

        arrStr.push(index_url); //only for print

        logger.info(i.toString());
        //getData(i, index_url);

        myUtil.sleep(1000, function() {
            // executes after one second, and blocks the thread
            myUtil.loadHomePage(index_url, dealData1);
        });
    }
}

getHomePageData ();
//
logger.info(arrStr);
//
logger.info('application end');

function getStockCode () {
    var stock_url = rooturl + '/newdata/stockcode.js';

    myUtil.loadHomePage(stock_url, function (err, data) {
        if (err)
            logger.info(err);
    });
}


