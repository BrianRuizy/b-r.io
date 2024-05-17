import Image from "next/image";
import clsx from "clsx";

type CustomImageProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  breakout?: boolean;
  rounded?: boolean;
  priority?: boolean;
  reset?: boolean;
};

export default function CustomImage({
  src,
  width,
  height,
  alt,
  caption,
  breakout,
  rounded,
  priority,
  reset,
}: CustomImageProps) {
  return (
    <div
      className={clsx(
        reset ? "" : "not-prose my-8 w-full",
        breakout ? "bg-secondary" : "",
        (rounded || breakout) && "overflow-hidden rounded-md md:rounded-lg",
      )}
    >
      <figure
        className={clsx("m-0 flex flex-col", breakout ? "gap-4" : "gap-2")}
      >
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          priority={priority}
          className={clsx(
            "h-auto w-full",
            breakout ? "bg-secondary" : "",
            (rounded || breakout) &&
              "overflow-hidden rounded-md bg-secondary md:rounded-lg",
          )}
        />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </div>
  );
}
