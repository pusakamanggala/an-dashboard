const SummaryCardSkeleton = () => {
  return (
    <div className="border-2 p-4 space-y-6 rounded-md">
      <div className="flex space-x-2 items-center">
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="w-20 h-8 bg-gray-300 rounded animate-pulse"></div>
        <div className="font-medium text-xs 2xl:text-sm space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-16 h-2 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-16 h-2 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCardSkeleton;
