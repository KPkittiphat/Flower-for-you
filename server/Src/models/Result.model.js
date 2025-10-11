const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
    personality: { type: String, required: true, unique: true },
    flower: { type: String, required: true },
    meaning: { type: String, required: true },
    sweetMessage: { type: String, required: true },
    key: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Result', ResultSchema);