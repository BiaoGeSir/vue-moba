module.exports = app =>{
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')
    const router = express.Router({
        mergeParams: true       //合并参数
    })
    
    //创建分类
    router.post('/', async (req,res)=>{
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    //修改分类
    router.put('/:id', async (req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body,{new:true,upsert:true});
        res.send(model)
    })

    //删除分类
    router.delete('/:id', async (req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success: true
        })
    })
    //获取分类数据（每页10条数据）
    router.get('/', async (req,res)=>{
        let quertOptions = {}
        switch(req.Model.modelName){
            case 'Category':
                quertOptions.populate = 'parent'
                break;
        }
        const items = await req.Model.find().populate('parent').limit(10)
        res.send(items)
    })

    //根据id查询对应的详细数据
    router.get('/:id', async (req,res)=>{
        const item = await req.Model.findById(req.params.id);
        res.send(item)
    })


    

    //登录校验中间件
    const authMiddleware = require('../../middleware/auth');

    //模块名
    const resourceMiddleware =  require('../../middleware/resource');

    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads'})
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req,res)=>{
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/login', async (req, res) => {
        const { username,password } = req.body;
        //1.根据用户名找用户
        const user = await AdminUser.findOne({username}).select('+password');
        assert(user, 422, '用户名不存在')
        //2.校验密码
        var isValid = require('bcryptjs').compareSync(password,user.password);
        assert(user, 422, '密码错误')
        //3.返回token
        const token = jwt.sign({id: user._id}, app.get('secret'))
        res.send({
            'token':token,
            'username': user.username
        })
    })

    //错误处理函数
    app.use(async (err, req, res, next)=>{
        res.status(err.statusCode || 500).send({
            message:err.message
        })
    })
}