import { ChevronLeftIcon, ChevronRightIcon } from '@aks/assets/icons'

export default function Pagination({ page, count, hasNext, hasPrev, isFetching, onPageChange }) {
  const totalPages = count ? Math.ceil(count / 32) : 1

  const pages = generatePageItems(page, totalPages)

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 py-8"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrev || isFetching || page <= 1}
        className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-xl border border-stone-200 bg-white text-stone-600 shadow-xs hover:border-orange-300 hover:text-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        <ChevronLeftIcon className="w-3.5 h-3.5" />
        <span className="hidden xs:inline sm:inline">Previous</span>
      </button>

      <div className="flex items-center gap-1 sm:gap-1.5">
        {pages.map((item, idx) => {
          if (item === '...') {
            return (
              <span key={`dots-${idx}`} className="px-1 text-xs text-stone-400 select-none">
                &hellip;
              </span>
            )
          }

          const isActive = item === page
          return (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              disabled={isFetching || isActive}
              className={`min-w-7 h-7 sm:min-w-9 sm:h-9 px-1.5 sm:px-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-orange-600 text-white shadow-xs font-bold'
                  : 'bg-white border border-stone-200/90 text-stone-700 hover:border-orange-300 hover:text-orange-600 shadow-xs'
              }`}
            >
              {typeof item === 'number' ? item.toLocaleString() : item}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNext || isFetching}
        className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-xl border border-orange-200/80 bg-white text-orange-600 shadow-xs hover:bg-orange-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        <span className="hidden xs:inline sm:inline">Next</span>
        <ChevronRightIcon className="w-3.5 h-3.5" />
      </button>
    </nav>
  )
}

function generatePageItems(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const items = []
  if (current <= 3) {
    items.push(1, 2, 3, 4, 5, '...', total)
  } else if (current >= total - 2) {
    items.push(1, '...', total - 4, total - 3, total - 2, total - 1, total)
  } else {
    items.push(1, '...', current - 1, current, current + 1, '...', total)
  }
  return items
}
