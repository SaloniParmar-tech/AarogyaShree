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
        className="sticky bg-pink-100/20 top-0 z-50 w-full backdrop-blur-md backdrop-saturate-90 
        border-b border-white/30"
      >
        <div className="max-w-[76rem] mx-auto px-6 md:px-8 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="text-3xl text-gray-900 font-bold [font-family:'Satisfy',cursive]">
                <Link to="/">
                  <img
                    className="w-44"
                    src="https://i.postimg.cc/6pS4cz89/Screenshot-2025-12-27-130800-removebg-preview.png"
                    alt="AarogyaShree Logo"
                  />
                </Link>
              </div>
            </div>

            {/* Nav Links (UNCHANGED) */}
            <nav className="hidden md:flex gap-9 text-gray-700 text-sm font-medium">
              <Link to="/assessment">
                <p className="hover:text-pink-600 transition">
                  Assessment
                </p>
              </Link>
              <Link to="/dashboard" className="hover:text-pink-600 transition">
                Dashboard
              </Link>
              <Link to="/talk-to-sakhi" className="hover:text-pink-600 transition">
                Talk to Sakhi
              </Link>
              <Link to='/find-clinics' className="hover:text-pink-600 transition" href="#">
                Find Clinics
              </Link>
              <Link to='/resources' className="hover:text-pink-600 transition" href="#">
                Resources
              </Link>
              <Link to='/community' className="hover:text-pink-600 transition" href="#">
                Community
              </Link>
            </nav>

            {/* Right Section (ONLY EXTENDED) */}
            <div className="flex items-center gap-6">
              {/* Language selector (UNCHANGED) */}
              <button className="hidden md:inline-flex items-center gap-1 px-4 py-1 rounded-full border border-gray-200 bg-white text-sm">
                English
                <span className="ml-1 text-gray-400 text-sm font-medium">▾</span>
              </button>

              {/* Auth Section */}
              {!user ? (
                <button
                  onClick={() => setShowAuth(true)}
                  className="px-4 py-2 rounded-full bg-pink-600/80 text-white text-sm font-medium hover:bg-pink-700 transition"
                >
                  Login / Sign Up
                </button>
              ) : (
                <div className="relative flex items-center gap-3">
                  {/* Welcome text */}
                  <div className="hidden sm:flex flex-col leading-tight text-right">
                    <span className="text-sm font-semibold text-pink-600">Welcome</span>
                    <span className="text-sm font-semibold text-pink-600 text-center w-full">
                      Sakhi 
                    </span>
                  </div>

                  {/* User Icon */}
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="w-9 h-9 rounded-full bg-pink-600 text-white flex items-center justify-center font-semibold"
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </button>

                  {/* Dropdown */}
                  {showMenu && (
                    <div className="absolute right-0 top-11 w-44 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-pink-50 transition"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm hover:bg-pink-50 transition"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setShowMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-pink-50 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}


// import React from "react";
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//    <header className="sticky bg-pink-100/20 top-0 z-50 w-full backdrop-blur-md backdrop-saturate-90 
//   border-b border-white/30">
//       <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-6">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             {/* <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold shadow">
//               🌸
//             </div> */}
//             <div className="text-3xl text-gray-900 font-bold [font-family:'Satisfy',cursive]">
//               <Link to="/"><img className="w-52" src="https://i.postimg.cc/6pS4cz89/Screenshot-2025-12-27-130800-removebg-preview.png"></img></Link>
// </div>
//           </div>
//           {/* Nav Links */}
//           <nav className="hidden md:flex gap-8 text-gray-700 text-sm font-medium">
//             <Link to="/assessment/age"><p className="hover:text-pink-600 transition">
//               Assessment
//             </p></Link>
//             <Link to="/dashboard" className="hover:text-pink-600 transition">
//               Dashboard
//             </Link>
//             <Link to="/talk-to-sakhi" className="hover:text-pink-600 transition">
//               Talk to Sakhi
//             </Link>
//             <a className="hover:text-pink-600 transition" href="#">
//               Find Clinics
//             </a>
//             <a className="hover:text-pink-600 transition" href="#">
//               Resources
//             </a>
//             <a className="hover:text-pink-600 transition" href="#">
//               Community
//             </a>
//           </nav>

//           {/* Language selector */}
//           <div className="flex items-center gap-4">
//             <button className="hidden md:inline-flex items-center gap-1 px-4 py-1 rounded-full border border-gray-200 bg-white text-sm">
//               English
//               <span className="ml-1 text-gray-400 text-sm font-medium">▾</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
