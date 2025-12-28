export default function SakhiMessage({ text }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex gap-3 items-start">
      <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
        👩‍⚕️
      </div>
      <p className="text-gray-600 text-sm italic">{text}</p>
    </div>
  );
}
