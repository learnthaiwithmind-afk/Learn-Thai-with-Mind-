'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import FadeIn from '../../components/FadeIn';

type Card = { thai: string; roman: string; english: string; example: string };
type DeckKey = 'greetings' | 'numbers' | 'food' | 'tones' | 'travel' | 'dailylife' | 'colors' | 'shopping';

const DECK: Record<DeckKey, Card[]> = {
  greetings: [
    { thai: 'สวัสดี', roman: 'Sà-wàt-dii', english: 'Hello / Goodbye', example: 'สวัสดีครับ / ค่ะ — polite hello' },
    { thai: 'ขอบคุณ', roman: 'Khàwp-khun', english: 'Thank you', example: 'ขอบคุณมาก — Thank you very much' },
    { thai: 'ใช่', roman: 'Châi', english: 'Yes', example: 'ใช่ครับ — Yes (polite, male)' },
    { thai: 'ไม่ใช่', roman: 'Mâi châi', english: 'No / Not', example: 'ไม่ใช่ครับ — No (polite, male)' },
    { thai: 'ขอโทษ', roman: 'Khǎaw-thôht', english: 'Sorry / Excuse me', example: 'ขอโทษนะครับ — I\'m sorry' },
    { thai: 'ไม่เป็นไร', roman: 'Mâi pen rai', english: 'Never mind / No worries', example: 'ไม่เป็นไร — It\'s okay!' },
    { thai: 'แล้วพบกัน', roman: 'Láew phóp kan', english: 'See you later', example: 'แล้วพบกันใหม่ — See you again' },
    { thai: 'ยินดีที่รู้จัก', roman: 'Yin-dii thîi rúu-jàk', english: 'Nice to meet you', example: 'ยินดีที่รู้จักครับ — Nice to meet you' },
    { thai: 'สบายดีไหม', roman: 'Sà-baai dii mǎi', english: 'How are you?', example: 'คุณสบายดีไหม — How are you?' },
    { thai: 'สบายดี', roman: 'Sà-baai dii', english: 'I\'m fine', example: 'สบายดีขอบคุณ — Fine, thank you' },
    { thai: 'ชื่ออะไร', roman: 'Chûue à-rai', english: 'What is your name?', example: 'คุณชื่ออะไร — What is your name?' },
    { thai: 'ฉันชื่อ...', roman: 'Chǎn chûue...', english: 'My name is...', example: 'ฉันชื่อมายด์ — My name is Mind' },
    { thai: 'โปรด', roman: 'Prôht', english: 'Please', example: 'โปรดช่วยด้วย — Please help' },
    { thai: 'โชคดี', roman: 'Chôhk dii', english: 'Good luck', example: 'โชคดีนะ — Good luck!' },
    { thai: 'ยินดีด้วย', roman: 'Yin-dii dûay', english: 'Congratulations', example: 'ยินดีด้วยนะ — Congratulations!' },
    { thai: 'ดีใจ', roman: 'Dii-jai', english: 'Happy / Glad', example: 'ดีใจมากเลย — I\'m so happy!' },
  ],
  numbers: [
    { thai: 'ศูนย์', roman: 'Sǔun', english: 'Zero (0)', example: 'ศูนย์บาท — Zero baht' },
    { thai: 'หนึ่ง', roman: 'Nùeng', english: 'One (1)', example: 'หนึ่งชิ้น — One piece' },
    { thai: 'สอง', roman: 'Sǎawng', english: 'Two (2)', example: 'สองคน — Two people' },
    { thai: 'สาม', roman: 'Sǎam', english: 'Three (3)', example: 'สามวัน — Three days' },
    { thai: 'สี่', roman: 'Sìi', english: 'Four (4)', example: 'สี่โมงเช้า — 4 in the morning' },
    { thai: 'ห้า', roman: 'Hâa', english: 'Five (5)', example: 'ห้าร้อย — Five hundred' },
    { thai: 'หก', roman: 'Hòk', english: 'Six (6)', example: 'หกโมงเย็น — 6 in the evening' },
    { thai: 'เจ็ด', roman: 'Jèt', english: 'Seven (7)', example: 'เจ็ดวัน — Seven days' },
    { thai: 'แปด', roman: 'Pàaet', english: 'Eight (8)', example: 'แปดคน — Eight people' },
    { thai: 'เก้า', roman: 'Gâo', english: 'Nine (9)', example: 'เก้าโมง — Nine o\'clock' },
    { thai: 'สิบ', roman: 'Sìp', english: 'Ten (10)', example: 'สิบบาท — Ten baht' },
    { thai: 'สิบเอ็ด', roman: 'Sìp-èt', english: 'Eleven (11)', example: 'สิบเอ็ดโมง — Eleven o\'clock' },
    { thai: 'สิบสอง', roman: 'Sìp-sǎawng', english: 'Twelve (12)', example: 'สิบสองเดือน — Twelve months' },
    { thai: 'ยี่สิบ', roman: 'Yîi-sìp', english: 'Twenty (20)', example: 'ยี่สิบห้า — Twenty-five' },
    { thai: 'ห้าสิบ', roman: 'Hâa-sìp', english: 'Fifty (50)', example: 'ห้าสิบบาท — Fifty baht' },
    { thai: 'ร้อย', roman: 'Rói', english: 'Hundred (100)', example: 'หนึ่งร้อย — One hundred' },
    { thai: 'พัน', roman: 'Phan', english: 'Thousand', example: 'หนึ่งพัน — One thousand' },
  ],
  food: [
    { thai: 'ข้าว', roman: 'Khâao', english: 'Rice', example: 'ข้าวผัด — Fried rice' },
    { thai: 'น้ำ', roman: 'Náam', english: 'Water', example: 'น้ำเย็น — Cold water' },
    { thai: 'อาหาร', roman: 'Aa-hǎan', english: 'Food', example: 'อาหารไทย — Thai food' },
    { thai: 'เผ็ด', roman: 'Phèt', english: 'Spicy', example: 'ไม่เผ็ด — Not spicy' },
    { thai: 'อร่อย', roman: 'À-ròi', english: 'Delicious', example: 'อร่อยมาก — Very delicious' },
    { thai: 'ผัดไทย', roman: 'Phàt-thai', english: 'Pad Thai', example: 'ผัดไทยไม่ใส่ถั่ว — Pad Thai without peanuts' },
    { thai: 'ส้มตำ', roman: 'Sôm-tam', english: 'Papaya salad', example: 'ส้มตำไทย — Thai papaya salad' },
    { thai: 'กาแฟ', roman: 'Kaa-fae', english: 'Coffee', example: 'กาแฟเย็น — Iced coffee' },
    { thai: 'หมู', roman: 'Mǔu', english: 'Pork', example: 'หมูกรอบ — Crispy pork' },
    { thai: 'ไก่', roman: 'Kài', english: 'Chicken', example: 'ไก่ทอด — Fried chicken' },
    { thai: 'ปลา', roman: 'Plaa', english: 'Fish', example: 'ปลาทอด — Fried fish' },
    { thai: 'ต้มยำ', roman: 'Tôm-yam', english: 'Tom Yum soup', example: 'ต้มยำกุ้ง — Spicy prawn soup' },
    { thai: 'หวาน', roman: 'Wǎan', english: 'Sweet', example: 'หวานมาก — Very sweet' },
    { thai: 'เค็ม', roman: 'Khem', english: 'Salty', example: 'เค็มไป — Too salty' },
    { thai: 'ก๋วยเตี๋ยว', roman: 'Gǔay-tǐaw', english: 'Noodles', example: 'ก๋วยเตี๋ยวเส้นใหญ่ — Wide noodles' },
    { thai: 'ข้าวมันไก่', roman: 'Khâao-man-kài', english: 'Chicken rice', example: 'ข้าวมันไก่อร่อยมาก — The chicken rice is delicious' },
    { thai: 'มะม่วง', roman: 'Má-mûang', english: 'Mango', example: 'มะม่วงสุก — Ripe mango' },
    { thai: 'กล้วย', roman: 'Glûay', english: 'Banana', example: 'กล้วยหอม — Fragrant banana' },
    { thai: 'ชา', roman: 'Chaa', english: 'Tea', example: 'ชาเย็น — Iced tea' },
  ],
  tones: [
    { thai: 'มา', roman: 'Maa (mid)', english: 'To come', example: 'คุณมาจากไหน — Where do you come from?' },
    { thai: 'หมา', roman: 'Mǎa (rising)', english: 'Dog', example: 'หมาน่ารัก — Cute dog' },
    { thai: 'ม้า', roman: 'Máa (high)', english: 'Horse', example: 'ม้าวิ่ง — The horse runs' },
    { thai: 'มาก', roman: 'Mâak (falling)', english: 'Much / Many', example: 'ขอบคุณมาก — Thank you very much' },
    { thai: 'ไม่', roman: 'Mâi (falling)', english: 'Not / No', example: 'ไม่เป็นไร — Never mind' },
    { thai: 'ใหม่', roman: 'Màai (low)', english: 'New / Again', example: 'ใหม่หมด — Brand new' },
    { thai: 'ป่า', roman: 'Pàa (low)', english: 'Forest', example: 'ป่าไม้ — Woodland' },
    { thai: 'ปา', roman: 'Paa (mid)', english: 'To throw', example: 'ปาลูกบอล — Throw a ball' },
    { thai: 'ข้าว', roman: 'Khâao (falling)', english: 'Rice', example: 'กินข้าว — Eat rice' },
    { thai: 'เข่า', roman: 'Khào (low)', english: 'Knee', example: 'เจ็บเข่า — Sore knee' },
    { thai: 'นา', roman: 'Naa (mid)', english: 'Rice field', example: 'ทุ่งนา — Rice paddy field' },
    { thai: 'หน้า', roman: 'Nâa (falling)', english: 'Face / Front', example: 'หน้าตาดี — Good-looking' },
    { thai: 'น้า', roman: 'Náa (high)', english: 'Aunt / Uncle (younger)', example: 'น้าสาว — Younger aunt' },
    { thai: 'หนา', roman: 'Nǎa (rising)', english: 'Thick', example: 'หนามาก — Very thick' },
  ],
  travel: [
    { thai: 'ไป', roman: 'Pai', english: 'To go', example: 'ไปไหน — Where are you going?' },
    { thai: 'มาจากไหน', roman: 'Maa-jàak-nǎi', english: 'Where from?', example: 'คุณมาจากไหน — Where are you from?' },
    { thai: 'โรงแรม', roman: 'Roong-raem', english: 'Hotel', example: 'โรงแรมอยู่ที่ไหน — Where is the hotel?' },
    { thai: 'สนามบิน', roman: 'Sà-nǎam-bin', english: 'Airport', example: 'ไปสนามบิน — Going to the airport' },
    { thai: 'แท็กซี่', roman: 'Táek-sîi', english: 'Taxi', example: 'เรียกแท็กซี่ — Call a taxi' },
    { thai: 'รถไฟ', roman: 'Rót-fai', english: 'Train', example: 'ขึ้นรถไฟ — Get on the train' },
    { thai: 'รถเมล์', roman: 'Rót-mee', english: 'Bus', example: 'ขึ้นรถเมล์ — Get on the bus' },
    { thai: 'เรือ', roman: 'Ruea', english: 'Boat', example: 'นั่งเรือ — Ride a boat' },
    { thai: 'ขวา', roman: 'Khwǎa', english: 'Right', example: 'เลี้ยวขวา — Turn right' },
    { thai: 'ซ้าย', roman: 'Sáai', english: 'Left', example: 'เลี้ยวซ้าย — Turn left' },
    { thai: 'ตรงไป', roman: 'Trong-pai', english: 'Go straight', example: 'ตรงไปแล้วเลี้ยวขวา — Go straight then turn right' },
    { thai: 'ราคาเท่าไหร่', roman: 'Raa-khaa-thâo-rài', english: 'How much?', example: 'ราคาเท่าไหร่ครับ — How much is this?' },
    { thai: 'ห้องน้ำ', roman: 'Hông-náam', english: 'Bathroom', example: 'ห้องน้ำอยู่ที่ไหน — Where is the bathroom?' },
    { thai: 'ช่วยด้วย', roman: 'Chûay-dûay', english: 'Help me!', example: 'ช่วยด้วยครับ — Please help me!' },
    { thai: 'ตลาด', roman: 'Tà-làat', english: 'Market', example: 'ไปตลาด — Going to the market' },
    { thai: 'วัด', roman: 'Wát', english: 'Temple', example: 'วัดพระธาตุ — Doi Suthep Temple' },
    { thai: 'แผนที่', roman: 'Phǎen-thîi', english: 'Map', example: 'ขอดูแผนที่ได้ไหม — Can I see the map?' },
    { thai: 'จอดรถ', roman: 'Jòt-rót', english: 'Park the car', example: 'จอดรถที่นี่ได้ไหม — Can I park here?' },
  ],
  dailylife: [
    { thai: 'บ้าน', roman: 'Bâan', english: 'House / Home', example: 'อยู่บ้าน — Stay at home' },
    { thai: 'ทำงาน', roman: 'Tham-ngaan', english: 'To work', example: 'ไปทำงาน — Go to work' },
    { thai: 'นอน', roman: 'Nawn', english: 'To sleep', example: 'นอนหลับ — Go to sleep' },
    { thai: 'กิน', roman: 'Kin', english: 'To eat', example: 'กินข้าว — Eat (a meal)' },
    { thai: 'ดื่ม', roman: 'Dùem', english: 'To drink', example: 'ดื่มน้ำ — Drink water' },
    { thai: 'รัก', roman: 'Rák', english: 'To love', example: 'ฉันรักคุณ — I love you' },
    { thai: 'ชอบ', roman: 'Châwp', english: 'To like', example: 'ชอบอาหารไทย — I like Thai food' },
    { thai: 'เบื่อ', roman: 'Bùea', english: 'Bored', example: 'เบื่อมาก — So bored' },
    { thai: 'เหนื่อย', roman: 'Nùeay', english: 'Tired', example: 'เหนื่อยมาก — Very tired' },
    { thai: 'สนุก', roman: 'Sà-nùk', english: 'Fun', example: 'สนุกมาก — So much fun!' },
    { thai: 'ดี', roman: 'Dii', english: 'Good', example: 'ดีมาก — Very good' },
    { thai: 'แย่', roman: 'Yâe', english: 'Bad', example: 'แย่จัง — That\'s bad' },
    { thai: 'เร็ว', roman: 'Rew', english: 'Fast', example: 'เร็วมาก — Very fast' },
    { thai: 'ช้า', roman: 'Cháa', english: 'Slow', example: 'ช้าลง — Slow down' },
    { thai: 'เดิน', roman: 'Dern', english: 'To walk', example: 'เดินเล่น — Go for a walk' },
    { thai: 'วิ่ง', roman: 'Wîng', english: 'To run', example: 'วิ่งออกกำลังกาย — Run for exercise' },
    { thai: 'อ่าน', roman: 'Àan', english: 'To read', example: 'อ่านหนังสือ — Read a book' },
    { thai: 'เขียน', roman: 'Khǐan', english: 'To write', example: 'เขียนจดหมาย — Write a letter' },
    { thai: 'โทรศัพท์', roman: 'Thoo-rá-sàp', english: 'Phone / Call', example: 'โทรศัพท์มาหาฉัน — Call me' },
  ],
  colors: [
    { thai: 'สีแดง', roman: 'Sǐi-daeng', english: 'Red', example: 'เสื้อสีแดง — Red shirt' },
    { thai: 'สีน้ำเงิน', roman: 'Sǐi-náam-ngern', english: 'Blue', example: 'ฟ้าสีน้ำเงิน — Blue sky' },
    { thai: 'สีเหลือง', roman: 'Sǐi-lǔeang', english: 'Yellow', example: 'ดอกไม้สีเหลือง — Yellow flower' },
    { thai: 'สีเขียว', roman: 'Sǐi-khǐaw', english: 'Green', example: 'ต้นไม้สีเขียว — Green tree' },
    { thai: 'สีดำ', roman: 'Sǐi-dam', english: 'Black', example: 'แมวสีดำ — Black cat' },
    { thai: 'สีขาว', roman: 'Sǐi-khǎao', english: 'White', example: 'เสื้อสีขาว — White shirt' },
    { thai: 'สีส้ม', roman: 'Sǐi-sôm', english: 'Orange', example: 'ส้มสีส้ม — Orange fruit' },
    { thai: 'สีชมพู', roman: 'Sǐi-chom-phuu', english: 'Pink', example: 'กุหลาบสีชมพู — Pink rose' },
    { thai: 'สีม่วง', roman: 'Sǐi-mûang', english: 'Purple', example: 'ดอกสีม่วง — Purple flower' },
    { thai: 'สีน้ำตาล', roman: 'Sǐi-náam-taan', english: 'Brown', example: 'ช็อกโกแลตสีน้ำตาล — Brown chocolate' },
    { thai: 'สีเทา', roman: 'Sǐi-thao', english: 'Grey', example: 'เมฆสีเทา — Grey clouds' },
    { thai: 'สีฟ้า', roman: 'Sǐi-fáa', english: 'Sky blue', example: 'ท้องฟ้าสีฟ้า — Sky blue sky' },
  ],
  shopping: [
    { thai: 'ซื้อ', roman: 'Súue', english: 'To buy', example: 'อยากซื้อ — I want to buy' },
    { thai: 'ขาย', roman: 'Khǎai', english: 'To sell', example: 'ขายอะไร — What do you sell?' },
    { thai: 'ราคา', roman: 'Raa-khaa', english: 'Price', example: 'ราคาเท่าไหร่ — What is the price?' },
    { thai: 'แพง', roman: 'Phaeng', english: 'Expensive', example: 'แพงไป — Too expensive' },
    { thai: 'ถูก', roman: 'Thùuk', english: 'Cheap', example: 'ถูกมาก — Very cheap' },
    { thai: 'ลด', roman: 'Lót', english: 'Discount / Reduce', example: 'ลดราคาได้ไหม — Can you give a discount?' },
    { thai: 'เงินสด', roman: 'Ngern-sòt', english: 'Cash', example: 'จ่ายเงินสด — Pay by cash' },
    { thai: 'บัตรเครดิต', roman: 'Bàt-khree-dìt', english: 'Credit card', example: 'รับบัตรเครดิตไหม — Do you accept credit cards?' },
    { thai: 'เงินทอน', roman: 'Ngern-thawn', english: 'Change (money)', example: 'ขอเงินทอนด้วย — Can I have my change?' },
    { thai: 'ถุง', roman: 'Thǔng', english: 'Bag', example: 'ขอถุงด้วย — Can I have a bag?' },
    { thai: 'ลองได้ไหม', roman: 'Laawng-dâai-mǎi', english: 'Can I try it on?', example: 'ลองได้ไหมครับ — Can I try this on?' },
    { thai: 'มีขนาดอื่นไหม', roman: 'Mii-khà-nàat-ùen-mǎi', english: 'Other sizes?', example: 'มีขนาดใหญ่กว่านี้ไหม — Do you have a bigger size?' },
    { thai: 'อยากได้', roman: 'Yàak-dâai', english: 'I want / I\'d like', example: 'อยากได้อันนี้ — I\'d like this one' },
    { thai: 'เอาอันนี้', roman: 'Ao-an-níi', english: 'I\'ll take this one', example: 'เอาอันนี้เลย — I\'ll take this one' },
  ],
};

const CAT_LABELS: Record<DeckKey, string> = {
  greetings: '👋 Greetings',
  numbers: '🔢 Numbers',
  food: '🍜 Food',
  tones: '🎵 Tones',
  travel: '✈️ Travel',
  dailylife: '🏠 Daily Life',
  colors: '🎨 Colors',
  shopping: '🛒 Shopping',
};

const DECK_KEYS = Object.keys(DECK) as DeckKey[];
const TOTAL_CARDS = DECK_KEYS.reduce((s, k) => s + DECK[k].length, 0);

export default function FlashcardPage() {
  const [category, setCategory] = useState<DeckKey>('greetings');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef(0);
  const touchHandled = useRef(false);

  const cards = DECK[category];
  const card = cards[index];
  const knownInCategory = Array.from(known).filter(k => k.startsWith(category + '_')).length;

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2000);
  }, []);

  const goNext = useCallback(() => {
    setFlipped(false);
    setIndex(i => (i + 1) % DECK[category].length);
  }, [category]);

  const goPrev = useCallback(() => {
    setFlipped(false);
    setIndex(i => (i - 1 + DECK[category].length) % DECK[category].length);
  }, [category]);

  const markKnown = useCallback(() => {
    const key = `${category}_${index}`;
    setKnown(prev => { const n = new Set(prev); n.add(key); return n; });
    showToast('✓ Marked as known!');
    setFlipped(false);
    setIndex(i => (i + 1) % DECK[category].length);
  }, [category, index, showToast]);

  const markAgain = useCallback(() => {
    const key = `${category}_${index}`;
    setKnown(prev => { const n = new Set(prev); n.delete(key); return n; });
    showToast('Keep practising!');
    setFlipped(false);
    setIndex(i => (i + 1) % DECK[category].length);
  }, [category, index, showToast]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        setFlipped(f => !f);
      }
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Enter') markKnown();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, markKnown]);

  function handleCategoryChange(cat: DeckKey) {
    setCategory(cat);
    setIndex(0);
    setFlipped(false);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchHandled.current = false;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchHandled.current = true;
    if (Math.abs(dx) < 30) {
      setFlipped(f => !f);
    } else if (dx < 0) {
      goNext();
    } else {
      goPrev();
    }
  }

  function handleCardClick() {
    if (touchHandled.current) { touchHandled.current = false; return; }
    setFlipped(f => !f);
  }

  const progress = ((index + 1) / cards.length) * 100;

  return (
    <>
      <section className="page-hero">
        <div className="container text-center">
          <p className="eyebrow" style={{ marginBottom: '12px' }}>Free · {TOTAL_CARDS} Cards · 8 Categories</p>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(36px,5vw,58px)', marginBottom: '16px' }}>Thai Flashcards</h1>
          <div className="accent-bar center" style={{ marginTop: '20px' }}><span className="accent-line"></span><span className="accent-dot"></span></div>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '18px', maxWidth: '520px', margin: '24px auto 0', lineHeight: '1.7' }}>
            Tap or click a card to flip it. Use arrow keys to navigate, Space to flip, and Enter to mark as known.
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container" style={{ maxWidth: '860px' }}>

          {/* Stats bar */}
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
              {[
                { label: 'Total Cards', value: TOTAL_CARDS, icon: '🗂️' },
                { label: 'Known This Deck', value: `${knownInCategory} / ${cards.length}`, icon: '✅' },
                { label: 'Total Known', value: known.size, icon: '⭐' },
              ].map(({ label, value, icon }) => (
                <div key={label} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '20px 24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', marginBottom: '4px' }}>{icon}</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '28px', fontWeight: 800, color: 'var(--dark)' }}>{value}</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600, marginTop: '2px' }}>{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Category buttons */}
          <FadeIn>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '32px' }}>
              {DECK_KEYS.map(cat => (
                <button key={cat} onClick={() => handleCategoryChange(cat)}
                  style={{ padding: '8px 18px', borderRadius: '100px', border: '1.5px solid', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all .2s',
                    borderColor: category === cat ? 'var(--blue)' : 'var(--border)',
                    background: category === cat ? 'var(--blue)' : 'var(--white)',
                    color: category === cat ? 'var(--white)' : 'var(--mid)',
                  }}>
                  {CAT_LABELS[cat]}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Category label & progress */}
          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--mid)' }}>
                {CAT_LABELS[category]} · {cards.length} cards
              </span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--dark)' }}>{index + 1} / {cards.length}</span>
            </div>
            <div style={{ height: '6px', background: 'var(--border)', borderRadius: '100px', marginBottom: '24px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, var(--yellow), var(--blue))', borderRadius: '100px', transition: 'width .3s' }} />
            </div>
          </FadeIn>

          {/* Flashcard */}
          <FadeIn>
            <div style={{ perspective: '1200px', marginBottom: '24px' }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}>
              <div onClick={handleCardClick}
                style={{ position: 'relative', height: '320px', cursor: 'pointer', transformStyle: 'preserve-3d', transition: 'transform .6s cubic-bezier(.4,0,.2,1)', transform: flipped ? 'rotateY(180deg)' : 'none' }}>

                {/* Front */}
                <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', background: 'var(--dark)', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,.18)', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
                  <div style={{ fontFamily: "'Noto Sans Thai', sans-serif", fontSize: 'clamp(52px,8vw,80px)', color: 'var(--white)', lineHeight: 1.2, marginBottom: '16px', textAlign: 'center', position: 'relative', zIndex: 1 }}>{card.thai}</div>
                  <div style={{ fontSize: '18px', color: 'rgba(255,255,255,.55)', fontStyle: 'italic', marginBottom: '24px', position: 'relative', zIndex: 1 }}>{card.roman}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.3)', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /></svg>
                    Tap to reveal meaning
                  </div>
                </div>

                {/* Back */}
                <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'linear-gradient(135deg, var(--blue) 0%, #0d2560 100%)', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', boxShadow: '0 20px 60px rgba(37,99,235,.25)', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(26px,4vw,38px)', fontWeight: 800, color: 'var(--white)', marginBottom: '10px', textAlign: 'center', position: 'relative', zIndex: 1 }}>{card.english}</div>
                  <div style={{ fontSize: '16px', color: 'rgba(255,255,255,.6)', fontStyle: 'italic', marginBottom: '20px', position: 'relative', zIndex: 1 }}>{card.roman}</div>
                  <div style={{ background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)', borderRadius: '12px', padding: '14px 20px', fontSize: '14px', color: 'rgba(255,255,255,.85)', lineHeight: '1.6', textAlign: 'center', maxWidth: '480px', position: 'relative', zIndex: 1 }}>
                    {card.example}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Navigation */}
          <FadeIn>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
              <button onClick={goPrev} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1.5px solid var(--border)', background: 'var(--white)', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'inherit'; }}>
                ←
              </button>
              <button onClick={() => setFlipped(f => !f)} style={{ flex: 1, maxWidth: '200px', padding: '12px 24px', borderRadius: '100px', border: '1.5px solid var(--border)', background: 'var(--white)', fontSize: '14px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, cursor: 'pointer', color: 'var(--mid)', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--mid)'; }}>
                🔄 Flip
              </button>
              <button onClick={goNext} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1.5px solid var(--border)', background: 'var(--white)', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'inherit'; }}>
                →
              </button>
            </div>
          </FadeIn>

          {/* Known / Again */}
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
              <button onClick={markAgain} style={{ padding: '14px', borderRadius: 'var(--r)', border: '1.5px solid #fca5a5', background: '#fef2f2', color: '#dc2626', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 700, cursor: 'pointer', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fee2e2'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fef2f2'; }}>
                🔁 Again
              </button>
              <button onClick={markKnown} style={{ padding: '14px', borderRadius: 'var(--r)', border: '1.5px solid #86efac', background: '#f0fdf4', color: '#16a34a', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 700, cursor: 'pointer', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#dcfce7'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f0fdf4'; }}>
                ✅ Known
              </button>
            </div>
          </FadeIn>

          {/* Keyboard hint */}
          <FadeIn>
            <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--muted)', lineHeight: '1.8' }}>
              ⌨️ <strong>Keyboard:</strong> Space / ↑↓ = flip &nbsp;·&nbsp; ← → = navigate &nbsp;·&nbsp; Enter = mark known
            </div>
          </FadeIn>

        </div>
      </section>

      <section className="section-pad bg-blue-gradient">
        <FadeIn className="container text-center">
          <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Want to Go Deeper?</p>
          <h2 className="section-title" style={{ color: 'var(--white)', marginBottom: '16px' }}>Learn Thai the Right Way with Kru Mind</h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.7)', maxWidth: '540px', margin: '0 auto 36px', lineHeight: '1.7' }}>Flashcards are a great start — but nothing beats a real teacher. Join a live group class or grab the Speaking &amp; Listening book to build real Thai from the ground up.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/private-class#waitlist" className="btn btn-yellow btn-lg">Join Group Classes</Link>
            <Link href="/books" className="btn btn-outline-white btn-lg">Get the Book</Link>
          </div>
        </FadeIn>
      </section>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)', background: 'var(--dark)', color: 'var(--white)', padding: '12px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, zIndex: 9999, boxShadow: '0 8px 32px rgba(0,0,0,.25)', pointerEvents: 'none' }}>
          {toast}
        </div>
      )}
    </>
  );
}
