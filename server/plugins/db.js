module.exports = app =>{
    const mongoose = require('mongoose')
    //ip地址
    const ip = '192.168.100.127';
    //端口号
    const port = '27017';
    //数据库名称
    const dbName = 'node-vue-moba';
    mongoose.connect('mongodb://'+ip+':'+port+'/'+dbName,{
        useNewUrlParser: true
    })

    //引用指定文件夹下的所有model模型
    require('require-all')(__dirname + '/../models');
}