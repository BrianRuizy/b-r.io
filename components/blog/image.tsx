import Image from "next/image";
import cn from "clsx";

type CustomImageProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  breakout?: boolean;
  rounded?: boolean;
  priority?: boolean;
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
}: CustomImageProps) {
  return (
    <div
      className={cn(
        "not-prose w-full my-8",
        breakout ? "bg-tertiary" : "",
        (rounded || breakout) && "rounded-lg overflow-hidden"
      )}
    >
      <figure className={cn("flex flex-col", breakout ? "gap-4" : "gap-2")}>
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          priority={priority}
          className={cn(
            "w-full h-auto",
            breakout ? "bg-tertiary" : "",
            (rounded || breakout) && "rounded-lg overflow-hidden bg-tertiary"
          )}
        />
        {caption && (
          <figcaption
            className={cn(
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
