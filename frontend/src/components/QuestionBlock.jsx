export default function QuestionBlock({ question, options, value, onChange }) {
  return (
    <div className="mb-5">
      <p className="font-medium text-gray-800 mb-2">{question}</p>

      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex items-center gap-3 px-4 py-2 rounded-xl border cursor-pointer
            ${value === opt ? "border-pink-500 bg-pink-50" : "border-pink-200"}`}
          >
            <input
              type="radio"
              checked={value === opt}
              onChange={() => onChange(opt)}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
