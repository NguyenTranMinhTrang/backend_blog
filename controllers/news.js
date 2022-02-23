const res = require('express/lib/response');
const News = require('../news/news');
const news = new News();
const imageProcess = require('../util/imageProcess');

const createNews = async (req, res) => {
    const news = new News();
    const id = news.createId();
    try {
        const imageName = await imageProcess(req, id);
        news.create(req.body, id, imageName)
        res.json({ success: true, message: 'Post created successfully!' });
    } catch (error) {
        res.json({ success: false, message: 'Something went wrong!' });
    }
}

const getAllNews = async (req, res) => {
    try {
        const data = await news.getAll();
        res.json({ success: true, news: data });
    } catch (error) {
        res.json({ success: false, message: 'Something went wrong!' });

    }
}

const getSingleNews = async (req, res) => {
    try {
        const data = await news.getSingleId(req.params.id);
        if (!data) {
            return res.json({ success: false, message: 'Post not found!' });
        }
        res.json({ success: true, news: data });
    } catch (error) {
        res.json({ success: false, message: 'Something went wrong!' });

    }
}

const getNewsByCategory = async (req, res) => {
    try {
        const data = await news.getCategory(req.params.category);
        if (!data) {
            return res.json({ success: false, message: 'Post not found!' });
        }
        res.json({ success: true, news: data });
    } catch (error) {
        res.json({ success: false, message: 'Something went wrong!' });

    }
}

module.exports = {
    createNews,
    getAllNews,
    getSingleNews,
    getNewsByCategory
}

