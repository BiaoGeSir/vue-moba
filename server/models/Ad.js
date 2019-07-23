const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    name: {   //名称
        type: String
    },
    items:[
        {
            image:{
                type:String
            },
            url:{
                type:String
            }
        }
    ]
})

module.exports = mongoose.model('Ad',schema)