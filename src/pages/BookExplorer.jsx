import { useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetBooksQuery, usePrefetch } from '@aks/store/booksApi'
import { useDebounce } from '@aks/hooks/useDebounce'
import Header from '@aks/components/Header'
import HeroSection from '@aks/components/HeroSection'
import SearchBar from '@aks/components/SearchBar'
import FilterPanel from '@aks/components/FilterPanel'
import BookGrid from '@aks/components/BookGrid'
import LoadingSkeleton from '@aks/components/LoadingSkeleton'
import Pagination from '@aks/components/Pagination'
import EmptyState from '@aks/components/EmptyState'
import MobileFilterDrawer from '@aks/components/MobileFilterDrawer'
import LoadingProgressBar from '@aks/components/LoadingProgressBar'
import { FilterFunnelIcon, SortArrowsIcon } from '@aks/assets/icons'

export default function BookExplorer() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)

  const urlSearch = searchParams.get('search') || ''
  const urlLanguages = searchParams.get('languages') || ''
  const urlTopic = searchParams.get('topic') || ''
  const urlSort = searchParams.get('sort') || 'popular'
  const urlPage = parseInt(searchParams.get('page') || '1', 10) || 1

  const [searchInput, setSearchInput] = useState(urlSearch)
  const debouncedSearch = useDebounce(searchInput, 500)
  const lastAppliedSearchRef = useRef(urlSearch)

  const updateParams = useCallback(
    (newEntries, replace = false) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          Object.entries(newEntries).forEach(([key, val]) => {
            if (val === null || val === undefined || val === '') {
              next.delete(key)
            } else {
              next.set(key, String(val))
            }
          })
          return next
        },
        { replace }
      )
    },
    [setSearchParams]
  )

  useEffect(() => {
    const currentParam = searchParams.get('search') || ''
    const trimmed = debouncedSearch.trim()
    if (trimmed !== currentParam) {
      lastAppliedSearchRef.current = trimmed
      updateParams(
        {
          search: trimmed || null,
          page: null,
        },
        true
      )
    }
  }, [debouncedSearch, searchParams, updateParams])

  useEffect(() => {
    if (urlSearch !== lastAppliedSearchRef.current) {
      setSearchInput(urlSearch)
      lastAppliedSearchRef.current = urlSearch
    }
  }, [urlSearch])

  const { data, isLoading, isFetching, isError, refetch } = useGetBooksQuery({
    search: urlSearch,
    languages: urlLanguages,
    topic: urlTopic,
    sort: urlSort,
    page: urlPage,
  })

  const prefetchBooks = usePrefetch('getBooks')
  useEffect(() => {
    if (data?.next) {
      prefetchBooks({
        search: urlSearch,
        languages: urlLanguages,
        topic: urlTopic,
        sort: urlSort,
        page: urlPage + 1,
      })
    }
    if (data?.previous && urlPage > 1) {
      prefetchBooks({
        search: urlSearch,
        languages: urlLanguages,
        topic: urlTopic,
        sort: urlSort,
        page: urlPage - 1,
      })
    }
  }, [data, urlSearch, urlLanguages, urlTopic, urlSort, urlPage, prefetchBooks])

  const books = data?.results || []
  const count = data?.count || 0
  const hasNext = Boolean(data?.next)
  const hasPrev = Boolean(data?.previous)

  function handleLanguageChange(lang) {
    updateParams({ languages: lang || null, page: null })
  }

  function handleTopicChange(top) {
    updateParams({ topic: top || null, page: null })
  }

  function handleSortChange(s) {
    updateParams({ sort: s === 'popular' ? null : s, page: null })
  }

  function handlePageChange(newPage) {
    if (newPage < 1) return
    updateParams({ page: newPage === 1 ? null : newPage })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleClearSearch() {
    lastAppliedSearchRef.current = ''
    setSearchInput('')
    updateParams({ search: null, page: null })
  }

  function handleResetFilters() {
    lastAppliedSearchRef.current = ''
    setSearchInput('')
    setSearchParams(new URLSearchParams())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const hasActiveFilters = Boolean(
    urlSearch || urlLanguages || urlTopic || (urlSort && urlSort !== 'popular') || urlPage > 1
  )

  const startItem = count === 0 ? 0 : (urlPage - 1) * 32 + 1
  const endItem = Math.min(urlPage * 32, count)

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-stone-800 flex flex-col font-sans selection:bg-orange-100 selection:text-orange-900">
      <Header totalCount={count} onReset={handleResetFilters} />
      <HeroSection />

      <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-20 pb-12 flex flex-col gap-5 sm:gap-6">
        <section
          aria-label="Search and filters"
          className="mt-6 flex flex-col lg:flex-row gap-2.5 sm:gap-3 items-stretch lg:items-center justify-between"
        >
          <div className="flex items-center gap-2 w-full lg:flex-1 min-w-0">
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              onClear={handleClearSearch}
            />

            <button
              type="button"
              onClick={() => setIsFilterDrawerOpen(true)}
              aria-label="Open filter options"
              className="relative sm:hidden shrink-0 w-10 h-10 rounded-lg border border-stone-200/90 bg-white flex items-center justify-center text-stone-600 hover:text-orange-600 hover:border-orange-300 transition-colors shadow-xs cursor-pointer"
            >
              <FilterFunnelIcon className="w-4 h-4 text-stone-600" />
              {(urlLanguages || urlTopic) && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-600 ring-2 ring-white" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                const nextSort =
                  urlSort === 'popular'
                    ? 'ascending'
                    : urlSort === 'ascending'
                      ? 'descending'
                      : 'popular'
                handleSortChange(nextSort)
              }}
              aria-label={`Sort books: current ${urlSort}`}
              title={`Current sort: ${urlSort}`}
              className="sm:hidden shrink-0 w-10 h-10 rounded-lg border border-stone-200/90 bg-white flex items-center justify-center text-stone-600 hover:text-orange-600 hover:border-orange-300 transition-colors shadow-xs cursor-pointer"
            >
              <SortArrowsIcon className="w-4 h-4 text-stone-600" />
            </button>
          </div>

          <div className="hidden sm:block">
            <FilterPanel
              language={urlLanguages}
              topic={urlTopic}
              sort={urlSort}
              onLanguageChange={handleLanguageChange}
              onTopicChange={handleTopicChange}
              onSortChange={handleSortChange}
            />
          </div>
        </section>

        <div className="-mt-3 sm:-mt-4">
          <LoadingProgressBar isLoading={isFetching && !isLoading} />
        </div>

        <div className="flex items-center justify-between px-1 text-xs sm:text-sm font-medium text-stone-600">
          <div>
            {count > 0 ? (
              <span>
                Showing <strong className="font-bold text-stone-900">{startItem} – {endItem}</strong> of{' '}
                <strong className="font-bold text-stone-900">{count.toLocaleString()}</strong> books
              </span>
            ) : !isLoading ? (
              <span>0 books found</span>
            ) : null}
          </div>
        </div>

        {isError && (
          <div className="animate-error-enter p-3.5 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-stone-800 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <span className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200 text-amber-800 flex items-center justify-center shrink-0 text-sm font-bold">
                !
              </span>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-stone-900 truncate sm:whitespace-normal">
                  Unable to fetch your request
                </p>
                <p className="text-[11px] sm:text-xs text-stone-600 mt-0.5 line-clamp-1 sm:line-clamp-none">
                  The service is taking too long to respond. Please retry.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-orange-600 hover:bg-orange-700 text-white shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.451a.75.75 0 000-1.5H4.5a.75.75 0 00-.75.75v3.75a.75.75 0 001.5 0v-2.19l.525.525a7 7 0 101.442-8.318.75.75 0 00-1.06 1.06 5.5 5.5 0 019.155 4.528z" clipRule="evenodd" />
              </svg>
              <span>Retry</span>
            </button>
          </div>
        )}

        <section aria-label="Book results" className="relative flex-1">
          {isLoading ? (
            <LoadingSkeleton count={12} />
          ) : books.length > 0 ? (
            <BookGrid books={books} />
          ) : (
            <EmptyState onReset={handleResetFilters} hasFilters={hasActiveFilters} />
          )}
        </section>

        {!isLoading && books.length > 0 && (
          <Pagination
            page={urlPage}
            count={count}
            hasNext={hasNext}
            hasPrev={hasPrev}
            isFetching={isFetching}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      <MobileFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        language={urlLanguages}
        topic={urlTopic}
        sort={urlSort}
        onApply={({ languages, topic, sort }) => {
          updateParams({
            languages: languages || null,
            topic: topic || null,
            sort: sort === 'popular' ? null : sort,
            page: null,
          })
        }}
        onClear={() => {
          updateParams({
            languages: null,
            topic: null,
            sort: null,
            page: null,
          })
        }}
      />

      <footer className="border-t border-stone-200/60 bg-white/40 py-6 text-center text-xs text-stone-500">
        <p>
          Designed &amp; Developed by{' '}
          <a
            href="https://github.com/abhaya-kumar-sahoo"
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-stone-800 hover:text-orange-600 transition-colors"
          >
            Abhaya
          </a>
        </p>      </footer>
    </div>
  )
}
