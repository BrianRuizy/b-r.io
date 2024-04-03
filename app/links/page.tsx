import Image from "next/image";
import Link from "@/components/ui/Link";
import ConnectLinks from "@/components/ConnectLinks";
import avatar from "public/avatar.png";

export default function Links() {
  return (
    <>
      <div className="flex flex-col gap-16 md:gap-24">
        <div className="flex animate-in flex-col gap-8">
          <Image
            src={avatar}
            width={100}
            height={100}
            alt="avatar"
            className="mx-auto animate-in rounded-full bg-secondary"
            style={{ "--index": 1 } as React.CSSProperties}
          />
          <div
            className="animate-in space-y-1 text-center"
            style={{ "--index": 2 } as React.CSSProperties}
          >
            <h1 className="text-2xl font-bold tracking-tight">Brian Ruiz</h1>
            <p className="mx-auto max-w-sm text-secondary">
              Software engineer who loves building cool things with code. In
              addition to coding, I also make YouTube videos. Find me elsewhere
              @brianruizy
            </p>
          </div>
        </div>
        <ul
          className="animated-list grid flex-grow animate-in grid-cols-1 gap-2 lg:gap-3"
          style={{ "--index": 3 } as React.CSSProperties}
        >
          {ConnectLinks.map((link) => (
            <li className="col-span-1 transition-opacity" key={link.label}>
              <Link
                href={link.href}
                className="inline-grid w-full rounded-lg bg-tertiary p-4 no-underline transition-opacity"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{link.icon}</span>
                  {link.label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="ml-auto h-5 w-5 text-secondary"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
