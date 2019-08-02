module.exports = app =>{
  const router = require('express').Router();
  const Category = require('../../models/Category')
  const Article = require('../../models/Article')
  router.get('/news/init',async (req,res)=>{
    res.send({
      message:"web接口返回成功"
    })
  })

  //获取新闻资讯的文章数据
  router.get('/news/list', async (req,res)=>{
    const parent = await Category.findOne({
      name:'新闻分类'
    })
    // 管道
    const cats = await Category.aggregate([
      // 通过id过滤数据
      {$match:{parent:parent._id}},
      // 关联查询
      {
        $lookup:{
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      // 只要5条数据
      {
        $addFields:{
          newsList: {$slice:['$newsList',5]}
        }
      }
    ])
    const subCats = cats.map(v => v._id);
    cats.unshift({
      name:'热门',
      newsList:await Article.find().where({
        categories: {$in: subCats}
      }).populate('categories').limit(5).lean()
    })

    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = cat.name === '热门'? news.categories[0].name : cat.name;
        return news;
      })
    })

    res.send(cats)
  })

  app.use('/web/api',router)
}