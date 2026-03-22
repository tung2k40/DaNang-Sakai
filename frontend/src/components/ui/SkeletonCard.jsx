function SkeletonCard() {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5 shadow-md h-[270px] animate-pulse">
      {/* Badge skeleton */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-gray-200 rounded-full" />

      {/* Content skeleton */}
      <div className="flex flex-col items-center mt-6 gap-3">
        <div className="h-4 bg-gray-200 rounded w-4/5" />
        <div className="h-4 bg-gray-200 rounded w-3/5" />

        <div className="h-3 bg-gray-100 rounded w-full mt-1" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />

        <div className="flex gap-4 mt-2">
          <div className="h-3 bg-gray-100 rounded w-20" />
          <div className="h-3 bg-gray-100 rounded w-16" />
        </div>
      </div>

      {/* Button skeleton */}
      <div className="absolute bottom-5 left-5 right-5 h-9 bg-blue-100 rounded-md" />
    </div>
  );
}

export default SkeletonCard;
