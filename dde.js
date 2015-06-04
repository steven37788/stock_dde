var request = require('request');
var Iconv = require('iconv-lite');
var cheerio = require('cheerio');
var mysql = require('./mysql.js');
var logger = require('./applog').logger;

//var log = function(str){
//    var time=geddy.date.strftime(new Date(), '%Y.%m.%d %H:%M:%S')
//    logger.info(time+': '+str);
//}

var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}

var data = '';

function MyUtil() {
    this.sleep = function (time, callback) {
        var stop = new Date().getTime();
        while(new Date().getTime() < stop + time) {
            ;
        }
        callback();
    },

    this.load = function (url, cb) {

            request({
                    encoding: null,
                    url: url,
                    headers: headers
            },
            function(error, response, body) {
            if (error) {
                logger.info("发生服务器错误500");
                // 处理error
                if (typeof cb === 'function') {
                    cb(error, null);
                };
            } else {
                var newbody = Iconv.decode(body, 'gb2312').toString();
                logger.info(newbody);

                try {
                    eval(newbody);
                }
                catch (exception) {
                    logger.info("eval exception");
                    logger.info(exception);
                }


                if (typeof cb === 'function') {
                    cb(null, null);
                };
            };


            if(typeof myArray=="undefined"){
                logger.info('eval 未起效。');
                logger.info(body);

                return false;
            } else {

                //logger.info(myArray);
                logger.info("*****************\n");

                if(typeof ddx_update=="undefined"){
                    alert('ddx_update 没有数值，请检查。');
                    return false;
                }

                sortData(myArray);

                var data = getData ();
                //logger.info(data);
                mysql.insertDataBase(data, ddx_update);

                logger.info("MyUtil.load end\n");
            }
        })
    }
}

function getData() {
    return data;
}

function sortByNumber(n,s,p, myArray)
{
    if(typeof myArray=="undefined"){alert('eval 未起效。 请检查js文件。');return false;}

    myArray.sort(function sortFun(x, y){
            return s*(parseFloat(x[n])-parseFloat(y[n]));
        }
    );

    logger.info('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');

    //logger.info(myArray);
}

function sortData(myArray) {

    //logger.info(myArray);


    sortByNumber(8, -1, 1, myArray);

    data =  myArray;

    //logger.info(myArray);
}

module.exports = new MyUtil();









