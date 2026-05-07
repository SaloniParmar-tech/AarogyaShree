const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const aiSafety = require("../middleware/aiSafety");

const geminiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
});

module.exports = (genAI) => {
  router.post("/sakhi", geminiLimiter, async (req, res) => {
    const { message, history = [], language = "English" } = req.body;

    if (!message || typeof message !== "string" || message.trim().length < 2) {
      return res.status(400).json({
        reply: "Please share a little more so I can guide you safely.",
      });
    }

    const blockedPatterns = [
      /suicide|self harm|kill myself|die/i,
      /dosage|dose|prescribe|which medicine|antibiotic/i,
      /nude|explicit/i,
      /bomb|weapon|attack|terror/i,
      /hack|illegal/i,
    ];

    if (blockedPatterns.some((pattern) => pattern.test(message))) {
      return res.json({
        reply:
          "I may not be the right support for this. If this is urgent or you feel unsafe, please contact local emergency services or a trusted person nearby. For medical decisions, please speak with a qualified doctor.",
      });
    }

    try {
      const recentHistory = Array.isArray(history)
        ? history.slice(-8).map((item) => `${item.sender}: ${item.text}`).join("\n")
        : "";

      const prompt = `
You are Sakhi, a warm women's health assistant for AarogyaShree.

Style:
- Be gentle, concise, and practical.
- Reply in ${language || "English"}.
- Use simple language.
- Ask 1 useful follow-up question when needed.
- Do not use emojis.

Medical safety:
- You are not a doctor and must not diagnose, prescribe medicine, dosage, or guarantee cures.
- For severe symptoms, pregnancy concerns, heavy bleeding, chest pain, breathing difficulty, fainting, severe abdominal pain, high fever, breast lump, abnormal bleeding, or symptoms that persist, recommend consulting a qualified healthcare professional urgently.
- Encourage screening and clinic visits where appropriate.

Recent chat:
${recentHistory || "No prior messages."}

User message:
${message.trim()}
`;

      if (!process.env.GEMINI_API_KEY) {
        const pollinationsReply = await getPollinationsReply(prompt);
        return res.json({ reply: pollinationsReply || buildFallbackReply(message, language) });
      }

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const result = await model.generateContent(prompt);
      const reply = result.response.text();
      res.json({ reply });
    } catch (error) {
      console.error("SAKHI CHAT ERROR");
      console.error(error);
      res.json({ reply: buildFallbackReply(message, language) });
    }
  });

  router.post(
  "/gemini-summary",
  geminiLimiter,
  aiSafety,
  async (req, res) => {

    const { title, description, language } = req.body;

    if (!title || !description || !language) {
      return res.status(400).json({
        text: "Invalid request data.",
      });
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
     const prompt = `
You are an educational content summarizer.

Your task:
- Summarize the given content in simple language.
- Output only bullet points (minimum 3, maximum 5).
- Use ONLY the requested language strictly.

Rules:
- Do NOT provide medical, legal, or professional advice.
- Do NOT mention diagnosis, treatment, or cures.
- Do NOT add headings, introductions, or explanations.
- Do NOT mention that you are an AI.
- No emojis.

Language rules:
- If the language is unclear or not a real human language, respond EXACTLY with:
  The requested language does not exist.

Requested language:
"${language}"

Content title:
"${title}"

Content description:
"${description}"
`;

const result = await model.generateContent(prompt);
      const text = result.response.text();

      res.json({ text });
    } catch (error) {
      console.error("GEMINI SUMMARY ERROR 👇");
      console.error(error);

      res.status(500).json({
        text: "Unable to generate summary at the moment.",
      });
    }
  });

  return router;
};

function buildFallbackReply(message, language = "English") {
  const text = message.toLowerCase();
  const languageKey = String(language).toLowerCase();
  const localized = fallbackReplies[languageKey] || fallbackReplies.english;

  if (text.includes("period") || text.includes("pcos") || text.includes("cycle")) {
    return localized.periods;
  }

  if (text.includes("breast") || text.includes("lump")) {
    return localized.breast;
  }

  if (text.includes("cervical") || text.includes("pap") || text.includes("discharge")) {
    return localized.cervical;
  }

  if (text.includes("urine") || text.includes("uti") || text.includes("burning")) {
    return localized.urinary;
  }

  return localized.general;
}

const fallbackReplies = {
  english: {
    periods: "Irregular periods can happen due to stress, weight changes, thyroid issues, PCOS, or other hormone changes. Track your cycle dates, bleeding flow, pain, and acne or hair-growth changes. If periods are missed for more than 2 months, bleeding is very heavy, or pain is severe, please consult a gynecologist.",
    breast: "Breast pain can be linked to cycles, but a new lump, nipple discharge, skin dimpling, redness, or one-sided persistent pain should be checked by a doctor. If you noticed a lump, book a clinical breast exam soon.",
    cervical: "Cervical screening helps find early changes before they become serious. If you have bleeding between periods, bleeding after sex, foul-smelling discharge, or pelvic pain, it is better to consult a gynecologist and ask about Pap or HPV screening.",
    urinary: "Burning urine, frequent urge, lower belly pain, fever, or back pain can suggest a urinary infection. Drink water, avoid delaying urination, and consult a doctor, especially if fever, pregnancy, blood in urine, or back pain is present.",
    general: "I can help you think through symptoms and next steps, but I cannot diagnose. Tell me what you are feeling, how long it has been happening, your age group, and whether there is pain, fever, bleeding, discharge, or any lump. If symptoms are severe or worrying, please consult a healthcare professional.",
  },
  marathi: {
    periods: "अनियमित पाळी ताण, वजनातील बदल, थायरॉईड, PCOS किंवा हार्मोन बदलांमुळे होऊ शकते. पाळीच्या तारखा, रक्तस्राव, वेदना आणि त्वचा किंवा केसांतील बदल नोंदवा. दोन महिन्यांपेक्षा जास्त पाळी चुकली, खूप रक्तस्राव झाला किंवा तीव्र वेदना असतील तर स्त्रीरोगतज्ज्ञांना भेटा.",
    breast: "स्तनातील वेदना पाळीशी संबंधित असू शकतात, पण नवीन गाठ, स्तनाग्रातून स्त्राव, त्वचेतील बदल, लालसरपणा किंवा एकाच बाजूची सतत वेदना असल्यास डॉक्टरांकडून तपासणी करून घ्या.",
    cervical: "गर्भाशय मुख तपासणी गंभीर होण्याआधी सुरुवातीचे बदल ओळखण्यास मदत करते. पाळीच्या मध्ये रक्तस्राव, संबंधानंतर रक्तस्राव, दुर्गंधीयुक्त स्त्राव किंवा पोटाखाली वेदना असल्यास स्त्रीरोगतज्ज्ञांचा सल्ला घ्या.",
    urinary: "लघवीत जळजळ, वारंवार लघवीची भावना, पोटाखाली वेदना, ताप किंवा पाठदुखी ही मूत्र संसर्गाची लक्षणे असू शकतात. पाणी प्या आणि डॉक्टरांचा सल्ला घ्या, विशेषतः ताप, गर्भधारणा, रक्त किंवा पाठदुखी असल्यास.",
    general: "मी लक्षणे आणि पुढील पावले समजून घेण्यास मदत करू शकते, पण निदान करू शकत नाही. काय त्रास आहे, किती दिवसांपासून आहे, वय गट, वेदना, ताप, रक्तस्राव, स्त्राव किंवा गाठ आहे का ते सांगा. त्रास जास्त असल्यास डॉक्टरांना भेटा.",
  },
  telugu: {
    periods: "అనియమిత పీరియడ్స్ ఒత్తిడి, బరువు మార్పులు, థైరాయిడ్, PCOS లేదా హార్మోన్ మార్పుల వల్ల రావచ్చు. తేదీలు, రక్తస్రావం, నొప్పి, మొటిమలు లేదా జుట్టు మార్పులు నమోదు చేయండి. రెండు నెలలకు పైగా పీరియడ్స్ రాకపోతే, ఎక్కువ రక్తస్రావం లేదా తీవ్రమైన నొప్పి ఉంటే గైనకాలజిస్టును కలవండి.",
    breast: "స్తన నొప్పి పీరియడ్స్‌తో సంబంధం ఉండవచ్చు, కానీ కొత్త గడ్డ, నిప్పుల్ డిశ్చార్జ్, చర్మ మార్పు, ఎర్రదనం లేదా ఒక వైపు నిరంతర నొప్పి ఉంటే డాక్టర్‌తో పరీక్ష చేయించుకోండి.",
    cervical: "సర్వికల్ స్క్రీనింగ్ ప్రారంభ మార్పులను ముందుగానే గుర్తించడంలో సహాయపడుతుంది. పీరియడ్స్ మధ్య రక్తస్రావం, సంబంధం తర్వాత రక్తస్రావం, దుర్వాసనతో డిశ్చార్జ్ లేదా పెల్విక్ నొప్పి ఉంటే గైనకాలజిస్టును సంప్రదించండి.",
    urinary: "మూత్రంలో మంట, తరచుగా మూత్రం రావడం, కింది కడుపు నొప్పి, జ్వరం లేదా వెన్నునొప్పి మూత్ర ఇన్ఫెక్షన్ సూచన కావచ్చు. నీరు తాగండి మరియు డాక్టర్‌ను సంప్రదించండి, ముఖ్యంగా జ్వరం, గర్భధారణ, రక్తం లేదా వెన్నునొప్పి ఉంటే.",
    general: "నేను లక్షణాలు మరియు తదుపరి చర్యలను అర్థం చేసుకోవడంలో సహాయం చేయగలను, కానీ నిర్ధారణ చేయలేను. మీకు ఏమి అనిపిస్తోంది, ఎంతకాలంగా ఉంది, వయస్సు గుంపు, నొప్పి, జ్వరం, రక్తస్రావం, డిశ్చార్జ్ లేదా గడ్డ ఉందా చెప్పండి. తీవ్రమైన లక్షణాలు ఉంటే డాక్టర్‌ను కలవండి.",
  },
  bengali: {
    periods: "অনিয়মিত পিরিয়ড স্ট্রেস, ওজনের পরিবর্তন, থাইরয়েড, PCOS বা হরমোনের পরিবর্তনের কারণে হতে পারে। তারিখ, রক্তস্রাব, ব্যথা এবং ত্বক বা চুলের পরিবর্তন লিখে রাখুন। দুই মাসের বেশি পিরিয়ড না হলে, খুব বেশি রক্তস্রাব বা তীব্র ব্যথা থাকলে গাইনোকোলজিস্ট দেখান।",
    breast: "স্তনের ব্যথা পিরিয়ডের সঙ্গে যুক্ত হতে পারে, কিন্তু নতুন গাঁট, নিপল থেকে স্রাব, ত্বকের পরিবর্তন, লালভাব বা একদিকে স্থায়ী ব্যথা থাকলে ডাক্তার দেখানো জরুরি।",
    cervical: "সার্ভিকাল স্ক্রিনিং গুরুতর হওয়ার আগে প্রাথমিক পরিবর্তন চিনতে সাহায্য করে। পিরিয়ডের মাঝে রক্তস্রাব, সহবাসের পরে রক্তস্রাব, দুর্গন্ধযুক্ত স্রাব বা পেলভিক ব্যথা থাকলে গাইনোকোলজিস্টের পরামর্শ নিন।",
    urinary: "প্রস্রাবে জ্বালা, বারবার প্রস্রাবের চাপ, তলপেটে ব্যথা, জ্বর বা পিঠে ব্যথা মূত্র সংক্রমণের লক্ষণ হতে পারে। পানি পান করুন এবং ডাক্তার দেখান, বিশেষ করে জ্বর, গর্ভাবস্থা, প্রস্রাবে রক্ত বা পিঠে ব্যথা থাকলে।",
    general: "আমি লক্ষণ এবং পরবর্তী পদক্ষেপ বুঝতে সাহায্য করতে পারি, কিন্তু রোগ নির্ণয় করতে পারি না। কী অনুভব করছেন, কতদিন ধরে হচ্ছে, বয়সের গোষ্ঠী, ব্যথা, জ্বর, রক্তস্রাব, স্রাব বা গাঁট আছে কি না বলুন। লক্ষণ গুরুতর হলে ডাক্তার দেখান।",
  },
};

fallbackReplies.hindi = fallbackReplies.english;

async function getPollinationsReply(prompt) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai`;
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) return "";

    const text = await response.text();
    return text.trim();
  } catch {
    return "";
  } finally {
    clearTimeout(timeout);
  }
}
