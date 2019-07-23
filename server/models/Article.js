const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    title: {   //标题
        type: String
    },
    body: {    //详情
        type: String
    },
    categories: [   //关联
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Category'
        }
    ]
})

module.exports = mongoose.model('Article',schema)