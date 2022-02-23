const { check, validationResult } = require('express-validator');
const req = require('express/lib/request');

const exception = ['breaking-news', 'tech', 'political', 'entertainment'];

const validator = [
    check('title').trim().not().isEmpty().withMessage('Title is required'),
    check('content').trim().not().isEmpty().withMessage('Content is required'),
    check('category').isIn(exception).withMessage('Choose at least one category'),
]

const result = (req, res, next) => {
    const result = validationResult(req);
    const hasError = !result.isEmpty();

    if (hasError) {
        const error = result.array()[0].msg;
        res.json({ success: false, message: error });
    }

    next();
}

const validatorFile = (req, res, next) => {
    if (!req.file) {
        return res.json({ success: false, message: 'Image is required' });
    }

    const excepted = ['png', 'jpj', 'jpeg'];
    const extention = req.file.mimetype.split('/').pop();
    if (!excepted.includes(extention)) {
        return res.json({ success: false, message: 'Image is not valid' });
    }
    next();
}

module.exports = {
    validator,
    result,
    validatorFile
}