import React from "react";
import { Flower2, ShieldCheck, MapPin, BookHeart } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const cards = [
  {
    icon: Flower2,
    titleKey: "understandSymptoms",
    descKey: "understandSymptomsDesc",
  },
  {
    icon: ShieldCheck,
    titleKey: "knowHealthRisks",
    descKey: "knowHealthRisksDesc",
  },
  {
    icon: MapPin,
    titleKey: "findHelpNearby",
    descKey: "findHelpNearbyDesc",
  },
  {
    icon: BookHeart,
    titleKey: "learnAboutBody",
    descKey: "learnAboutBodyDesc",
  },
];

export default function SupportSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <div className="max-w-[76rem] mx-auto px-7">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-pink-600">
            {t("howAarogyaHelps")}
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-800 sm:text-4xl">
            {t("caringSpace")}
          </h2>

          <p className="mt-4 text-gray-600">
            {t("sakhiDescription")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.titleKey}
                className="rounded-2xl border border-pink-100 bg-white/90 p-6 transition hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 mb-4">
                  <Icon size={18} className="text-pink-600" />
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