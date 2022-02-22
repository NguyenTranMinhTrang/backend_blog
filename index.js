const express = require('express')
const app = express()
const port = 3000
const newsRouter = require('./router/news');



app.use(express.static('public'));
app.use('/api', newsRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})