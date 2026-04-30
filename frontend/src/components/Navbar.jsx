import React, { useState } from "react";
import {
  ChevronDown,
  HeartPulse,
  Languages,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import AuthModal from "./AuthModal";

const navLinks = [
  { to: "/assessment", labelKey: "assessment" },
  { to: "/dashboard", labelKey: "dashboard" },
  { to: "/talk-to-sakhi", labelKey: "askSakhi" },
  { to: "/find-clinics", labelKey: "clinics" },
  { to: "/resources", labelKey: "resources" },
  { to: "/community", labelKey: "community" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [showAuth, setShowAuth] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const closeMenus = () => {
    setShowMenu(false);
    setShowMobileNav(false);
    setShowLanguageMenu(false);
  };

  const selectLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    setShowLanguageMenu(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/75 shadow-[0_12px_40px_rgba(190,24,93,0.08)] backdrop-blur-2xl backdrop-saturate-150">
        <div className="mx-auto max-w-[76rem] px-4 sm:px-7">
          <div className="flex h-18 items-center justify-between gap-4">
            <Link to="/" onClick={closeMenus} className="flex items-center">
              <img
                className="w-36 object-contain sm:w-40"
                src="https://i.postimg.cc/6pS4cz89/Screenshot-2025-12-27-130800-removebg-preview.png"
                alt="AarogyaShree"
              />
            </Link>

            <nav className="hidden items-center rounded-full border border-pink-100/80 bg-white/60 p-1 text-sm font-semibold text-gray-700 shadow-sm lg:flex">
              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-full px-4 py-2 transition hover:bg-pink-50 hover:text-pink-700"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowLanguageMenu((s) => !s)}
                  className="flex items-center gap-2 rounded-full border border-pink-100 bg-white/80 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-pink-200 hover:bg-pink-50"
                >
                  <Languages size={16} className="text-pink-700" />
                  {language === "hi" ? t("hindi") : t("english")}
                  <ChevronDown size={14} className="text-gray-400" />
                </button>

                {showLanguageMenu && (
                  <div className="absolute right-0 mt-3 w-36 overflow-hidden rounded-2xl border border-pink-100 bg-white/95 p-1 shadow-[0_18px_45px_rgba(190,24,93,0.18)] ring-1 ring-white/80 backdrop-blur-xl">
                    {[
                      { code: "en", label: t("english") },
                      { code: "hi", label: t("hindi") },
                    ].map((item) => (
                      <button
                        key={item.code}
                        onClick={() => selectLanguage(item.code)}
                        className={`w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
                          language === item.code
                            ? "bg-pink-50 text-pink-700"
                            : "text-gray-700 hover:bg-pink-50"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {!user ? (
                <button
                  onClick={() => setShowAuth(true)}
                  className="hidden rounded-full bg-pink-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-900/15 transition hover:-translate-y-0.5 hover:bg-pink-800 sm:block"
                >
                  {t("loginSignup")}
                </button>
              ) : (
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setShowMenu((s) => !s)}
                    className="flex items-center gap-2 rounded-full border border-pink-100 bg-white/85 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-pink-200 hover:bg-pink-50"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-100 text-pink-700">
                      <User size={15} />
                    </span>
                    {t("myAccount")}
                    <ChevronDown size={14} className="text-gray-400" />
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-pink-100 bg-white/95 shadow-[0_18px_45px_rgba(190,24,93,0.18)] ring-1 ring-white/80 backdrop-blur-xl">
                      <Link
                        to="/profile"
                        onClick={closeMenus}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-pink-50"
                      >
                        <User size={16} className="text-pink-700" />
                        {t("profile")}
                      </Link>

                      <Link
                        to="/settings"
                        onClick={closeMenus}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-pink-50"
                      >
                        <Settings size={16} className="text-pink-700" />
                        {t("settings")}
                      </Link>

                      <div className="mx-4 h-px bg-pink-100" />

                      <button
                        onClick={() => {
                          logout();
                          closeMenus();
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        <LogOut size={16} />
                        {t("logout")}
                      </button>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => setShowMobileNav((s) => !s)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-100 bg-white/85 text-gray-800 shadow-sm transition hover:bg-pink-50 lg:hidden"
                aria-label="Toggle navigation"
              >
                {showMobileNav ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {showMobileNav && (
            <div className="pb-4 lg:hidden">
              <div className="rounded-3xl border border-pink-100 bg-white/92 p-3 shadow-[0_18px_45px_rgba(190,24,93,0.14)] backdrop-blur-xl">
                <div className="mb-2 flex items-center gap-2 rounded-2xl bg-pink-50 px-4 py-3 text-sm font-semibold text-pink-800">
                  <HeartPulse size={17} />
                  {t("careMenu")}
                </div>

                <div className="grid gap-1">
                  {navLinks.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={closeMenus}
                      className="rounded-2xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-pink-50 hover:text-pink-700"
                    >
                      {t(item.labelKey)}
                    </Link>
                  ))}
                </div>

                <div className="mt-3 grid gap-2 border-t border-pink-100 pt-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => selectLanguage("en")}
                      className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                        language === "en"
                          ? "border-pink-200 bg-pink-50 text-pink-700"
                          : "border-pink-100 bg-white text-gray-700"
                      }`}
                    >
                      {t("english")}
                    </button>
                    <button
                      onClick={() => selectLanguage("hi")}
                      className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                        language === "hi"
                          ? "border-pink-200 bg-pink-50 text-pink-700"
                          : "border-pink-100 bg-white text-gray-700"
                      }`}
                    >
                      {t("hindi")}
                    </button>
                  </div>
                  {/* <button className="flex items-center justify-between rounded-2xl border border-pink-100 bg-white px-4 py-3 text-sm font-semibold text-gray-700">
                    <span className="flex items-center gap-2">
                      <Languages size={16} className="text-pink-700" />
                      English
                    </span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </button> */}

                  {!user ? (
                    <button
                      onClick={() => {
                        setShowAuth(true);
                        closeMenus();
                      }}
                      className="rounded-2xl bg-pink-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-900/15"
                    >
                      {t("loginSignup")}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        logout();
                        closeMenus();
                      }}
                      className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
                    >
                      {t("logout")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
