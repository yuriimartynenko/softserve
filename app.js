const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cons = require('consolidate');
const bodyParser = require('body-parser');

const Appeal = require('./models/Appeal');
const News = require('./models/News');

mongoose.connect('mongodb://localhost:27017/chelsea', { useNewUrlParser: true });

const app = express();
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.static('views'));
app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true, parameterLimit: 10000 }));

app.get('/fans', async (req, res) => {
    const appeal = await Appeal.find();
    res.json(appeal);
});

app.post('/fans', async (req, res) => {
    const appeal = await Appeal.create(req.body);
    res.json(appeal);
});

app.get('/news', async (req, res) => {
    const news = await News.find();
    res.json(news);
});

app.post('/news', async (req, res) => {
    await News.create(req.body);
});

app.listen(3000, () => {
    console.log('Listening...')
});