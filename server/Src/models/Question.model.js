const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerOptionSchema = new Schema({
    text: { type: String, required: true },
    // การให้คะแนน: resultKey ต้องตรงกับ 'key' ใน Result.model
    points: [{
        resultKey: { type: String, required: true }, 
        score: { type: Number, required: true }      
    }]
});

const QuestionSchema = new Schema({
    questionText: { type: String, required: true },
    options: [AnswerOptionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);