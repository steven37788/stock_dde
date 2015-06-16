-- "开盘价","收盘价","最高价","最低价","涨幅","成交量","通吃率","股票代码","日期","大单动向(ddx)","涨跌动因(ddy)",
-- "单数比，卖出单数／买入单数","小单差","小单流入金额","中单差","中单流入金额","大单差","大单流入金额","特大单差","特大单流入金额"

CREATE DATABASE IF NOT EXISTS nodejs CHARACTER SET UTF8;
USE nodejs;
SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `t_daydata`;

CREATE TABLE `t_daydata`(
openingprice       float(8,2) NOT NULL ,
closingprice       float(8,2) NOT NULL ,
highestprice       float(8,2) NOT NULL ,
floorPrice         float(8,2) NOT NULL ,
increase           float(8,2) NOT NULL ,
volume             float(8,2) NOT NULL ,
takeRate           float(8,2) NOT NULL ,
bbd                float(8,2) NOT NULL ,
ddx                float(8,2) NOT NULL ,
ddy                float(8,2) NOT NULL ,
listRate           float(8,2) NOT NULL ,
sListDiff          float(8,2) NOT NULL ,
sInflow            float(8,2) NOT NULL ,
mListDiff          float(8,2) NOT NULL ,
mInflow            float(8,2) NOT NULL ,
xListDiff          float(8,2) NOT NULL ,
xInflow            float(8,2) NOT NULL ,
xxListDiff         float(8,2) NOT NULL ,
xxInflow           float(8,2) NOT NULL ,
stockcode          VARCHAR(16) NOT NULL ,
updatedate         DATE NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='DDE指标日线表';
CREATE UNIQUE INDEX t_IDX_0 on t_daydata(updatedate);