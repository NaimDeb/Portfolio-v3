export default function CardSkeleton() {
  return (
    <div className="animate-pulse w-full sm:w-[30rem] p-4 md:p-5 lg:p-7 bg-gradient-to-br from-neutral-900 to-neutral-950 border-2 border-gray-500 shadow-sm rounded-lg">
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        <div className="flex gap-3">
          <div className="h-4 bg-gray-700 rounded w-8"></div>
          <div className="h-4 bg-gray-700 rounded w-8"></div>
        </div>
      </div>
    </div>
  );
}
