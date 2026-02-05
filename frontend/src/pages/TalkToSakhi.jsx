import React, { useState, useRef, useEffect } from "react";

export default function TalkToSakhi() {
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      sender: "sakhi",
      text:
        "Hello, I’m Sakhi. You can ask me about symptoms, reports, or when to see a doctor.",
      time: getTime(),
    },
  ]);

  const quickPrompts = [
    { text: "Periods & PCOS", color: "bg-purple-100 text-purple-700 border-purple-200" },
    { text: "Breast health", color: "bg-pink-100 text-pink-700 border-pink-200" },
    { text: "Cervical screening", color: "bg-blue-100 text-blue-700 border-blue-200" },
    { text: "Urinary problems", color: "bg-green-100 text-green-700 border-green-200" },
    { text: "Explain my report", color: "bg-orange-100 text-orange-700 border-orange-200" },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [typing]);

  function getTime() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const time = getTime();

    setMessages((prev) => [...prev, { sender: "user", text, time }]);
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
        { sender: "sakhi", text: data.reply, time: getTime() },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "sakhi",
          text: "I’m having trouble responding right now. Please try again shortly.",
          time: getTime(),
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        sender: "sakhi",
        text: "Hi again 🌸 What would you like to talk about now?",
        time: getTime(),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-pink-700">Ask Sakhi</h1>
          <p className="text-sm text-gray-600 mt-1">
            Gentle guidance for your health questions
          </p>
        </div>

        {/* Intro Card */}
        <div className="mb-5 bg-white/70 backdrop-blur-md rounded-2xl border border-pink-200 shadow-sm p-4 text-center text-sm text-gray-700">
          🌸 You can ask about symptoms, reports, or when to consult a doctor.
          Sakhi will guide you step by step.
        </div>

        {/* Chat Container */}
        <div
          className="
            bg-white/70 backdrop-blur-xl
            rounded-3xl border border-pink-200
            shadow-xl flex flex-col h-[580px] overflow-hidden
          "
        >

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4
                          bg-gradient-to-b from-pink-50/60 via-white to-white">

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex animate-[fadeIn_0.2s_ease-out]
                  ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                    ${
                      msg.sender === "user"
                        ? "bg-pink-500 text-white rounded-br-sm shadow-md"
                        : "bg-white text-gray-800 border border-pink-100 rounded-bl-sm shadow-sm"
                    }`}
                >
                  {msg.text}
                  <div className="text-[11px] opacity-60 mt-1 text-right">
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-pink-300 rounded-full animate-bounce delay-150" />
                <span className="w-2 h-2 bg-pink-300 rounded-full animate-bounce delay-300" />
                <span className="ml-2 italic">Sakhi is typing</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Cards (NOW ABOVE INPUT) */}
          <div className="px-4 py-3 border-t border-pink-200 bg-white/80 backdrop-blur-md">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {quickPrompts.map((p) => (
                <button
                  key={p.text}
                  onClick={() => sendMessage(p.text)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm border transition
                    hover:-translate-y-0.5 hover:shadow-sm ${p.color}`}
                >
                  {p.text}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-pink-200 px-4 py-3 bg-white">

            <div className="flex items-center gap-3">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your health question..."
                className="
                  flex-1 resize-none rounded-2xl px-4 py-2.5 border border-gray-300 text-sm
                  focus:outline-none focus:ring-2 focus:ring-pink-300
                "
              />

              <button
                disabled={!input.trim()}
                onClick={() => sendMessage(input)}
                className="
                  w-11 h-11 rounded-full
                  bg-gradient-to-br from-pink-500 to-pink-600
                  hover:from-pink-600 hover:to-pink-700
                  transition text-white flex items-center justify-center
                  shadow-lg hover:scale-105
                  disabled:opacity-40 disabled:hover:scale-100
                "
              >
                ➤
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Press Enter to send • Shift+Enter for new line</span>
              <button
                onClick={clearChat}
                className="hover:text-pink-600 transition"
              >
                Clear chat
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
