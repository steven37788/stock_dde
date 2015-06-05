var request = require('request');
var Iconv = require('iconv-lite');
var cheerio = require('cheerio');
var logger = require('./applog').logger;


var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}

function MyUtil() {
    this.sleep = function (time, callback) {
        var stop = new Date().getTime();
        while(new Date().getTime() < stop + time) {
            ;
        }
        callback();
    },

    this.loadHomePage = function (url, dealData1) {

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

                if (typeof dealData1 === 'function') {
                    dealData1(myArray, ddx_update);
                };
            };
        })
    }
}

module.exports = new MyUtil();









