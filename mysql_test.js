var logger = require('./applog').logger;
var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    database:'nodejs',
    port: 3306
});
conn.connect();

var insertSQL = 'insert into t_user(name) values("conan"),("fens.me")';
var selectSQL = 'select * from t_user limit 10';
var deleteSQL = 'delete from t_user';
var updateSQL = 'update t_user set name="conan update"  where name="conan"';

//delete
conn.query(deleteSQL, function (err0, res0) {
    if (err0) logger.info(err0);
    logger.info("DELETE Return ==> ");
    logger.info(res0);

    //insert
    conn.query(insertSQL, function (err1, res1) {
        if (err1) logger.info(err1);
        logger.info("INSERT Return ==> ");
        logger.info(res1);

        //query
        conn.query(selectSQL, function (err2, rows) {
            if (err2) logger.info(err2);

            logger.info("SELECT ==> ");
            for (var i in rows) {
                logger.info(rows[i]);
            }

            //update
            conn.query(updateSQL, function (err3, res3) {
                if (err3) logger.info(err3);
                logger.info("UPDATE Return ==> ");
                logger.info(res3);

                //query
                conn.query(selectSQL, function (err4, rows2) {
                    if (err4) logger.info(err4);

                    logger.info("SELECT ==> ");
                    for (var i in rows2) {
                        logger.info(rows2[i]);
                    }
                });
            });
        });
    });
});

//conn.end();
