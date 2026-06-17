'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import FadeIn from '../../components/FadeIn';

type Card = { thai: string; roman: string; english: string; example: string };
type FreeDeckKey = 'greetings' | 'numbers' | 'food' | 'tones' | 'travel' | 'dailylife' | 'colors' | 'shopping';
type PremiumDeckKey = 'slang' | 'script' | 'conversation' | 'proverbs' | 'sl1';
type DeckKey = FreeDeckKey | PremiumDeckKey;

// ── FREE DECKS ──────────────────────────────────────────────────────────────
const FREE_DECK: Record<FreeDeckKey, Card[]> = {
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
    { thai: 'ต้มยำ', roman: 'Tôm-yam', english: 'Tom Yum soup', example: 'ต้มยำกุ้ง — Spicy prawn soup' },
    { thai: 'หวาน', roman: 'Wǎan', english: 'Sweet', example: 'หวานมาก — Very sweet' },
    { thai: 'เค็ม', roman: 'Khem', english: 'Salty', example: 'เค็มไป — Too salty' },
    { thai: 'ก๋วยเตี๋ยว', roman: 'Gǔay-tǐaw', english: 'Noodles', example: 'ก๋วยเตี๋ยวเส้นใหญ่ — Wide noodles' },
    { thai: 'มะม่วง', roman: 'Má-mûang', english: 'Mango', example: 'มะม่วงสุก — Ripe mango' },
  ],
  tones: [
    { thai: 'มา', roman: 'Maa (mid)', english: 'To come', example: 'คุณมาจากไหน — Where do you come from?' },
    { thai: 'หมา', roman: 'Mǎa (rising)', english: 'Dog', example: 'หมาน่ารัก — Cute dog' },
    { thai: 'ม้า', roman: 'Máa (high)', english: 'Horse', example: 'ม้าวิ่ง — The horse runs' },
    { thai: 'มาก', roman: 'Mâak (falling)', english: 'Much / Many', example: 'ขอบคุณมาก — Thank you very much' },
    { thai: 'ไม่', roman: 'Mâi (falling)', english: 'Not / No', example: 'ไม่เป็นไร — Never mind' },
    { thai: 'ใหม่', roman: 'Màai (low)', english: 'New / Again', example: 'ใหม่หมด — Brand new' },
    { thai: 'ป่า', roman: 'Pàa (low)', english: 'Forest', example: 'ป่าไม้ — Woodland' },
    { thai: 'ข้าว', roman: 'Khâao (falling)', english: 'Rice', example: 'กินข้าว — Eat rice' },
    { thai: 'เข่า', roman: 'Khào (low)', english: 'Knee', example: 'เจ็บเข่า — Sore knee' },
    { thai: 'นา', roman: 'Naa (mid)', english: 'Rice field', example: 'ทุ่งนา — Rice paddy field' },
    { thai: 'หน้า', roman: 'Nâa (falling)', english: 'Face / Front', example: 'หน้าตาดี — Good-looking' },
    { thai: 'น้า', roman: 'Náa (high)', english: 'Aunt / Uncle (younger)', example: 'น้าสาว — Younger aunt' },
  ],
  travel: [
    { thai: 'ไป', roman: 'Pai', english: 'To go', example: 'ไปไหน — Where are you going?' },
    { thai: 'มาจากไหน', roman: 'Maa-jàak-nǎi', english: 'Where from?', example: 'คุณมาจากไหน — Where are you from?' },
    { thai: 'โรงแรม', roman: 'Roong-raem', english: 'Hotel', example: 'โรงแรมอยู่ที่ไหน — Where is the hotel?' },
    { thai: 'สนามบิน', roman: 'Sà-nǎam-bin', english: 'Airport', example: 'ไปสนามบิน — Going to the airport' },
    { thai: 'แท็กซี่', roman: 'Táek-sîi', english: 'Taxi', example: 'เรียกแท็กซี่ — Call a taxi' },
    { thai: 'รถไฟ', roman: 'Rót-fai', english: 'Train', example: 'ขึ้นรถไฟ — Get on the train' },
    { thai: 'ขวา', roman: 'Khwǎa', english: 'Right', example: 'เลี้ยวขวา — Turn right' },
    { thai: 'ซ้าย', roman: 'Sáai', english: 'Left', example: 'เลี้ยวซ้าย — Turn left' },
    { thai: 'ตรงไป', roman: 'Trong-pai', english: 'Go straight', example: 'ตรงไปแล้วเลี้ยวขวา — Go straight then turn right' },
    { thai: 'ราคาเท่าไหร่', roman: 'Raa-khaa-thâo-rài', english: 'How much?', example: 'ราคาเท่าไหร่ครับ — How much is this?' },
    { thai: 'ห้องน้ำ', roman: 'Hông-náam', english: 'Bathroom', example: 'ห้องน้ำอยู่ที่ไหน — Where is the bathroom?' },
    { thai: 'ตลาด', roman: 'Tà-làat', english: 'Market', example: 'ไปตลาด — Going to the market' },
    { thai: 'วัด', roman: 'Wát', english: 'Temple', example: 'วัดพระธาตุ — Doi Suthep Temple' },
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
    { thai: 'สนุก', roman: 'Sà-nùk', english: 'Fun', example: 'สนุกมาก — So much fun!' },
    { thai: 'ดี', roman: 'Dii', english: 'Good', example: 'ดีมาก — Very good' },
    { thai: 'เดิน', roman: 'Dern', english: 'To walk', example: 'เดินเล่น — Go for a walk' },
    { thai: 'อ่าน', roman: 'Àan', english: 'To read', example: 'อ่านหนังสือ — Read a book' },
    { thai: 'เขียน', roman: 'Khǐan', english: 'To write', example: 'เขียนจดหมาย — Write a letter' },
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
    { thai: 'ราคา', roman: 'Raa-khaa', english: 'Price', example: 'ราคาเท่าไหร่ — What is the price?' },
    { thai: 'แพง', roman: 'Phaeng', english: 'Expensive', example: 'แพงไป — Too expensive' },
    { thai: 'ถูก', roman: 'Thùuk', english: 'Cheap', example: 'ถูกมาก — Very cheap' },
    { thai: 'ลด', roman: 'Lót', english: 'Discount', example: 'ลดราคาได้ไหม — Can you give a discount?' },
    { thai: 'เงินสด', roman: 'Ngern-sòt', english: 'Cash', example: 'จ่ายเงินสด — Pay by cash' },
    { thai: 'บัตรเครดิต', roman: 'Bàt-khree-dìt', english: 'Credit card', example: 'รับบัตรเครดิตไหม — Do you accept credit cards?' },
    { thai: 'ถุง', roman: 'Thǔng', english: 'Bag', example: 'ขอถุงด้วย — Can I have a bag?' },
    { thai: 'ลองได้ไหม', roman: 'Laawng-dâai-mǎi', english: 'Can I try it on?', example: 'ลองได้ไหมครับ — Can I try this on?' },
    { thai: 'อยากได้', roman: 'Yàak-dâai', english: 'I want / I\'d like', example: 'อยากได้อันนี้ — I\'d like this one' },
    { thai: 'เอาอันนี้', roman: 'Ao-an-níi', english: 'I\'ll take this one', example: 'เอาอันนี้เลย — I\'ll take this one' },
  ],
};

// ── PREMIUM DECKS ────────────────────────────────────────────────────────────
// SL1_DECK is declared after FREE_DECK to keep file readable; referenced below
const PREMIUM_DECK: Record<PremiumDeckKey, Card[]> = {
  get sl1() { return SL1_DECK; },
  slang: [
    { thai: 'เจ๋ง', roman: 'Jèng', english: 'Cool / Awesome', example: 'เจ๋งมากเลย — That\'s so cool!' },
    { thai: 'โคตร', roman: 'Khôht', english: 'Super / Extremely (slang)', example: 'โคตรอร่อย — Super delicious' },
    { thai: 'งง', roman: 'Ngong', english: 'Confused / Puzzled', example: 'งงมากเลย — I\'m so confused' },
    { thai: 'แซ่บ', roman: 'Sâep', english: 'Spicy & delicious / Exciting', example: 'แซ่บนัวเลย — So good and spicy!' },
    { thai: 'เบาๆ', roman: 'Bao bao', english: 'Take it easy / Chill', example: 'เบาๆ นะ — Take it easy!' },
    { thai: 'ฟิน', roman: 'Fin', english: 'Feels good / Satisfying', example: 'ฟินมากเลย — This feels amazing!' },
    { thai: 'โอเค', roman: 'Oo-khee', english: 'OK / Alright', example: 'โอเคนะ — That\'s okay' },
    { thai: 'กิ๊บเก๋', roman: 'Gíp-gǎo', english: 'Cute / Trendy', example: 'น่ารักกิ๊บเก๋ — So cute and stylish' },
    { thai: 'แอบ', roman: 'Àep', english: 'Secretly / Sneakily', example: 'แอบชอบ — Secretly like someone' },
    { thai: 'ช้อป', roman: 'Cháwp', english: 'To shop (casual)', example: 'ไปช้อปกัน — Let\'s go shopping' },
    { thai: 'ดราม่า', roman: 'Draa-mâa', english: 'Drama / Over-dramatic', example: 'อย่าดราม่า — Don\'t be so dramatic' },
    { thai: 'เมพ', roman: 'Mêp', english: 'Amazing / Legendary', example: 'เมพมาก — That\'s legendary!' },
    { thai: 'เฟี้ยว', roman: 'Fîaw', english: 'Fierce / Stylish', example: 'แต่งตัวเฟี้ยวมาก — Dressed so fiercely' },
    { thai: 'กวน', roman: 'Guan', english: 'Annoying / Teasing', example: 'กวนจัง — So annoying!' },
    { thai: 'ตื่นเต้น', roman: 'Tùen-tên', english: 'Excited / Thrilling', example: 'ตื่นเต้นมากเลย — I\'m so excited!' },
    { thai: 'ไม่โอเค', roman: 'Mâi oo-khee', english: 'Not okay / Not fine', example: 'ไม่โอเคเลยนะ — That\'s really not okay' },
    { thai: 'เฮีย', roman: 'Hiia', english: 'Bro / Mate (informal)', example: 'เฮียช่วยหน่อย — Hey bro, help me out' },
    { thai: 'น่ารัก', roman: 'Nâa-rák', english: 'Cute / Adorable', example: 'น่ารักจัง — So cute!' },
    { thai: 'ทำไม', roman: 'Tham-mai', english: 'Why?', example: 'ทำไมล่ะ — But why?' },
    { thai: 'สุดปัง', roman: 'Sùt-pang', english: 'Absolutely stunning', example: 'สุดปังเลย — Absolutely stunning!' },
  ],
  script: [
    { thai: 'ก', roman: 'Gaw (mid)', english: 'Chicken — ก ไก่', example: 'First consonant of the Thai alphabet' },
    { thai: 'ข', roman: 'Khǎaw (high)', english: 'Egg — ข ไข่', example: 'High class consonant, aspirated' },
    { thai: 'ค', roman: 'Khaw (low)', english: 'Buffalo — ค ควาย', example: 'Low class consonant, aspirated' },
    { thai: 'ง', roman: 'Ngaw (low)', english: 'Snake — ง งู', example: 'Used as a final consonant sound' },
    { thai: 'จ', roman: 'Jaw (mid)', english: 'Plate — จ จาน', example: 'Mid class, unaspirated' },
    { thai: 'ช', roman: 'Châw (low)', english: 'Elephant — ช ช้าง', example: 'Low class, aspirated ch sound' },
    { thai: 'ซ', roman: 'Saw (low)', english: 'Chain — ซ โซ่', example: 'Low class, s sound' },
    { thai: 'ด', roman: 'Daw (mid)', english: 'Child — ด เด็ก', example: 'Mid class, unaspirated d sound' },
    { thai: 'ต', roman: 'Taw (mid)', english: 'Turtle — ต เต่า', example: 'Mid class, unaspirated t sound' },
    { thai: 'น', roman: 'Naw (low)', english: 'Mouse — น หนู', example: 'Low class, n sound' },
    { thai: 'บ', roman: 'Baw (mid)', english: 'Leaf — บ ใบไม้', example: 'Mid class, unaspirated b sound' },
    { thai: 'ป', roman: 'Paw (mid)', english: 'Fish — ป ปลา', example: 'Mid class, unaspirated p sound' },
    { thai: 'ผ', roman: 'Phǎw (high)', english: 'Bee — ผ ผึ้ง', example: 'High class, aspirated ph sound' },
    { thai: 'ม', roman: 'Maw (low)', english: 'Horse — ม ม้า', example: 'Low class, m sound' },
    { thai: 'ร', roman: 'Raw (low)', english: 'Boat — ร เรือ', example: 'Low class, r sound (trilled)' },
    { thai: 'ล', roman: 'Law (low)', english: 'Monkey — ล ลิง', example: 'Low class, l sound' },
    { thai: 'ว', roman: 'Waw (low)', english: 'Ring — ว แหวน', example: 'Low class, w/v sound' },
    { thai: 'ส', roman: 'Sǎw (high)', english: 'Tiger — ส เสือ', example: 'High class, s sound' },
    { thai: 'ห', roman: 'Hǎw (high)', english: 'Box — ห หีบ', example: 'High class, h sound — also a tone modifier' },
    { thai: 'อ', roman: 'Aw (mid)', english: 'Basin — อ อ่าง', example: 'Mid class, vowel placeholder' },
  ],
  conversation: [
    { thai: 'คุณพูดภาษาอังกฤษได้ไหม', roman: 'Khun phûut phaa-sǎa ang-grìt dâai mǎi', english: 'Can you speak English?', example: 'Useful when you need help communicating' },
    { thai: 'ฉันไม่เข้าใจ', roman: 'Chǎn mâi khâo-jai', english: 'I don\'t understand', example: 'ฉันไม่เข้าใจเลย — I don\'t understand at all' },
    { thai: 'พูดช้าๆ ได้ไหม', roman: 'Phûut cháa cháa dâai mǎi', english: 'Can you speak slowly?', example: 'Politely ask someone to slow down' },
    { thai: 'หมายความว่าอะไร', roman: 'Mǎai-khwaam wâa à-rai', english: 'What does it mean?', example: 'หมายความว่าอะไรครับ — What does that mean?' },
    { thai: 'ฉันชอบประเทศไทย', roman: 'Chǎn châwp prà-thêet-thai', english: 'I love Thailand', example: 'Express your love for Thailand' },
    { thai: 'อากาศร้อนมาก', roman: 'Aa-kàat rón mâak', english: 'The weather is very hot', example: 'Common conversation opener in Thailand' },
    { thai: 'คุณมาจากไหน', roman: 'Khun maa jàak nǎi', english: 'Where are you from?', example: 'Standard getting-to-know-you question' },
    { thai: 'ฉันมาจาก...', roman: 'Chǎn maa jàak...', english: 'I come from...', example: 'ฉันมาจากอังกฤษ — I come from England' },
    { thai: 'คุณทำงานอะไร', roman: 'Khun tham-ngaan à-rai', english: 'What do you do for work?', example: 'Asking about someone\'s job' },
    { thai: 'อยู่ที่นี่นานแค่ไหน', roman: 'Yùu thîi-nîi naan khâe-nǎi', english: 'How long are you staying here?', example: 'Common question for visitors' },
    { thai: 'คุณชอบอาหารไทยไหม', roman: 'Khun châwp aa-hǎan thai mǎi', english: 'Do you like Thai food?', example: 'Start a food conversation' },
    { thai: 'ฉันเรียนภาษาไทย', roman: 'Chǎn rian phaa-sǎa thai', english: 'I\'m learning Thai', example: 'Thais will be impressed you\'re learning!' },
    { thai: 'ภาษาไทยยากมาก', roman: 'Phaa-sǎa thai yâak mâak', english: 'Thai language is very hard', example: 'But so rewarding — keep going!' },
    { thai: 'ขอเบอร์โทรได้ไหม', roman: 'Khǎaw booe-thoo dâai mǎi', english: 'Can I have your number?', example: 'Asking for someone\'s phone number' },
    { thai: 'เจอกันอีกนะ', roman: 'Joe-gan ìik ná', english: 'See you again', example: 'Warm goodbye phrase' },
  ],
  proverbs: [
    { thai: 'น้ำขึ้นให้รีบตัก', roman: 'Náam khûen hâi rîip tàk', english: 'When the water rises, hurry to scoop', example: 'Meaning: Strike while the iron is hot' },
    { thai: 'ทำดีได้ดี ทำชั่วได้ชั่ว', roman: 'Tham dii dâai dii, tham chûa dâai chûa', english: 'Do good, get good; do bad, get bad', example: 'Meaning: What goes around comes around' },
    { thai: 'ช้าๆ ได้พร้าเล่มงาม', roman: 'Cháa cháa dâai práa lêm ngaam', english: 'Slowly you get a beautiful machete', example: 'Meaning: Slow and steady wins the race' },
    { thai: 'รักวัวให้ผูก รักลูกให้ตี', roman: 'Rák wua hâi phùuk, rák lûuk hâi tii', english: 'Love your cow, tie it; love your child, discipline them', example: 'Meaning: Discipline is a form of love' },
    { thai: 'เข้าเมืองตาหลิ่ว ต้องหลิ่วตาตาม', roman: 'Khâo mueang taa-lìw tâwng lìw-taa taam', english: 'Enter a town of winking eyes, wink too', example: 'Meaning: When in Rome, do as the Romans do' },
    { thai: 'อย่าดูถูกช้างว่างา', roman: 'Yàa duu-thùuk cháang wâa ngaa', english: 'Don\'t look down on an elephant for its tusks', example: 'Meaning: Don\'t underestimate anyone' },
    { thai: 'ไก่งามเพราะขน คนงามเพราะแต่ง', roman: 'Kài ngaam phrâw khǒn, khon ngaam phrâw tàeng', english: 'A chicken is beautiful because of its feathers; a person beautiful because of clothing', example: 'Meaning: Appearance and presentation matter' },
    { thai: 'น้ำพึ่งเรือ เสือพึ่งป่า', roman: 'Náam phûeng ruea, sǔea phûeng pàa', english: 'Water relies on the boat, the tiger relies on the forest', example: 'Meaning: Everything has its natural place and support' },
    { thai: 'ปลาหมอตายเพราะปาก', roman: 'Plaa-mǎaw taai phrâw pàak', english: 'The climbing perch dies because of its mouth', example: 'Meaning: Loose lips sink ships — be careful what you say' },
    { thai: 'เกลือจิ้มเกลือ', roman: 'Glua jîm glua', english: 'Salt dipping salt', example: 'Meaning: Seeking something you already have' },
    { thai: 'หน้าไหว้หลังหลอก', roman: 'Nâa wâi lǎng lòk', english: 'Bow in front, deceive behind', example: 'Meaning: Two-faced — nice to your face, bad behind your back' },
    { thai: 'อย่าวัดน้ำที่ปลายตีน', roman: 'Yàa wát náam thîi plaai tiin', english: 'Don\'t measure water at the tip of your foot', example: 'Meaning: Don\'t make hasty judgements' },
  ],
};

// ── SPEAKING & LISTENING BOOK 1 DECK ────────────────────────────────────────
const SL1_DECK: Card[] = [
  { thai: 'ค่ะ', roman: 'kà', english: 'Polite particle (women – statements)', example: 'Ch.1 · Polite Particles' },
  { thai: 'คะ', roman: 'ká', english: 'Polite particle (women – questions)', example: 'Ch.1 · Polite Particles' },
  { thai: 'ครับ', roman: 'kráp', english: 'Polite particle (men)', example: 'Ch.1 · Polite Particles' },
  { thai: 'เข้าใจ', roman: 'kâo-jai', english: 'To understand', example: 'Ch.1 · Classroom' },
  { thai: 'ไม่เข้าใจ', roman: 'mâi kâo-jai', english: "I don't understand", example: 'Ch.1 · Classroom' },
  { thai: 'ไม่รู้', roman: 'mâi rúu', english: "I don't know", example: 'Ch.1 · Classroom' },
  { thai: 'ขอโทษ', roman: 'kǒr-tôot', english: 'Sorry / Excuse me', example: 'Ch.1 · Classroom' },
  { thai: 'ขอบคุณ', roman: 'kòrp-kun', english: 'Thank you', example: 'Ch.2 · Greetings' },
  { thai: 'ไม่', roman: 'mâi', english: "No / Not / Don't", example: 'Ch.1 · Core Words' },
  { thai: 'ได้', roman: 'dâai', english: 'Can / Able to', example: 'Ch.3 · Core Verbs' },
  { thai: 'สวัสดี', roman: 'sà-wàt-dii', english: 'Hello / Goodbye', example: 'Ch.2 · Greetings' },
  { thai: 'หวัดดี', roman: 'wàt-dii', english: 'Hey! (casual)', example: 'Ch.2 · Greetings' },
  { thai: 'สบาย ดี', roman: 'sà-baai dii', english: 'Fine / Well', example: 'Ch.2 · Greetings' },
  { thai: 'เช่นกัน', roman: 'chên-gan', english: 'Likewise / Same to you', example: 'Ch.2 · Greetings' },
  { thai: 'ยินดีที่ได้รู้จัก', roman: 'yin-dii tîi dâai rúu-jàk', english: 'Nice to meet you', example: 'Ch.2 · Greetings' },
  { thai: 'ไว้เจอกัน', roman: 'wái jer gan', english: 'See you later', example: 'Ch.2 · Greetings' },
  { thai: 'โชคดี', roman: 'chôok-dii', english: 'Good luck', example: 'Ch.2 · Greetings' },
  { thai: 'เดินทางปลอดภัย', roman: 'dern-taang bplòrt-pai', english: 'Have a safe trip', example: 'Ch.2 · Greetings' },
  { thai: 'ไม่สบาย', roman: 'mâi sà-baai', english: 'Not well / Sick', example: 'Ch.2 · Greetings' },
  { thai: 'ก็ดี', roman: 'gôr dii', english: 'Not bad', example: 'Ch.2 · Greetings' },
  { thai: 'ฉัน', roman: 'chăn', english: 'I / Me (women – polite)', example: 'Ch.2 · Pronouns' },
  { thai: 'ผม', roman: 'pŏm', english: 'I / Me (men – polite)', example: 'Ch.2 · Pronouns' },
  { thai: 'คุณ', roman: 'kun', english: 'You (polite)', example: 'Ch.2 · Pronouns' },
  { thai: 'เขา', roman: 'kăo', english: 'He / She / They', example: 'Ch.2 · Pronouns' },
  { thai: 'พี่', roman: 'pîi', english: 'Older person / older sibling', example: 'Ch.2 · Pronouns' },
  { thai: 'น้อง', roman: 'nórng', english: 'Younger person / younger sibling', example: 'Ch.2 · Pronouns' },
  { thai: 'เรา', roman: 'rao', english: 'We / Us', example: 'Ch.3 · Pronouns' },
  { thai: 'พวกเขา', roman: 'pûak-kăo', english: 'They / Them', example: 'Ch.3 · Pronouns' },
  { thai: 'ลุง', roman: 'lung', english: 'Uncle (address for older men)', example: 'Ch.2 · Pronouns' },
  { thai: 'ป้า', roman: 'bpâa', english: 'Aunt (address for older women)', example: 'Ch.2 · Pronouns' },
  { thai: 'ไป', roman: 'bpai', english: 'To go', example: 'Ch.3 · Core Verbs' },
  { thai: 'มา', roman: 'maa', english: 'To come', example: 'Ch.3 · Core Verbs' },
  { thai: 'อยู่', roman: 'yùu', english: 'To be at / to stay (location)', example: 'Ch.3 · Core Verbs' },
  { thai: 'เป็น', roman: 'bpen', english: 'To be (identity / status / feeling)', example: 'Ch.3 · Core Verbs' },
  { thai: 'คือ', roman: 'kuee', english: 'Is / means / equals (definition)', example: 'Ch.3 · Core Verbs' },
  { thai: 'มี', roman: 'mii', english: 'To have / there is / there are', example: 'Ch.3 · Core Verbs' },
  { thai: 'ไม่มี', roman: 'mâi-mii', english: 'To not have / there is no…', example: 'Ch.3 · Core Verbs' },
  { thai: 'ชอบ', roman: 'chôrp', english: 'To like', example: 'Ch.3 · Core Verbs' },
  { thai: 'ไม่ชอบ', roman: 'mâi-chôrp', english: 'To not like / to dislike', example: 'Ch.3 · Core Verbs' },
  { thai: 'รัก', roman: 'rák', english: 'To love', example: 'Ch.3 · Core Verbs' },
  { thai: 'ต้อง', roman: 'dtôrng', english: 'Must / have to', example: 'Ch.3 · Core Verbs' },
  { thai: 'อยาก', roman: 'yàak', english: 'To want (to do something)', example: 'Ch.3 · Core Verbs' },
  { thai: 'ได้', roman: 'dâai', english: 'Can / able to', example: 'Ch.3 · Core Verbs' },
  { thai: 'ไม่ได้', roman: 'mâi dâai', english: 'Cannot / not able to', example: 'Ch.3 · Core Verbs' },
  { thai: 'กิน', roman: 'gin', english: 'To eat', example: 'Ch.3 · Core Verbs' },
  { thai: 'ดื่ม', roman: 'dùeem', english: 'To drink', example: 'Ch.3 · Core Verbs' },
  { thai: 'สั่ง', roman: 'sàng', english: 'To order / to command', example: 'Ch.3 · Core Verbs' },
  { thai: 'นอน', roman: 'norn', english: 'To sleep', example: 'Ch.3 · Core Verbs' },
  { thai: 'ทำ', roman: 'tam', english: 'To do / to make', example: 'Ch.3 · Core Verbs' },
  { thai: 'เดิน', roman: 'dern', english: 'To walk', example: 'Ch.3 · Core Verbs' },
  { thai: 'วิ่ง', roman: 'wîng', english: 'To run', example: 'Ch.3 · Core Verbs' },
  { thai: 'นั่ง', roman: 'nâng', english: 'To sit', example: 'Ch.3 · Core Verbs' },
  { thai: 'ฟัง', roman: 'fang', english: 'To listen', example: 'Ch.3 · Core Verbs' },
  { thai: 'ซื้อ', roman: 'súee', english: 'To buy', example: 'Ch.3 · Core Verbs' },
  { thai: 'จ่าย', roman: 'jàai', english: 'To pay', example: 'Ch.3 · Core Verbs' },
  { thai: 'อ่าน', roman: 'àan', english: 'To read', example: 'Ch.3 · Core Verbs' },
  { thai: 'เขียน', roman: 'kǐan', english: 'To write', example: 'Ch.3 · Core Verbs' },
  { thai: 'เรียน', roman: 'rian', english: 'To study / to learn', example: 'Ch.3 · Core Verbs' },
  { thai: 'ทำงาน', roman: 'tam-ngaan', english: 'To work', example: 'Ch.3 · Core Verbs' },
  { thai: 'พูด', roman: 'pûut', english: 'To speak / to say', example: 'Ch.3 · Core Verbs' },
  { thai: 'ถาม', roman: 'tǎam', english: 'To ask a question', example: 'Ch.3 · Core Verbs' },
  { thai: 'บอก', roman: 'bòrk', english: 'To tell / to say to someone', example: 'Ch.3 · Core Verbs' },
  { thai: 'ให้', roman: 'hâi', english: 'To give', example: 'Ch.3 · Core Verbs' },
  { thai: 'ช่วย', roman: 'chûai', english: 'To help', example: 'Ch.3 · Core Verbs' },
  { thai: 'ดู', roman: 'duu', english: 'To watch / to look', example: 'Ch.3 · Core Verbs' },
  { thai: 'เปิด', roman: 'bpèrt', english: 'To open / to turn on', example: 'Ch.3 · Core Verbs' },
  { thai: 'ปิด', roman: 'bpìt', english: 'To close / to turn off', example: 'Ch.3 · Core Verbs' },
  { thai: 'สอน', roman: 'sŏrn', english: 'To teach', example: 'Ch.3 · Core Verbs' },
  { thai: 'เล่น', roman: 'lên', english: 'To play', example: 'Ch.3 · Core Verbs' },
  { thai: 'ขอ', roman: 'kŏr', english: 'May I… / Could I have… / to request', example: 'Ch.3 · Core Verbs' },
  { thai: 'เอา', roman: 'ao', english: "Would like to have / I'll take…", example: 'Ch.3 · Ordering' },
  { thai: 'ว่ายน้ำ', roman: 'wâai-náam', english: 'To swim', example: 'Ch.3 · Core Verbs' },
  { thai: 'อาบน้ำ', roman: 'àap-náam', english: 'To shower / to bathe', example: 'Ch.3 · Core Verbs' },
  { thai: 'รอ', roman: 'ror', english: 'To wait', example: 'Ch.3 · Core Verbs' },
  { thai: 'จอด', roman: 'jòrt', english: 'To park (a vehicle)', example: 'Ch.3 · Core Verbs' },
  { thai: 'กำลัง', roman: 'gam-lang', english: 'Right now / currently (continuous)', example: 'Ch.3 · Grammar' },
  { thai: 'กำลังจะ', roman: 'gam-lang-jà', english: 'About to… (near future)', example: 'Ch.3 · Grammar' },
  { thai: 'แล้ว', roman: 'láeew', english: 'Already / then (completed action)', example: 'Ch.3 · Grammar' },
  { thai: 'จะ', roman: 'jà', english: 'Will / going to (future)', example: 'Ch.3 · Grammar' },
  { thai: 'ยัง', roman: 'yàng', english: 'Still / yet', example: 'Ch.3 · Grammar' },
  { thai: 'ข้าวผัด', roman: 'kâaw-pàt', english: 'Fried rice', example: 'Ch.4 · Food' },
  { thai: 'ผัดไทย', roman: 'pàt-tai', english: 'Pad Thai (stir-fried rice noodles)', example: 'Ch.4 · Food' },
  { thai: 'ผัดกะเพรา', roman: 'pàt-gà-prao', english: 'Holy basil stir-fry', example: 'Ch.4 · Food' },
  { thai: 'ต้มยำ', roman: 'dtôm-yam', english: 'Tom Yum (spicy sour soup)', example: 'Ch.4 · Food' },
  { thai: 'ต้มข่า', roman: 'dtôm-kàa', english: 'Tom Kha (coconut milk soup)', example: 'Ch.4 · Food' },
  { thai: 'ข้าวซอย', roman: 'kâaw-soi', english: 'Khao Soi (Northern curry noodle soup)', example: 'Ch.4 · Food' },
  { thai: 'ส้มตำ', roman: 'sôm-dtam', english: 'Green papaya salad', example: 'Ch.4 · Food' },
  { thai: 'ก๋วยเตี๋ยว', roman: 'gŭai-dtǐaw', english: 'Noodle soup', example: 'Ch.4 · Food' },
  { thai: 'หมูปิ้ง', roman: 'mŭu-bpîng', english: 'Grilled pork skewers', example: 'Ch.4 · Food' },
  { thai: 'ข้าวเหนียวมะม่วง', roman: 'khâaw-nǐaw má-mûang', english: 'Mango sticky rice', example: 'Ch.4 · Food' },
  { thai: 'หมู', roman: 'mŭu', english: 'Pork', example: 'Ch.4 · Meat & Protein' },
  { thai: 'ไก่', roman: 'gài', english: 'Chicken', example: 'Ch.4 · Meat & Protein' },
  { thai: 'เนื้อ', roman: 'núea', english: 'Beef', example: 'Ch.4 · Meat & Protein' },
  { thai: 'ปลา', roman: 'bplaa', english: 'Fish', example: 'Ch.4 · Meat & Protein' },
  { thai: 'กุ้ง', roman: 'gûng', english: 'Shrimp / prawn', example: 'Ch.4 · Meat & Protein' },
  { thai: 'ปลาหมึก', roman: 'bplaa-mùek', english: 'Squid', example: 'Ch.4 · Meat & Protein' },
  { thai: 'ปู', roman: 'bpuu', english: 'Crab', example: 'Ch.4 · Meat & Protein' },
  { thai: 'หอย', roman: 'hŏi', english: 'Shellfish', example: 'Ch.4 · Meat & Protein' },
  { thai: 'หมูสับ', roman: 'mŭu-sàp', english: 'Minced pork', example: 'Ch.4 · Meat & Protein' },
  { thai: 'ไข่ดาว', roman: 'kài-daaw', english: 'Fried egg (sunny side up)', example: 'Ch.4 · Eggs' },
  { thai: 'ไข่เจียว', roman: 'kài-jiaw', english: 'Omelette', example: 'Ch.4 · Eggs' },
  { thai: 'ไข่ต้ม', roman: 'kài-dtôm', english: 'Boiled egg', example: 'Ch.4 · Eggs' },
  { thai: 'ไข่คน', roman: 'kài-kon', english: 'Scrambled egg', example: 'Ch.4 · Eggs' },
  { thai: 'ผักชี', roman: 'pàk-chii', english: 'Coriander / cilantro', example: 'Ch.4 · Vegetables' },
  { thai: 'พริก', roman: 'prík', english: 'Chili', example: 'Ch.4 · Vegetables' },
  { thai: 'กระเทียม', roman: 'grà-tiam', english: 'Garlic', example: 'Ch.4 · Vegetables' },
  { thai: 'หอมหัวใหญ่', roman: 'hŏrm-hŭa-yài', english: 'Onion', example: 'Ch.4 · Vegetables' },
  { thai: 'มะเขือเทศ', roman: 'má-kŭea-têet', english: 'Tomato', example: 'Ch.4 · Vegetables' },
  { thai: 'คะน้า', roman: 'ká-náa', english: 'Chinese kale', example: 'Ch.4 · Vegetables' },
  { thai: 'ผักบุ้ง', roman: 'pàk-bûng', english: 'Morning glory', example: 'Ch.4 · Vegetables' },
  { thai: 'เห็ด', roman: 'hèt', english: 'Mushroom', example: 'Ch.4 · Vegetables' },
  { thai: 'มะม่วง', roman: 'má-mûang', english: 'Mango', example: 'Ch.4 · Fruit' },
  { thai: 'กล้วย', roman: 'glûai', english: 'Banana', example: 'Ch.4 · Fruit' },
  { thai: 'ส้ม', roman: 'sôm', english: 'Orange', example: 'Ch.4 · Fruit' },
  { thai: 'มะพร้าว', roman: 'má-prâaw', english: 'Coconut', example: 'Ch.4 · Fruit' },
  { thai: 'แตงโม', roman: 'dtaeeng-moo', english: 'Watermelon', example: 'Ch.4 · Fruit' },
  { thai: 'มะละกอ', roman: 'má-lá-gor', english: 'Papaya', example: 'Ch.4 · Fruit' },
  { thai: 'ผัด', roman: 'pàt', english: 'Stir-fried', example: 'Ch.4 · Cooking Methods' },
  { thai: 'ทอด', roman: 'tôrt', english: 'Deep-fried', example: 'Ch.4 · Cooking Methods' },
  { thai: 'ต้ม', roman: 'dtôm', english: 'Boiled', example: 'Ch.4 · Cooking Methods' },
  { thai: 'ย่าง', roman: 'yâang', english: 'Grilled', example: 'Ch.4 · Cooking Methods' },
  { thai: 'นึ่ง', roman: 'nûeng', english: 'Steamed', example: 'Ch.4 · Cooking Methods' },
  { thai: 'ไม่เผ็ด', roman: 'mâi-pèt', english: 'Not spicy', example: 'Ch.4 · Ordering' },
  { thai: 'เผ็ดนิดหน่อย', roman: 'pèt-nít-nòi', english: 'A little spicy', example: 'Ch.4 · Ordering' },
  { thai: 'เผ็ดมาก', roman: 'pèt-mâak', english: 'Very spicy', example: 'Ch.4 · Ordering' },
  { thai: 'จาน', roman: 'jaan', english: 'Plate (classifier)', example: 'Ch.4 · Classifiers' },
  { thai: 'ชาม', roman: 'chaam', english: 'Bowl (classifier)', example: 'Ch.4 · Classifiers' },
  { thai: 'กล่อง', roman: 'glòrng', english: 'Box / takeaway (classifier)', example: 'Ch.4 · Classifiers' },
  { thai: 'แก้ว', roman: 'gâeew', english: 'Glass / cup (classifier)', example: 'Ch.5 · Classifiers' },
  { thai: 'ใส่', roman: 'sài', english: 'Add / with / put in', example: 'Ch.4 · Ordering' },
  { thai: 'ไม่ใส่', roman: 'mâi sài', english: "Without / don't put in", example: 'Ch.4 · Ordering' },
  { thai: 'แห้ง', roman: 'hâeeng', english: 'Dry / no soup (noodle order)', example: 'Ch.4 · Ordering' },
  { thai: 'กลับบ้าน', roman: 'glàp-bâan', english: 'Takeaway / to go', example: 'Ch.4 · Ordering' },
  { thai: 'หมดแล้ว', roman: 'mòt láeew', english: 'Sold out / finished', example: 'Ch.4 · Ordering' },
  { thai: 'รับอะไร', roman: 'ráp à-rai', english: 'What would you like? (staff)', example: 'Ch.4 · Ordering' },
  { thai: 'เส้นใหญ่', roman: 'sên-yài', english: 'Large flat rice noodles', example: 'Ch.4 · Noodles' },
  { thai: 'เส้นเล็ก', roman: 'sên-lék', english: 'Thin rice noodles', example: 'Ch.4 · Noodles' },
  { thai: 'บะหมี่', roman: 'bà-mìi', english: 'Egg noodles (yellow)', example: 'Ch.4 · Noodles' },
  { thai: 'วุ้นเส้น', roman: 'wún-sên', english: 'Glass noodles', example: 'Ch.4 · Noodles' },
  { thai: 'น้ำใส', roman: 'náam-săi', english: 'Clear broth soup', example: 'Ch.4 · Noodles' },
  { thai: 'ศูนย์', roman: 'sŭun', english: 'Zero (0)', example: 'Ch.5 · Numbers' },
  { thai: 'หนึ่ง', roman: 'nùeng', english: 'One (1)', example: 'Ch.5 · Numbers' },
  { thai: 'สอง', roman: 'sŏrng', english: 'Two (2)', example: 'Ch.5 · Numbers' },
  { thai: 'สาม', roman: 'săam', english: 'Three (3)', example: 'Ch.5 · Numbers' },
  { thai: 'สี่', roman: 'sìi', english: 'Four (4)', example: 'Ch.5 · Numbers' },
  { thai: 'ห้า', roman: 'hâa', english: 'Five (5)', example: 'Ch.5 · Numbers' },
  { thai: 'หก', roman: 'hòk', english: 'Six (6)', example: 'Ch.5 · Numbers' },
  { thai: 'เจ็ด', roman: 'jèt', english: 'Seven (7)', example: 'Ch.5 · Numbers' },
  { thai: 'แปด', roman: 'bpàeet', english: 'Eight (8)', example: 'Ch.5 · Numbers' },
  { thai: 'เก้า', roman: 'gâaw', english: 'Nine (9)', example: 'Ch.5 · Numbers' },
  { thai: 'สิบ', roman: 'sìp', english: 'Ten (10)', example: 'Ch.5 · Numbers' },
  { thai: 'ยี่สิบ', roman: 'yîi-sìp', english: 'Twenty (20) – special rule', example: 'Ch.5 · Numbers' },
  { thai: 'ร้อย', roman: 'rói', english: 'Hundred (100)', example: 'Ch.5 · Numbers' },
  { thai: 'พัน', roman: 'pan', english: 'Thousand (1,000)', example: 'Ch.5 · Numbers' },
  { thai: 'หมื่น', roman: 'mùeen', english: 'Ten thousand (10,000)', example: 'Ch.5 · Numbers' },
  { thai: 'แสน', roman: 'săeen', english: 'Hundred thousand (100,000)', example: 'Ch.5 · Numbers' },
  { thai: 'ล้าน', roman: 'láan', english: 'Million (1,000,000)', example: 'Ch.5 · Numbers' },
  { thai: 'เอ็ด', roman: 'èt', english: 'One (1) – used at end of compound numbers', example: 'Ch.5 · Numbers' },
  { thai: 'คน', roman: 'kon', english: 'Classifier: people', example: 'Ch.5 · Classifiers' },
  { thai: 'ตัว', roman: 'dtua', english: 'Classifier: animals / clothing', example: 'Ch.5 · Classifiers' },
  { thai: 'ชิ้น', roman: 'chín', english: 'Classifier: piece / slice', example: 'Ch.5 · Classifiers' },
  { thai: 'คู่', roman: 'kûu', english: 'Classifier: a pair', example: 'Ch.5 · Classifiers' },
  { thai: 'เล่ม', roman: 'lêem', english: 'Classifier: books / bladed things', example: 'Ch.5 · Classifiers' },
  { thai: 'หลอด', roman: 'lòrt', english: 'Classifier: tube (toothpaste etc.)', example: 'Ch.5 · Classifiers' },
  { thai: 'ขวด', roman: 'kùat', english: 'Classifier: bottle', example: 'Ch.5 · Classifiers' },
  { thai: 'เครื่อง', roman: 'krûeang', english: 'Classifier: machines / devices', example: 'Ch.5 · Classifiers' },
  { thai: 'อัน', roman: 'an', english: 'Classifier: general small objects', example: 'Ch.5 · Classifiers' },
  { thai: 'เม็ด', roman: 'mét', english: 'Classifier: pills / seeds / round objects', example: 'Ch.5 · Classifiers' },
  { thai: 'ราคา', roman: 'raa-kaa', english: 'Price', example: 'Ch.5 · Shopping' },
  { thai: 'เท่าไหร่', roman: 'tâo-rài', english: 'How much?', example: 'Ch.5 · Shopping' },
  { thai: 'อันนี้', roman: 'an-níi', english: 'This one', example: 'Ch.5 · Shopping' },
  { thai: 'ลด', roman: 'lót', english: 'To reduce / discount', example: 'Ch.5 · Shopping' },
  { thai: 'บาท', roman: 'bàat', english: 'Baht (Thai currency)', example: 'Ch.5 · Shopping' },
  { thai: 'ทั้งหมด', roman: 'táng-mòt', english: 'Total / altogether', example: 'Ch.5 · Shopping' },
  { thai: 'เงิน', roman: 'ngern', english: 'Money', example: 'Ch.5 · Shopping' },
  { thai: 'เงินทอน', roman: 'ngern-torn', english: 'Change (money returned)', example: 'Ch.5 · Shopping' },
  { thai: 'ตลาด', roman: 'dtà-làat', english: 'Market', example: 'Ch.5 · Shopping' },
  { thai: 'เสื้อ', roman: 'sûea', english: 'Shirt / Top', example: 'Ch.5 · Clothing' },
  { thai: 'กางเกง', roman: 'gaang-geeng', english: 'Trousers / Pants', example: 'Ch.5 · Clothing' },
  { thai: 'รองเท้า', roman: 'rorng-táaw', english: 'Shoes', example: 'Ch.5 · Clothing' },
  { thai: 'รองเท้าแตะ', roman: 'rorng-táaw-dtàe', english: 'Sandals / Flip-flops', example: 'Ch.5 · Clothing' },
  { thai: 'ถุงเท้า', roman: 'tŭng-táaw', english: 'Socks', example: 'Ch.5 · Clothing' },
  { thai: 'กระเป๋า', roman: 'grà-bpăo', english: 'Bag', example: 'Ch.5 · Clothing' },
  { thai: 'ยาสระผม', roman: 'yaa-sà-pŏm', english: 'Shampoo', example: 'Ch.5 · Personal Care' },
  { thai: 'สบู่', roman: 'sà-bùu', english: 'Soap', example: 'Ch.5 · Personal Care' },
  { thai: 'แปรงสีฟัน', roman: 'bpraeeng-sǐi-fan', english: 'Toothbrush', example: 'Ch.5 · Personal Care' },
  { thai: 'ยาสีฟัน', roman: 'yaa-sǐi-fan', english: 'Toothpaste', example: 'Ch.5 · Personal Care' },
  { thai: 'มือถือ', roman: 'muee-tŭee', english: 'Mobile phone', example: 'Ch.5 · Daily Objects' },
  { thai: 'อายุ', roman: 'aa-yú', english: 'Age', example: 'Ch.5 · Numbers' },
  { thai: 'ปี', roman: 'bpii', english: 'Year (used for age, adult)', example: 'Ch.5 · Numbers' },
  { thai: 'ขวบ', roman: 'kùap', english: 'Year (used for age, child under ~10)', example: 'Ch.5 · Numbers' },
  { thai: 'บ้าน', roman: 'bâan', english: 'Home / House', example: 'Ch.6 · Places' },
  { thai: 'โรงแรม', roman: 'roong-raeem', english: 'Hotel', example: 'Ch.6 · Places' },
  { thai: 'โรงเรียน', roman: 'roong-rian', english: 'School', example: 'Ch.6 · Places' },
  { thai: 'โรงพยาบาล', roman: 'roong-pá-yaa-baan', english: 'Hospital', example: 'Ch.6 · Places' },
  { thai: 'ร้านอาหาร', roman: 'ráan aa-hăan', english: 'Restaurant', example: 'Ch.6 · Places' },
  { thai: 'ร้านกาแฟ', roman: 'ráan gaa-faee', english: 'Coffee shop', example: 'Ch.6 · Places' },
  { thai: 'ร้านขายยา', roman: 'ráan kăai yaa', english: 'Pharmacy', example: 'Ch.6 · Places' },
  { thai: 'สถานีตำรวจ', roman: 'sà-tăa-nii dtam-rùat', english: 'Police station', example: 'Ch.6 · Places' },
  { thai: 'สวนสาธารณะ', roman: 'sŭan săa-taa-rá-ná', english: 'Park (public)', example: 'Ch.6 · Places' },
  { thai: 'ธนาคาร', roman: 'tà-naa-kaan', english: 'Bank', example: 'Ch.6 · Places' },
  { thai: 'ห้าง', roman: 'hâang', english: 'Shopping mall', example: 'Ch.6 · Places' },
  { thai: 'ยิม', roman: 'yim', english: 'Gym', example: 'Ch.6 · Places' },
  { thai: 'โรงหนัง', roman: 'rong-năng', english: 'Cinema', example: 'Ch.6 · Places' },
  { thai: 'ไปรษณีย์', roman: 'bprai-sà-nii', english: 'Post office', example: 'Ch.6 · Places' },
  { thai: 'ห้องนอน', roman: 'hôrng-norn', english: 'Bedroom', example: 'Ch.6 · Rooms' },
  { thai: 'ห้องน้ำ', roman: 'hôrng-náam', english: 'Bathroom / Toilet', example: 'Ch.6 · Rooms' },
  { thai: 'ห้องครัว', roman: 'hôrng-krua', english: 'Kitchen', example: 'Ch.6 · Rooms' },
  { thai: 'ห้องนั่งเล่น', roman: 'hôrng-nâng-lên', english: 'Living room', example: 'Ch.6 · Rooms' },
  { thai: 'ใน', roman: 'nai', english: 'In / Inside', example: 'Ch.6 · Prepositions' },
  { thai: 'บน', roman: 'bon', english: 'On / On top of', example: 'Ch.6 · Prepositions' },
  { thai: 'ใต้', roman: 'dtâai', english: 'Under / Below', example: 'Ch.6 · Prepositions' },
  { thai: 'นอก', roman: 'nôrk', english: 'Out / Outside of', example: 'Ch.6 · Prepositions' },
  { thai: 'ข้างๆ', roman: 'kâang-kâang', english: 'Beside / Next to', example: 'Ch.6 · Prepositions' },
  { thai: 'ข้างหน้า', roman: 'kâang-nâa', english: 'In front of', example: 'Ch.6 · Prepositions' },
  { thai: 'ข้างหลัง', roman: 'kâang-lăng', english: 'Behind / At the back of', example: 'Ch.6 · Prepositions' },
  { thai: 'ระหว่าง', roman: 'rá-wàang', english: 'Between', example: 'Ch.6 · Prepositions' },
  { thai: 'ตรงข้าม', roman: 'dtrong-kâam', english: 'Opposite / Across from', example: 'Ch.6 · Prepositions' },
  { thai: 'ตรงไป', roman: 'dtrong-bpai', english: 'Go straight', example: 'Ch.6 · Directions' },
  { thai: 'เลี้ยวซ้าย', roman: 'líaw sáai', english: 'Turn left', example: 'Ch.6 · Directions' },
  { thai: 'เลี้ยวขวา', roman: 'líaw kwăa', english: 'Turn right', example: 'Ch.6 · Directions' },
  { thai: 'ข้าม', roman: 'kâam', english: 'Cross (road / bridge)', example: 'Ch.6 · Directions' },
  { thai: 'กลับไป', roman: 'glàp-bpai', english: 'Go back / Turn around', example: 'Ch.6 · Directions' },
  { thai: 'ถนน', roman: 'tà-nŏn', english: 'Road / Street', example: 'Ch.6 · Directions' },
  { thai: 'ซอย', roman: 'soi', english: 'Alley / Lane', example: 'Ch.6 · Directions' },
  { thai: 'สี่แยก', roman: 'sìi-yâeek', english: 'Intersection / Crossroads', example: 'Ch.6 · Directions' },
  { thai: 'สะพาน', roman: 'sà-paan', english: 'Bridge', example: 'Ch.6 · Directions' },
  { thai: 'ไฟแดง', roman: 'fai-daeeng', english: 'Traffic light', example: 'Ch.6 · Directions' },
  { thai: 'ใกล้', roman: 'glâi', english: 'Near', example: 'Ch.6 · Directions' },
  { thai: 'ไกลจาก', roman: 'glai jàak', english: 'Far (from a place)', example: 'Ch.6 · Directions' },
  { thai: 'วันนี้', roman: 'wan-níi', english: 'Today', example: 'Ch.3 · Time' },
  { thai: 'พรุ่งนี้', roman: 'prûng-níi', english: 'Tomorrow', example: 'Ch.3 · Time' },
  { thai: 'เมื่อวาน', roman: 'mûea-waan', english: 'Yesterday', example: 'Ch.3 · Time' },
  { thai: 'ตอนนี้', roman: 'dtorn-níi', english: 'Right now', example: 'Ch.3 · Time' },
  { thai: 'ทุกวัน', roman: 'túk wan', english: 'Every day', example: 'Ch.3 · Time' },
  { thai: 'ทุกเช้า', roman: 'túk cháaw', english: 'Every morning', example: 'Ch.3 · Time' },
  { thai: 'ทุกเย็น', roman: 'túk yen', english: 'Every evening', example: 'Ch.3 · Time' },
  { thai: 'ทุกคืน', roman: 'túk kueen', english: 'Every night', example: 'Ch.3 · Time' },
  { thai: 'ก่อน', roman: 'gòrn', english: 'Before', example: 'Ch.3 · Time' },
  { thai: 'หลัง', roman: 'lăng', english: 'After', example: 'Ch.3 · Time' },
  { thai: 'อะไร', roman: 'à-rai', english: 'What?', example: 'Ch.2 · Question Words' },
  { thai: 'ที่ไหน', roman: 'tîi-năi', english: 'Where?', example: 'Ch.6 · Question Words' },
  { thai: 'ใคร', roman: 'krai', english: 'Who?', example: 'Ch.2 · Question Words' },
  { thai: 'เมื่อไหร่', roman: 'mûea-rai', english: 'When?', example: 'Ch.3 · Question Words' },
  { thai: 'ทำไม', roman: 'tam-mai', english: 'Why?', example: 'Ch.3 · Question Words' },
  { thai: 'ยังไง', roman: 'yang-ngai', english: 'How?', example: 'Ch.6 · Question Words' },
  { thai: 'กี่', roman: 'gìi', english: 'How many?', example: 'Ch.5 · Question Words' },
  { thai: 'ดี', roman: 'dii', english: 'Good', example: 'Ch.2 · Adjectives' },
  { thai: 'มาก', roman: 'mâak', english: 'Very / A lot', example: 'Ch.2 · Adjectives' },
  { thai: 'นิดหน่อย', roman: 'nít-nòi', english: 'A little / a bit', example: 'Ch.2 · Adjectives' },
];

// ── PREMIUM DECK METADATA ───────────────────────────────────────────────────
const PREMIUM_META: Record<PremiumDeckKey, {
  label: string; icon: string; description: string;
  requiredCourses: string[]; courseNames: string; color: string;
}> = {
  sl1: {
    label: 'Speaking & Listening Book 1',
    icon: '📖',
    description: '250 essential words & phrases from Book 1 (Beginner)',
    requiredCourses: ['speaking-listening-1'],
    courseNames: 'Speaking & Listening Book 1',
    color: '#B91C1C',
  },
  slang: {
    label: 'Thai Slang & Expressions',
    icon: '🔥',
    description: '20 real Thai slang words used in everyday conversation',
    requiredCourses: ['conversational'],
    courseNames: 'Conversational Thai Mastery',
    color: '#C8981F',
  },
  script: {
    label: 'Thai Script (Consonants)',
    icon: '📝',
    description: '20 Thai consonants with class, sound & memory aid',
    requiredCourses: ['reading-writing'],
    courseNames: 'Thai Reading & Writing',
    color: '#057A52',
  },
  conversation: {
    label: 'Real Conversations',
    icon: '💬',
    description: '15 essential phrases for natural Thai conversations',
    requiredCourses: ['beginners', 'conversational'],
    courseNames: 'Beginners or Conversational Thai',
    color: '#1A3680',
  },
  proverbs: {
    label: 'Thai Proverbs & Wisdom',
    icon: '🏛️',
    description: '12 Thai proverbs with meaning and cultural context',
    requiredCourses: ['advanced'],
    courseNames: 'Advanced Thai Fluency',
    color: '#6b21a8',
  },
};

const FREE_LABELS: Record<FreeDeckKey, string> = {
  greetings: '👋 Greetings', numbers: '🔢 Numbers', food: '🍜 Food',
  tones: '🎵 Tones', travel: '✈️ Travel', dailylife: '🏠 Daily Life',
  colors: '🎨 Colors', shopping: '🛒 Shopping',
};

const FREE_KEYS = Object.keys(FREE_DECK) as FreeDeckKey[];
const TOTAL_FREE = FREE_KEYS.reduce((s, k) => s + FREE_DECK[k].length, 0);

export default function FlashcardPage() {
  const [activeDeck, setActiveDeck] = useState<DeckKey>('greetings');
  const [isPremiumActive, setIsPremiumActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState('');
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const [accessLoaded, setAccessLoaded] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef(0);
  const touchHandled = useRef(false);

  // Fetch which premium decks the user can access
  useEffect(() => {
    fetch('/api/flashcard-access')
      .then(r => r.json())
      .then(({ enrolledIds }) => { setEnrolledIds(enrolledIds ?? []); setAccessLoaded(true); })
      .catch(() => setAccessLoaded(true));
  }, []);

  const canAccessPremium = (key: PremiumDeckKey) =>
    PREMIUM_META[key].requiredCourses.some(c => enrolledIds.includes(c));

  const currentCards: Card[] = isPremiumActive
    ? PREMIUM_DECK[activeDeck as PremiumDeckKey]
    : FREE_DECK[activeDeck as FreeDeckKey];

  const card = currentCards[index];
  const deckLabel = isPremiumActive
    ? PREMIUM_META[activeDeck as PremiumDeckKey].label
    : FREE_LABELS[activeDeck as FreeDeckKey];

  const knownInDeck = Array.from(known).filter(k => k.startsWith(activeDeck + '_')).length;

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2000);
  }, []);

  const switchDeck = (key: DeckKey, premium: boolean) => {
    setActiveDeck(key); setIsPremiumActive(premium);
    setIndex(0); setFlipped(false);
  };

  const goNext = useCallback(() => { setFlipped(false); setIndex(i => (i + 1) % currentCards.length); }, [currentCards.length]);
  const goPrev = useCallback(() => { setFlipped(false); setIndex(i => (i - 1 + currentCards.length) % currentCards.length); }, [currentCards.length]);
  const markKnown = useCallback(() => {
    setKnown(prev => { const n = new Set(prev); n.add(`${activeDeck}_${index}`); return n; });
    showToast('✓ Marked as known!'); setFlipped(false);
    setIndex(i => (i + 1) % currentCards.length);
  }, [activeDeck, index, showToast, currentCards.length]);
  const markAgain = useCallback(() => {
    setKnown(prev => { const n = new Set(prev); n.delete(`${activeDeck}_${index}`); return n; });
    showToast('Keep practising!'); setFlipped(false);
    setIndex(i => (i + 1) % currentCards.length);
  }, [activeDeck, index, showToast, currentCards.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); setFlipped(f => !f); }
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Enter') markKnown();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, markKnown]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; touchHandled.current = false; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchHandled.current = true;
    if (Math.abs(dx) < 30) setFlipped(f => !f);
    else if (dx < 0) goNext();
    else goPrev();
  };
  const handleCardClick = () => { if (touchHandled.current) { touchHandled.current = false; return; } setFlipped(f => !f); };

  const progress = ((index + 1) / currentCards.length) * 100;
  const activeColor = isPremiumActive ? PREMIUM_META[activeDeck as PremiumDeckKey].color : 'var(--blue)';

  return (
    <>
      <section className="page-hero">
        <div className="container text-center">
          <p className="eyebrow" style={{ marginBottom: '12px', color: '#F5C842' }}>
            Free · {TOTAL_FREE} Cards · 8 Categories
          </p>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(36px,5vw,58px)', marginBottom: '16px' }}>Thai Flashcards</h1>
          <div className="accent-bar center" style={{ marginTop: '20px' }}><span className="accent-line"></span><span className="accent-dot"></span></div>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '18px', maxWidth: '520px', margin: '24px auto 0', lineHeight: '1.7' }}>
            Tap to flip · Arrow keys to navigate · Space to flip · Enter to mark known
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container" style={{ maxWidth: '860px' }}>

          {/* Stats bar */}
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
              {[
                { label: 'Free Cards', value: TOTAL_FREE, icon: '🗂️' },
                { label: 'Known This Deck', value: `${knownInDeck} / ${currentCards.length}`, icon: '✅' },
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

          {/* ── FREE DECKS ── */}
          <FadeIn>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>
              Free Decks
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
              {FREE_KEYS.map(cat => {
                const active = !isPremiumActive && activeDeck === cat;
                return (
                  <button key={cat} onClick={() => switchDeck(cat, false)}
                    style={{ padding: '8px 18px', borderRadius: '100px', border: '1.5px solid', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all .2s',
                      borderColor: active ? 'var(--blue)' : 'var(--border)',
                      background: active ? 'var(--blue)' : 'var(--white)',
                      color: active ? 'var(--white)' : 'var(--mid)',
                    }}>
                    {FREE_LABELS[cat]}
                  </button>
                );
              })}
            </div>
          </FadeIn>

          {/* ── PREMIUM DECKS ── */}
          <FadeIn>
            <div style={{ background: 'linear-gradient(135deg, #1a1740 0%, #2D2A6E 60%, #3d3a8a 100%)', borderRadius: '20px', padding: '24px 28px', marginBottom: '32px', position: 'relative', overflow: 'hidden' }}>
              {/* Decorative shimmer */}
              <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,152,31,.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-40px', left: '30%', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: '18px' }}>✨</span>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#F5C842', margin: 0 }}>
                    Premium Decks
                  </p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,.5)', margin: 0, marginTop: '2px' }}>
                    Exclusive flashcards unlocked with your courses & books
                  </p>
                </div>
              </div>

              {/* Premium pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', position: 'relative', zIndex: 1 }}>
                {(Object.keys(PREMIUM_META) as PremiumDeckKey[]).map(key => {
                  const meta = PREMIUM_META[key];
                  const unlocked = accessLoaded && canAccessPremium(key);
                  const active = isPremiumActive && activeDeck === key;
                  return (
                    <button key={key}
                      onClick={() => { if (unlocked) switchDeck(key, true); }}
                      title={unlocked ? `Study ${meta.label}` : `Unlock: ${meta.courseNames}`}
                      style={{
                        padding: '9px 18px', borderRadius: '100px',
                        fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', fontWeight: 700,
                        cursor: unlocked ? 'pointer' : 'default', transition: 'all .2s',
                        border: active ? '2px solid #F5C842' : unlocked ? '2px solid rgba(245,200,66,.5)' : '2px solid rgba(255,255,255,.15)',
                        background: active ? '#F5C842' : unlocked ? 'rgba(245,200,66,.12)' : 'rgba(255,255,255,.06)',
                        color: active ? '#1a1740' : unlocked ? '#F5C842' : 'rgba(255,255,255,.45)',
                        opacity: accessLoaded && !unlocked ? 0.7 : 1,
                        backdropFilter: 'blur(4px)',
                      }}>
                      {unlocked ? '✦' : '🔒'} {meta.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          {/* Deck label & progress */}
          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--mid)' }}>
                {isPremiumActive && <span style={{ color: activeColor, marginRight: '6px' }}>🔓</span>}
                {deckLabel} · {currentCards.length} cards
              </span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--dark)' }}>{index + 1} / {currentCards.length}</span>
            </div>
            <div style={{ height: '6px', background: 'var(--border)', borderRadius: '100px', marginBottom: '24px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${activeColor}, var(--yellow))`, borderRadius: '100px', transition: 'width .3s' }} />
            </div>
          </FadeIn>

          {/* Flashcard */}
          <FadeIn>
            <div style={{ perspective: '1200px', marginBottom: '24px' }}
              onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <div onClick={handleCardClick}
                style={{ position: 'relative', height: '320px', cursor: 'pointer', transformStyle: 'preserve-3d', transition: 'transform .6s cubic-bezier(.4,0,.2,1)', transform: flipped ? 'rotateY(180deg)' : 'none' }}>

                {/* Front */}
                <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', background: 'linear-gradient(145deg, #2D2A6E 0%, #4845A0 60%, #6563C2 100%)', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '36px 40px', boxShadow: '0 12px 48px rgba(45,42,110,.35)', overflow: 'hidden' }}>
                  {/* Soft glow top-right */}
                  <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '240px', height: '240px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.10) 0%, transparent 70%)', pointerEvents: 'none' }} />
                  {/* Gold shimmer bottom-left */}
                  <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,152,31,.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
                  {isPremiumActive && (
                    <div style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#1a1740', background: 'linear-gradient(135deg, #F5C842 0%, #e8a800 100%)', padding: '5px 12px', borderRadius: '100px', boxShadow: '0 2px 12px rgba(200,152,31,.5)' }}>
                      ✦ Premium
                    </div>
                  )}
                  {/* Thai word — Browallia, white, large */}
                  <div style={{ fontFamily: "'Browallia New', 'BrowalliaUPC', 'Browallia', 'Noto Sans Thai', sans-serif", fontSize: 'clamp(54px,8vw,84px)', fontWeight: 400, color: '#ffffff', lineHeight: 1.3, marginBottom: '16px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    {card.thai}
                  </div>
                  {/* Phonetics — gold, big, pill */}
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(22px,3.5vw,30px)', fontWeight: 700, color: '#F5C842', marginBottom: '22px', position: 'relative', zIndex: 1, background: 'rgba(200,152,31,.18)', padding: '6px 22px', borderRadius: '100px', border: '1px solid rgba(245,200,66,.25)' }}>
                    {card.roman}
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.4)', position: 'relative', zIndex: 1, fontWeight: 500 }}>Tap to reveal meaning ↓</div>
                </div>

                {/* Back */}
                <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: `linear-gradient(145deg, ${activeColor} 0%, ${activeColor}cc 100%)`, borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '36px 40px', boxShadow: `0 8px 40px ${activeColor}40`, overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
                  {/* English meaning — big */}
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(24px,4vw,38px)', fontWeight: 800, color: '#ffffff', marginBottom: '10px', textAlign: 'center', position: 'relative', zIndex: 1, lineHeight: 1.3 }}>{card.english}</div>
                  {/* Phonetics on back too — readable */}
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 600, color: 'rgba(255,255,255,.75)', fontStyle: 'italic', marginBottom: '20px', position: 'relative', zIndex: 1 }}>{card.roman}</div>
                  <div style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', borderRadius: '14px', padding: '12px 20px', fontSize: '14px', color: 'rgba(255,255,255,.9)', lineHeight: '1.6', textAlign: 'center', maxWidth: '480px', position: 'relative', zIndex: 1 }}>
                    {card.example}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Navigation */}
          <FadeIn>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
              <button onClick={goPrev} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1.5px solid var(--border)', background: 'var(--white)', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}>←</button>
              <button onClick={() => setFlipped(f => !f)} style={{ flex: 1, maxWidth: '200px', padding: '12px 24px', borderRadius: '100px', border: '1.5px solid var(--border)', background: 'var(--white)', fontSize: '14px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, cursor: 'pointer', color: 'var(--mid)', transition: 'all .2s' }}>
                🔄 Flip
              </button>
              <button onClick={goNext} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1.5px solid var(--border)', background: 'var(--white)', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}>→</button>
            </div>
          </FadeIn>

          {/* Known / Again */}
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
              <button onClick={markAgain} style={{ padding: '14px', borderRadius: 'var(--r)', border: '1.5px solid #fca5a5', background: '#fef2f2', color: '#dc2626', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>🔁 Again</button>
              <button onClick={markKnown} style={{ padding: '14px', borderRadius: 'var(--r)', border: '1.5px solid #86efac', background: '#f0fdf4', color: '#16a34a', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>✅ Known</button>
            </div>
          </FadeIn>

          <FadeIn>
            <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--muted)' }}>
              ⌨️ <strong>Keyboard:</strong> Space / ↑↓ = flip &nbsp;·&nbsp; ← → = navigate &nbsp;·&nbsp; Enter = mark known
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-pad bg-blue-gradient">
        <FadeIn className="container text-center">
          <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Want More Flashcards?</p>
          <h2 className="section-title" style={{ color: 'var(--white)', marginBottom: '16px' }}>Unlock Premium Decks with a Course</h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.7)', maxWidth: '540px', margin: '0 auto 36px', lineHeight: '1.7' }}>
            Each course unlocks exclusive flashcard decks — from Thai slang and script to proverbs and real conversations. Learn deeper, practise smarter.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/courses" className="btn btn-yellow btn-lg">See All Courses</Link>
            <Link href="/books" className="btn btn-outline-white btn-lg">Browse Books</Link>
          </div>
        </FadeIn>
      </section>

      {toast && (
        <div style={{ position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)', background: 'var(--dark)', color: 'var(--white)', padding: '12px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, zIndex: 9999, boxShadow: '0 8px 32px rgba(0,0,0,.25)', pointerEvents: 'none' }}>
          {toast}
        </div>
      )}
    </>
  );
}
