import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePrefetch } from '@aks/store/booksApi'
import { BookOpenIcon, DownloadArrowIcon, GlobeIcon } from '@aks/assets/icons'

export default function BookCard({ book }) {
  const [imgError, setImgError] = useState(false)
  const prefetchBook = usePrefetch('getBookById')

  const coverUrl =
    book.formats?.['image/jpeg'] ||
    book.formats?.['image/png'] ||
    null

  const authorName = book.authors?.[0]?.name
    ? formatAuthor(book.authors[0].name)
    : 'Unknown Author'

  const languageCode = book.languages?.[0]?.toUpperCase() || 'EN'
  const downloads = book.download_count?.toLocaleString() ?? 0

  return (
    <Link
      to={`/book/${book.id}`}
      state={{ book }}
      onMouseEnter={() => prefetchBook(book.id)}
      onTouchStart={() => prefetchBook(book.id)}
      className="group flex flex-col bg-white rounded-lg border border-[#E7E5E4] p-3 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(234,88,12,0.30)] hover:border-orange-300 transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-square w-full  flex items-center justify-center overflow-hidden">
        {coverUrl && !imgError ? (
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center text-stone-400">
            <BookOpenIcon className="w-10 h-10 mb-1 text-orange-300" />
            <span className="text-[11px] font-medium text-stone-400">No cover available</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 pt-3 pb-0.5 px-0.5">
        <h3
          className="font-bold text-stone-900 group-hover:text-orange-600 text-[13px] leading-snug line-clamp-1 transition-colors"
          title={book.title}
        >
          {book.title}
        </h3>
        <p className="mt-0.5 text-[12px] text-stone-500 line-clamp-1" title={authorName}>
          {authorName}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-500">
            <GlobeIcon className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#EA580C] transition-colors" />
            <span>{languageCode}</span>
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-500" title={`${downloads} downloads`}>
            <DownloadArrowIcon className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#EA580C] transition-colors" />
            <span>{formatDownloadCount(book.download_count)}</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

function formatDownloadCount(num) {
  if (num == null) return '0'
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  }
  if (num >= 1_000) {
    return `${Math.round(num / 1_000)}K`
  }
  return num.toLocaleString()
}

function formatAuthor(raw) {
  if (!raw.includes(',')) return raw
  const [last, first] = raw.split(',').map((s) => s.trim())
  return first ? `${first} ${last}` : last
}
