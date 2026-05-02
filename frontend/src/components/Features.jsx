import React from "react";
import {
  BarChart3,
  CalendarHeart,
  MapPin,
  ScrollText,
  MessageCircleHeart,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const features = [
  {
    icon: BarChart3,
    titleKey: "healthRiskScore",
    descKey: "healthRiskScoreDesc",
  },
  {
    icon: CalendarHeart,
    titleKey: "cycleAwareInsights",
    descKey: "cycleAwareInsightsDesc",
  },
  {
    icon: MapPin,
    titleKey: "nearbyClinicFinder",
    descKey: "nearbyClinicFinderDesc",
  },
  {
    icon: ScrollText,
    titleKey: "healthHistory",
    descKey: "healthHistoryDesc",
  },
  {
    icon: MessageCircleHeart,
    titleKey: "sakhiChat",
    descKey: "sakhiChatDesc",
  },
];

export default function FeaturesSection() {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-20 lg:py-28 bg-pink-50/40">
      <div className="max-w-[76rem] mx-auto px-7">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-pink-700">
            {t("whatsInside")}
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-800">
            {t("everythingYouNeed")}
          </h2>

          <p className="mt-4 text-gray-600">
            {t("thoughtfullyCrafted")}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.titleKey}
                className="group rounded-2xl border border-pink-100 bg-white p-6 transition hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 group-hover:bg-pink-200 transition">
                  <Icon size={18} className="text-pink-700" />
                </div>

                <h3 className="text-base font-semibold text-gray-800">
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