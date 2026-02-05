import { User, Stethoscope, BookOpen, ShieldCheck, EyeOff } from "lucide-react";
const typeConfig = {
  story: {
    label: "Community Story",
    icon: User,
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  expert: {
    label: "Expert Insight",
    icon: Stethoscope,
    badge: "bg-green-50 text-green-700 border-green-200",
  },
  resource: {
    label: "Helpful Resource",
    icon: BookOpen,
    badge: "bg-purple-50 text-purple-700 border-purple-200",
  },
};

export default function CommunityCard({ post, onHide }) {
  const config = typeConfig[post.type] || typeConfig.story;
  const Icon = config.icon;

  return (
    <div
      className="bg-white rounded-2xl p-5 border border-pink-200
      shadow-sm hover:shadow-md transition"
    >
      {/* ================= TOP ROW ================= */}
      <div className="flex justify-between items-start">
        {/* Type badge */}
        <span
          className={`inline-flex items-center gap-1 px-3 py-1
          rounded-full text-xs font-medium border ${config.badge}`}
        >
          <Icon size={14} />
          {config.label}
        </span>

        {/* Right-side actions */}
        <div className="flex items-center gap-3">
          {/* Verified expert */}
          {post.type === "expert" && (
            <span className="inline-flex items-center gap-1 text-xs text-green-700">
              <ShieldCheck size={14} />
              Verified Expert
            </span>
          )}

          {/* Hide post */}
          <button
            onClick={onHide}
            className="text-gray-400 hover:text-gray-600"
            title="Hide post"
          >
            <EyeOff size={16} />
          </button>
        </div>
      </div>

      {/* ================= TITLE ================= */}
      <h3 className="mt-3 font-semibold text-gray-800">
        {post.title}
        {post.contentWarning && (
          <span
            className="ml-2 text-[10px] px-2 py-0.5 rounded-full
            bg-red-100 text-red-700"
          >
            Sensitive
          </span>
        )}
      </h3>

      {/* ================= CONTENT ================= */}
      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
        {post.content}
      </p>

      {/* ================= FOOTER ================= */}
      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
        <span>
          — {post.author}
          {post.timestamp && ` • ${post.timestamp}`}
        </span>

        {post.supportCount !== undefined && (
          <span>{post.supportCount} supported</span>
        )}
        {post.ctaText && (
          <button
            onClick={post.onCtaClick}
            className="px-4 py-1.5 rounded-full text-sm
    bg-pink-600/80 text-white hover:bg-pink-600 transition"
          >
            {post.ctaText}
          </button>
        )}
      </div>
    </div>
  );
}
