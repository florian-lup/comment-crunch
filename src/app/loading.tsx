export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
        <div className="h-16 w-16 rounded-full border-4 border-t-blue-600 animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="mt-6 text-gray-600">Loading content...</p>
    </div>
  );
} 