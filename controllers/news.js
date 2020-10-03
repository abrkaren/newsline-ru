const News = require('../models/News')

const errorHandler = require('../utils/errorHandler')
const fs = require('fs');

module.exports.createNews = async (req, res) => {
    
    let data = await req.body;
    var today = new Date();
    today.setHours(today.getHours());
    data.created = today;
    data.updated = today;
    
    const news = await new News(data)
    try {
        await news.save();
        res.status(201).json(news);
    } catch (e) {
        console.log(e)
        errorHandler(res, e);
    }

}

module.exports.getNews = async function (req, res) {
    try {
        const news = await News.find();
        res.status(200).json(news)
    } catch (e) {
        errorHandler(res, e)
    }

}

module.exports.removeNews = async function (req, res) {
    try {
        await News.remove({_id: req.params.id})
        res.status(200).json({
            message: 'News removed...'
        })
    } catch (e) {
        errorHandler(res, e)
    }

}

module.exports.getNewsById = async function(req, res) {
    try {

        const news = await News.findById(req.params.id)

        const toObjectData = news.toObject(); // chem Uxarkum Im Uzac Fieldern Front
        delete toObjectData.rePassword;

        res.status(200).json(toObjectData)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.updateNews = async function (req, res) {
    
    let data = await req.body
    console.log(data)

    News.findOneAndUpdate({_id: req.params.id}, data, {new: true}, function (err, user) {
        if (err)
            res.send(err);
        res.json(data);
    });
}
