'use strict';

let mongoose = require('mongoose');

let sortAnswers = function (a, b) {
    if (a.votes === b.votes) {
        return b.updatedAt - a.updatedAt;
    }
    return b.votes - a.votes;
};

let Schema = mongoose.Schema;
let answerSchema = new Schema({
    text: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    votes: { type: Number, default: 0 }
},
{
    usePushEach: true
});

answerSchema.methods.update = function (updates, callback) {
    Object.assign(this, updates, { updatedAt: new Date() });
    this.parent().save(callback);
};

answerSchema.methods.vote = function (vote, callback) {
    if (vote === 'up') {
        this.votes += 1;
    } else {
        this.vote -= 1;
    }
    this.parent().save(callback);
}

let questionSchema = new Schema({
    text: String,
    createdAt: { type: Date, default: Date.now },
    answers: [answerSchema]
},
{
    usePushEach: true
});

questionSchema.pre('save', (next) => {
    if(this.answers){
    this.answers.sort((sortAnswers) => {
    next();
    });
}
next();
});

let Question = mongoose.model('Question', questionSchema);

module.exports.Question = Question;