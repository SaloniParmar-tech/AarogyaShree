import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <header
        className="
          sticky top-0 z-50 w-full
          bg-white/70 backdrop-blur-xl backdrop-saturate-150
          border-b border-pink-200/40
        "
      >
        <div className="max-w-[76rem] mx-auto px-7">
          <div className="flex items-center justify-between h-16">

            {/* ---------- BRAND / LOGO ---------- */}
            <Link to="/" className="flex items-center">
              <img
                className="w-44 object-contain"
                src="https://i.postimg.cc/6pS4cz89/Screenshot-2025-12-27-130800-removebg-preview.png"
                alt="AarogyaShree"
              />
            </Link>

            {/* ---------- NAV LINKS ---------- */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
              <Link to="/assessment" className="hover:text-pink-600 transition">
                Assessment
              </Link>
              <Link to="/dashboard" className="hover:text-pink-600 transition">
                Dashboard
              </Link>
              <Link to="/talk-to-sakhi" className="hover:text-pink-600 transition">
                Ask Sakhi
              </Link>
              <Link to="/find-clinics" className="hover:text-pink-600 transition">
                Clinics
              </Link>
              <Link to="/resources" className="hover:text-pink-600 transition">
                Resources
              </Link>
              <Link to="/community" className="hover:text-pink-600 transition">
                Community
              </Link>
            </nav>

            {/* ---------- RIGHT SECTION ---------- */}
            <div className="flex items-center gap-4">

              {/* Language */}
              <button
                className="
                  hidden md:flex items-center gap-1
                  px-4 py-1.5 rounded-full
                  border border-pink-200 bg-white
                  text-sm text-gray-700
                  hover:bg-pink-50 transition
                "
              >
                English
                <span className="text-gray-400 text-xs">▾</span>
              </button>

              {/* AUTH */}
              {!user ? (
                <button
                  onClick={() => setShowAuth(true)}
                  className="
                    px-4 py-2 rounded-full
                    bg-pink-600 text-white text-sm font-medium
                    hover:bg-pink-700 transition shadow-sm
                  "
                >
                  Login / Sign Up
                </button>
              ) : (
                <div className="relative">

                  {/* Account Button */}
                  <button
                    onClick={() => setShowMenu((s) => !s)}
                    className="
                      flex items-center gap-2 px-4 py-1.5 rounded-full
                      border border-pink-300 bg-white
                      hover:bg-pink-50 transition
                      text-sm font-medium text-gray-700
                    "
                  >
                    My Account
                    <span className="text-xs text-gray-500">▾</span>
                  </button>

                  {/* DROPDOWN */}
                  {showMenu && (
                    <div
                      className="
                        absolute right-0 mt-3 w-52 rounded-2xl
                        bg-white/80
                        backdrop-blur-xl
                        shadow-[0_15px_35px_rgba(236,72,153,0.35)]
                        border border-pink-300/60
                        ring-1 ring-white/70
                        overflow-hidden
                        animate-[fadeIn_0.15s_ease-out]
                      "
                    >
                      <Link
                        to="/profile"
                        onClick={() => setShowMenu(false)}
                        className="
                          flex items-center gap-2
                          px-4 py-3 text-sm font-medium text-gray-900
                          hover:bg-pink-300/40 transition
                        "
                      >
                        👤 Profile
                      </Link>

                      <Link
                        to="/settings"
                        onClick={() => setShowMenu(false)}
                        className="
                          flex items-center gap-2
                          px-4 py-3 text-sm font-medium text-gray-900
                          hover:bg-pink-300/40 transition
                        "
                      >
                        ⚙️ Settings
                      </Link>

                      <div className="h-px bg-pink-400/40 mx-4" />

                      <button
                        onClick={() => {
                          logout();
                          setShowMenu(false);
                        }}
                        className="
                          w-full text-left flex items-center gap-2
                          px-4 py-3 text-sm font-medium text-red-600
                          hover:bg-red-200/40 transition
                        "
                      >
                        🚪 Logout
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* AUTH MODAL */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
