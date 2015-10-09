# stock_dde

本项目平台为Linux或者MacOS, 需要安装mysql, nodejs.  

安装mysql:（以Ubuntu为例）  
sudo apt-get install mysql-server  
（数据库密码在脚本中找和做相应修改）  

启动mysql:    
sudo /etc/init.d/mysql start    

连接mysql:  
mysql -u root -p  

运行脚本初始化数据库:  
mysql>source /Pathto/SQL/createDayData.sql  
mysql>source /Pathto/SQL/createdde.sql  

安装nodejs  
sudo apt-get install nodejs  

安装npm  
sudo apt-get install npm  

需要建立软链接后，才能执行nodejs  
sudo ln -s /usr/bin/nodejs /usr/bin/node  

测试环境  
node -v  
npm -v  

使用npm，安装需要的npm组件。  
npm install request-promise  
npm install iconv-lite  
npm install cheerio  
npm install log4js  
npm install mysql  
npm install mathjs  

有点小问题，需要  
mkdir logs  

执行程序，开始收集数据  
node index.js






