export default function LoadingProgressBar({ isLoading }) {
  return (
    <div
      aria-hidden={!isLoading}
      aria-label="Loading books"
      className={`w-full overflow-hidden transition-all duration-300 ease-out flex items-center justify-center ${isLoading
        ? 'h-2 opacity-100 pointer-events-auto'
        : 'h-0 opacity-0 pointer-events-none'
        }`}
    >
      <div className="relative w-full h-[3px] bg-gradient-to-r from-transparent via-indigo-100 to-transparent rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 w-2/5 rounded-full animate-indeterminate bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_12px_rgba(79,70,229,0.7)]"
          style={{
            clipPath: 'polygon(0% 50%, 15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%)',
          }}
        />
      </div>
    </div>
  )
}

