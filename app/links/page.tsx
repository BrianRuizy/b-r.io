import Image from "next/image";
import Link from "@/components/ui/Link";
import ConnectLinks from "@/components/ConnectLinks";
import avatar from "public/avatar.png";

export default function Links() {
  return (
    <>
      <div className="flex flex-col gap-16 md:gap-24">
        <div className="flex flex-col gap-8 animate-in">
          <Image
            src={avatar}
            width={100}
            height={100}
            alt="avatar"
            className="rounded-full bg-secondary mx-auto animate-in"
            style={{ "--index": 1 } as React.CSSProperties}
          />
          <div
            className="space-y-1 animate-in"
            style={{ "--index": 2 } as React.CSSProperties}
          >
            <h1 className="text-2xl font-bold tracking-tight text-center">
              Brian Ruiz
            </h1>
            <p className="max-w-sm text-secondary mx-auto text-center">            
            Software engineer who loves building cool
            things with code. In addition to coding, I also make YouTube videos. Find me elsewhere @brianruizy
            </p>
          </div>
        </div>

        <ul
          className="flex-grow grid grid-cols-1 gap-2 lg:gap-3 animated-list animate-in"
          style={{ "--index": 3 } as React.CSSProperties}
        >
          {ConnectLinks.map((link) => (
            <li className="transition-opacity col-span-1" key={link.label}>
              <Link
                href={link.href}
                className="transition-opacity no-underline w-full rounded-lg p-4 bg-tertiary inline-grid"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{link.icon}</span>
                  {link.label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 ml-auto text-secondary"
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
