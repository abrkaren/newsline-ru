const express = require('express')
const controller = require('../controllers/news')
const router = express.Router()

router.post('/', controller.createNews);
router.get('/', controller.getNews);
router.delete('/:id',  controller.removeNews);
router.get('/getNewsById/:id', controller.getNewsById)
router.put('/:id', controller.updateNews)

module.exports = router