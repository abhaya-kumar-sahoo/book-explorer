import heroBooksImg from '@aks/assets/hero-books.webp'

export default function HeroSection() {
  return (
    <div className="relative w-full overflow-hidden pt-1 sm:pt-4 pb-2">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 flex flex-row items-end justify-between gap-3 sm:gap-6">
        <div className="max-w-2xl pt-1 sm:pt-2 min-w-0">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-[40px] lg:text-[46px] font-extrabold tracking-tight text-stone-900 leading-[1.15]">
            Discover <span className="text-[#EA580C]">Free Books</span>
          </h1>
          <p className="mt-1 sm:mt-2 text-[11px] xs:text-xs sm:text-sm md:text-base text-stone-600 leading-snug sm:leading-relaxed font-normal">
            Explore your fevorite books.
          </p>
        </div>

        <div className="relative flex justify-end w-auto -mb-1 md:-mb-2 shrink-0">
          <img
            src={heroBooksImg}
            alt="Warm autumn book stack with leaves"
            className="w-32 xs:w-40 sm:w-56 md:w-[340px] lg:w-[420px] max-w-full object-contain pointer-events-none select-none"
          />
        </div>
      </div>
    </div>
  )
}
