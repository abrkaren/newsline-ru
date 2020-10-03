const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createdByUserName: {
        type: String,
        required: true
    },
    jobTimeDiffCalc:{
        type: String
    },
    created: {
        type: Date
    },
    updated: {
        type: Date
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('news', newsSchema)
