import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Wand2,  Home } from 'lucide-react';

interface FinalResult {
  personality: string;
  flower: string; // ใช้ Field นี้ในการหา URL รูปภาพ
  meaning: string;
  sweetMessage: string;
}

// 1. ใช้ Vite Glob Import เพื่อนำเข้าไฟล์รูปภาพทั้งหมด
// NOTE: ต้องมั่นใจว่าไฟล์ทั้งหมดอยู่ใน client/src/assets/images/
const imageModules = import.meta.glob('../assets/images/*.{png,jpg,jpeg}', { eager: true });

// 2. Map ชื่อดอกไม้ภาษาไทยไปยัง Key ภาษาอังกฤษ/ชื่อไฟล์ (ต้องตรงกับชื่อไฟล์ของคุณ)
const FLOWER_NAME_MAP: Record<string, string> = {
  'ดอกกุหลาบ': 'rose',
  'ดอกทานตะวัน': 'sunflower',
  'ดอกไอริส': 'iris',
  'ดอกคัตเตอร์': 'statice',
  'ดอกไวโอเลต': 'violet',
  'ดอกป๊อปปี้': 'poppy',
  'ดอกทิวลิป': 'tulip',
  'ดอกมะลิ': 'jasmine',
  'ดอกลิลลี่': 'lily',
  'ดอกกล้วยไม้': 'orchid',
  'ดอกลาเวนเดอร์': 'lavender',
  'ดอกพีโอนี': 'peony',
};

// 3. ฟังก์ชันสำหรับดึง URL รูปภาพ
const getFlowerImageUrl = (flowerName: string): string => {
  if (!flowerName) return 'https://placehold.co/400x400/CCCCCC/000000?text=Error';

  // หา key ภาษาอังกฤษจากชื่อดอกไม้ภาษาไทย
  const baseFileName = FLOWER_NAME_MAP[flowerName] || '';

  // ค้นหา URL ใน imageModules
  for (const path in imageModules) {
    // ตรวจสอบว่า path ของไฟล์รูปภาพรวม baseFileName นี้หรือไม่
    if (path.includes(`/images/${baseFileName}.`)) {
      return (imageModules[path] as { default: string }).default;
    }
  }

  // Fallback URL (ถ้าไม่เจอไฟล์)
  return 'https://placehold.co/400x400/999999/white?text=Image+Missing';
};


const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const finalResult: FinalResult | undefined = location.state?.finalResult;

  // 4. คำนวณ URL ของรูปภาพโดยใช้ useMemo
  const flowerImageUrl = useMemo(() => {
    return getFlowerImageUrl(finalResult?.flower || '');
  }, [finalResult]);


  if (!finalResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-8">
        <p className="text-xl text-red-600 font-semibold mb-4">ไม่พบข้อมูลผลลัพธ์</p>
        <button
          onClick={() => navigate('/')}
          className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition"
        >
          กลับสู่หน้าเริ่มต้น
        </button>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center p-8">
      <div className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl border-4 border-pink-300 text-center">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-pink-700 mb-4 flex items-center justify-center">
          <Wand2 className="w-8 h-8 mr-2 text-pink-500 animate-bounce" />
          ดอกไม้สำหรับคุณคือ...
        </h1>

        {/* Flower Section - แสดงผลเป็นรูปภาพ */}
        <div className="my-8">
          {/* 5. Image Tag */}
          <img
            src={flowerImageUrl} // <== ใช้ URL ที่ดึงมาจาก Assets (แก้ไขแล้ว)
            alt={`ภาพดอก ${finalResult.flower}`}
            onError={(e) => { // Fallback กรณีโหลดรูปไม่ได้
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://placehold.co/400x400/999999/white?text=Image+Missing';
            }}
            className="w-40 h-40 mx-auto mb-4 rounded-full object-cover shadow-lg border-4 border-pink-400 animate-in fade-in zoom-in duration-500"
          />
          <h2 className="text-5xl font-black text-pink-600 tracking-wider">
            {finalResult.flower}
          </h2>
          <p className="text-2xl font-bold text-gray-700 mt-2">
            ({finalResult.personality})
          </p>
        </div>

        {/* Meaning/Sweet Message Card */}
        <div className="mt-8 bg-pink-100 p-6 rounded-xl border border-pink-200 shadow-inner">
          <h3 className="text-xl font-bold text-pink-700 mb-3">ความหมายที่ซ่อนอยู่:</h3>
          <p className="text-gray-700 italic mb-4">"{finalResult.meaning}"</p>

          <div className="bg-white p-5 rounded-lg border-2 border-pink-300">
            <h3 className="text-xl font-bold text-red-500 mb-2">บทความดีๆสำหรับคุณ:</h3>
            <p className="text-lg text-gray-800 font-medium whitespace-pre-line">
              {finalResult.sweetMessage}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
         

          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center bg-gray-500 text-white py-3 px-8 rounded-full font-bold shadow-lg hover:bg-gray-600 transition duration-300 transform hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2" />
            กลับสู่หน้าหลัก
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResultPage;
