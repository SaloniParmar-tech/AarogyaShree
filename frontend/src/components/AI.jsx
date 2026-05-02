import React from "react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const qualities = [
  "listensPatiently",
  "guidesGently",
  "understandsConcerns",
  "speaksYourLanguage",
];

const suggestedQuestions = [
  "earlySigns",
  "howOftenScreened",
  "feelingWorried",
  "helpFindClinic",
];

export default function AIAssistants() {
  const { t } = useLanguage();

  return (
    <section id="ai-assistant" className="py-20 lg:py-28 bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <div className="max-w-[76rem] mx-auto px-7">
        <div className="grid gap-12 lg:grid-cols-2 items-center">

          {/* Left */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-pink-700">
              {t("yourDigitalSakhi")}
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-800">
              {t("companionWhoCares")}
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed max-w-md">
              {t("sakhiDescription")}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {qualities.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-gray-700"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-100">
                    <Sparkles size={12} className="text-pink-700" />
                  </div>
                  {t(item)}
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-2 mb-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 border border-pink-200">
                  <Sparkles size={14} className="text-pink-700" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">Sakhi</p>
                  <p className="text-[11px] text-gray-500">
                    {t("yourSakhi")}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-pink-50 p-4 mb-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {t("sakhiGreeting")}
                </p>
              </div>

              <p className="text-xs font-medium text-gray-500 mb-3">
                {t("youMightWantToAsk")}
              </p>

              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((item) => (
                  <button
                    key={item}
                    className="rounded-full border border-pink-200 bg-white px-3.5 py-2 text-xs text-gray-600 hover:bg-pink-50 transition"
                  >
                    {t(item)}
                  </button>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}