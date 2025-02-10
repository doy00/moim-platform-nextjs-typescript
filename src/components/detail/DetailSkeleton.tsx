export const DetailSkeleton = () => {
  return (
    <div className="w-full min-h-screen mx-auto px-4 pb-[92px] bg-background200 xs:max-w-screen-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
      {/* Logo */}
      <div className="w-full h-14 py-[10px] flex items-center">
        <div className="w-32 h-8 bg-gray200 rounded-md animate-pulse" />
      </div>

      {/* Share */}
      <div className="w-full h-19 ml-auto mb-4 bg-gray200 rounded-2xl animate-pulse" />

      {/* Image Box */}
      <div className="w-full h-[180px] aspect-video bg-gray200 rounded-2xl animate-pulse" />

      {/* Detail Info */}
      <div className="relative flex flex-col gap-2.5 px-4 py-5 mt-4 lg:px-6 lg:py-8 lg:mt-8 bg-white rounded-2xl">
        <div className="flex gap-1.5">
          <div className="w-16 h-6 bg-gray200 rounded-md animate-pulse" />
          <div className="w-20 h-6 bg-gray200 rounded-md animate-pulse" />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="w-3/4 h-5 bg-gray200 rounded animate-pulse" />
          <div className="w-1/2 h-4 bg-gray200 rounded animate-pulse" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-full h-4 bg-gray200 rounded animate-pulse" />
          <div className="w-3/4 h-4 bg-gray200 rounded animate-pulse" />
        </div>
      </div>

      {/* Participants */}
      <div className="mt-4 p-4 bg-white rounded-2xl">
        <div className="w-1/3 h-5 mb-3 bg-gray200 rounded animate-pulse" />
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-10 h-10 bg-gray200 rounded-full animate-pulse" />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 p-4 bg-white rounded-2xl">
        <div className="w-full h-4 bg-gray200 rounded animate-pulse mb-2" />
        <div className="w-3/4 h-4 bg-gray200 rounded animate-pulse mb-2" />
        <div className="w-1/2 h-4 bg-gray200 rounded animate-pulse" />
      </div>

      {/* Host */}
      <div className="mt-4 p-4 bg-white rounded-2xl flex gap-4">
        <div className="w-16 h-16 bg-gray200 rounded-full animate-pulse" />
        <div className="flex-1">
          <div className="w-1/3 h-5 bg-gray200 rounded animate-pulse mb-2" />
          <div className="w-2/3 h-4 bg-gray200 rounded animate-pulse" />
        </div>
      </div>

      {/* Floating Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-19 bg-white border-t border-gray200 flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-[72px] h-14 bg-gray200 rounded-2xl animate-pulse" />
          <div className="min-w-max h-14 bg-gray200 rounded-2xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}