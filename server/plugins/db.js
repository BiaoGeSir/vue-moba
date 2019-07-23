module.exports = app =>{
    const mongoose = require('mongoose')
    //ip地址
    const ip = '127.0.0.1';
    //端口号
    const port = '27017';
    //数据库名称
    const dbName = 'node-vue-moba';
    mongoose.connect('mongodb://'+ip+':'+port+'/'+dbName,{
        useNewUrlParser: true
    })
}