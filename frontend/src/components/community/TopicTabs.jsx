export default function TopicTabs({ activeTopic, onChange, topics }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {topics.map((topic) => (
        <button
          key={topic}
          onClick={() => onChange(topic)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition
            ${
              activeTopic === topic
                ? "bg-pink-600/80 text-white"
                : "bg-white border border-pink-200 text-gray-700 hover:bg-pink-100"
            }`}
        >
          {topic}
        </button>
      ))}
    </div>
  );
}
