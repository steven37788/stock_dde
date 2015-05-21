CREATE TABLE t_dde(
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
time        TIMESTAMP NULL DEFAULT now()
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE UNIQUE INDEX t_IDX_0 on t_dde(price);
