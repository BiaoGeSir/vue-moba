const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    name: {   //名称
        type: String
    },
    avatar: {  //头像
        type: String
    },
    title: {   //称号
        type: String
    },
    categories: [   //关联
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Category'
        }
    ],
    scores: {    //生存分数
        difficult: {
            type: Number
        },
        skills: {
            type: Number
        },
        attack: {
            type: Number
        },
        survive: {
            type: Number
        },
    },
    skills: [   //技能
        {
            icon: {type: String},
            name: {type: String},
            description: {type: String},
            tips: {type: String}
        }
    ],
    items1: [       //顺风出装
        {
            type: mongoose.SchemaTypes.ObjectId,
            rel: 'Item'
        }
    ],
    items2: [       //逆风出装
        {
            type: mongoose.SchemaTypes.ObjectId,
            rel: 'Item'
        }
    ],
    usageTips: {type: String},       //使用技巧      
    battleTips: {type: String},      //对抗技巧
    teamTips: {type: String},        //团战思路
    partners: [                      //英雄关系
        {
            hero: {
                type: mongoose.SchemaTypes.ObjectId,
                rel: 'Hero'
            },
            description: {
                type: String
            }
        }
    ]
})

module.exports = mongoose.model('Hero',schema)