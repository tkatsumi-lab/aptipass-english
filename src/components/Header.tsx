"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "サービスを探す", href: "/services" },
  { label: "目的から探す", href: "/#purpose" },
  { label: "比較する", href: "/compare" },
  { label: "英語学習ガイド", href: "/guides" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          prefetch={false}
          className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-extrabold tracking-tight text-transparent"
        >
          AptiPass English
        </Link>

        <nav
          aria-label="メインナビゲーション"
          className="hidden items-center gap-8 md:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#purpose"
          prefetch={false}
          className="hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105 md:inline-block"
        >
          自分に合うサービスを探す
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="sr-only">メニュー</span>
          {isMenuOpen ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="モバイルナビゲーション"
          className="border-t border-slate-100 bg-white px-4 pb-4 md:hidden"
        >
          <ul className="flex flex-col gap-1 pt-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/#purpose"
                prefetch={false}
                className="block rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-center text-base font-semibold text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                自分に合うサービスを探す
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
