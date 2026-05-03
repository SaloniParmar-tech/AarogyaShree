import React from "react";
import { FlaskConical, Database, Wifi } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const items = [
  {
    icon: FlaskConical,
    titleKey: "builtOnProvenAI",
    descKey: "builtOnProvenAIDesc",
  },
  {
    icon: Database,
    titleKey: "clinicallyValidated",
    descKey: "clinicallyValidatedDesc",
  },
  {
    icon: Wifi,
    titleKey: "worksEverywhere",
    descKey: "worksEverywhereDesc",
  },
];

export default function CredibilitySection() {
  const { t } = useLanguage();

  return (
    <section
      id="credibility"
      className="py-20 lg:py-28 bg-gradient-to-b from-pink-50 via-white to-pink-50"
    >
      <div className="max-w-[76rem] mx-auto px-7">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-pink-700">
            {t("builtWithCare")}
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-800">
            {t("gentleOutsideRigorousInside")}
          </h2>

          <p className="mt-4 text-gray-600">
            {t("behindGentleInteraction")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.titleKey}
                className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                  <Icon size={18} className="text-pink-700" />
                </div>

                <h3 className="text-lg font-semibold text-gray-800">
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