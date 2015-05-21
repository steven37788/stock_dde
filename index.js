var myUtil = require('./dde.js');
//$ = require('jQuery');

var qurl = "http://www.dingniugu.com/ddxdata20140919/ddedata.php?";
var index_url = qurl + 'pid=8&order=-1'+ "&rand=" + Math.round(Math.random() * 10000);

var myData = function () {};

myData.execute = function ()
{
    // 调用方法
    console.log(index_url);

    myUtil.load(index_url, function (err, data) {
        if (err)
            throw err;
    });
};

myData.execute ();
module.exports = new myData();


