// redis.js
var titleNumber = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18);
var type = new Array(0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
var titleText  = new Array("股票代码","最新价","涨跌幅","换手率(%)","量比","BBD(万)","成交量","通吃率","DDX","DDY","DDZ","10日DDX","10日DDY","连续","特大单差","大单差","中单差","小单差","单数比");


var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs',
    port: 3306
});
conn.connect();

exports.insertDataBase = function (data, ddx_update) {

    for(var i in data) {

        var sql = makeSql(data[i], ddx_update);

        //console.log(sql);
        execsql(sql);
    }
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

    console.log(insertsql);

    return insertsql;
}

function execsql(insertSQL) {
    //insert
    conn.query(insertSQL, function (err1, res1) {
        if (err1) console.log(err1);
        console.log("INSERT Return ==> ");
        console.log(res1);
    });
}