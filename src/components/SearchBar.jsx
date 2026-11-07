import { SearchIcon, CloseIcon } from '@aks/assets/icons'

export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="relative w-full lg:flex-1 min-w-0 sm:min-w-[240px]">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
        <SearchIcon className="w-5 h-5 text-stone-400" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title or author..."
        className="w-full rounded-lg border border-orange-200/90 bg-white pl-10 pr-10 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-hidden transition-all shadow-xs"
      />

      {value ? (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search query"
            className="text-stone-400 hover:text-stone-600 transition-colors p-1 cursor-pointer"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>
      ) : null}
    </div>
  )
}
