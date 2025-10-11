const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Result = mongoose.model("Result");
const Question = mongoose.model("Question");

router.post("/seed", async (req, res) => {
  try {
    const initialResults = [
      // 1. นักฝันโรแมนติก
      {
        personality: "นักฝันโรแมนติก",
        flower: "ดอกกุหลาบ",
        meaning: "ความรักที่ลึกซึ้ง, ความอ่อนโยนที่เข้มแข็ง",
        sweetMessage:
          "คุณคือหัวใจที่เข้มแข็งที่ถูกห่อหุ้มด้วยความอ่อนโยน จงกล้าที่จะรักอย่างลึกซึ้งและทุ่มเท เพราะความรู้สึกที่แท้จริงของคุณนั้นคือขุมพลังแห่งความงามที่สร้างสรรค์โลกนี้",
        key: "romantic_dreamer",
      }, // 2. คนสดใสพลังบวก
      {
        personality: "คนสดใสพลังบวก",
        flower: "ดอกทานตะวัน",
        meaning: "ร่าเริง, มองโลกในแง่ดี, มั่นคง",
        sweetMessage:
          "ตัวตนของคุณคือแสงอาทิตย์ที่ส่องนำทาง แม้ในวันที่มืดมิดที่สุด อย่าหยุดที่จะยิ้มและแผ่รังสีแห่งความหวัง เพราะคุณเกิดมาเพื่อสร้างความสุขให้คนรอบข้าง",
        key: "positive_sunshine",
      }, // 3. นักคิดผู้มีวิสัยทัศน์
      {
        personality: "นักคิดผู้มีวิสัยทัศน์",
        flower: "ดอกไอริส",
        meaning: "ความหวัง, ศรัทธา, ปัญญา, ข่าวดี",
        sweetMessage:
          "คุณคือสถาปนิกแห่งอนาคตที่มองเห็นโอกาสในทุกความท้าทาย จงเชื่อมั่นในปัญญาและวิสัยทัศน์ของคุณ ทุกเมล็ดพันธุ์ความคิดที่คุณปลูกวันนี้ จะกลายเป็นความจริงที่ยิ่งใหญ่",
        key: "visionary",
      }, // 4. นักสู้ผู้เงียบขรึม
      {
        personality: "นักสู้ผู้เงียบขรึม",
        flower: "ดอกคัตเตอร์",
        meaning: "ความเข้มแข็ง, การฟื้นตัว, ความทรงจำที่ไม่เลือนหาย",
        sweetMessage:
          "ความเงียบของคุณคือเกราะป้องกันที่ทรงพลัง คุณมีพลังแห่งการฟื้นตัวที่น่าทึ่ง จงจำไว้ว่าการพักผ่อนคือส่วนหนึ่งของการต่อสู้ อย่าหยุดยั้งการเติบโต แม้ว่าจะต้องเริ่มใหม่กี่ครั้งก็ตาม",
        key: "resilient_warrior",
      }, // 5. ผู้ให้ที่อ่อนโยน
      {
        personality: "ผู้ให้ที่อ่อนโยน",
        flower: "ดอกไวโอเลต",
        meaning: "ความถ่อมตน, ความซื่อสัตย์, ความรักที่ไม่มีเงื่อนไข",
        sweetMessage:
          "คุณคือความรักบริสุทธิ์ที่ทำให้โลกนี้อ่อนโยนลง จงภูมิใจในความเมตตาของคุณ และอย่าลืมเติมเต็มหัวใจตัวเองให้ชุ่มชื่นก่อนที่จะแบ่งปันให้ผู้อื่น",
        key: "gentle_giver",
      }, // 6. นักผจญภัยอิสระ
      {
        personality: "นักผจญภัยอิสระ",
        flower: "ดอกป๊อปปี้",
        meaning: "อิสรภาพ, จินตนาการ, การเริ่มต้นใหม่",
        sweetMessage:
          "ชีวิตคือการเดินทาง และคุณคือผู้บุกเบิก จงโอบรับความไม่แน่นอนและความเปลี่ยนแปลง เพราะอิสรภาพที่แท้จริงของคุณอยู่บนเส้นทางที่คุณไม่เคยคาดคิด",
        key: "free_adventurer",
      }, // 7. นักสร้างความสมบูรณ์
      {
        personality: "นักสร้างความสมบูรณ์",
        flower: "ดอกทิวลิป",
        meaning: "ความรักที่สมบูรณ์แบบ, ความประณีต",
        sweetMessage:
          "คุณคือศิลปินแห่งความประณีต ความใส่ใจในรายละเอียดเล็กๆ คือพรสวรรค์ของคุณ จงรู้ว่าความสมบูรณ์แบบไม่ได้หมายถึงการไม่มีข้อผิดพลาด แต่มันคือการได้ทำอย่างเต็มที่ที่สุดแล้ว",
        key: "perfection_creator",
      }, // 8. ผู้ประสานความสุข
      {
        personality: "ผู้ประสานความสุข",
        flower: "ดอกมะลิ",
        meaning: "ความสามัคคี, ความอบอุ่น, กาวใจ",
        sweetMessage:
          "คุณคือกาวใจที่เชื่อมโยงผู้คน คุณมีพลังในการสร้างความสามัคคีและความอบอุ่นในทุกที่ที่คุณอยู่ จงเป็นสะพานแห่งความเข้าใจและรับรู้ถึงคุณค่าที่คุณนำมาสู่ทุกคน",
        key: "harmony_connector",
      }, // 9. นักคิดเชิงลึก
      {
        personality: "นักคิดเชิงลึก",
        flower: "ดอกลิลลี่",
        meaning: "ความมีเหตุผล, ความสงบ, ปัญญาภายใน",
        sweetMessage:
          "ความคิดของคุณลึกซึ้งและมีเหตุผล คุณค้นหาความจริงในทุกสิ่ง จงให้เวลากับความเงียบเพื่อฟังเสียงปัญญาภายในของคุณ ความเข้าใจในตัวเองคือกุญแจสู่ความสงบ",
        key: "deep_thinker",
      }, // 10. คนมีเสน่ห์ลึกลับ
      {
        personality: "คนมีเสน่ห์ลึกลับ",
        flower: "ดอกกล้วยไม้",
        meaning: "รสนิยม, ความลึกลับ, เสน่ห์ที่ซับซ้อน",
        sweetMessage:
          "คุณคือสิ่งมหัศจรรย์ที่น่าค้นหา ความงามของคุณซ่อนอยู่ภายใต้ความลึกลับ จงเปิดเผยตัวเองทีละน้อยอย่างมั่นใจ เพราะตัวตนที่ซับซ้อนของคุณคือเสน่ห์ที่ไม่มีใครเลียนแบบได้",
        key: "mystic_charm",
      }, // 11. นักจัดการที่มีประสิทธิภาพ
      {
        personality: "นักจัดการที่มีประสิทธิภาพ",
        flower: "ดอกลาเวนเดอร์",
        meaning: "ความมั่นคง, การจัดการ, ความสงบ",
        sweetMessage:
          "คุณคือเสาหลักแห่งความมั่นคง ความสามารถในการจัดการและจัดระเบียบคือความสงบที่คุณมอบให้โลก จงไว้วางใจในความสามารถของคุณที่จะทำให้ทุกอย่างเป็นไปตามแผนและมีประสิทธิภาพ",
        key: "effective_manager",
      }, // 12. นักล่าความฝัน
      {
        personality: "นักล่าความฝัน",
        flower: "ดอกพีโอนี",
        meaning: "ความทะเยอทะยาน, ความกล้าหาญ, เกียรติยศ",
        sweetMessage:
          "คุณคือผู้ที่ไม่ยอมจำนนต่อโชคชะตา ความฝันของคุณใหญ่เกินกว่าจะเก็บไว้คนเดียว จงไล่ตามเป้าหมายนั้นด้วยหัวใจที่กล้าหาญ โลกจะสวยงามขึ้นเมื่อความฝันของคุณเป็นจริง",
        key: "dream_hunter",
      },
    ];

    const initialQuestions = [
      // 1. การจัดการความรู้สึก
      {
        questionText:
          "เมื่อคุณรู้สึกหงุดหงิดหรือโกรธ คุณจะจัดการอารมณ์นั้นอย่างไร?",
        options: [
          {
            text: "เก็บไว้และทบทวนอย่างเงียบๆ เพื่อหาสาเหตุที่แท้จริง",
            points: [
              { resultKey: "deep_thinker", score: 2 },
              { resultKey: "resilient_warrior", score: 1 },
            ],
          },
          {
            text: "พยายามมองหาด้านดีและเปลี่ยนไปทำกิจกรรมที่สร้างความสุขให้คนอื่น",
            points: [
              { resultKey: "positive_sunshine", score: 2 },
              { resultKey: "harmony_connector", score: 1 },
            ],
          },
          {
            text: "ระเบิดออกมาอย่างสร้างสรรค์ เช่น เขียนบันทึก หรือสร้างงานศิลปะ",
            points: [
              { resultKey: "romantic_dreamer", score: 1 },
              { resultKey: "mystic_charm", score: 1 },
            ],
          },
        ],
      },
      // 2. การตัดสินใจ
      {
        questionText: "คุณมักใช้เกณฑ์ใดในการตัดสินใจที่สำคัญ?",
        options: [
          {
            text: "สัญชาตญาณและความรู้สึกภายใน (Gut Feeling)",
            points: [
              { resultKey: "free_adventurer", score: 2 },
              { resultKey: "romantic_dreamer", score: 1 },
            ],
          },
          {
            text: "ข้อมูล, ข้อเท็จจริง, และการวางแผนอย่างมีขั้นตอน",
            points: [
              { resultKey: "effective_manager", score: 2 },
              { resultKey: "deep_thinker", score: 1 },
            ],
          },
          {
            text: "ปรึกษาผู้เชี่ยวชาญ และทำตามแผนที่รับประกันความสำเร็จ",
            points: [
              { resultKey: "visionary", score: 2 },
              { resultKey: "perfection_creator", score: 1 },
            ],
          },
        ],
      },
      // 3. ปฏิกิริยาต่อความผิดพลาด
      {
        questionText: "เมื่อคุณทำผิดพลาดครั้งใหญ่ สิ่งแรกที่คุณคิดคืออะไร?",
        options: [
          {
            text: "นี่เป็นโอกาสที่จะได้เรียนรู้และเติบโตขึ้นอย่างแข็งแกร่ง",
            points: [
              { resultKey: "resilient_warrior", score: 2 },
              { resultKey: "dream_hunter", score: 1 },
            ],
          },
          {
            text: "ฉันต้องหาทางแก้ไขให้สมบูรณ์แบบที่สุด เพื่อไม่ให้เกิดซ้ำ",
            points: [
              { resultKey: "perfection_creator", score: 2 },
              { resultKey: "effective_manager", score: 1 },
            ],
          },
          {
            text: "ฉันทำให้คนอื่นผิดหวังหรือไม่? ฉันต้องขอโทษและแสดงความรับผิดชอบ",
            points: [
              { resultKey: "gentle_giver", score: 2 },
              { resultKey: "harmony_connector", score: 1 },
            ],
          },
        ],
      },
      // 4. สไตล์การท่องเที่ยว
      {
        questionText: "สไตล์การเดินทางที่คุณชอบที่สุดคือ?",
        options: [
          {
            text: "เดินทางคนเดียว, แบกเป้, ไปในที่ที่ไม่มีใครรู้จัก",
            points: [
              { resultKey: "free_adventurer", score: 2 },
              { resultKey: "mystic_charm", score: 1 },
            ],
          },
          {
            text: "ทัวร์ตามแผน, จองทุกอย่างล่วงหน้า, มีรายละเอียดตารางเวลาชัดเจน",
            points: [
              { resultKey: "effective_manager", score: 1 },
              { resultKey: "perfection_creator", score: 1 },
            ],
          },
          {
            text: "ไปกับคนที่รัก, เน้นประสบการณ์ร่วมกัน และความทรงจำที่สวยงาม",
            points: [
              { resultKey: "romantic_dreamer", score: 2 },
              { resultKey: "harmony_connector", score: 1 },
            ],
          },
        ],
      },
      // 5. การรับมือกับความคาดหวัง
      {
        questionText: "คุณรับมือกับความคาดหวังที่สูงของตัวเองและคนอื่นอย่างไร?",
        options: [
          {
            text: "เปลี่ยนแรงกดดันเป็นเชื้อเพลิง เพื่อผลักดันตัวเองสู่จุดสูงสุด",
            points: [
              { resultKey: "dream_hunter", score: 2 },
              { resultKey: "visionary", score: 1 },
            ],
          },
          {
            text: "ทำเท่าที่ทำได้และพอใจกับความพยายาม แล้วปล่อยวางส่วนที่ควบคุมไม่ได้",
            points: [
              { resultKey: "positive_sunshine", score: 2 },
              { resultKey: "resilient_warrior", score: 1 },
            ],
          },
          {
            text: "วิเคราะห์ความคาดหวังอย่างเป็นกลาง และตั้งเป้าหมายที่วัดผลได้",
            points: [
              { resultKey: "deep_thinker", score: 1 },
              { resultKey: "effective_manager", score: 1 },
            ],
          },
        ],
      },
      // 6. ความสัมพันธ์กับผู้อื่น
      {
        questionText: "บทบาทไหนที่คุณรู้สึกว่าคุณทำได้ดีที่สุดในกลุ่มเพื่อน?",
        options: [
          {
            text: "เป็นผู้ฟังที่ดี คอยให้กำลังใจและรับฟังปัญหาอย่างเข้าใจ",
            points: [
              { resultKey: "gentle_giver", score: 2 },
              { resultKey: "romantic_dreamer", score: 1 },
            ],
          },
          {
            text: "เป็นคนสร้างเสียงหัวเราะและบรรยากาศแห่งความสนุกสนาน",
            points: [
              { resultKey: "positive_sunshine", score: 1 },
              { resultKey: "harmony_connector", score: 2 },
            ],
          },
          {
            text: "เป็นผู้ที่เสนอทางออกที่เป็นเหตุเป็นผลเมื่อเกิดความขัดแย้ง",
            points: [
              { resultKey: "deep_thinker", score: 1 },
              { resultKey: "visionary", score: 1 },
            ],
          },
        ],
      },
      // 7. การเลือกเสื้อผ้า/สไตล์
      {
        questionText: "คุณเลือกเสื้อผ้าหรือสไตล์การแต่งตัวอย่างไร?",
        options: [
          {
            text: "เน้นความสบาย ไม่ต้องตามเทรนด์ ขอแค่เป็นตัวของตัวเอง",
            points: [
              { resultKey: "free_adventurer", score: 2 },
              { resultKey: "resilient_warrior", score: 1 },
            ],
          },
          {
            text: "เลือกสไตล์ที่มีเอกลักษณ์ ดูดีมีรสนิยม และไม่ซ้ำใคร",
            points: [
              { resultKey: "mystic_charm", score: 2 },
              { resultKey: "perfection_creator", score: 1 },
            ],
          },
          {
            text: "เสื้อผ้าที่ดูสะอาด เรียบร้อย และเหมาะสมกับกาลเทศะที่สุด",
            points: [
              { resultKey: "effective_manager", score: 2 },
              { resultKey: "gentle_giver", score: 1 },
            ],
          },
        ],
      },
      // 8. ความฝันส่วนตัว
      {
        questionText: "แรงผลักดันที่ซ่อนอยู่เบื้องหลังความฝันของคุณคืออะไร?",
        options: [
          {
            text: "การได้ใช้ชีวิตที่เต็มไปด้วยประสบการณ์ที่ตื่นเต้น",
            points: [
              { resultKey: "free_adventurer", score: 1 },
              { resultKey: "dream_hunter", score: 2 },
            ],
          },
          {
            text: "การได้ทำสิ่งที่มีความหมายและสร้างผลกระทบต่อโลกในวงกว้าง",
            points: [
              { resultKey: "visionary", score: 2 },
              { resultKey: "mystic_charm", score: 1 },
            ],
          },
          {
            text: "การได้เห็นคนที่คุณรักมีความสุขและอยู่ร่วมกันอย่างสงบ",
            points: [
              { resultKey: "harmony_connector", score: 1 },
              { resultKey: "gentle_giver", score: 2 },
            ],
          },
        ],
      },
      // 9. การใช้เวลาว่าง
      {
        questionText: "กิจกรรมที่คุณชอบทำในวันหยุดคือ?",
        options: [
          {
            text: "ทำสิ่งที่คุณทำได้ดีมากๆ จนรู้สึกว่าทุกอย่างสมบูรณ์แบบ",
            points: [
              { resultKey: "perfection_creator", score: 2 },
              { resultKey: "effective_manager", score: 1 },
            ],
          },
          {
            text: "อ่านหนังสือ, เขียน, หรือจมอยู่กับความคิดเพื่อทำความเข้าใจโลก",
            points: [
              { resultKey: "deep_thinker", score: 2 },
              { resultKey: "romantic_dreamer", score: 1 },
            ],
          },
          {
            text: "ทดลองทำอะไรใหม่ๆ ที่ไม่เคยทำมาก่อน (แบบไม่มีแผน)",
            points: [
              { resultKey: "free_adventurer", score: 1 },
              { resultKey: "positive_sunshine", score: 1 },
            ],
          },
        ],
      },
      // 10. เป้าหมายชีวิตในระยะยาว
      {
        questionText: "คุณต้องการให้คนจดจำคุณในฐานะคนแบบไหน?",
        options: [
          {
            text: "คนที่มีความสามารถในการจัดการและทำสิ่งที่เป็นไปไม่ได้ให้เป็นไปได้",
            points: [
              { resultKey: "effective_manager", score: 2 },
              { resultKey: "dream_hunter", score: 1 },
            ],
          },
          {
            text: "คนที่มีจิตใจที่ดีและทำให้คนอื่นรู้สึกได้รับการยอมรับ",
            points: [
              { resultKey: "gentle_giver", score: 1 },
              { resultKey: "harmony_connector", score: 2 },
            ],
          },
          {
            text: "คนที่มีความลึกลับน่าสนใจ และเป็นแรงบันดาลใจให้คนกล้าทำตามความฝัน",
            points: [
              { resultKey: "mystic_charm", score: 2 },
              { resultKey: "visionary", score: 1 },
            ],
          },
        ],
      },
      // 11. ความท้าทาย
      {
        questionText: "คุณตอบสนองต่อคำวิจารณ์อย่างไร?",
        options: [
          {
            text: "พยายามทำความเข้าใจมุมมองของเขา แล้วใช้มันพัฒนาตัวเองให้เหนือกว่า",
            points: [
              { resultKey: "dream_hunter", score: 2 },
              { resultKey: "perfection_creator", score: 1 },
            ],
          },
          {
            text: "รู้สึกแย่ชั่วขณะ แต่เชื่อมั่นในตัวเอง และก้าวต่อไปอย่างมั่นคง",
            points: [
              { resultKey: "resilient_warrior", score: 2 },
              { resultKey: "positive_sunshine", score: 1 },
            ],
          },
          {
            text: "มองว่านี่เป็นเพียงข้อมูลส่วนหนึ่ง ไม่ใช่นิยามตัวตนที่แท้จริง",
            points: [
              { resultKey: "deep_thinker", score: 2 },
              { resultKey: "free_adventurer", score: 1 },
            ],
          },
        ],
      },
      // 12. แรงบันดาลใจ
      {
        questionText: "อะไรที่ทำให้คุณรู้สึกว่าชีวิตมีความหมาย?",
        options: [
          {
            text: "การได้สร้างสรรค์สิ่งสวยงามและเป็นต้นฉบับในแบบที่ไม่เหมือนใคร",
            points: [
              { resultKey: "mystic_charm", score: 1 },
              { resultKey: "perfection_creator", score: 2 },
            ],
          },
          {
            text: "การได้เรียนรู้เรื่องราวใหม่ๆ และเชื่อมโยงจุดต่างๆ เข้าด้วยกัน",
            points: [
              { resultKey: "visionary", score: 2 },
              { resultKey: "deep_thinker", score: 1 },
            ],
          },
          {
            text: "การได้มอบความรักและสร้างความผูกพันที่มั่นคงกับคนที่คุณแคร์",
            points: [
              { resultKey: "romantic_dreamer", score: 2 },
              { resultKey: "harmony_connector", score: 1 },
            ],
          },
        ],
      },
    ];

    await Result.deleteMany({});
    await Question.deleteMany({});

    await Result.insertMany(initialResults);
    await Question.insertMany(initialQuestions);

    res.status(201).json({
      message: "🎉 Data Seeding Successful!",
      results: initialResults.length,
      questions: initialQuestions.length,
    });
  } catch (error) {
    console.error("Seeding Error:", error);
    res.status(500).json({ message: "Seeding failed", error: error.message });
  }
});

// ----------------------------------------------------------------------
//  API Endpoint สำหรับดึงคำถามทั้งหมด
// ----------------------------------------------------------------------
router.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find().select(
      "questionText options.text options._id _id"
    );
    res.status(200).json(questions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch questions", error: error.message });
  }
});

// ----------------------------------------------------------------------
// API Endpoint สำหรับการส่งคำตอบและรับผลลัพธ์
// ----------------------------------------------------------------------
router.post("/submit", async (req, res) => {
  try {
    const userAnswers = req.body.answers; // Array ของ { questionId, selectedOptionId }

    const [allQuestions, allResults] = await Promise.all([
      Question.find({}),
      Result.find({}),
    ]);

    const scoreMap = new Map();
    allResults.forEach((r) => scoreMap.set(r.key, 0));

    // 1. คำนวณคะแนน
    for (const userAnswer of userAnswers) {
      const question = allQuestions.find(
        (q) => q._id.toString() === userAnswer.questionId
      );

      if (question) {
        const selectedOption = question.options.find(
          (opt) => opt._id.toString() === userAnswer.selectedOptionId
        );

        if (selectedOption) {
          selectedOption.points.forEach((point) => {
            const currentScore = scoreMap.get(point.resultKey) || 0;
            scoreMap.set(point.resultKey, currentScore + point.score);
          });
        }
      }
    }

    // 2. หาบุคลิกภาพที่ได้คะแนนสูงสุด
    let maxScore = -1;
    let finalResultKey = "";

    scoreMap.forEach((score, key) => {
      if (score > maxScore) {
        maxScore = score;
        finalResultKey = key;
      }
    });

    // 3. ดึงข้อมูลผลลัพธ์สุดท้าย
    const finalResult = allResults.find((r) => r.key === finalResultKey);

    if (!finalResult) {
      // Fallback result หากไม่พบ (ไม่น่าจะเกิดถ้า Seeding ถูกต้อง)
      const defaultResult = allResults[0];
      const responseResult = {
        personality: defaultResult.personality,
        flower: defaultResult.flower,
        flowerIcon: defaultResult.flowerIcon,
        meaning: defaultResult.meaning,
        sweetMessage: defaultResult.sweetMessage,
      };
      return res.status(200).json(responseResult);
    }

    const responseResult = {
      personality: finalResult.personality,
      flower: finalResult.flower,
      flowerIcon: finalResult.flowerIcon,
      meaning: finalResult.meaning,
      sweetMessage: finalResult.sweetMessage,
    };

    res.status(200).json(responseResult);
  } catch (error) {
    console.error("Submission Error:", error);
    res
      .status(500)
      .json({ message: "Submission failed", error: error.message });
  }
});

module.exports = router;
