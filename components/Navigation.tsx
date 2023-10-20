"use client";
import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import NavLink from "./ui/NavLink";
import ThemeSwitcher from "./ThemeSwitcher";

import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

const links = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Gear", href: "/gear" },
  { label: "Projects", href: "/projects" },
];

export default function Navigation() {
  const pathname = `/${usePathname().split("/")[1]}`; // active paths on dynamic subpages
  const { theme } = useTheme();

  return (
    <header className={clsx("relative md:sticky top-0 z-20 bg-primary")}>
      <nav className="px-4 md:px-6 py-3 lg max-w-[700px] mx-auto flex justify-between items-center gap-3">
        <Link href="/" className="shrink-0 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 375 375"
            version="1.2"
          >
            <defs>
              <clipPath id="clip1">
                <path d="M 103.636719 64.171875 L 271.476562 64.171875 L 271.476562 310 L 103.636719 310 Z M 103.636719 64.171875 " />
              </clipPath>
            </defs>
            <g id="surface1">
              <g clipPath="url(#clip1)" clipRule="nonzero">
                <path
                  fill="currentColor"
                  d="M 211.375 151.808594 C 203.050781 149.433594 194.765625 155.722656 194.765625 164.390625 L 194.765625 297.785156 C 194.765625 305.234375 201.695312 310.808594 208.941406 309.09375 C 244.675781 300.671875 271.355469 268.492188 271.355469 230.195312 C 271.355469 193.117188 246.363281 161.785156 211.375 151.808594 Z M 180.15625 144.734375 L 180.15625 297.785156 C 180.15625 305.234375 173.230469 310.808594 165.980469 309.09375 C 130.246094 300.675781 103.566406 268.492188 103.566406 230.195312 L 103.566406 74.296875 C 103.566406 68.449219 108.902344 64.046875 114.640625 65.164062 C 151.925781 72.410156 180.15625 105.335938 180.15625 144.734375 Z M 180.15625 144.734375 "
                />
              </g>
            </g>
          </svg>
        </Link>
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
        <Popover className="relative ml-auto md:hidden">
          <Popover.Button className="flex items-center gap-1 text-secondary p-1 rounded-lg focus-visible:outline-none focus:ring-0">
            Menu
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className="absolute z-10 right-0 p-2 mt-2 overflow-auto text-base origin-top-right shadow-lg w-40 rounded-xl bg-white dark:bg-black focus:outline-none sm:text-sm"
              style={theme === "terminal" ? { background: "#040605" } : {}}
            >
              <div className="grid">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "px-4 py-2 rounded-md hover:text-primary transition-colors",
                      pathname === link.href
                        ? "bg-tertiary font-medium"
                        : "font-normal"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>

        <div className="flex items-center justify-center w-8 h-8">
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}
