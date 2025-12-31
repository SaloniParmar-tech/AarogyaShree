import React, { useState } from "react";

export default function TalkToSakhi() {
  const [selectedSakhi, setSelectedSakhi] = useState("Priya");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "sakhi",
      text:
        "Hello! I’m your Sakhi. I’m here to help you understand your health better. What would you like to know?",
      time: "5:30 PM",
    },
  ]);
  const [typing, setTyping] = useState(false);

  const sakhis = [
    { name: "Priya", desc: "Gentle and caring", emoji: "🧕" },
    { name: "Meera", desc: "Experienced and knowledgeable", emoji: "👩🏽‍⚕️" },
    { name: "Kavya", desc: "Friendly and encouraging", emoji: "👩🏽‍🤝‍👩🏽" },
    { name: "Asha", desc: "Supportive and understanding", emoji: "👩🏾‍🦱" },
  ];

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // User message
    setMessages((prev) => [
      ...prev,
      { sender: "user", text, time },
    ]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("http://localhost:5000/api/sakhi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "sakhi",
          text: data.reply,
          time,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "sakhi",
          text: "Sorry, I’m having trouble right now. Please try again later.",
          time,
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">

        {/* -------- Choose Your Sakhi -------- */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">
            Choose Your Sakhi
          </h2>

          <div className="flex gap-2 flex-wrap justify-between">
            {sakhis.map((s) => (
              <button
                key={s.name}
                onClick={() => setSelectedSakhi(s.name)}
                className={`w-40 p-4 rounded-xl border text-center transition
                  ${
                    selectedSakhi === s.name
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
              >
                <div className="text-2xl mb-2">{s.emoji}</div>
                <div className="font-medium text-gray-800">{s.name}</div>
                <div className="text-xs text-gray-500">{s.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* -------- Chat Container -------- */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {/* Chat Header */}
          <div className="bg-pink-500 text-white px-6 py-4">
            <div className="font-semibold">{selectedSakhi}</div>
            <div className="text-sm opacity-90">
              Your personal health companion
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-64 px-6 py-4 space-y-3 bg-pink-50/40 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-md rounded-xl p-3 shadow-sm ${
                  msg.sender === "user"
                    ? "bg-pink-500 text-white ml-auto"
                    : "bg-white text-gray-800"
                }`}
              >
                <div className="text-sm">{msg.text}</div>
                <div className="text-xs opacity-70 mt-1">{msg.time}</div>
              </div>
            ))}

            {typing && (
              <div className="text-sm text-gray-500 italic">
                {selectedSakhi} is typing...
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="px-6 py-4 border-t border-pink-100 bg-pink-50">
            <div className="text-xs text-gray-600 font-semibold mb-3">
              Quick Questions:
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                "What is cervical cancer?",
                "How often should I get checked?",
                "What are the warning signs?",
                "How to prevent breast cancer?",
                "Explain my report",
                "Find nearby clinics",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="px-4 py-2 rounded-full text-sm bg-white border border-pink-200 text-gray-600 hover:text-pink-500 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="px-6 py-4 border-t border-pink-100 flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Type your question here..."
              className="flex-1 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button
              onClick={() => sendMessage(input)}
              className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";

// export default function TalkToSakhi() {
//   const [selectedSakhi, setSelectedSakhi] = useState("Priya");

//   const sakhis = [
//     { name: "Priya", desc: "Gentle and caring", emoji: "🧕" },
//     { name: "Meera", desc: "Experienced and knowledgeable", emoji: "👩🏽‍⚕️" },
//     { name: "Kavya", desc: "Friendly and encouraging", emoji: "👩🏽‍🤝‍👩🏽" },
//     { name: "Asha", desc: "Supportive and understanding", emoji: "👩🏾‍🦱" },
//   ];

//   return (
//     <div className="min-h-screen bg-pink-50">

//       <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">

//         {/* -------- Choose Your Sakhi -------- */}
//         <div className="bg-white rounded-2xl shadow-sm p-6">
//           <h2 className="font-semibold text-gray-800 mb-4">
//             Choose Your Sakhi
//           </h2>

//           <div className="flex gap-2 flex-wrap justify-between">
//             {sakhis.map((s) => (
//               <button
//                 key={s.name}
//                 onClick={() => setSelectedSakhi(s.name)}
//                 className={`w-40 p-4 rounded-xl border text-center transition
//                   ${
//                     selectedSakhi === s.name
//                       ? "border-pink-500 bg-pink-50"
//                       : "border-gray-200 hover:border-pink-300"
//                   }`}
//               >
//                 <div className="text-2xl mb-2">{s.emoji}</div>
//                 <div className="font-medium text-gray-800">{s.name}</div>
//                 <div className="text-xs text-gray-500">{s.desc}</div>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* -------- Chat Container -------- */}
//         <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

//           {/* Chat Header */}
//           <div className="bg-pink-500 text-white px-6 py-4">
//             <div className="font-semibold">{selectedSakhi}</div>
//             <div className="text-sm opacity-90">
//               Your personal health companion
//             </div>
//           </div>

//           {/* Chat Messages */}
//           <div className="h-64 px-6 py-4 space-y-3 bg-pink-50/40">
//             <div className="max-w-md bg-white rounded-xl p-3 shadow-sm">
//               <div className="text-sm text-gray-800">
//                 Hello! I’m your Sakhi. I’m here to help you understand your
//                 health better. What would you like to know?
//               </div>
//               <div className="text-xs text-gray-400 mt-1">5:30 PM</div>
//             </div>
//           </div>

//           {/* Quick Questions */}
//           <div className="px-6 py-4 border-t border-pink-100 bg-pink-50">
//             <div className="text-xs text-gray-600 font-semibold mb-3">
//               Quick Questions:
//             </div>

//             <div className="flex flex-wrap gap-3">
//               {[
//                 "What is cervical cancer?",
//                 "How often should I get checked?",
//                 "What are the warning signs?",
//                 "How to prevent breast cancer?",
//                 "Explain my report",
//                 "Find nearby clinics",
//               ].map((q) => (
//                 <button
//                   key={q}
//                   className="px-4 py-2 rounded-full text-sm bg-white border border-pink-200 text-gray-600 hover:text-pink-500 transition"
//                 >
//                   {q}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Input Box */}
//           <div className="px-6 py-4 border-t border-pink-100 flex items-center gap-3">
//             <input
//               type="text"
//               placeholder="Type your question here..."
//               className="flex-1 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
//             />
//             <button className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center">
//               ➤
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
