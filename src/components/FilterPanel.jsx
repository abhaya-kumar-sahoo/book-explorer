import { GlobeIcon, TagIcon, SortArrowsIcon } from '@aks/assets/icons'
import { LANGUAGE_OPTIONS, TOPIC_OPTIONS, SORT_OPTIONS } from '@aks/constants/filters'

export default function FilterPanel({
  language,
  topic,
  sort,
  onLanguageChange,
  onTopicChange,
  onSortChange,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex items-center gap-2 sm:gap-2.5 w-full lg:w-auto">
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">
          <GlobeIcon className="w-4 h-4 text-stone-500" />
        </div>
        <select
          id="filter-language"
          aria-label="Filter by language"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-stone-200 bg-white pl-9 pr-8 py-2.5 text-xs sm:text-sm font-medium text-stone-700 shadow-xs hover:border-stone-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-hidden cursor-pointer"
        >
          {LANGUAGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-stone-400">
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </span>
      </div>

      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">
          <TagIcon className="w-4 h-4 text-stone-500" />
        </div>
        <select
          id="filter-topic"
          aria-label="Filter by topic"
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-stone-200 bg-white pl-9 pr-8 py-2.5 text-xs sm:text-sm font-medium text-stone-700 shadow-xs hover:border-stone-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-hidden cursor-pointer"
        >
          {TOPIC_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-stone-400">
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </span>
      </div>

      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">
          <SortArrowsIcon className="w-4 h-4 text-stone-500" />
        </div>
        <select
          id="filter-sort"
          aria-label="Sort books"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-stone-200 bg-white pl-9 pr-8 py-2.5 text-xs sm:text-sm font-medium text-stone-700 shadow-xs hover:border-stone-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-hidden cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-stone-400">
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </span>
      </div>
    </div>
  )
}
