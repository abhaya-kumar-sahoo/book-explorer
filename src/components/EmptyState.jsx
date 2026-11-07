import { EmptyBoxIcon } from '@aks/assets/icons'

export default function EmptyState({ onReset, hasFilters }) {
  return (
    <div className="text-center py-16 px-4 bg-white/70 backdrop-blur-xs rounded-3xl border border-dashed border-stone-300 max-w-lg mx-auto my-8">
      <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto text-orange-400 mb-4 border border-orange-200/60">
        <EmptyBoxIcon className="w-8 h-8 text-orange-500" />
      </div>
      <h3 className="text-lg font-bold text-stone-900">No books found</h3>
      <p className="mt-1.5 text-xs sm:text-sm text-stone-500 max-w-sm mx-auto leading-relaxed">
        We couldn&apos;t find any books matching your query. Try clearing your search or picking another filter.
      </p>
      {hasFilters && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl text-white bg-orange-600 hover:bg-orange-700 transition-colors shadow-xs cursor-pointer"
        >
          Reset all filters
        </button>
      )}
    </div>
  )
}
