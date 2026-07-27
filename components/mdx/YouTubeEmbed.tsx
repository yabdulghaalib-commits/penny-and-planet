interface YouTubeEmbedProps {
  id: string;
  title: string;
}

/** Responsive 16:9 YouTube embed. `id` is the video id (the part after `v=` in the URL). */
export function YouTubeEmbed({ id, title }: YouTubeEmbedProps) {
  return (
    <div className="not-prose my-8 aspect-video overflow-hidden rounded-md bg-ink">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        className="h-full w-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
