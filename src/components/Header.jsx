import { Link } from 'react-router-dom'
import logoImg from '@aks/assets/logo.webp'
import { DownloadArrowIcon } from '@aks/assets/icons'

export default function Header({ totalCount, onReset }) {
  return (
    <header className="w-full">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 pt-5 sm:pt-7 pb-3 flex items-center justify-between gap-3">
        <Link
          to="/"
          onClick={() => {
            if (onReset) {
              onReset()
            }
          }}
          className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
          aria-label="Book Explorer Homepage"
        >
          <img
            src={logoImg}
            alt="Book Explorer Logo"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl shadow-xs select-none object-cover shrink-0 group-hover:scale-105 transition-transform"
          />
          <span className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors">
            Book Explorer
          </span>

        </Link>

        {totalCount != null && (
          <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-[#FFF7ED] border border-[#FED7AA]/80 text-[#9A3412] text-xs font-semibold shrink-0 shadow-2xs">
            <DownloadArrowIcon className="w-3.5 h-3.5 text-[#EA580C]" />
            <span className="sm:hidden">{totalCount.toLocaleString()}</span>
            <span className="hidden sm:inline">{totalCount.toLocaleString()} books</span>
          </div>
        )}
      </div>
    </header>
  )
}
