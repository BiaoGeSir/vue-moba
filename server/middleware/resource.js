module.exports = options => {
    return async (req,res,next)=>{
        //把参数转换成 类名格式
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../models/${modelName}`)
        next()
    }
}