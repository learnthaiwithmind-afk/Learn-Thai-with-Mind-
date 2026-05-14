/* =============================================
   Learn Thai with Mind — Flashcard App
   ============================================= */

const DECK = {
  greetings: [
    { thai: 'สวัสดี',         roman: 'Sawasdee',               english: 'Hello / Goodbye',         example: 'สวัสดีครับ / ค่ะ — polite hello' },
    { thai: 'ขอบคุณ',         roman: 'Khob khun',               english: 'Thank you',               example: 'ขอบคุณมาก — Thank you very much' },
    { thai: 'ใช่',             roman: 'Châi',                    english: 'Yes',                     example: 'ใช่ครับ — Yes (polite, male)' },
    { thai: 'ไม่ใช่',         roman: 'Mâi châi',                english: 'No / Not',                example: 'ไม่ใช่ครับ — No (polite, male)' },
    { thai: 'โปรด',           roman: 'Prôht',                   english: 'Please',                  example: 'โปรดช่วยด้วย — Please help' },
    { thai: 'ขอโทษ',         roman: 'Khǎw thôht',              english: 'Sorry / Excuse me',       example: 'ขอโทษนะครับ — I\'m sorry' },
    { thai: 'แล้วพบกัน',     roman: 'Láew phóp kan',           english: 'See you later',           example: 'แล้วพบกันใหม่ — See you again' },
    { thai: 'ยินดีที่รู้จัก', roman: 'Yin dii thîi rúu jàk',  english: 'Nice to meet you',        example: 'ยินดีที่รู้จักครับ — Nice to meet you' },
    { thai: 'สบายดีไหม',     roman: 'Sa-baai dii mǎi',         english: 'How are you?',            example: 'คุณสบายดีไหม — How are you?' },
    { thai: 'สบายดี',         roman: 'Sa-baai dii',             english: 'I\'m fine',               example: 'สบายดีขอบคุณ — Fine, thank you' },
    { thai: 'ชื่ออะไร',       roman: 'Chûe a-rai',              english: 'What is your name?',      example: 'คุณชื่ออะไร — What is your name?' },
    { thai: 'ไม่เป็นไร',     roman: 'Mâi pen rai',             english: 'Never mind / No worries', example: 'ไม่เป็นไร — It\'s okay!' },
  ],
  numbers: [
    { thai: 'หนึ่ง',   roman: 'Nùeng',    english: 'One (1)',       example: 'หนึ่งชิ้น — One piece' },
    { thai: 'สอง',     roman: 'Sǎawng',   english: 'Two (2)',       example: 'สองคน — Two people' },
    { thai: 'สาม',     roman: 'Sǎam',     english: 'Three (3)',     example: 'สามวัน — Three days' },
    { thai: 'สี่',     roman: 'Sìi',      english: 'Four (4)',      example: 'สี่โมงเช้า — 4 in the morning' },
    { thai: 'ห้า',     roman: 'Hâa',      english: 'Five (5)',      example: 'ห้าร้อย — Five hundred' },
    { thai: 'หก',      roman: 'Hòk',      english: 'Six (6)',       example: 'หกโมงเย็น — 6 in the evening' },
    { thai: 'เจ็ด',   roman: 'Jèt',      english: 'Seven (7)',     example: 'เจ็ดวัน — Seven days' },
    { thai: 'แปด',    roman: 'Pàaet',    english: 'Eight (8)',     example: 'แปดคน — Eight people' },
    { thai: 'เก้า',   roman: 'Gâo',      english: 'Nine (9)',      example: 'เก้าโมง — Nine o\'clock' },
    { thai: 'สิบ',    roman: 'Sìp',      english: 'Ten (10)',      example: 'สิบบาท — Ten baht' },
    { thai: 'ยี่สิบ', roman: 'Yîi sìp', english: 'Twenty (20)',   example: 'ยี่สิบห้า — Twenty-five' },
    { thai: 'ร้อย',   roman: 'Rói',      english: 'Hundred',       example: 'หนึ่งร้อย — One hundred' },
    { thai: 'พัน',    roman: 'Phan',     english: 'Thousand',      example: 'หนึ่งพัน — One thousand' },
  ],
  food: [
    { thai: 'ข้าว',     roman: 'Khâao',     english: 'Rice',          example: 'ข้าวผัด — Fried rice' },
    { thai: 'น้ำ',      roman: 'Náam',      english: 'Water',         example: 'น้ำเย็น — Cold water' },
    { thai: 'อาหาร',   roman: 'Aa-hǎan',   english: 'Food',          example: 'อาหารไทย — Thai food' },
    { thai: 'เผ็ด',     roman: 'Phèt',      english: 'Spicy',         example: 'ไม่เผ็ด — Not spicy' },
    { thai: 'อร่อย',   roman: 'A-ròi',     english: 'Delicious',     example: 'อร่อยมาก — Very delicious' },
    { thai: 'ผัดไทย',  roman: 'Phàt thai', english: 'Pad Thai',      example: 'ผัดไทยไม่ใส่ถั่ว — Pad Thai without peanuts' },
    { thai: 'ส้มตำ',   roman: 'Sôm tam',   english: 'Papaya salad',  example: 'ส้มตำไทย — Thai papaya salad' },
    { thai: 'กาแฟ',    roman: 'Kaa-fae',   english: 'Coffee',        example: 'กาแฟเย็น — Iced coffee' },
    { thai: 'หมู',     roman: 'Mǔu',       english: 'Pork',          example: 'หมูกรอบ — Crispy pork' },
    { thai: 'ไก่',     roman: 'Kài',       english: 'Chicken',       example: 'ไก่ทอด — Fried chicken' },
    { thai: 'ปลา',    roman: 'Plaa',      english: 'Fish',          example: 'ปลาทอด — Fried fish' },
    { thai: 'ต้มยำ',  roman: 'Tôm yam',  english: 'Tom Yum soup',  example: 'ต้มยำกุ้ง — Spicy prawn soup' },
    { thai: 'หวาน',   roman: 'Wǎan',     english: 'Sweet',         example: 'หวานมาก — Very sweet' },
    { thai: 'เค็ม',   roman: 'Khem',     english: 'Salty',         example: 'เค็มไป — Too salty' },
  ],
  tones: [
    { thai: 'มา',   roman: 'Maa (mid)',       english: 'To come',      example: 'คุณมาจากไหน — Where do you come from?' },
    { thai: 'หมา',  roman: 'Mǎa (rising)',    english: 'Dog',          example: 'หมาน่ารัก — Cute dog' },
    { thai: 'ม้า',  roman: 'Máa (high)',      english: 'Horse',        example: 'ม้าวิ่ง — The horse runs' },
    { thai: 'มาก',  roman: 'Mâak (falling)',  english: 'Much / Many',  example: 'ขอบคุณมาก — Thank you very much' },
    { thai: 'ไม่',  roman: 'Mâi (falling)',   english: 'Not / No',     example: 'ไม่เป็นไร — Never mind' },
    { thai: 'ใหม่', roman: 'Mài (low)',        english: 'New / Again',  example: 'ใหม่หมด — Brand new' },
    { thai: 'ป่า',  roman: 'Pàa (low)',        english: 'Forest',       example: 'ป่าไม้ — Woodland' },
    { thai: 'ปา',   roman: 'Paa (mid)',         english: 'To throw',     example: 'ปาลูกบอล — Throw a ball' },
    { thai: 'ข้าว', roman: 'Khâao (falling)',   english: 'Rice',         example: 'กินข้าว — Eat rice' },
    { thai: 'เข่า', roman: 'Khào (low)',         english: 'Knee',         example: 'เจ็บเข่า — Sore knee' },
    { thai: 'นา',   roman: 'Naa (mid)',           english: 'Rice field',   example: 'ทุ่งนา — Rice paddy field' },
    { thai: 'หน้า', roman: 'Nâa (falling)',       english: 'Face / Front', example: 'หน้าตาดี — Good-looking' },
  ],
  travel: [
    { thai: 'ไป',            roman: 'Pai',               english: 'To go',       example: 'ไปไหน — Where are you going?' },
    { thai: 'มาจากไหน',     roman: 'Maa jàak nǎi',      english: 'Where from?', example: 'คุณมาจากไหน — Where are you from?' },
    { thai: 'โรงแรม',       roman: 'Roong raem',         english: 'Hotel',       example: 'โรงแรมอยู่ที่ไหน — Where is the hotel?' },
    { thai: 'สนามบิน',      roman: 'Sa-nǎam bin',        english: 'Airport',     example: 'ไปสนามบิน — Going to the airport' },
    { thai: 'แท็กซี่',      roman: 'Táek-sîi',           english: 'Taxi',        example: 'เรียกแท็กซี่ — Call a taxi' },
    { thai: 'ขวา',           roman: 'Khwǎa',             english: 'Right',       example: 'เลี้ยวขวา — Turn right' },
    { thai: 'ซ้าย',         roman: 'Sáai',              english: 'Left',        example: 'เลี้ยวซ้าย — Turn left' },
    { thai: 'ราคาเท่าไหร่', roman: 'Raa-khaa thâo rài', english: 'How much?',   example: 'ราคาเท่าไหร่ครับ — How much is this?' },
    { thai: 'ห้องน้ำ',      roman: 'Hông náam',          english: 'Bathroom',    example: 'ห้องน้ำอยู่ที่ไหน — Where is the bathroom?' },
    { thai: 'ช่วยด้วย',     roman: 'Chûay dûay',         english: 'Help me!',    example: 'ช่วยด้วยครับ — Please help me!' },
    { thai: 'ตลาด',         roman: 'Ta-làat',            english: 'Market',      example: 'ไปตลาด — Going to the market' },
    { thai: 'วัด',           roman: 'Wát',               english: 'Temple',      example: 'วัดพระธาตุ — Doi Suthep Temple' },
    { thai: 'ตรงไป',        roman: 'Trong pai',          english: 'Go straight', example: 'ตรงไปแล้วเลี้ยวขวา — Go straight then turn right' },
    { thai: 'จอดรถ',        roman: 'Jòt rót',           english: 'Park the car', example: 'จอดรถที่นี่ได้ไหม — Can I park here?' },
  ],
  dailylife: [
    { thai: 'บ้าน',     roman: 'Bâan',       english: 'House / Home',  example: 'อยู่บ้าน — Stay at home' },
    { thai: 'ทำงาน',   roman: 'Tham ngaan',  english: 'To work',       example: 'ไปทำงาน — Go to work' },
    { thai: 'นอน',     roman: 'Nawn',        english: 'To sleep',      example: 'นอนหลับ — Go to sleep' },
    { thai: 'กิน',     roman: 'Kin',         english: 'To eat',        example: 'กินข้าว — Eat (a meal)' },
    { thai: 'ดื่ม',    roman: 'Dùem',        english: 'To drink',      example: 'ดื่มน้ำ — Drink water' },
    { thai: 'รัก',     roman: 'Rák',         english: 'To love',       example: 'ฉันรักคุณ — I love you' },
    { thai: 'ชอบ',    roman: 'Chôp',        english: 'To like',       example: 'ชอบอาหารไทย — I like Thai food' },
    { thai: 'เบื่อ',   roman: 'Bùea',       english: 'Bored',         example: 'เบื่อมาก — So bored' },
    { thai: 'เหนื่อย', roman: 'Nùeay',     english: 'Tired',         example: 'เหนื่อยมาก — Very tired' },
    { thai: 'สนุก',   roman: 'Sa-nùk',     english: 'Fun',           example: 'สนุกมาก — So much fun!' },
    { thai: 'ดี',      roman: 'Dii',         english: 'Good',          example: 'ดีมาก — Very good' },
    { thai: 'แย่',    roman: 'Yâe',         english: 'Bad',           example: 'แย่จัง — That\'s bad' },
    { thai: 'เร็ว',   roman: 'Rew',         english: 'Fast',          example: 'เร็วมาก — Very fast' },
    { thai: 'ช้า',    roman: 'Cháa',        english: 'Slow',          example: 'ช้าลง — Slow down' },
  ],
};

let currentCategory = 'greetings';
let currentIndex    = 0;
let isFlipped       = false;
let knownCards      = new Set();

const CAT_LABELS = {
  greetings: '👋 Greetings',
  numbers:   '🔢 Numbers',
  food:      '🍜 Food',
  tones:     '🎵 Tones',
  travel:    '✈️ Travel',
  dailylife: '🏠 Daily Life',
};

function getCards() { return DECK[currentCategory]; }

function renderCard() {
  const cards      = getCards();
  const card       = cards[currentIndex];
  const fcEl       = document.getElementById('flashcard');
  const frontThai  = document.getElementById('fc-thai');
  const frontRoman = document.getElementById('fc-roman');
  const backEng    = document.getElementById('fc-english');
  const backEx     = document.getElementById('fc-example');
  const progress   = document.getElementById('fc-progress');

  if (!fcEl || !card) return;

  // Reset flip
  isFlipped = false;
  fcEl.classList.remove('flipped');

  // Populate content
  if (frontThai)  frontThai.textContent  = card.thai;
  if (frontRoman) frontRoman.textContent = card.roman;
  if (backEng)    backEng.textContent    = card.english;
  if (backEx)     backEx.textContent     = card.example;

  // Progress counter
  if (progress) progress.textContent = `${currentIndex + 1} / ${cards.length}`;

  // Known count for this category
  const knownCount = [...knownCards].filter(k => k.startsWith(currentCategory + '_')).length;
  const knownCountEl = document.getElementById('fc-known-count');
  if (knownCountEl) knownCountEl.textContent = `${knownCount} of ${cards.length} known`;

  // Progress bar fill
  const bar = document.getElementById('fc-progress-bar');
  if (bar) bar.style.width = ((currentIndex + 1) / cards.length * 100) + '%';

  // Total known stat
  const knownTotal = document.getElementById('fc-known-total');
  if (knownTotal) knownTotal.textContent = knownCards.size;

  // Category label
  const catLabel = document.getElementById('category-display');
  if (catLabel) catLabel.textContent =
    (CAT_LABELS[currentCategory] || currentCategory) + ` (${cards.length} cards)`;

  // Sync back-face romanisation (no redeclaration — using frontRoman from above)
  const backRoman = document.getElementById('fc-roman-back');
  if (frontRoman && backRoman) backRoman.textContent = frontRoman.textContent;
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
  showToast('✓ Marked as known!');
  nextCard();
}

function markAgain() {
  knownCards.delete(`${currentCategory}_${currentIndex}`);
  nextCard();
}

function setCategory(cat) {
  currentCategory = cat;
  currentIndex    = 0;
  knownCards      = new Set([...knownCards].filter(k => !k.startsWith(cat + '_')));
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

// ── Touch / swipe ──
let touchStartX = 0;
document.addEventListener('DOMContentLoaded', () => {
  const fc = document.getElementById('flashcard');
  if (fc) {
    fc.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    fc.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) < 30) { flipCard(); return; }
      if (dx < 0) nextCard(); else prevCard();
    });
  }

  // Wire up buttons
  renderCard();
  fc?.addEventListener('click', flipCard);
  document.getElementById('fc-prev')?.addEventListener('click', prevCard);
  document.getElementById('fc-next')?.addEventListener('click', nextCard);
  document.getElementById('fc-known')?.addEventListener('click', markKnown);
  document.getElementById('fc-again')?.addEventListener('click', markAgain);
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => setCategory(btn.dataset.cat));
  });
});
