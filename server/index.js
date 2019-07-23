const express = require('express')


const app = express()

app.set('secret','qw32e113qwe132')

//允许跨域请求
app.use(require('cors')())
//可以解析请求格式为json的数据
app.use(express.json())
//让uploads静态资源，可以通过/uploads路由来访问
app.use('/uploads',express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, ()=>{
    console.log("http://localhost:3000");
})