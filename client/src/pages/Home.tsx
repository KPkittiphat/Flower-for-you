import { Flower2, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4">
      
      {/* Title Section */}
      <div className="text-center mb-10">
        <Sparkles className="w-12 h-12 text-pink-500 mx-auto animate-pulse" />
        <h1 className="text-6xl font-extrabold text-pink-700 mt-2 mb-4 tracking-tight">
          My Inner Bloom 🌸
        </h1>
        <p className="text-xl text-gray-600 max-w-lg mx-auto">
          ค้นหาตัวตนที่ซ่อนอยู่ของคุณผ่านแบบทดสอบทายนิสัย และรับดอกไม้ประจำตัวพร้อมคำหวานชื่นใจ
        </p>
      </div>

      {/* Feature Cards */}
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        <div className="w-64 p-6 bg-white rounded-xl shadow-2xl transform hover:scale-105 transition duration-300 border-t-4 border-pink-400">
          <Flower2 className="w-10 h-10 text-pink-500 mb-3" />
          <h3 className="text-xl font-bold text-gray-800">ดอกไม้ประจำใจ</h3>
          <p className="text-sm text-gray-500 mt-1">
            บุคลิกภาพของคุณจะถูกเชื่อมโยงกับความหมายของดอกไม้งาม
          </p>
        </div>
      <div className="w-64 p-6 bg-white rounded-xl shadow-2xl transform hover:scale-105 transition duration-300 border-t-4 border-red-400">
          <Heart className="w-10 h-10 text-red-500 mb-3 fill-red-500" />
          <h3 className="text-xl font-bold text-gray-800">บทความดีๆ</h3>
          <p className="text-sm text-gray-500 mt-1">
            ส่งแรงบันดาลใจของคุณ เพื่อให้คุณรู้สึกสบายใจและได้รับพลังบวก
          </p>
        </div>
      </div>

      {/* Start Button */}
      <Link to="/quiz">
        <button className="flex items-center bg-pink-600 text-white text-xl font-bold py-3 px-8 rounded-full shadow-lg hover:bg-pink-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300">
          เริ่มค้นหาตัวตนของคุณ
          <span className="ml-2 text-2xl">👉</span>
        </button>
      </Link>
      <Footer />
      
    </div>
  );
};

export default Home;