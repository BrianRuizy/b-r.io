import Card from "@/app/components/bento/CardTemplate";
import Link from "@/app/components/Link";

export default function Gumroad() {
  return (
    <Link
      href="https://gumroad.com/brianr4"
      className="col-span-1 row-span-1 no-underline hidden md:block"
    >
      <Card className="flex aspect-square flex-col gap-1.5">
        <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-lg bg-[#FF91E7]">
          <Logo />
        </div>
        <p className="text-secondary">Gumroad</p>
        <p className="line-clamp-2">Just added my Notion templates!</p>
      </Card>
    </Link>
  );
}

const Logo = () => (
  <svg
    width="16"
    height="16"
    className="h-full w-full"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="10" fill="#FF90E8"></rect>
    <g clipPath="url(#clip0_920_2744)">
      <path
        d="M22.0129 32C27.5285 32 31.9998 27.5542 31.9998 22.07C31.9998 16.5857 27.5285 12.1399 22.0129 12.1399C16.4972 12.1399 12.0259 16.5857 12.0259 22.07C12.0259 27.5542 16.4972 32 22.0129 32Z"
        fill="black"
      ></path>
      <path
        d="M19.4355 29.9196C25.2366 29.9196 29.973 25.2387 29.973 19.4224C29.973 13.6061 25.2366 8.92513 19.4355 8.92513C13.6344 8.92513 8.89795 13.6061 8.89795 19.4224C8.89795 25.2387 13.6344 29.9196 19.4355 29.9196Z"
        fill="#FF90E8"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 19.4224C8 13.0642 13.1692 8 19.4357 8C25.7023 8 30.8715 13.0642 30.8715 19.4224C30.8715 25.7807 25.7023 30.8448 19.4357 30.8448C13.1692 30.8448 8 25.7807 8 19.4224ZM19.4357 9.85033C14.1001 9.85033 9.79642 14.1481 9.79642 19.4224C9.79642 24.6968 14.1001 28.9945 19.4357 28.9945C24.7714 28.9945 29.0751 24.6968 29.0751 19.4224C29.0751 14.1481 24.7714 9.85033 19.4357 9.85033Z"
        fill="black"
      ></path>
      <path
        d="M18.6438 24.7183C15.6947 24.7183 13.96 22.264 13.96 19.211C13.96 16.0383 15.8682 13.4642 19.5111 13.4642C23.2698 13.4642 24.5418 16.0982 24.5997 17.5947H21.8819C21.8242 16.7566 21.1302 15.4996 19.4533 15.4996C17.6608 15.4996 16.5043 17.1158 16.5043 19.0913C16.5043 21.0667 17.6608 22.6829 19.4533 22.6829C21.0724 22.6829 21.7663 21.366 22.0555 20.0491H19.4533V18.9716H24.9134V24.4788H22.518V21.0068C22.3445 22.264 21.5928 24.7183 18.6438 24.7183Z"
        fill="black"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_920_2744">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(8 8)"
        ></rect>
      </clipPath>
    </defs>
  </svg>
);
