const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const multer = require('multer');
const storage = multer.memoryStorage();
const uploads = multer({ storage });


router.post('/create', uploads.single('thumbnail'), async (req, res) => {
    await sharp(req.file.buffer).resize({ width: 615, height: 350 })
    res.send('submit successful');
})

module.exports = router;