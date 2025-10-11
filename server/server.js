require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// ====================================================
// 1. นำเข้า Models ก่อนใช้ Routes
//    *** แก้ไข: ใช้ __dirname เพื่อให้ Path ถูกต้องเสมอสำหรับ Render ***
// ====================================================
require(__dirname + '/src/models/Result.model');
require(__dirname + '/src/models/Question.model');

const quizRoutes = require(__dirname + '/src/routes/quiz.route'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ----------------------------------------------------
// การเชื่อมต่อ MongoDB
// ----------------------------------------------------
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
    .then(() => console.log('✅ MongoDB connected successfully.'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// ----------------------------------------------------
// 2. Routes หลัก
// ----------------------------------------------------
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running! Ready for the Flower Quiz API.' });
});

app.use('/api/quiz', quizRoutes); 

// ----------------------------------------------------
// 3. เริ่มต้น Server
// ----------------------------------------------------
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT}`);
});