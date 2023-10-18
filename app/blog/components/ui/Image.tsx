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
        reset ? "" : "not-prose w-full my-8",
        breakout ? "bg-tertiary" : "",
        (rounded || breakout) && "rounded-lg overflow-hidden"
      )}
    >
      <figure className={clsx("m-0 flex flex-col", breakout ? "gap-4" : "gap-2")}>
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          priority={priority}
          className={clsx(
            "w-full h-auto",
            breakout ? "bg-tertiary" : "",
            (rounded || breakout) && "rounded-lg overflow-hidden bg-tertiary"
          )}
        />
        {caption && (
          <figcaption
            className={clsx(
              "my-2 text-xs leading-tight text-tertiary font-medium max-w-md mx-auto text-center",
              breakout && "max-w-[700px] px-6 w-full mx-auto "
            )}
          >
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
