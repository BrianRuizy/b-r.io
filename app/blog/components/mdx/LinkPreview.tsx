import Image from "next/image";

interface LinkPreviewProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({
  title,
  description,
  imageUrl,
  link,
}) => {
  const baseUrl = new URL(link).hostname.replace(/^www\./i, "");

  return (
    <a
      className="flex bg-tertiary rounded-md overflow-clip p-4 gap-4 md:gap-6 md:p-6 items-center my-8 no-underline border border-secondary"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="prose w-full max-w-[12rem]">
        <Image
          width={600}
          height={400}
          src={imageUrl}
          alt="OG Image"
          className="rounded w-full object-cover aspect-video"
        />
      </div>

      <div className="w-full flex flex-col gap-1 leading-tight">
        <p className="m-0 text-sm text-tertiary flex items-center gap-0.5">
          {baseUrl}
        </p>
        <p className="text-base line-clamp-3 text-primary font-medium m-0 leading-tight">
          {title}
        </p>
        <div className="hidden md:block">
          <p className="line-clamp-2 m-0 text-sm text-secondary">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
};

export default LinkPreview;
