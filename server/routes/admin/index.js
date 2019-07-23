module.exports = app =>{
    const express = require('express')
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
    app.use('/admin/api/rest/:resource', async (req,res,next)=>{
        //把参数转换成 类名格式
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    },router)

    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads'})
    app.post('/admin/api/upload', upload.single('file'), async (req,res)=>{
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/login', async (req, res) => {
        const { username,password } = req.body;
        //1.根据用户名找用户
        const AdminUser = require('../../models/AdminUser');
        const user = await AdminUser.findOne({username}).select('+password');
        console.log(user);
        if(!user){
            return res.status(422).send({
                message: '用户名不存在'
            })
        }
        //2.校验密码
        var isValid = require('bcryptjs').compareSync(password,user.password);
        if(!isValid){
            return res.status(422).send({
                message: '密码错误'
            })
        } 
        //3.返回token
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({id: user._id}, app.get('secret'))
        res.send({
            'token':token,
            'username': user.username
        })
    })
}