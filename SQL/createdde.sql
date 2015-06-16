-- "股票代码","最新价","涨跌幅","换手率(%)","量比","BBD(万)","成交量","通吃率","DDX","DDY","DDZ","10日DDX","10日DDY","连续","特大单差","大单差","中单差","小单差","单数比"
CREATE DATABASE IF NOT EXISTS nodejs CHARACTER SET UTF8;
USE nodejs;
SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `t_dde`;

CREATE TABLE `t_dde`(
id INT PRIMARY KEY AUTO_INCREMENT,
stockcode   VARCHAR(16) NOT NULL ,
price       float(8,2) NOT NULL ,
margin      float(8,2) NOT NULL ,
turnover    float(8,2) NOT NULL ,
ratio       float(8,2) NOT NULL ,
BBD         float(8,2) NOT NULL ,
volume      int NOT NULL ,
sweepdeck   float(8,2) NOT NULL ,
DDX         float(8,2) NOT NULL ,
DDY         float(8,2) NOT NULL ,
DDZ         float(8,2) NOT NULL ,
tenDDX      float(8,2) NOT NULL ,
tenDDY      float(8,2) NOT NULL ,
continues   float(8,2) NOT NULL ,
largediff   float(8,2) NOT NULL ,
bigdiff     float(8,2) NOT NULL ,
middlediff  float(8,2) NOT NULL ,
smalldiff   float(8,2) NOT NULL ,
sheetrate   float(8,2) NOT NULL ,
updatetime  TIMESTAMP NULL DEFAULT now()
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='主页上的实时刷新表';
CREATE UNIQUE INDEX t_IDX_0 on t_dde(stockcode,price,updatetime);
