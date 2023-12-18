"use client";
import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import NavLink from "./ui/NavLink";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";

import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import { useLang } from "./LanguageProvider";
import { navigationTranslations } from "@/translations/navigationTranslations";

export default function Navigation() {
  const pathname = `/${usePathname().split("/")[1]}`; // active paths on dynamic subpages
  const { theme } = useTheme();
  const { lang } = useLang();
  const text = navigationTranslations[lang];

  const links = [
    { label: text.about, href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: text.project, href: "/projects" },
  ];

  return (
    <header className={clsx("relative md:sticky top-0 z-20 bg-primary")}>
      <nav className="px-4 md:px-6 py-3 lg max-w-[700px] mx-auto flex justify-between items-center gap-3">
        <Link href="/" className="shrink-0 text-primary">
          <svg
            viewBox="0 0 375 375"
            width="36"
            height="36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="currentColor" />
            <g transform="matrix(1,0,0,1,0,0)">
              <g
                fill="currentColor"
                transform="translate(0,375) scale(0.1,-0.1)"
              >
                <path d="M 1036.8 2976.1 C 820.6 2937.3 669.2 2859.6 520.4 2712.1 C 295.2 2485.6 195.5 2182.7 213.6 1773.7 C 243.4 1131.8 605.8 740.9 1201.2 709.8 C 1328 703.4 1519.5 718.9 1576.5 740.9 C 1590.7 746.1 1594.6 795.3 1594.6 998.5 L 1594.6 1249.6 L 1529.9 1205.5 C 1439.3 1143.4 1383.6 1126.6 1264.6 1127.9 C 1179.2 1127.9 1148.1 1134.4 1088.6 1162.8 C 960.4 1225 860.8 1362.2 810.3 1548.5 C 776.6 1667.6 776.6 2023.5 809 2142.6 C 863.4 2343.2 966.9 2488.2 1093.7 2545.1 C 1146.8 2568.4 1185.6 2574.9 1271 2576.2 C 1370.7 2576.2 1390.1 2572.3 1467.8 2533.5 C 1570 2484.3 1628.3 2418.3 1683.9 2296.6 C 1757.7 2133.5 1762.9 2076.6 1762.9 1386.7 C 1762.9 860 1765.5 759 1781 753.9 C 1791.3 750 1944.1 746.1 2121.4 744.8 C 2477.3 743.5 2657.2 765.5 2839.7 830.2 C 3172.3 949.3 3426 1261.2 3490.7 1632.7 C 3568.4 2079.2 3410.5 2516.6 3090.8 2743.1 C 2874.6 2897.2 2696 2942.5 2283.2 2947.6 C 2147.3 2950.2 2034.7 2951.5 2034.7 2951.5 C 2034.7 2951.5 2089 2895.9 2155 2828.6 C 2219.7 2760 2294.8 2669.4 2319.4 2625.4 L 2364.7 2546.4 L 2448.8 2533.5 C 2560.1 2514.1 2676.6 2454.5 2758.2 2374.3 C 2877.2 2256.5 2927.7 2125.8 2936.8 1901.9 C 2948.4 1643 2888.9 1452.8 2754.3 1322 C 2655.9 1226.3 2489 1159 2349.2 1159 L 2319.4 1159 L 2319.4 1641.7 C 2319.4 2024.8 2315.5 2140 2300 2207.3 C 2227.5 2516.6 2042.4 2761.3 1786.2 2885.5 C 1573.9 2987.8 1289.2 3022.7 1036.8 2976.1 Z"></path>
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
          < LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}
