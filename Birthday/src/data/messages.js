export const ANIMATIONS = [
  { id: 'gift', name: 'Gift Box Opening', description: 'A wrapped gift they tap to open', icon: '🎁' },
  { id: 'balloons', name: 'Floating Balloons', description: 'Colorful balloons drift across the sky', icon: '🎈' },
  { id: 'textReveal', name: 'Birthday Text Reveal', description: 'Letter-by-letter "Happy Birthday"', icon: '✨' },
  { id: 'envelopes', name: 'Message Envelopes', description: 'Tap sealed envelopes to reveal hidden messages', icon: '💌', mandatory: true },
  { id: 'photos', name: 'Photo Memories', description: 'Animated slideshow of uploaded photos', icon: '📸' },
  { id: 'letter', name: 'Love Letter', description: 'A sealed envelope to open', icon: '💌' },
  { id: 'candles', name: 'Blow the Candles', description: 'A cake with candles to blow out', icon: '🎂' },
  { id: 'finale', name: 'Final Celebration', description: 'Fireworks, confetti and a grand finale', icon: '🎆' },
];

export const MESSAGE_CATEGORIES = [
  { id: 'romantic', name: 'Romantic', emoji: '❤️' },
  { id: 'cute', name: 'Cute', emoji: '🥰' },
  { id: 'friendship', name: 'Friendship', emoji: '🤝' },
  { id: 'emotional', name: 'Heart Touching', emoji: '💔' },
  { id: 'funny', name: 'Funny', emoji: '😂' },
  { id: 'heart', name: 'From the Heart', emoji: '💝' },
];

export const MESSAGE_LANGUAGES = [
  { id: 'en', name: 'English' },
  { id: 'hi', name: 'हिंदी' },
  { id: 'hinglish', name: 'Hinglish' },
];

export const MESSAGES = {
  romantic: {
    en: [
      'Another year of loving you, and I hope there are many more to come.',
      'You are my today and all of my tomorrows.',
      'Growing older with you is my favorite plan.',
      'Every love story is beautiful, but ours is my favorite.',
    ],
    hi: [
      'तुम्हें प्यार करना कभी पुराना नहीं होता। यह जन्मदिन तुम्हारा सबसे खास दिन है।',
      'मेरे हर सपने में तुम हो, और यही मेरी सबसे बड़ी खुशियाँ हैं।',
      'तुम मेरे जीवन की सबसे खूबसूरत कविता हो। जन्मदिन मुबारक हो!',
      'हर उम्मीद, हर लेकिन, हर पल तुम्हारी एक झलक माँगता है।',
    ],
    hinglish: [
      'Tujhse pyaar karna kabhi purana nahi hota. Aaj tera sabse khaas din hai!',
      'Tu meri har dua mein hai. Happy Birthday meri jaan!',
      'Har saal tumhare saath bitana ek naya sapna lagta hai. JDMM!',
      'Tere bina har din adhura lagta hai. Aaj tera din hai, jaane dena!',
    ],
  },
  cute: {
    en: [
      'You are the cutest person alive and today is YOUR day!',
      'Warning: extreme cuteness detected. Happy Birthday!',
      'Another year older, but somehow you are getting more adorable.',
      'Cake is for eating, but you are for adoring. Happy Birthday!',
    ],
    hi: [
      'तुम दुनिया के सबसे प्यारे इंसान हो, और आज तुम्हारा ही दिन है!',
      'चेतावनी: बहुत ज़्यादा प्यारी। जन्मदिन मुबारक हो!',
      'एक और साल बड़िया, लेकिन तुम और भी प्यारे होते जा रहे हो।',
      'केक खाने के लिए है, पर तुम देखने के लिए हो। जन्मदिन मुबारक!',
    ],
    hinglish: [
      'Tune duniya ka sabse cute banda banaya hai. Happy Birthday yaaar!',
      'Ek saal aur bada, par kitna cute ho gaye ho. JDMM!',
      'Cake khaane ke liye hai, par tu admire karne ke liye hai. HB!',
      'Aaj ka din tera hai, poora din! Koi mat rokna.',
    ],
  },
  friendship: {
    en: [
      'True friends are the family we choose. Happy Birthday!',
      'Thanks for being the partner in crime I needed. Cheers to you!',
      'A birthday wish for the friend who makes life lighter.',
      'May your day be as epic as the stories we tell.',
    ],
    hi: [
      'सच्चे दोस्त वही परिवार हैं जो हम खुद चुनते हैं। जन्मदिन मुबारक!',
      'इतने सालों का साथ, और भी बहुत सारे साल बाकी हैं। शाबाश!',
      'जिस दोस्त ने ज़िंदगी आसान बनाई, उसके लिए ये जन्मदिन की शुभकामनाएँ!',
      'आज का दिन इतना मज़ेदार हो जितनी हमारी साथ की कहानियाँ!',
    ],
    hinglish: [
      'Sache dost hi wo family hai jo hum khud chunte hain. JDMM yaar!',
      'Itne saal ka saath, aur bhi saare saal baki hain. Shabaash!',
      'Life ko easy banane wale dost ke liye happy birthday wishes!',
      'Aaj ka din itna mast ho jitna humari stories hoti hain!',
    ],
  },
  emotional: {
    en: [
      'Through every storm you stood by me. Thank you for everything. Happy Birthday.',
      'Some people make the world brighter just by being in it. You are one of them.',
      'I am grateful for every laugh, every tear, every memory we share.',
      'You have been my strength, my comfort and my greatest blessing.',
    ],
    hi: [
      'हर मुश्किल में तुम मेरे साथ खड़े रहे। तुम्हारी हर चीज़ के लिए धन्यवाद। जन्मदिन मुबारक।',
      'कुछ लोग सिर्फ अपनी मौजूदगी से दुनिया रोशन कर देते हैं। तुम उनमें से एक हो।',
      'हर हंसी, हर आँसू, हर याद के लिए मैं आभारी हूँ।',
      'तुम मेरी ताकत, मेरा सहारा और मेरी सबसे बड़ी दुआ हो।',
    ],
    hinglish: [
      'Har mushkil mein mere saath khade rahe. Teri har cheez ke liye shukriya. Happy Birthday!',
      'Kuch log sirf apni maujoodgi se duniya roshan kar dete hain. Tu unmein se ek hai.',
      'Har hasi, har aansoo, har yaad ke liye main shukraguzaar hoon.',
      'Tu meri taqat, mera sahara aur meri sabse badi dua hai.',
    ],
  },
  funny: {
    en: [
      'Happy Birthday! You are not old, you are vintage and therefore expensive.',
      'Another year closer to retirement! Just kidding... probably.',
      'I was going to get you something amazing, but honestly you are already amazing.',
      'Happy Birthday to someone who makes my life dramatically better.',
    ],
    hi: [
      'जन्मदिन मुबारक! तुम बूढ़े नहीं, तुम विंटेज हो — और विंटेज महंगा होता है।',
      'एक और साल, रिटायरमेंट के करीब! मज़ाक है... शायद।',
      'मैं तुझे कुछ कमाल का देना चाहता था, पर सच कहूँ तो तू खुद कमाल है।',
      'जन्मदिन मुबारक उस शख्स को जो मेरी ज़िंदगी को कमाल बना देता है।',
    ],
    hinglish: [
      'Happy Birthday! Tu purana nahi, tu vintage hai — aur vintage mehenga hota hai.',
      'Ek aur saal, retirement ke kareeb! Mazaak hai... shayad.',
      'Kuch amazing dena chahta tha, par sach kahoon to tu khud amazing hai.',
      'Happy Birthday us banda ko jo meri life ko dramatically better banata hai.',
    ],
  },
  heart: {
    en: [
      'If I had one wish for you, it would be that today brings you everything you deserve.',
      'You are someone I am proud to know, proud to love, proud to call mine.',
      'May this new year of your life be filled with the same joy you give others.',
      'Every day with you feels like a gift. Today, the gift is all yours.',
    ],
    hi: [
      'अगर मैं तुम्हारे लिए एक इच्छा कर सकता, तो यही चाहूँगा कि आज तुम्हें वो सब मिले जो तुम हकदार हो।',
      'तुम ऐसा इंसान हो जिस पर मुझे गर्व है — जानने पर, प्यार करने पर, अपना कहने पर।',
      'आशा है यह नया साल तुम्हें उतनी ही खुशी दे जितनी तुम दूसरों को देते हो।',
      'तुम्हारे साथ का हर दिन एक तोहफे जैसा लगता है। आज, सब कुछ तुम्हारा है।',
    ],
    hinglish: [
      'Agar main tere liye ek wish kar sakta, toh wish karta ki aaj tere ko wo sab mile jo tu deserve karta hai.',
      'Tu aisa insaan hai jis par mujhe fakhr hai — jaanne par, pyaar karne par, apna kehne par.',
      'Umeed hai ye naya saal tere ko utni hi khushi de jitni tu doosron ko deta hai.',
      'Tere saath ka har din ek tohfa jaisa lagta hai. Aaj, sab kuch tera hai.',
    ],
  },
};

export function getPresetMessage(category, language, index) {
  const list = MESSAGES[category]?.[language] || MESSAGES[category]?.en || [];
  return list[index % list.length] || '';
}

export function resolveMessage(slot) {
  if (slot.mode === 'custom') return slot.customText || '';
  return getPresetMessage(slot.category, slot.language, slot.presetIndex ?? 0);
}
