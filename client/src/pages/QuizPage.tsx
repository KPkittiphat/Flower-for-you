import React, { useState, useEffect, useRef } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Loader2, Zap } from 'lucide-react'; // ลบ Volume2 ออก
import Footer from '../components/Footer';

interface Option {
  text: string;
  _id: string;
}

interface Question {
  _id: string;
  questionText: string;
  options: Option[];
}

interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
}

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;
  
  const audioRef = useRef<HTMLAudioElement | null>(null);


  // --- useEffect: ควบคุมการเล่นเพลงและหยุดเมื่อออกจากหน้านี้ ---
  useEffect(() => {
    const audio = audioRef.current;
    
    if (audio) {
      audio.loop = true;
      audio.volume = 0.2; 
      
      // การใช้ attribute autoplay ใน JSX จะพยายามเล่นเพลงทันที
      
      // กำหนดให้ไม่ปิดเสียง (สำคัญสำหรับ autoplay)
      audio.muted = false; 
    }

    // Cleanup: หยุดเล่นเพลงเมื่อออกจากหน้านี้ (จบแบบทดสอบ)
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []); 


  // --- useEffect: ดึงคำถามจาก Backend ---
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get<Question[]>(`${API_URL}/questions`);
        setQuestions(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError('ไม่สามารถโหลดคำถามได้ กรุณาตรวจสอบ Server Backend.');
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // --- Handler: จัดการการเลือกคำตอบ ---
  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers(prevAnswers => {
      const newAnswers = new Map(prevAnswers);
      newAnswers.set(questionId, optionId);
      return newAnswers;
    });
    
    // เมื่อตอบแล้ว ให้ไปคำถามถัดไปทันที (ถ้าไม่ใช่คำถามสุดท้าย)
    if (currentQuestionIndex < questions.length - 1) {
        setTimeout(() => {
            setCurrentQuestionIndex(prev => prev + 1);
        }, 150); // ดีเลย์เล็กน้อยเพื่อให้ผู้ใช้เห็นว่าตอบแล้ว
    }
  };

  // --- Handler: ส่งคำตอบทั้งหมด ---
  const handleSubmit = async () => {
    if (answers.size !== questions.length) {
      alert('กรุณาตอบคำถามให้ครบทุกข้อก่อนส่งผลลัพธ์!');
      return;
    }

    const submissionData: UserAnswer[] = Array.from(answers).map(([questionId, selectedOptionId]) => ({
      questionId,
      selectedOptionId,
    }));
    
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/submit`, { 
        answers: submissionData 
      });

      // นำทางไปหน้าผลลัพธ์พร้อมส่งข้อมูลผลลัพธ์ที่ได้รับจาก Server
      navigate('/result', { state: { finalResult: response.data } });

    } catch (err) {
      console.error("Submission Error:", err);
      setError('เกิดข้อผิดพลาดในการส่งคำตอบ โปรดลองอีกครั้ง');
      setIsLoading(false);
    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="w-10 h-10 animate-spin text-pink-500" />
        <p className="ml-3 text-lg text-gray-600">กำลังโหลดคำถาม...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <p className="text-xl text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  if (questions.length === 0) {
       return (
         <div className="min-h-screen flex items-center justify-center bg-yellow-50">
             <p className="text-xl text-yellow-700 font-semibold">ไม่พบคำถาม กรุณา Seeding Data ที่ Backend ก่อน</p>
         </div>
     );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isAnswered = answers.has(currentQuestion._id);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center p-8 pb-20">
      
      {/* 1. Audio Element: ใช้ attribute 'autoplay' และ 'hidden' (แทน controls) */}
      <audio ref={audioRef} src="/bg-music.mp3" preload="auto" autoPlay loop className="hidden" /> 

      {/* Header/Progress */}
      <div className="w-full max-w-xl text-center mb-6">
        <h2 className="text-3xl font-bold text-pink-700 flex items-center justify-center mb-2">
          <Zap className="w-6 h-6 mr-2 text-pink-500" />
          แบบทดสอบค้นหาดอกไม้ในตัวคุณ
        </h2>
        <p className="text-gray-600">
          คำถามที่ {currentQuestionIndex + 1} / {questions.length} 
        </p>
        
        {/* Progress Bar (Tailwind) */}
        <div className="w-full bg-pink-200 rounded-full h-2.5 mt-2">
          <div 
            className="bg-pink-500 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      {currentQuestion && (
        <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-2xl border border-pink-100">
          
          {/* Question Text */}
          <p className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuestionIndex + 1}. {currentQuestion.questionText}
          </p>
          
          {/* Options */}
          <div className="space-y-4">
            {currentQuestion.options.map((option) => {
              const isSelected = answers.get(currentQuestion._id) === option._id;
              const questionIsAnswered = answers.has(currentQuestion._id);

              return (
                <button
                  key={option._id}
                  onClick={!questionIsAnswered ? () => handleAnswer(currentQuestion._id, option._id) : undefined}
                  disabled={questionIsAnswered}
                  className={`w-full text-left py-3 px-5 rounded-lg transition-all duration-200 focus:outline-none 
                    ${isSelected 
                      ? 'bg-pink-500 text-white shadow-md transform scale-[1.01]' 
                      : questionIsAnswered 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-pink-100 border border-gray-200'
                    }`}
                >
                  {option.text}
                </button>
              );
            })}
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-end mt-8 pt-4 border-t border-gray-100">
            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={!isAnswered}
                className={`py-2 px-6 rounded-full font-bold transition duration-300 
                  ${isAnswered
                    ? 'bg-green-500 text-white shadow-lg hover:bg-green-600 transform scale-105'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`
                }
              >
                ส่งผลลัพธ์! 💌
              </button>
            ) : (
                <p className="py-2 px-4 rounded-full font-semibold text-pink-600 bg-pink-100">
                    ตอบแล้ว: ไปข้อถัดไปอัตโนมัติ
                </p>
            )}

            
          </div>
          <br />

          <p>
              เครดิตเพลง: อาจเป็นเพราะฉันเอง (me.)- PURPEECH Official
            </p>
        </div>

        
      )}
      <Footer />

    </div>
  );
};

export default QuizPage;
