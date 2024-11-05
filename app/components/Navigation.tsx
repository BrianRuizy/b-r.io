"use client";
import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { Bars3Icon } from "@heroicons/react/20/solid";

import NavLink from "@/app/components/NavLink";
import ThemeSwitcher from "@/app/components/ThemeSwitcher";

const links = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Gear", href: "/gear" },
];

export default function Navigation() {
  const pathname = `/${usePathname().split("/")[1]}`; // active paths on dynamic sub-pages

  return (
    <header className="md:mt-6">
      <nav className="mx-auto flex max-w-[700px] items-center justify-between gap-3 px-4 py-3 md:px-6">
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
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href}>{link.label}</NavLink>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex h-8 w-8 items-center justify-center md:ml-0">
          <ThemeSwitcher />
        </div>

        <DropdownMenu.Root modal={false}>
          <DropdownMenu.Trigger className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary md:hidden">
            <Bars3Icon className="h-5 w-5 cursor-pointer text-secondary transition-colors hover:text-primary data-[state=open]:text-primary" />
          </DropdownMenu.Trigger>

          <AnimatePresence>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                asChild
                side="bottom"
                align="end"
                sideOffset={5}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.3 }}
                  className="z-10 w-40 overflow-hidden rounded-xl bg-contrast p-2 text-base shadow-md focus:outline-none dark:bg-black sm:text-sm"
                >
                  {links.map((link) => (
                    <DropdownMenu.Item
                      key={link.href}
                      asChild
                      className="outline-none"
                    >
                      <Link
                        href={link.href}
                        className={clsx(
                          "block rounded-md px-4 py-2 transition-colors hover:text-primary",
                          "focus:outline-none data-[highlighted]:bg-secondary",
                          pathname === link.href ? "bg-secondary" : "",
                        )}
                      >
                        {link.label}
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                </motion.div>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </AnimatePresence>
        </DropdownMenu.Root>
      </nav>
    </header>
  );
}
