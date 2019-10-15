const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    newsTitleValue: String,
    newsTextValue: String,
    imgPath: String,
});

module.exports = mongoose.model('news', NewsSchema);