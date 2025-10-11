import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Wand2,  Home } from 'lucide-react'; // <== เพิ่ม RefreshCw กลับมา (เผื่อต้องการปุ่มทำซ้ำ)
import Footer from '../components/Footer';

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
      <div className="w-full max-w-lg bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border-4 border-pink-300 text-center"> {/* p-10/p-6 ลดลง */}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-pink-700 mb-3 flex items-center justify-center"> {/* mb-4 เป็น mb-3 */}
          <Wand2 className="w-7 h-7 mr-2 text-pink-500 animate-bounce" /> {/* w-8/h-8 เป็น w-7/h-7 */}
          ดอกไม้สำหรับคุณคือ...
        </h1>

        {/* Flower Section - ลด Margin */}
        <div className="my-6"> {/* my-8 เป็น my-6 */}
          {/* 5. Image Tag */}
          <img
            src={flowerImageUrl} // <== ใช้ URL ที่ดึงมาจาก Assets (แก้ไขแล้ว)
            alt={`ภาพดอก ${finalResult.flower}`}
            onError={(e) => { // Fallback กรณีโหลดรูปไม่ได้
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://placehold.co/400x400/999999/white?text=Image+Missing';
            }}
            className="w-36 h-36 sm:w-40 sm:h-40 mx-auto mb-3 rounded-full object-cover shadow-lg border-4 border-pink-400 animate-in fade-in zoom-in duration-500" 
          />
          <h2 className="text-4xl sm:text-5xl font-black text-pink-600 tracking-wider"> {/* ลดขนาด font เล็กน้อย */}
            {finalResult.flower}
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-gray-700 mt-1"> {/* ลดขนาด font และ margin top */}
            ({finalResult.personality})
          </p>
        </div>

        {/* Meaning/Sweet Message Card - ลด Padding, Font, Line Height */}
        <div className="mt-6 bg-pink-100 p-4 rounded-xl border border-pink-200 shadow-inner"> {/* mt-8 เป็น mt-6 และ p-6 เป็น p-4 */}
          <h3 className="text-lg font-bold text-pink-700 mb-1">ความหมายที่ซ่อนอยู่:</h3> {/* ลด Font และ mb */}
          <p className="text-sm text-gray-700 italic mb-3 leading-snug">"{finalResult.meaning}"</p> {/* ลด Font และเพิ่ม leading-snug */}

          <div className="bg-white p-3 rounded-lg border-2 border-pink-300"> {/* p-5 เป็น p-3 */}
            <h3 className="text-lg font-bold text-red-500 mb-1">บทความดีๆสำหรับคุณ:</h3> {/* ลด Font และ mb */}
            <p className="text-base text-gray-800 font-medium whitespace-pre-line leading-snug"> {/* text-lg เป็น text-base และเพิ่ม leading-snug */}
              {finalResult.sweetMessage}
            </p>
          </div>
        </div>

        {/* Action Buttons - ลด Margin Top */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4"> {/* mt-10 เป็น mt-6 */}
         

          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center bg-gray-500 text-white py-3 px-8 rounded-full font-bold shadow-lg hover:bg-gray-600 transition duration-300 transform hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2" />
            กลับสู่หน้าหลัก
          </button>
        </div>

      </div>
      <Footer /> 

    </div>
  );
};

export default ResultPage;