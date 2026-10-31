'use client'

export function LinkFavicon({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      width={16}
      height={16}
      className="mr-1 inline size-[0.95em] max-h-4 translate-y-[-0.08em] rounded-sm"
      loading="lazy"
      decoding="async"
      onError={(event) => {
        event.currentTarget.style.display = 'none'
      }}
    />
  )
}
