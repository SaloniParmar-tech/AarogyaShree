import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 border-t border-pink-100">
  <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-12">

    {/* Top part */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

      {/* Brand */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white shadow">
            🌸
          </div>
          <div className="text-xl font-semibold text-gray-100 hover:text-pink-600 [font-family:'Satisfy',cursive]">
            Aarogya Shree
          </div>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed hover:text-pink-600">
          {t("footerDescription")}
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-sm font-semibold text-gray-300 mb-4">
          {t("quickLinks")}
        </h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="hover:text-pink-600 cursor-pointer">{t("healthAssessment")}</li>
          <li className="hover:text-pink-600 cursor-pointer">{t("findClinics")}</li>
          <li className="hover:text-pink-600 cursor-pointer">{t("talkToSakhi")}</li>
          <li className="hover:text-pink-600 cursor-pointer">{t("resources")}</li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h4 className="text-sm font-semibold text-gray-300 mb-4">
          {t("support")}
        </h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="hover:text-pink-600 cursor-pointer">{t("privacyPolicy")}</li>
          <li className="hover:text-pink-600 cursor-pointer">{t("termsOfService")}</li>
          <li className="hover:text-pink-600 cursor-pointer">{t("contactUs")}</li>
          <li className="hover:text-pink-600 cursor-pointer">{t("faqs")}</li>
        </ul>
      </div>
    </div>

    {/* Divider */}
    <div className="mt-10 border-t border-pink-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

      <p className="text-xs text-gray-200 hover:text-pink-600">
        {t("copyright")}
      </p>
    </div>
  </div>
</footer>
  );
}