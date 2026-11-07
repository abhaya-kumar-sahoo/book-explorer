import { Link } from 'react-router-dom'
import logoImg from '@aks/assets/logo.webp'

export default function BookDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] text-stone-800 flex flex-col font-sans">
      <header className="w-full">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 pt-5 sm:pt-7 pb-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer" aria-label="Back to Book Explorer">
            <img
              src={logoImg}
              alt="Book Explorer Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl shadow-xs select-none object-cover shrink-0 group-hover:scale-105 transition-transform"
            />
            <span className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors">
              Book Explorer
            </span>
          </Link>
          <div className="h-6 w-28 bg-[#FFF7ED] rounded-full border border-[#FED7AA] animate-pulse shrink-0" />
        </div>
      </header>

      <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-20 py-4 pb-16 animate-pulse">
        <div className="bg-white rounded-2xl sm:rounded-[32px] p-4 sm:p-8 lg:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.03)]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center lg:items-start">
            <div className="w-full lg:w-[290px] shrink-0 flex flex-col items-center lg:items-start gap-6">
              <div className="w-full flex justify-center lg:justify-start">
                <div className="w-full max-w-[260px] sm:max-w-[280px] aspect-[2/3] rounded-xl bg-stone-200/80 shadow-md shrink-0" />
              </div>

              <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4 lg:gap-3 bg-[#FFFDF9] rounded-2xl p-4 sm:p-5 border border-[#F0ECE1]">
                <div className="flex items-center justify-between sm:flex-col sm:items-start lg:flex-row lg:items-center gap-1">
                  <div className="h-3.5 w-20 bg-stone-200 rounded" />
                  <div className="h-4 w-14 bg-stone-200 rounded" />
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-start lg:flex-row lg:items-center gap-1 sm:border-l sm:border-stone-200/60 sm:pl-4 lg:border-l-0 lg:pl-0">
                  <div className="h-3.5 w-24 bg-stone-200 rounded" />
                  <div className="h-3.5 w-8 bg-stone-200 rounded" />
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-start lg:flex-row lg:items-center gap-1 sm:border-l sm:border-stone-200/60 sm:pl-4 lg:border-l-0 lg:pl-0">
                  <div className="h-3.5 w-20 bg-stone-200 rounded" />
                  <div className="h-3.5 w-24 bg-stone-200 rounded" />
                </div>
              </div>
            </div>

            <div className="flex-1 w-full flex flex-col space-y-6">
              <div className="space-y-2">
                <div className="h-8 sm:h-9 bg-stone-200 rounded-xl w-3/4" />
                <div className="h-4 bg-stone-200 rounded-md w-1/3" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-20 bg-stone-200 rounded" />
                <div className="bg-[#FFFDF9] rounded-2xl border border-[#F0ECE1] p-5 space-y-2.5">
                  <div className="h-3.5 bg-stone-200 rounded w-full" />
                  <div className="h-3.5 bg-stone-200 rounded w-full" />
                  <div className="h-3.5 bg-stone-200 rounded w-5/6" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-4 w-20 bg-stone-200 rounded" />
                <div className="flex flex-wrap gap-2">
                  <div className="h-7 w-36 bg-stone-100 rounded-full border border-stone-200" />
                  <div className="h-7 w-28 bg-stone-100 rounded-full border border-stone-200" />
                  <div className="h-7 w-44 bg-stone-100 rounded-full border border-stone-200" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-4 w-24 bg-stone-200 rounded" />
                <div className="flex flex-wrap gap-2">
                  <div className="h-7 w-32 bg-orange-50 rounded-full border border-orange-200" />
                  <div className="h-7 w-40 bg-orange-50 rounded-full border border-orange-200" />
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <div className="h-4 w-36 bg-stone-200 rounded" />
                <div className="flex flex-wrap gap-2.5">
                  <div className="h-10 w-44 bg-orange-200/80 rounded-xl" />
                  <div className="h-10 w-36 bg-orange-200/80 rounded-xl" />
                  <div className="h-10 w-36 bg-orange-200/80 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
