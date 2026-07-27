import Image from 'next/image';

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

/** Use for images that need a visible caption; plain `![alt](src)` markdown images stay caption-free. */
export function Figure({ src, alt, caption, width = 1200, height = 800 }: FigureProps) {
  return (
    <figure className="not-prose my-8">
      <div className="overflow-hidden rounded-md">
        <Image src={src} alt={alt} width={width} height={height} className="w-full object-cover" />
      </div>
      {caption && <figcaption className="mt-2.5 text-center text-sm text-ink-muted">{caption}</figcaption>}
    </figure>
  );
}
