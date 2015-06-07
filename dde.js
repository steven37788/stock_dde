//var request = require('request');
var rp = require('request-promise');
var Iconv = require('iconv-lite');
var cheerio = require('cheerio');
var logger = require('./applog').logger;


var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
};


function MyUtil() {
    this.sleep = function (time, callback) {
        var stop = new Date().getTime();
        while (new Date().getTime() < stop + time) {
            ;
        }
        callback();
    },

    this.loadRequest = function (url, cb, type, stockcode) {

        function handleError ()
        {
            logger.info("发生服务器错误500");
            // 处理error
        }

        function process(body)
        {
            var newbody = Iconv.decode(body, 'gb2312').toString();
            logger.info(newbody);

            try {
                eval(newbody);
            }
            catch (exception) {
                logger.info("eval exception");
                logger.info(exception);
            }

            if (typeof cb === 'function' && type == 'dealHomepage') {
                cb(myArray, ddx_update, null);
            }
            else if (typeof cb == 'function' && type == 'dealStockArray') {
                cb(stockCodeArray, RecordCount, null);
            }
            else if (typeof cb == 'function' && type == 'dealStockData') {
                cb(data, area, stockcode);
            }

            else {
                logger.info("something is wrong in callback");
            }
        }

        rp(
            {
                encoding: null,
                url: url,
                headers: headers
            }
        ).then(process, handleError);
    }
}

module.exports = new MyUtil();









