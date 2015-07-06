var log4js = require('log4js');

log4js.configure({
    appenders: [
        {
            type: 'console',
            category: "console"
        }, //控制台输出
        {
            type: "dateFile",
            filename: 'logs/',
            pattern: "debug_yyyy-MM-dd",
            alwaysIncludePattern: true,
            category: 'dateFileLog',
            backups: 14,
            encoding: 'gb2312'
        }//日期文件格式
    ],
    replaceConsole: true,   //替换console.log
    levels:{
        dateFileLog: 'INFO'
    }
});

//var dateFileLog = log4js.getLogger('dateFileLog'); //输出到日期文件Log
var dateFileLog = log4js.getLogger('console'); //输出到console

exports.logger = dateFileLog;

exports.use = function(app) {
    //页面请求日志,用auto的话,默认级别是WARN
    //app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));
    app.use(log4js.connectLogger(dateFileLog, {level:'debug', format:':method :url'}));
}