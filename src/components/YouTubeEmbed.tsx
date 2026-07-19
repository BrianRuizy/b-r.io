export function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  return (
    <div className="not-prose my-8 overflow-hidden rounded-2xl bg-muted ring-1 ring-border">
      <div className="relative aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  )
}
