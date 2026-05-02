import { X } from "lucide-react";
import { useState } from "react";

export default function ShareStoryModal({ open, onClose, onSubmit, topics }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [contentWarning, setContentWarning] = useState(false);

  if (!open) return null;

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    onSubmit({
      id: Date.now(),
      type: "story",
      topic,
      title,
      content,
      contentWarning,
      author: "Anonymous",
      timestamp: "Just now",
      supportCount: 0,
    });

    setTitle("");
    setContent("");
    setTopic(topics[0]);
    setContentWarning(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800">
          Share Your Story
        </h2>

        <p className="text-xs text-gray-500 mt-1">
          Your post will be anonymous. Avoid personal identifiers.
        </p>

        {/* Topic */}
        <div className="mt-4">
          <label className="text-xs font-medium text-gray-600">Topic</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-xl border border-pink-200 text-sm"
          >
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div className="mt-3">
          <label className="text-xs font-medium text-gray-600">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-xl border border-pink-200 text-sm"
          />
        </div>

        {/* Content */}
        <div className="mt-3">
          <label className="text-xs font-medium text-gray-600">
            Your Story
          </label>
          <textarea
            rows={4}
            maxLength={500}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-xl border border-pink-200 text-sm resize-none"
          />
          <div className="text-right text-xs text-gray-400 mt-1">
            {content.length}/500
          </div>
        </div>

        {/* Content warning */}
        <div className="mt-2">
          <label className="inline-flex items-center gap-2 text-xs text-gray-600">
            <input
              type="checkbox"
              checked={contentWarning}
              onChange={(e) => setContentWarning(e.target.checked)}
            />
            Mark as sensitive content
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-5 w-full py-2 rounded-full
            bg-pink-600/80 text-white text-sm font-medium
            hover:bg-pink-600 transition"
        >
          Post Anonymously
        </button>
      </div>
    </div>
  );
}
