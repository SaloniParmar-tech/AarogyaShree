import { useEffect, useRef, useState } from "react";
import { RotateCcw, Send, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const API_BASE_URL = "http://localhost:5000/api";

export default function TalkToSakhi() {
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const { languageName, t } = useLanguage();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      sender: "sakhi",
      text: t("sakhiWelcome"),
      time: getTime(),
    },
  ]);

  const quickPrompts = [
    { key: "periodsAndPcos", color: "bg-purple-100 text-purple-700 border-purple-200" },
    { key: "breastHealth", color: "bg-pink-100 text-pink-700 border-pink-200" },
    { key: "cervicalScreening", color: "bg-blue-100 text-blue-700 border-blue-200" },
    { key: "urinaryProblems", color: "bg-green-100 text-green-700 border-green-200" },
    { key: "explainMyReport", color: "bg-orange-100 text-orange-700 border-orange-200" },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [typing]);

  async function sendMessage(text) {
    if (!text.trim() || typing) return;

    const userMessage = { sender: "user", text: text.trim(), time: getTime() };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch(`${API_BASE_URL}/sakhi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          history: messages.slice(-8),
          language: languageName,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "sakhi",
          text: data.reply || "I could not prepare a response right now. Please try again.",
          time: getTime(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "sakhi",
          text: "I am having trouble responding right now. Please try again shortly.",
          time: getTime(),
        },
      ]);
    } finally {
      setTyping(false);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        sender: "sakhi",
        text: t("sakhiRestart"),
        time: getTime(),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-white px-4 py-2 text-xs font-bold uppercase text-pink-700 shadow-sm">
            <Sparkles size={14} />
            {t("aiHealthCompanion")}
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Ask Sakhi</h1>
          <p className="mt-2 text-sm text-gray-600">
            {t("askSakhiSubtitle")}
          </p>
        </div>

        <div className="mb-5 rounded-2xl border border-pink-100 bg-white/80 p-4 text-center text-sm leading-6 text-gray-700 shadow-sm backdrop-blur">
          {t("askSakhiDisclaimer")}
        </div>

        <div className="flex h-[580px] flex-col overflow-hidden rounded-3xl border border-pink-100 bg-white/80 shadow-xl backdrop-blur-xl">
          <div className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-pink-50/70 via-white to-white px-4 py-5 sm:px-6">
            {messages.map((msg, index) => (
              <div
                key={`${msg.time}-${index}`}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[75%] ${
                    msg.sender === "user"
                      ? "rounded-br-sm bg-pink-600 text-white"
                      : "rounded-bl-sm border border-pink-100 bg-white text-gray-800"
                  }`}
                >
                  <span className="whitespace-pre-line">{msg.text}</span>
                  <div className="mt-1 text-right text-[11px] opacity-60">{msg.time}</div>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="h-2 w-2 animate-bounce rounded-full bg-pink-300" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-pink-300 delay-150" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-pink-300 delay-300" />
                <span className="ml-2 italic">{t("sakhiTyping")}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-pink-100 bg-white/90 px-4 py-3">
            <div className="flex gap-2 overflow-x-auto">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt.key}
                  onClick={() => sendMessage(t(prompt.key))}
                  className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition hover:-translate-y-0.5 hover:shadow-sm ${prompt.color}`}
                >
                  {t(prompt.key)}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-pink-100 bg-white px-4 py-3">
            <div className="flex items-center gap-3">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("typeHealthQuestion")}
                className="flex-1 resize-none rounded-2xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              />

              <button
                disabled={!input.trim() || typing}
                onClick={() => sendMessage(input)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-700 text-white shadow-lg transition hover:scale-105 hover:bg-pink-800 disabled:opacity-40 disabled:hover:scale-100"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>

            <div className="mt-2 flex justify-between gap-3 text-xs text-gray-500">
              <span>{t("sendHint")}</span>
              <button
                onClick={clearChat}
                className="inline-flex items-center gap-1 whitespace-nowrap transition hover:text-pink-600"
              >
                <RotateCcw size={12} />
                {t("clearChat")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
