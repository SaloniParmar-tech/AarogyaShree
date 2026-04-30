import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const LanguageContext = createContext();

const translations = {
  en: {
    assessment: "Assessment",
    dashboard: "Dashboard",
    askSakhi: "Ask Sakhi",
    clinics: "Clinics",
    resources: "Resources",
    community: "Community",
    english: "English",
    hindi: "Hindi",
    loginSignup: "Login / Sign Up",
    myAccount: "My Account",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    careMenu: "AarogyaShree care menu",
    trustedSakhi: "Your trusted health sakhi",
    heroTitlePrefix: "A gentle, intelligent companion for",
    yourHealth: "Your Health",
    heroCopy:
      "Understand your body, detect early signs, and get guidance in a safe and personal way. Built for every woman across India.",
    startHealthCheck: "Start My Health Check",
    learnMore: "Learn More",
    aiInsights: "AI-powered insights",
    designedForWomen: "Designed for women",
    multilingual: "Multilingual support",
    requiredFirstStep: "Required first step",
    completeQuestionnaire: "Complete your health questionnaire first",
    questionnaireIntro:
      "Sakhi starts with simple required questions so your health overview is based on your symptoms and history. Image upload comes later as an optional support step.",
    takesFewMinutes: "Takes only a few minutes",
    privateRespectful: "Private and respectful",
    startQuestionnaire: "Start Questionnaire",
    assessmentFlow: "Your assessment flow",
    oneGuidedPath: "One guided path",
    answerRequired: "Answer required questions",
    answerRequiredDesc:
      "Symptoms, cycle, breast health, cervical health, mood, and lifestyle.",
    addImageIfNeeded: "Add image if needed",
    addImageIfNeededDesc:
      "Optional final step after the questionnaire. Skip it anytime.",
    getOverview: "Get your health overview",
    getOverviewDesc: "A gentle summary with clear next steps and suggestions.",
    step: "Step",
    optionalImageAfter: "Optional image upload comes after the questionnaire",
    optionalImageCopy:
      "You can upload an image if you want extra AI-assisted guidance. On mobile, Sakhi will also show a camera option.",
    welcomeBack: "Welcome Back Sakhi",
    joinAarogyaShree: "Join AarogyaShree",
    fullName: "Full Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    login: "Login",
    signUp: "Sign Up",
    newHere: "New here?",
    createAccount: "Create account",
    alreadyRegistered: "Already registered?",
    authFailedLocal:
      "Backend login is unavailable, so Sakhi saved this session locally.",
    yourSakhi: "Your Sakhi",
    question: "Question",
    of: "of",
    complete: "Complete",
    questionnaireComplete: "Questionnaire complete",
    questionnaireCompleteCopy:
      "Your required answers are ready. You can now add an optional image for extra AI-assisted guidance, or skip it and view your health overview.",
    requiredDone: "Required questions completed",
    imageOptional: "Image upload is optional",
    skipReport: "You can skip to your report",
    addOptionalImage: "Add optional image",
    addOptionalImageCopy:
      "Upload or capture an image if you want additional guidance.",
    continueImage: "Continue to image step",
    skipImageReport: "Skip image and view report",
    skipImageReportCopy:
      "Go directly to your health overview based on the required questionnaire.",
    viewReport: "View my report",
    imageAssessment: "Image-based assessment",
    uploadSafely: "Upload your image safely",
    uploadSafelyCopy:
      "Add a clear image so Sakhi can provide gentle AI-assisted guidance. This is supportive information, not a medical diagnosis.",
    addClearImage: "Add a clear image",
    clearImageCopy:
      "Use good lighting, keep the image steady, and avoid sharing anything you are not comfortable uploading.",
    clickImage: "Click Image",
    uploadImage: "Upload Image",
    cameraMobile: "Camera capture appears on mobile devices.",
    changeImage: "Change image",
    remove: "Remove",
    analyzeImage: "Analyze Image",
    skipImage: "Skip Image",
    beforeUpload: "Before you upload",
    imageTip1: "Use a clear, well-lit image.",
    imageTip2: "Avoid including face or identity details if not needed.",
    imageTip3:
      "Consult a doctor for pain, discharge, bleeding, lumps, or symptoms that persist.",
    gentleInsight: "Sakhi's gentle insight",
    gentleInsightCopy:
      "Based on the image provided, everything appears generally normal in this placeholder preview. If you are experiencing discomfort or changes, consider consulting a healthcare professional.",
    maintainHygiene: "Maintain proper hygiene",
    stayHydrated: "Stay hydrated",
    seekAdvice: "Seek medical advice if symptoms persist",
    continueReport: "Continue to Health Report",
    ageSakhi: "Let me know your age group so I can guide you better.",
    ageQuestion: "What is your age group?",
    previous: "Previous",
    next: "Next",
    menstrualSakhi: "Let's talk about your periods and hormonal health.",
    regularPeriods: "Are your periods regular?",
    cycleLength: "Your usual cycle length?",
    heavyBleeding: "Do you have very heavy bleeding?",
    missedPeriods: "Missed periods for 2+ months (not pregnant)?",
    yes: "Yes",
    no: "No",
    sometimes: "Sometimes",
    cervicalSakhi: "Some questions related to cervical health.",
    abnormalDischarge: "Abnormal vaginal discharge?",
    bleedingBetween: "Bleeding after intercourse or between periods?",
    pelvicPain: "Pelvic or lower abdominal pain?",
    papTest: "Have you ever had a Pap test?",
    never: "Never",
    moreThan3Years: "More than 3 years ago",
    within3Years: "Within last 3 years",
    breastSakhi: "Let's check for any breast-related symptoms.",
    breastLump: "Have you felt any lump in breast or armpit?",
    breastSkin: "Any change in breast skin or shape?",
    nippleDischarge: "Any nipple discharge (not breast milk)?",
    familyHistory: "Family history of breast cancer?",
    notSure: "Not sure",
    generalSakhi: "Some general health questions before we finish.",
    burningUrine: "Burning sensation while urinating?",
    frequentUrge: "Frequent urge to urinate?",
    feverBackPain: "Fever or back pain with urinary problems?",
    moodSakhi: "Last few questions about your mood and daily habits.",
    emotionalFeeling: "How are you feeling emotionally these days?",
    sleepQuestion: "How is your sleep usually?",
    exerciseQuestion: "Do you exercise at least 3 days a week?",
    good: "Good",
    stressed: "Stressed",
    anxious: "Anxious",
    veryLow: "Very low",
    poor: "Poor",
    less21: "<21 days",
    days21to35: "21-35 days",
    more35: ">35 days",
  },
  hi: {
    assessment: "मूल्यांकन",
    dashboard: "डैशबोर्ड",
    askSakhi: "सखी से पूछें",
    clinics: "क्लिनिक",
    resources: "संसाधन",
    community: "समुदाय",
    english: "English",
    hindi: "हिंदी",
    loginSignup: "लॉगिन / साइन अप",
    myAccount: "मेरा अकाउंट",
    profile: "प्रोफाइल",
    settings: "सेटिंग्स",
    logout: "लॉगआउट",
    careMenu: "AarogyaShree केयर मेन्यू",
    trustedSakhi: "आपकी भरोसेमंद स्वास्थ्य सखी",
    heroTitlePrefix: "आपके लिए एक सरल, समझदार साथी",
    yourHealth: "आपके स्वास्थ्य के लिए",
    heroCopy:
      "अपने शरीर को समझें, शुरुआती संकेत पहचानें, और सुरक्षित तरीके से निजी मार्गदर्शन पाएं। भारत की हर महिला के लिए बनाया गया।",
    startHealthCheck: "स्वास्थ्य जांच शुरू करें",
    learnMore: "और जानें",
    aiInsights: "AI आधारित जानकारी",
    designedForWomen: "महिलाओं के लिए बनाया गया",
    multilingual: "कई भाषाओं की सुविधा",
    requiredFirstStep: "पहला जरूरी चरण",
    completeQuestionnaire: "पहले स्वास्थ्य questionnaire पूरा करें",
    questionnaireIntro:
      "सखी पहले कुछ आसान जरूरी सवाल पूछती है, ताकि आपका health overview आपके symptoms और history पर आधारित हो। Image upload बाद में optional support step है।",
    takesFewMinutes: "सिर्फ कुछ मिनट लगेंगे",
    privateRespectful: "निजी और सम्मानजनक",
    startQuestionnaire: "Questionnaire शुरू करें",
    assessmentFlow: "आपका assessment flow",
    oneGuidedPath: "एक guided path",
    answerRequired: "जरूरी सवालों के जवाब दें",
    answerRequiredDesc:
      "Symptoms, cycle, breast health, cervical health, mood और lifestyle.",
    addImageIfNeeded: "जरूरत हो तो image जोड़ें",
    addImageIfNeededDesc:
      "Questionnaire के बाद optional final step. आप इसे कभी भी skip कर सकती हैं।",
    getOverview: "अपना health overview पाएं",
    getOverviewDesc: "स्पष्ट next steps और suggestions के साथ सरल summary.",
    step: "चरण",
    optionalImageAfter: "Optional image upload questionnaire के बाद आता है",
    optionalImageCopy:
      "अगर आप extra AI-assisted guidance चाहती हैं तो image upload कर सकती हैं। Mobile पर camera option भी दिखेगा।",
    welcomeBack: "वापसी पर स्वागत है सखी",
    joinAarogyaShree: "AarogyaShree से जुड़ें",
    fullName: "पूरा नाम",
    email: "ईमेल",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड पुष्टि करें",
    login: "लॉगिन",
    signUp: "साइन अप",
    newHere: "नई हैं?",
    createAccount: "अकाउंट बनाएं",
    alreadyRegistered: "पहले से registered हैं?",
    authFailedLocal:
      "Backend login उपलब्ध नहीं है, इसलिए सखी ने यह session local रूप से save किया है।",
    yourSakhi: "आपकी सखी",
    question: "सवाल",
    of: "में से",
    complete: "पूरा",
    questionnaireComplete: "Questionnaire पूरा हुआ",
    questionnaireCompleteCopy:
      "आपके जरूरी जवाब तैयार हैं। अब आप extra AI-assisted guidance के लिए optional image जोड़ सकती हैं, या skip करके health overview देख सकती हैं।",
    requiredDone: "जरूरी सवाल पूरे हुए",
    imageOptional: "Image upload optional है",
    skipReport: "आप सीधे report देख सकती हैं",
    addOptionalImage: "Optional image जोड़ें",
    addOptionalImageCopy:
      "अगर आप अतिरिक्त guidance चाहती हैं तो image upload या capture करें।",
    continueImage: "Image step पर जाएं",
    skipImageReport: "Image skip करके report देखें",
    skipImageReportCopy:
      "Required questionnaire के आधार पर सीधे अपना health overview देखें।",
    viewReport: "मेरी report देखें",
    imageAssessment: "Image-based assessment",
    uploadSafely: "अपनी image सुरक्षित रूप से upload करें",
    uploadSafelyCopy:
      "एक clear image जोड़ें ताकि सखी gentle AI-assisted guidance दे सके। यह supportive information है, medical diagnosis नहीं।",
    addClearImage: "Clear image जोड़ें",
    clearImageCopy:
      "अच्छी lighting रखें, image steady रखें, और ऐसी कोई चीज share न करें जिससे आप comfortable न हों।",
    clickImage: "Image क्लिक करें",
    uploadImage: "Image upload करें",
    cameraMobile: "Camera capture mobile devices पर दिखता है।",
    changeImage: "Image बदलें",
    remove: "हटाएं",
    analyzeImage: "Image analyze करें",
    skipImage: "Image skip करें",
    beforeUpload: "Upload से पहले",
    imageTip1: "Clear और well-lit image इस्तेमाल करें।",
    imageTip2: "जरूरत न हो तो face या identity details शामिल न करें।",
    imageTip3:
      "Pain, discharge, bleeding, lumps या symptoms बने रहने पर doctor से सलाह लें।",
    gentleInsight: "सखी की gentle insight",
    gentleInsightCopy:
      "दी गई image के आधार पर इस placeholder preview में सब सामान्य दिखता है। अगर discomfort या बदलाव महसूस हों, तो healthcare professional से सलाह लें।",
    maintainHygiene: "साफ-सफाई बनाए रखें",
    stayHydrated: "पानी पर्याप्त पिएं",
    seekAdvice: "Symptoms बने रहें तो medical advice लें",
    continueReport: "Health Report पर जाएं",
    ageSakhi: "अपना age group बताएं ताकि सखी आपको बेहतर guide कर सके।",
    ageQuestion: "आपका age group क्या है?",
    previous: "पिछला",
    next: "अगला",
    menstrualSakhi: "आइए periods और hormonal health के बारे में बात करें।",
    regularPeriods: "क्या आपके periods regular हैं?",
    cycleLength: "आपकी usual cycle length?",
    heavyBleeding: "क्या बहुत heavy bleeding होती है?",
    missedPeriods: "2+ महीने periods miss हुए हैं? Pregnancy नहीं है?",
    yes: "हाँ",
    no: "नहीं",
    sometimes: "कभी-कभी",
    cervicalSakhi: "Cervical health से जुड़े कुछ सवाल।",
    abnormalDischarge: "क्या abnormal vaginal discharge है?",
    bleedingBetween: "Intercourse के बाद या periods के बीच bleeding?",
    pelvicPain: "Pelvic या lower abdominal pain?",
    papTest: "क्या आपने कभी Pap test कराया है?",
    never: "कभी नहीं",
    moreThan3Years: "3 साल से पहले",
    within3Years: "पिछले 3 साल में",
    breastSakhi: "आइए breast-related symptoms check करें।",
    breastLump: "क्या breast या armpit में lump महसूस हुआ?",
    breastSkin: "Breast skin या shape में बदलाव?",
    nippleDischarge: "Nipple discharge? Breast milk नहीं",
    familyHistory: "Family history of breast cancer?",
    notSure: "पता नहीं",
    generalSakhi: "Finish करने से पहले कुछ general health questions.",
    burningUrine: "Urination के समय burning sensation?",
    frequentUrge: "बार-बार urinate करने की urge?",
    feverBackPain: "Urinary problems के साथ fever या back pain?",
    moodSakhi: "Mood और daily habits के बारे में आखिरी कुछ सवाल।",
    emotionalFeeling: "इन दिनों emotionally कैसा महसूस कर रही हैं?",
    sleepQuestion: "आपकी sleep usually कैसी है?",
    exerciseQuestion: "क्या आप हफ्ते में कम से कम 3 दिन exercise करती हैं?",
    good: "अच्छा",
    stressed: "Stress",
    anxious: "Anxious",
    veryLow: "बहुत low",
    poor: "Poor",
    less21: "<21 दिन",
    days21to35: "21-35 दिन",
    more35: ">35 दिन",
  },
};

export function LanguageProvider({ children }) {
  const { user, updateUserLanguage } = useAuth();
  const [language, setLanguageState] = useState(
    localStorage.getItem("sakhi_language") || "en"
  );

  useEffect(() => {
    if (user?.email) {
      const userLanguage =
        user.languagePreference ||
        localStorage.getItem(`sakhi_language_${user.email}`);

      if (userLanguage && userLanguage !== language) {
        setLanguageState(userLanguage);
      }
    }
  }, [user]);

  const setLanguage = (nextLanguage) => {
    setLanguageState(nextLanguage);
    localStorage.setItem("sakhi_language", nextLanguage);

    if (user?.email) {
      localStorage.setItem(`sakhi_language_${user.email}`, nextLanguage);
      updateUserLanguage?.(nextLanguage);
    }
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key) => translations[language]?.[key] || translations.en[key] || key,
    }),
    [language, user]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
