import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ClipboardList,
  FileText,
  ImageUp,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function AssessmentChoice() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isHindi = language === "hi";

  const copy = {
    eyebrow: isHindi ? "स्वास्थ्य मूल्यांकन" : t("assessment"),
    title: isHindi
      ? "पहले स्वास्थ्य सवाल पूरे करें"
      : "Complete your health questions first",
    intro: isHindi
      ? "सखी कुछ जरूरी स्वास्थ्य सवाल पूछेगी ताकि आपकी report आपके symptoms और health history के आधार पर बने। Image upload अंत में optional रहेगा।"
      : "Sakhi will ask a few required health questions first, so your report is based on your symptoms and health history. Image upload stays optional at the end.",
    primary: isHindi ? "स्वास्थ्य सवाल शुरू करें" : "Start Health Questions",
    required: isHindi ? "जरूरी" : "Required",
    optional: isHindi ? "Optional" : "Optional",
    private: isHindi ? "निजी और सुरक्षित" : "Private and secure",
    time: isHindi ? "कुछ मिनट में पूरा" : "Takes a few minutes",
    flowTitle: isHindi ? "आगे क्या होगा" : "What happens next",
    step1: isHindi ? "स्वास्थ्य सवाल" : "Health questions",
    step1Desc: isHindi
      ? "Age, periods, cervical health, breast health, general health और mood."
      : "Age, periods, cervical health, breast health, general health, and mood.",
    step2: isHindi ? "Optional image" : "Optional image",
    step2Desc: isHindi
      ? "जरूरत हो तो अंत में image upload या mobile पर click कर सकती हैं।"
      : "At the end, you can upload an image or click one on mobile if needed.",
    step3: isHindi ? "Health report" : "Health report",
    step3Desc: isHindi
      ? "आपको simple summary, risk hints और next steps मिलेंगे।"
      : "You will get a simple summary, risk hints, and next steps.",
    noteTitle: isHindi
      ? "Image upload compulsory नहीं है"
      : "Image upload is not compulsory",
    note: isHindi
      ? "यह सिर्फ extra AI-assisted guidance के लिए है। आप इसे skip करके सीधे report देख सकती हैं।"
      : "It is only for extra AI-assisted guidance. You can skip it and view your report directly.",
  };

  const steps = [
    { icon: ClipboardList, title: copy.step1, desc: copy.step1Desc },
    { icon: ImageUp, title: copy.step2, desc: copy.step2Desc },
    { icon: Sparkles, title: copy.step3, desc: copy.step3Desc },
  ];

  return (
    <main className="min-h-[calc(100vh-4.5rem)] bg-pink-50/50 px-4 py-10 sm:px-7 lg:py-14">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-3 py-1.5 text-xs font-semibold text-pink-700">
                <FileText size={14} />
                {copy.required}
              </div>

              <h1 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {copy.title}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
                {copy.intro}
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-sm font-medium text-gray-700">
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  {copy.time}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  {copy.private}
                </span>
              </div>

              <button
                onClick={() => navigate("/assessment/age")}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-pink-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-800 sm:w-auto"
              >
                {copy.primary}
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="border-t border-gray-200 bg-slate-50/70 p-6 sm:p-8 lg:border-l lg:border-t-0">
              <h2 className="text-lg font-bold text-gray-900">
                {copy.flowTitle}
              </h2>

              <div className="mt-6 space-y-5">
                {steps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div key={step.title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-pink-700 ring-1 ring-gray-200">
                          <Icon size={18} />
                        </div>
                        {index < steps.length - 1 && (
                          <div className="mt-3 h-10 w-px bg-gray-200" />
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-500">
                          {isHindi ? "चरण" : "Step"} {index + 1}
                        </p>
                        <h3 className="mt-1 font-semibold text-gray-900">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <aside className="mt-5 rounded-xl border border-pink-100 bg-pink-100/70 px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-pink-700">
              <Camera size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{copy.noteTitle}</h3>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {copy.note}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
