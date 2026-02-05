// export default function SakhiMessage({ text }) {
//   return (
//     <div className="bg-white rounded-xl shadow-sm p-4 flex gap-3 items-start">
//       <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
//         👩‍⚕️
//       </div>
//       <p className="text-gray-600 text-sm italic">{text}</p>
//     </div>
//   );
// }
import React from "react";

export default function SakhiMessage({ text }) {
  return (
    <div className="w-full flex justify-center mt-5">
      <div
        className="max-w-4xl w-full 
        bg-gradient-to-r from-pink-50 via-rose-50 to-pink-100
        rounded-2xl px-6 py-4
        shadow-sm border border-pink-200
        flex items-start gap-4"
      >
        

        {/* Message */}
        <div>
          <p className="text-gray-800 text-base md:text-lg font-medium leading-relaxed">
            {text}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Your Sakhi
          </p>
        </div>
      </div>
    </div>
  );
}
