import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGetBookByIdQuery } from '@aks/store/booksApi'
import logoImg from '@aks/assets/logo.webp'
import BookDetailSkeleton from '@aks/components/BookDetailSkeleton'
import {
  BookOpenIcon,
  DownloadArrowIcon,
  GlobeIcon,
  TagIcon,
  LayersIcon,
  CopyrightIcon,
  ExternalLinkIcon,
  FileTextIcon,
  DeviceMobileIcon,
} from '@aks/assets/icons'

export default function BookDetail() {
  const { id } = useParams()
  const { data: book, isLoading, isError, refetch } = useGetBookByIdQuery(id)
  const [imgError, setImgError] = useState(false)

  if (isLoading) {
    return <BookDetailSkeleton />
  }

  if (isError || !book) {
    return (
      <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-stone-200/80 text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center mx-auto mb-3 shadow-xs">
            <img src={logoImg} alt="Book Explorer" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-lg font-bold text-stone-900">Book Not Available</h2>
          <p className="mt-1 text-sm text-stone-500">
            We couldn't load this book right now. The server might be busy or unreachable.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-orange-600 text-white hover:bg-orange-700 transition-colors shadow-xs cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.451a.75.75 0 000-1.5H4.5a.75.75 0 00-.75.75v3.75a.75.75 0 001.5 0v-2.19l.525.525a7 7 0 101.442-8.318.75.75 0 00-1.06 1.06 5.5 5.5 0 019.155 4.528z" clipRule="evenodd" />
              </svg>
              <span>Retry</span>
            </button>
            <Link
              to="/"
              className="px-4 py-2 text-sm font-semibold rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors"
            >
              Back to Explorer
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const coverUrl =
    book.formats?.['image/jpeg'] ||
    book.formats?.['image/png'] ||
    null

  const author = book.authors?.[0]
  const authorName = author?.name ? formatAuthor(author.name) : 'Unknown Author'
  const authorYears =
    author?.birth_year || author?.death_year
      ? `${author?.birth_year || ''} – ${author?.death_year || ''}`
      : null

  const summary = book.summaries?.[0]
  const languageCode = book.languages?.[0]?.toUpperCase() || 'EN'
  const downloads = book.download_count?.toLocaleString() ?? 0

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-stone-800 flex flex-col font-sans selection:bg-orange-100 selection:text-orange-900">
      <header className="w-full">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 pt-5 sm:pt-7 pb-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <img
              src={logoImg}
              alt="Book Explorer Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl shadow-xs select-none object-cover shrink-0"
            />
            <span className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors">
              Book Explorer
            </span>
          </Link>

          <span className="inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#FFF7ED] border border-[#FED7AA] text-[#9A3412] text-xs font-semibold shrink-0">
            #{book.id}
          </span>
        </div>
      </header>

      <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-20 py-4 pb-16">
        <div className="p-4 sm:p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center lg:items-start">
            <div className="w-full lg:w-[290px] shrink-0 flex flex-col items-center lg:items-start gap-6">
              <div className="w-full flex justify-center lg:justify-start">
                {coverUrl && !imgError ? (
                  <img
                    src={coverUrl}
                    alt={`Cover of ${book.title}`}
                    onError={() => setImgError(true)}
                    className="w-96 h-auto max-w-[360px] sm:max-w-[280px] max-h-[380px] object-contain  "
                  />
                ) : (
                  <div className="w-48 aspect-[2/3] rounded-xl bg-stone-100 flex flex-col items-center justify-center p-6 text-center text-stone-400">
                    <BookOpenIcon className="w-16 h-16 text-orange-300 mb-2" />
                    <span className="text-xs font-medium">No cover available</span>
                  </div>
                )}
              </div>

              <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4 lg:gap-3 bg-[#FFFDF9] rounded-2xl p-4 sm:p-5 border border-[#F0ECE1] text-xs">
                <div className="flex items-center justify-between sm:flex-col sm:items-start lg:flex-row lg:items-center gap-1">
                  <span className="inline-flex items-center gap-2 font-medium text-stone-500">
                    <DownloadArrowIcon className="w-4 h-4 text-[#EA580C]" />
                    <span>Downloads</span>
                  </span>
                  <span className="font-bold text-stone-900 text-sm sm:mt-0.5 lg:mt-0">{downloads}</span>
                </div>

                <div className="flex items-center justify-between sm:flex-col sm:items-start lg:flex-row lg:items-center gap-1 sm:border-l sm:border-stone-200/60 sm:pl-4 lg:border-l-0 lg:pl-0">
                  <span className="inline-flex items-center gap-2 font-medium text-stone-500">
                    <GlobeIcon className="w-4 h-4 text-[#EA580C]" />
                    <span>Language(s)</span>
                  </span>
                  <span className="font-bold text-stone-900 text-xs sm:mt-0.5 lg:mt-0">{languageCode}</span>
                </div>

                <div className="flex items-center justify-between sm:flex-col sm:items-start lg:flex-row lg:items-center gap-1 sm:border-l sm:border-stone-200/60 sm:pl-4 lg:border-l-0 lg:pl-0">
                  <span className="inline-flex items-center gap-2 font-medium text-stone-500">
                    <CopyrightIcon className="w-4 h-4 text-[#EA580C]" />
                    <span>Copyright</span>
                  </span>
                  <span className="font-bold text-stone-900 text-xs sm:mt-0.5 lg:mt-0">
                    {book.copyright ? 'Protected' : 'Public Domain'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full flex flex-col space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-stone-900 tracking-tight leading-snug">
                  {book.title}
                </h1>
                <div className="mt-2.5 flex flex-wrap items-center gap-2 text-sm text-stone-600 font-medium">
                  <span>By <strong className="font-bold text-[#EA580C]">{authorName}</strong></span>
                  {authorYears && (
                    <>
                      <span className="text-stone-300">|</span>
                      <span className="text-stone-500">{authorYears}</span>
                    </>
                  )}
                </div>
              </div>

              {summary && (
                <div>
                  <div className="flex items-center gap-2 mb-2 text-stone-900 font-bold text-sm">
                    <BookOpenIcon className="w-4 h-4 text-[#EA580C]" />
                    <span>Summary</span>
                  </div>
                  <div className="bg-[#FFFDF9] rounded-2xl border border-[#F0ECE1] p-5 text-stone-700 text-xs sm:text-[13px] leading-relaxed">
                    <p>{summary}</p>
                  </div>
                </div>
              )}

              {book.subjects?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2 text-stone-900 font-bold text-sm">
                    <TagIcon className="w-4 h-4 text-[#EA580C]" />
                    <span>Subjects</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {book.subjects.map((subj, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border border-[#F0ECE1] text-stone-700 text-xs font-medium"
                      >
                        {subj}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {book.bookshelves?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2 text-stone-900 font-bold text-sm">
                    <LayersIcon className="w-4 h-4 text-[#EA580C]" />
                    <span>Bookshelves</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {book.bookshelves.map((shelf, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#FFF7ED] border border-[#FED7AA] text-[#C2410C] text-xs font-semibold"
                      >
                        {shelf}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <div className="flex items-center gap-2 mb-3 text-stone-900 font-bold text-sm">
                  <DownloadArrowIcon className="w-4 h-4 text-[#EA580C]" />
                  <span>Read &amp; Download Free</span>
                </div>

                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {book.formats?.['text/html'] && (
                    <a
                      href={book.formats['text/html']}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer"
                    >
                      <BookOpenIcon className="w-4 h-4" />
                      <span>Read Online (HTML)</span>
                      <ExternalLinkIcon className="w-3.5 h-3.5 text-white/80" />
                    </a>
                  )}

                  {book.formats?.['application/epub+zip'] && (
                    <a
                      href={book.formats['application/epub+zip']}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer"
                    >
                      <FileTextIcon className="w-4 h-4" />
                      <span>EPUB E-book</span>
                      <ExternalLinkIcon className="w-3.5 h-3.5 text-white/80" />
                    </a>
                  )}

                  {book.formats?.['application/x-mobipocket-ebook'] && (
                    <a
                      href={book.formats['application/x-mobipocket-ebook']}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer"
                    >
                      <DeviceMobileIcon className="w-4 h-4" />
                      <span>Kindle (Mobi)</span>
                      <ExternalLinkIcon className="w-3.5 h-3.5 text-white/80" />
                    </a>
                  )}

                  {(book.formats?.['text/plain; charset=utf-8'] || book.formats?.['text/plain; charset=us-ascii']) && (
                    <a
                      href={book.formats['text/plain; charset=utf-8'] || book.formats['text/plain; charset=us-ascii']}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer"
                    >
                      <span className="font-bold text-xs uppercase bg-white/20 px-1 py-0.5 rounded">T</span>
                      <span>Plain Text (UTF-8)</span>
                      <ExternalLinkIcon className="w-3.5 h-3.5 text-white/80" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function formatAuthor(raw) {
  if (!raw.includes(',')) return raw
  const [last, first] = raw.split(',').map((s) => s.trim())
  return first ? `${first} ${last}` : last
}
