/* =============================================
   Learn Thai with Mind — Flashcard App
   ============================================= */

const DECK = {
  greetings: [
    { thai: 'สวัสดี',          roman: 'Sà-wàt-dii',             english: 'Hello / Goodbye',          example: 'สวัสดีครับ / ค่ะ — polite hello' },
    { thai: 'ขอบคุณ',          roman: 'Khàwp-khun',              english: 'Thank you',                example: 'ขอบคุณมาก — Thank you very much' },
    { thai: 'ใช่',              roman: 'Châi',                    english: 'Yes',                      example: 'ใช่ครับ — Yes (polite, male)' },
    { thai: 'ไม่ใช่',          roman: 'Mâi châi',                english: 'No / Not',                 example: 'ไม่ใช่ครับ — No (polite, male)' },
    { thai: 'ขอโทษ',          roman: 'Khǎaw-thôht',             english: 'Sorry / Excuse me',        example: 'ขอโทษนะครับ — I\'m sorry' },
    { thai: 'ไม่เป็นไร',      roman: 'Mâi pen rai',             english: 'Never mind / No worries',  example: 'ไม่เป็นไร — It\'s okay!' },
    { thai: 'แล้วพบกัน',      roman: 'Láew phóp kan',           english: 'See you later',            example: 'แล้วพบกันใหม่ — See you again' },
    { thai: 'ยินดีที่รู้จัก',  roman: 'Yin-dii thîi rúu-jàk',  english: 'Nice to meet you',         example: 'ยินดีที่รู้จักครับ — Nice to meet you' },
    { thai: 'สบายดีไหม',      roman: 'Sà-baai dii mǎi',         english: 'How are you?',             example: 'คุณสบายดีไหม — How are you?' },
    { thai: 'สบายดี',          roman: 'Sà-baai dii',             english: 'I\'m fine',                example: 'สบายดีขอบคุณ — Fine, thank you' },
    { thai: 'ชื่ออะไร',        roman: 'Chûue à-rai',             english: 'What is your name?',       example: 'คุณชื่ออะไร — What is your name?' },
    { thai: 'ฉันชื่อ...',      roman: 'Chǎn chûue...',           english: 'My name is...',            example: 'ฉันชื่อมายด์ — My name is Mind' },
    { thai: 'โปรด',            roman: 'Prôht',                   english: 'Please',                   example: 'โปรดช่วยด้วย — Please help' },
    { thai: 'โชคดี',           roman: 'Chôhk dii',               english: 'Good luck',                example: 'โชคดีนะ — Good luck!' },
    { thai: 'ยินดีด้วย',       roman: 'Yin-dii dûay',            english: 'Congratulations',          example: 'ยินดีด้วยนะ — Congratulations!' },
    { thai: 'ดีใจ',            roman: 'Dii-jai',                 english: 'Happy / Glad',             example: 'ดีใจมากเลย — I\'m so happy!' },
  ],
  numbers: [
    { thai: 'ศูนย์',   roman: 'Sǔun',      english: 'Zero (0)',      example: 'ศูนย์บาท — Zero baht' },
    { thai: 'หนึ่ง',   roman: 'Nùeng',     english: 'One (1)',       example: 'หนึ่งชิ้น — One piece' },
    { thai: 'สอง',     roman: 'Sǎawng',    english: 'Two (2)',       example: 'สองคน — Two people' },
    { thai: 'สาม',     roman: 'Sǎam',      english: 'Three (3)',     example: 'สามวัน — Three days' },
    { thai: 'สี่',     roman: 'Sìi',       english: 'Four (4)',      example: 'สี่โมงเช้า — 4 in the morning' },
    { thai: 'ห้า',     roman: 'Hâa',       english: 'Five (5)',      example: 'ห้าร้อย — Five hundred' },
    { thai: 'หก',      roman: 'Hòk',       english: 'Six (6)',       example: 'หกโมงเย็น — 6 in the evening' },
    { thai: 'เจ็ด',   roman: 'Jèt',       english: 'Seven (7)',     example: 'เจ็ดวัน — Seven days' },
    { thai: 'แปด',    roman: 'Pàaet',     english: 'Eight (8)',     example: 'แปดคน — Eight people' },
    { thai: 'เก้า',   roman: 'Gâo',       english: 'Nine (9)',      example: 'เก้าโมง — Nine o\'clock' },
    { thai: 'สิบ',    roman: 'Sìp',       english: 'Ten (10)',      example: 'สิบบาท — Ten baht' },
    { thai: 'สิบเอ็ด', roman: 'Sìp-èt',   english: 'Eleven (11)',   example: 'สิบเอ็ดโมง — Eleven o\'clock' },
    { thai: 'สิบสอง', roman: 'Sìp-sǎawng', english: 'Twelve (12)',  example: 'สิบสองเดือน — Twelve months' },
    { thai: 'ยี่สิบ', roman: 'Yîi-sìp',   english: 'Twenty (20)',   example: 'ยี่สิบห้า — Twenty-five' },
    { thai: 'ห้าสิบ', roman: 'Hâa-sìp',   english: 'Fifty (50)',    example: 'ห้าสิบบาท — Fifty baht' },
    { thai: 'ร้อย',   roman: 'Rói',       english: 'Hundred (100)', example: 'หนึ่งร้อย — One hundred' },
    { thai: 'พัน',    roman: 'Phan',      english: 'Thousand',      example: 'หนึ่งพัน — One thousand' },
  ],
  food: [
    { thai: 'ข้าว',        roman: 'Khâao',       english: 'Rice',              example: 'ข้าวผัด — Fried rice' },
    { thai: 'น้ำ',         roman: 'Náam',        english: 'Water',             example: 'น้ำเย็น — Cold water' },
    { thai: 'อาหาร',      roman: 'Aa-hǎan',     english: 'Food',              example: 'อาหารไทย — Thai food' },
    { thai: 'เผ็ด',        roman: 'Phèt',        english: 'Spicy',             example: 'ไม่เผ็ด — Not spicy' },
    { thai: 'อร่อย',      roman: 'À-ròi',       english: 'Delicious',         example: 'อร่อยมาก — Very delicious' },
    { thai: 'ผัดไทย',     roman: 'Phàt-thai',   english: 'Pad Thai',          example: 'ผัดไทยไม่ใส่ถั่ว — Pad Thai without peanuts' },
    { thai: 'ส้มตำ',      roman: 'Sôm-tam',     english: 'Papaya salad',      example: 'ส้มตำไทย — Thai papaya salad' },
    { thai: 'กาแฟ',       roman: 'Kaa-fae',     english: 'Coffee',            example: 'กาแฟเย็น — Iced coffee' },
    { thai: 'หมู',        roman: 'Mǔu',         english: 'Pork',              example: 'หมูกรอบ — Crispy pork' },
    { thai: 'ไก่',        roman: 'Kài',         english: 'Chicken',           example: 'ไก่ทอด — Fried chicken' },
    { thai: 'ปลา',        roman: 'Plaa',        english: 'Fish',              example: 'ปลาทอด — Fried fish' },
    { thai: 'ต้มยำ',      roman: 'Tôm-yam',    english: 'Tom Yum soup',      example: 'ต้มยำกุ้ง — Spicy prawn soup' },
    { thai: 'หวาน',       roman: 'Wǎan',        english: 'Sweet',             example: 'หวานมาก — Very sweet' },
    { thai: 'เค็ม',       roman: 'Khem',        english: 'Salty',             example: 'เค็มไป — Too salty' },
    { thai: 'ก๋วยเตี๋ยว', roman: 'Gǔay-tǐaw',  english: 'Noodles',           example: 'ก๋วยเตี๋ยวเส้นใหญ่ — Wide noodles' },
    { thai: 'ข้าวมันไก่',  roman: 'Khâao-man-kài', english: 'Chicken rice',   example: 'ข้าวมันไก่อร่อยมาก — The chicken rice is delicious' },
    { thai: 'มะม่วง',     roman: 'Má-mûang',    english: 'Mango',             example: 'มะม่วงสุก — Ripe mango' },
    { thai: 'กล้วย',      roman: 'Glûay',       english: 'Banana',            example: 'กล้วยหอม — Fragrant banana' },
    { thai: 'ชา',         roman: 'Chaa',        english: 'Tea',               example: 'ชาเย็น — Iced tea' },
  ],
  tones: [
    { thai: 'มา',   roman: 'Maa (mid)',       english: 'To come',       example: 'คุณมาจากไหน — Where do you come from?' },
    { thai: 'หมา',  roman: 'Mǎa (rising)',    english: 'Dog',           example: 'หมาน่ารัก — Cute dog' },
    { thai: 'ม้า',  roman: 'Máa (high)',      english: 'Horse',         example: 'ม้าวิ่ง — The horse runs' },
    { thai: 'มาก',  roman: 'Mâak (falling)',  english: 'Much / Many',   example: 'ขอบคุณมาก — Thank you very much' },
    { thai: 'ไม่',  roman: 'Mâi (falling)',   english: 'Not / No',      example: 'ไม่เป็นไร — Never mind' },
    { thai: 'ใหม่', roman: 'Màai (low)',       english: 'New / Again',   example: 'ใหม่หมด — Brand new' },
    { thai: 'ป่า',  roman: 'Pàa (low)',        english: 'Forest',        example: 'ป่าไม้ — Woodland' },
    { thai: 'ปา',   roman: 'Paa (mid)',         english: 'To throw',      example: 'ปาลูกบอล — Throw a ball' },
    { thai: 'ข้าว', roman: 'Khâao (falling)',   english: 'Rice',          example: 'กินข้าว — Eat rice' },
    { thai: 'เข่า', roman: 'Khào (low)',         english: 'Knee',          example: 'เจ็บเข่า — Sore knee' },
    { thai: 'นา',   roman: 'Naa (mid)',           english: 'Rice field',    example: 'ทุ่งนา — Rice paddy field' },
    { thai: 'หน้า', roman: 'Nâa (falling)',       english: 'Face / Front',  example: 'หน้าตาดี — Good-looking' },
    { thai: 'น้า',  roman: 'Náa (high)',           english: 'Aunt / Uncle (younger)', example: 'น้าสาว — Younger aunt' },
    { thai: 'หนา',  roman: 'Nǎa (rising)',          english: 'Thick',        example: 'หนามาก — Very thick' },
  ],
  travel: [
    { thai: 'ไป',              roman: 'Pai',                english: 'To go',          example: 'ไปไหน — Where are you going?' },
    { thai: 'มาจากไหน',        roman: 'Maa-jàak-nǎi',      english: 'Where from?',    example: 'คุณมาจากไหน — Where are you from?' },
    { thai: 'โรงแรม',          roman: 'Roong-raem',         english: 'Hotel',          example: 'โรงแรมอยู่ที่ไหน — Where is the hotel?' },
    { thai: 'สนามบิน',         roman: 'Sà-nǎam-bin',        english: 'Airport',        example: 'ไปสนามบิน — Going to the airport' },
    { thai: 'แท็กซี่',         roman: 'Táek-sîi',           english: 'Taxi',           example: 'เรียกแท็กซี่ — Call a taxi' },
    { thai: 'รถไฟ',            roman: 'Rót-fai',            english: 'Train',          example: 'ขึ้นรถไฟ — Get on the train' },
    { thai: 'รถเมล์',          roman: 'Rót-mee',            english: 'Bus',            example: 'ขึ้นรถเมล์ — Get on the bus' },
    { thai: 'เรือ',             roman: 'Ruea',               english: 'Boat',           example: 'นั่งเรือ — Ride a boat' },
    { thai: 'ขวา',              roman: 'Khwǎa',             english: 'Right',          example: 'เลี้ยวขวา — Turn right' },
    { thai: 'ซ้าย',            roman: 'Sáai',              english: 'Left',           example: 'เลี้ยวซ้าย — Turn left' },
    { thai: 'ตรงไป',           roman: 'Trong-pai',          english: 'Go straight',    example: 'ตรงไปแล้วเลี้ยวขวา — Go straight then turn right' },
    { thai: 'ราคาเท่าไหร่',    roman: 'Raa-khaa-thâo-rài', english: 'How much?',      example: 'ราคาเท่าไหร่ครับ — How much is this?' },
    { thai: 'ห้องน้ำ',         roman: 'Hông-náam',          english: 'Bathroom',       example: 'ห้องน้ำอยู่ที่ไหน — Where is the bathroom?' },
    { thai: 'ช่วยด้วย',        roman: 'Chûay-dûay',         english: 'Help me!',       example: 'ช่วยด้วยครับ — Please help me!' },
    { thai: 'ตลาด',            roman: 'Tà-làat',            english: 'Market',         example: 'ไปตลาด — Going to the market' },
    { thai: 'วัด',              roman: 'Wát',               english: 'Temple',         example: 'วัดพระธาตุ — Doi Suthep Temple' },
    { thai: 'แผนที่',           roman: 'Phǎen-thîi',        english: 'Map',            example: 'ขอดูแผนที่ได้ไหม — Can I see the map?' },
    { thai: 'จอดรถ',           roman: 'Jòt-rót',           english: 'Park the car',   example: 'จอดรถที่นี่ได้ไหม — Can I park here?' },
  ],
  dailylife: [
    { thai: 'บ้าน',     roman: 'Bâan',        english: 'House / Home',   example: 'อยู่บ้าน — Stay at home' },
    { thai: 'ทำงาน',   roman: 'Tham-ngaan',  english: 'To work',        example: 'ไปทำงาน — Go to work' },
    { thai: 'นอน',     roman: 'Nawn',        english: 'To sleep',       example: 'นอนหลับ — Go to sleep' },
    { thai: 'กิน',     roman: 'Kin',         english: 'To eat',         example: 'กินข้าว — Eat (a meal)' },
    { thai: 'ดื่ม',    roman: 'Dùem',        english: 'To drink',       example: 'ดื่มน้ำ — Drink water' },
    { thai: 'รัก',     roman: 'Rák',         english: 'To love',        example: 'ฉันรักคุณ — I love you' },
    { thai: 'ชอบ',    roman: 'Châwp',       english: 'To like',        example: 'ชอบอาหารไทย — I like Thai food' },
    { thai: 'เบื่อ',   roman: 'Bùea',       english: 'Bored',          example: 'เบื่อมาก — So bored' },
    { thai: 'เหนื่อย', roman: 'Nùeay',     english: 'Tired',          example: 'เหนื่อยมาก — Very tired' },
    { thai: 'สนุก',   roman: 'Sà-nùk',     english: 'Fun',            example: 'สนุกมาก — So much fun!' },
    { thai: 'ดี',      roman: 'Dii',         english: 'Good',           example: 'ดีมาก — Very good' },
    { thai: 'แย่',    roman: 'Yâe',         english: 'Bad',            example: 'แย่จัง — That\'s bad' },
    { thai: 'เร็ว',   roman: 'Rew',         english: 'Fast',           example: 'เร็วมาก — Very fast' },
    { thai: 'ช้า',    roman: 'Cháa',        english: 'Slow',           example: 'ช้าลง — Slow down' },
    { thai: 'เดิน',   roman: 'Dern',        english: 'To walk',        example: 'เดินเล่น — Go for a walk' },
    { thai: 'วิ่ง',   roman: 'Wîng',        english: 'To run',         example: 'วิ่งออกกำลังกาย — Run for exercise' },
    { thai: 'อ่าน',   roman: 'Àan',         english: 'To read',        example: 'อ่านหนังสือ — Read a book' },
    { thai: 'เขียน',  roman: 'Khǐan',       english: 'To write',       example: 'เขียนจดหมาย — Write a letter' },
    { thai: 'โทรศัพท์', roman: 'Thoo-rá-sàp', english: 'Phone / Call', example: 'โทรศัพท์มาหาฉัน — Call me' },
  ],
  colors: [
    { thai: 'สีแดง',   roman: 'Sǐi-daeng',    english: 'Red',    example: 'เสื้อสีแดง — Red shirt' },
    { thai: 'สีน้ำเงิน', roman: 'Sǐi-náam-ngern', english: 'Blue', example: 'ฟ้าสีน้ำเงิน — Blue sky' },
    { thai: 'สีเหลือง', roman: 'Sǐi-lǔeang',  english: 'Yellow', example: 'ดอกไม้สีเหลือง — Yellow flower' },
    { thai: 'สีเขียว',  roman: 'Sǐi-khǐaw',   english: 'Green',  example: 'ต้นไม้สีเขียว — Green tree' },
    { thai: 'สีดำ',     roman: 'Sǐi-dam',      english: 'Black',  example: 'แมวสีดำ — Black cat' },
    { thai: 'สีขาว',    roman: 'Sǐi-khǎao',   english: 'White',  example: 'เสื้อสีขาว — White shirt' },
    { thai: 'สีส้ม',    roman: 'Sǐi-sôm',     english: 'Orange', example: 'ส้มสีส้ม — Orange fruit' },
    { thai: 'สีชมพู',   roman: 'Sǐi-chom-phuu', english: 'Pink', example: 'กุหลาบสีชมพู — Pink rose' },
    { thai: 'สีม่วง',   roman: 'Sǐi-mûang',   english: 'Purple', example: 'ดอกสีม่วง — Purple flower' },
    { thai: 'สีน้ำตาล', roman: 'Sǐi-náam-taan', english: 'Brown', example: 'ช็อกโกแลตสีน้ำตาล — Brown chocolate' },
    { thai: 'สีเทา',    roman: 'Sǐi-thao',    english: 'Grey',   example: 'เมฆสีเทา — Grey clouds' },
    { thai: 'สีฟ้า',    roman: 'Sǐi-fáa',     english: 'Sky blue', example: 'ท้องฟ้าสีฟ้า — Sky blue sky' },
  ],
  shopping: [
    { thai: 'ซื้อ',              roman: 'Súue',                english: 'To buy',              example: 'อยากซื้อ — I want to buy' },
    { thai: 'ขาย',               roman: 'Khǎai',              english: 'To sell',             example: 'ขายอะไร — What do you sell?' },
    { thai: 'ราคา',              roman: 'Raa-khaa',            english: 'Price',               example: 'ราคาเท่าไหร่ — What is the price?' },
    { thai: 'แพง',               roman: 'Phaeng',              english: 'Expensive',           example: 'แพงไป — Too expensive' },
    { thai: 'ถูก',               roman: 'Thùuk',               english: 'Cheap',               example: 'ถูกมาก — Very cheap' },
    { thai: 'ลด',                roman: 'Lót',                 english: 'Discount / Reduce',   example: 'ลดราคาได้ไหม — Can you give a discount?' },
    { thai: 'เงินสด',            roman: 'Ngern-sòt',           english: 'Cash',                example: 'จ่ายเงินสด — Pay by cash' },
    { thai: 'บัตรเครดิต',        roman: 'Bàt-khree-dìt',      english: 'Credit card',         example: 'รับบัตรเครดิตไหม — Do you accept credit cards?' },
    { thai: 'เงินทอน',           roman: 'Ngern-thawn',         english: 'Change (money)',      example: 'ขอเงินทอนด้วย — Can I have my change?' },
    { thai: 'ถุง',               roman: 'Thǔng',               english: 'Bag',                 example: 'ขอถุงด้วย — Can I have a bag?' },
    { thai: 'ลองได้ไหม',         roman: 'Laawng-dâai-mǎi',    english: 'Can I try it on?',    example: 'ลองได้ไหมครับ — Can I try this on?' },
    { thai: 'มีขนาดอื่นไหม',     roman: 'Mii-khà-nàat-ùen-mǎi', english: 'Other sizes?',     example: 'มีขนาดใหญ่กว่านี้ไหม — Do you have a bigger size?' },
    { thai: 'อยากได้',           roman: 'Yàak-dâai',           english: 'I want / I\'d like',  example: 'อยากได้อันนี้ — I\'d like this one' },
    { thai: 'เอาอันนี้',         roman: 'Ao-an-níi',           english: 'I\'ll take this one', example: 'เอาอันนี้เลย — I\'ll take this one' },
  ],
};

let currentCategory = 'greetings';
let currentIndex    = 0;
let isFlipped       = false;
let knownCards      = new Set();
let touchHandled    = false;   // prevents double-fire of touch + click

const CAT_LABELS = {
  greetings: '👋 Greetings',
  numbers:   '🔢 Numbers',
  food:      '🍜 Food',
  tones:     '🎵 Tones',
  travel:    '✈️ Travel',
  dailylife: '🏠 Daily Life',
  colors:    '🎨 Colors',
  shopping:  '🛒 Shopping',
};

function getCards() { return DECK[currentCategory]; }

function totalCards() {
  return Object.values(DECK).reduce((s, arr) => s + arr.length, 0);
}

function renderCard() {
  const cards      = getCards();
  const card       = cards[currentIndex];
  const fcEl       = document.getElementById('flashcard');
  const frontThai  = document.getElementById('fc-thai');
  const frontRoman = document.getElementById('fc-roman');
  const backEng    = document.getElementById('fc-english');
  const backEx     = document.getElementById('fc-example');
  const backRoman  = document.getElementById('fc-roman-back');
  const progress   = document.getElementById('fc-progress');

  if (!fcEl || !card) return;

  // Reset flip state
  isFlipped = false;
  fcEl.classList.remove('flipped');

  // Populate content
  if (frontThai)  frontThai.textContent  = card.thai;
  if (frontRoman) frontRoman.textContent = card.roman;
  if (backEng)    backEng.textContent    = card.english;
  if (backEx)     backEx.textContent     = card.example;
  if (backRoman)  backRoman.textContent  = card.roman;

  // Progress counter
  if (progress) progress.textContent = `${currentIndex + 1} / ${cards.length}`;

  // Progress bar fill
  const bar = document.getElementById('fc-progress-bar');
  if (bar) bar.style.width = ((currentIndex + 1) / cards.length * 100) + '%';

  // Known count for this category
  const knownCount = [...knownCards].filter(k => k.startsWith(currentCategory + '_')).length;
  const knownCountEl = document.getElementById('fc-known-count');
  if (knownCountEl) knownCountEl.textContent = `${knownCount} of ${cards.length} known in this deck`;

  // Total known stat
  const knownTotal = document.getElementById('fc-known-total');
  if (knownTotal) knownTotal.textContent = knownCards.size;

  // Total cards stat
  const totalEl = document.getElementById('fc-total-cards');
  if (totalEl) totalEl.textContent = totalCards();

  // Category label
  const catLabel = document.getElementById('category-display');
  if (catLabel) catLabel.textContent =
    (CAT_LABELS[currentCategory] || currentCategory) + ` (${cards.length} cards)`;
}

function flipCard() {
  const fcEl = document.getElementById('flashcard');
  if (!fcEl) return;
  isFlipped = !isFlipped;
  fcEl.classList.toggle('flipped', isFlipped);
}

function nextCard() {
  currentIndex = (currentIndex + 1) % getCards().length;
  renderCard();
}

function prevCard() {
  currentIndex = (currentIndex - 1 + getCards().length) % getCards().length;
  renderCard();
}

function markKnown() {
  knownCards.add(`${currentCategory}_${currentIndex}`);
  if (window.showToast) showToast('✓ Marked as known!');
  nextCard();
}

function markAgain() {
  knownCards.delete(`${currentCategory}_${currentIndex}`);
  if (window.showToast) showToast('Keep practising!');
  nextCard();
}

function setCategory(cat) {
  if (!DECK[cat]) return;
  currentCategory = cat;
  currentIndex    = 0;
  isFlipped       = false;
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === cat);
  });
  renderCard();
}

// ── Keyboard shortcuts ──
document.addEventListener('keydown', e => {
  if (!document.getElementById('flashcard')) return;
  if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault(); flipCard();
  }
  if (e.key === 'ArrowRight') nextCard();
  if (e.key === 'ArrowLeft')  prevCard();
  if (e.key === 'Enter')      markKnown();
});

// ── Boot ──
document.addEventListener('DOMContentLoaded', () => {
  const fc = document.getElementById('flashcard');
  if (!fc) return;

  // Touch — swipe to navigate, tap to flip
  // Set touchHandled flag to prevent the synthetic click from double-firing
  fc.addEventListener('touchstart', e => {
    touchHandled = false;
    fc._touchStartX = e.touches[0].clientX;
  }, { passive: true });

  fc.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - (fc._touchStartX || 0);
    touchHandled = true;   // mark as handled — block the upcoming click
    if (Math.abs(dx) < 30) {
      flipCard();
    } else if (dx < 0) {
      nextCard();
    } else {
      prevCard();
    }
  });

  // Click — only fires on desktop (touchend sets touchHandled to block mobile duplicate)
  fc.addEventListener('click', () => {
    if (touchHandled) { touchHandled = false; return; }
    flipCard();
  });

  // Navigation buttons
  document.getElementById('fc-prev')?.addEventListener('click',  prevCard);
  document.getElementById('fc-next')?.addEventListener('click',  nextCard);
  document.getElementById('fc-known')?.addEventListener('click', markKnown);
  document.getElementById('fc-again')?.addEventListener('click', markAgain);

  // Category buttons
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => setCategory(btn.dataset.cat));
  });

  // Initial render
  renderCard();
});
