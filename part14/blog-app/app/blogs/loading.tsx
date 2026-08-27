const Loading = () => {
  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <div className="flex items-center gap-3 rounded-full bg-gray-50 px-4 py-2 text-sm text-gray-500 shadow-sm">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-indigo-500" />
        <span>Loading blogs...</span>
      </div>
    </div>
  );
};

export default Loading;
