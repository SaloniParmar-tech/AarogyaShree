import React from "react";
import { ArrowRight, Heart, Globe, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const trustBadges = [
  { icon: Sparkles, labelKey: "aiInsights" },
  { icon: Heart, labelKey: "designedForWomen" },
  { icon: Globe, labelKey: "multilingual" },
];

export default function HeroSection() {
  const { t } = useLanguage();

  const scrollToFeatures = () => {
    const section = document.getElementById("features");

    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center -mt-8">
      
      <div className="absolute inset-0 -z-10">
        <img
          src="https://readdy.ai/api/search-image?query=Warm%20illustration%20of%20diverse%20Indian%20women%20in%20traditional%20clothing%20standing%20together%20in%20a%20rural%20setting%20with%20flowers%20and%20soft%20lighting%2C%20peaceful%20village%20background%20with%20traditional%20huts%20and%20green%20fields%2C%20soft%20pastel%20colors%2C%20gentle%20and%20welcoming%20atmosphere%2C%20digital%20art%20style%2C%20inspiring%20and%20empowering%20mood&width=1200&height=600&seq=hero-women-unity&orientation=landscape"
          alt=""
          className="h-full w-full object-cover object-top brightness-95"
        />

        <div className="absolute inset-0 bg-pink-200/25"></div>

        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-pink-100/60"></div>
      </div>

      <div className="max-w-[76rem] mx-auto px-7 w-full">
        <div className="max-w-2xl py-16 lg:py-20">

          <div className="mb-6 mt-2 inline-flex items-center gap-2 rounded-full border border-pink-800 bg-white/80 px-4 py-1.5 text-xs font-medium text-pink-800/90">
            <Heart size={12} fill="currentColor" />
            {t("trustedSakhi")}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-[3.1em] font-bold leading-tight text-gray-900 drop-shadow-sm [font-family:'Poppins','Segoe_UI',sans-serif]">
            {t("heroTitlePrefix")}{" "}
            <span className="text-pink-700">{t("yourHealth")}</span>
          </h1>

          <p className="mt-8 text-lg text-gray-800 font-medium max-w-lg leading-relaxed [font-family:'Optima','Candara','Segoe_UI',sans-serif]">
            {t("heroCopy")}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/assessment">
              <button className="px-6 py-3 rounded-full bg-pink-800/90 text-white flex items-center gap-2 hover:bg-pink-700 transition cursor-pointer">
                {t("startHealthCheck")} <ArrowRight size={16} />
              </button>
            </Link>

            <button
              onClick={scrollToFeatures}
              className="px-6 py-2 rounded-full border-2 border-gray-700/50 text-gray-700 font-semibold hover:bg-white/10 transition cursor-pointer"
            >
              {t("learnMore")}
            </button>
          </div>

          <div className="mt-9 flex flex-wrap gap-6">
            {trustBadges.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.labelKey}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <div className="h-8 w-8 rounded-full bg-pink-200 flex items-center justify-center">
                    <Icon size={14} className="text-pink-800" />
                  </div>
                  {t(item.labelKey)}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
