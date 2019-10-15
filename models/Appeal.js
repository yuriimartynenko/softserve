const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppealSchema = new Schema({
    userNameValue: String,
    userCommentValue: String,
    date: String,
});

module.exports = mongoose.model('appeal', AppealSchema);