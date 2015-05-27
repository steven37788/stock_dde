var async = require('async');

var myUtil = require('./dde.js');
//$ = require('jQuery');

var qurl = "http://www.dingniugu.com/ddxdata20140919/ddedata.php?";

var index_url = qurl + 'pid=8&order=-1'+ "&rand=" + Math.round(Math.random() * 10000);
var index_url1 = qurl + 'pid=50&order=-1'+ "&rand=" + Math.round(Math.random() * 10000);

var arrStr = new Array();
var arrFunc = new Array();

var foo = function(index, results){
    // results is now equal to index_url;
    //console.log(results);
    console.log(index);

    // 调用方法
    myUtil.sleep(1000, function() {
        // executes after one second, and blocks the thread
        myUtil.load(index_url, function (err, data) {
            if (err)
                console.log(err);
        });
    });
};

for(var i=0; i < 30; i++)
{
    // 调用方法
    var index_url = qurl + 'pid=' + i.toString() + '&order=-1'+ "&rand=" + Math.round(Math.random() * 10000);

    arrStr.push(index_url); //only for print


    foo(i, index_url);
}

console.log(arrStr);

console.log('application end');


