export default function ClinicSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-200 animate-pulse">
      <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
      <div className="h-3 w-1/2 bg-gray-200 rounded mb-4"></div>

      <div className="flex gap-2 mb-4">
        <div className="h-6 w-20 bg-pink-100 rounded-full"></div>
        <div className="h-6 w-20 bg-pink-100 rounded-full"></div>
      </div>

      <div className="flex justify-between">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-8 w-28 bg-pink-200 rounded-full"></div>
      </div>
    </div>
  );
}
