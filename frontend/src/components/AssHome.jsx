import React from "react";
import {
  MessageCircle,
  ClipboardList,
  ImageUp,
  HeartHandshake,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    titleKey: "shareHowYouFeel",
    descKey: "shareHowYouFeelDesc",
  },
  {
    icon: ClipboardList,
    step: "02",
    titleKey: "addSimpleDetails",
    descKey: "addSimpleDetailsDesc",
  },
  {
    icon: ImageUp,
    step: "03",
    titleKey: "uploadImageOptional",
    descKey: "uploadImageOptionalDesc",
  },
  {
    icon: HeartHandshake,
    step: "04",
    titleKey: "getGentleGuidance",
    descKey: "getGentleGuidanceDesc",
  },
];

export default function AssessmentFlow() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[76rem] mx-auto px-7">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-pink-700">
            {t("howItSupports")}
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-800">
            {t("gentleGuidedCheck")}
          </h2>

          <p className="mt-4 text-gray-600">
            {t("takesFewMinutes")}
          </p>
        </div>

        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <div className="absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent hidden lg:block"></div>

          {steps.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.step}
                className="relative rounded-2xl border border-pink-100 bg-pink-50/40 p-6 text-center hover:shadow-lg transition"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 border border-pink-200">
                  <Icon size={20} className="text-pink-700" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  {t("step")} {item.step}
                </span>

                <h3 className="mt-2 text-base font-semibold text-gray-800">
                  {t(item.titleKey)}
                </h3>

                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {t(item.descKey)}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}