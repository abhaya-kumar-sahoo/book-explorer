import { useState, useEffect } from 'react'
import {
  FilterFunnelIcon,
  CloseIcon,
  GlobeIcon,
  TagIcon,
  SortArrowsIcon,
} from '@aks/assets/icons'
import { LANGUAGE_OPTIONS, TOPIC_OPTIONS, SORT_OPTIONS } from '@aks/constants/filters'

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  language,
  topic,
  sort,
  onApply,
  onClear,
}) {
  const [draftLang, setDraftLang] = useState(language)
  const [draftTopic, setDraftTopic] = useState(topic)
  const [draftSort, setDraftSort] = useState(sort)

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen)
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen)
    if (isOpen) {
      setDraftLang(language)
      setDraftTopic(topic)
      setDraftSort(sort)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  function handleApply() {
    onApply({
      languages: draftLang,
      topic: draftTopic,
      sort: draftSort,
    })
    onClose()
  }

  function handleClearAll() {
    setDraftLang('')
    setDraftTopic('')
    setDraftSort('popular')
    onClear()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 sm:hidden flex flex-col justify-end">
      <div
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-drawer-title"
        className="relative z-10 w-full bg-white rounded-t-[32px] p-5 pb-8 shadow-2xl border-t border-stone-200/80 flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-300"
      >
        <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mb-4 shrink-0" />

        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <FilterFunnelIcon className="w-5 h-5 text-orange-600" />
            <h2 id="filter-drawer-title" className="text-lg font-bold text-stone-900">
              Filters
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-5 space-y-5 text-sm">
          <div>
            <label
              htmlFor="drawer-language"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-600 mb-2"
            >
              <GlobeIcon className="w-4 h-4 text-orange-600" />
              Language
            </label>
            <div className="relative">
              <select
                id="drawer-language"
                value={draftLang}
                onChange={(e) => setDraftLang(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-800 shadow-xs focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-hidden cursor-pointer"
              >
                {LANGUAGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-stone-400">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="drawer-topic"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-600 mb-2"
            >
              <TagIcon className="w-4 h-4 text-orange-600" />
              Topic
            </label>
            <div className="relative">
              <select
                id="drawer-topic"
                value={draftTopic}
                onChange={(e) => setDraftTopic(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-800 shadow-xs focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-hidden cursor-pointer"
              >
                {TOPIC_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-stone-400">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="drawer-sort"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-600 mb-2"
            >
              <SortArrowsIcon className="w-4 h-4 text-orange-600" />
              Sort By
            </label>
            <div className="relative">
              <select
                id="drawer-sort"
                value={draftSort}
                onChange={(e) => setDraftSort(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-800 shadow-xs focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-hidden cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-stone-400">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
          <button
            type="button"
            onClick={handleClearAll}
            className="flex-1 py-3 px-4 rounded-xl border border-stone-200 bg-white text-stone-700 text-sm font-semibold hover:bg-stone-50 transition-colors text-center cursor-pointer"
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold shadow-md hover:shadow-orange-600/20 transition-all text-center cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}
