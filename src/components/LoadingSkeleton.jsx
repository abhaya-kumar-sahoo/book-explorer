export default function LoadingSkeleton({ count = 12 }) {
  const items = Array.from({ length: count }, (_, idx) => idx)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 animate-pulse">
      {items.map((i) => (
        <div
          key={i}
          className="flex flex-col bg-white rounded-2xl border border-stone-200/80 p-3"
        >
          <div className="aspect-[4/3] bg-stone-100 rounded-xl" />
          <div className="pt-3 pb-1 px-1 space-y-2">
            <div className="h-3.5 bg-stone-100 rounded-md w-5/6" />
            <div className="h-2.5 bg-stone-100 rounded-md w-1/2" />
            <div className="pt-3 flex justify-between border-t border-stone-100">
              <div className="h-3.5 bg-orange-50 rounded w-8" />
              <div className="h-3.5 bg-stone-100 rounded w-10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
