import Link from "next/link";

const footerColumns = [
  {
    title: "サイトについて",
    links: [
      { label: "サービス一覧", href: "/services" },
      { label: "比較", href: "/compare" },
      { label: "英語学習ガイド", href: "/guides" },
    ],
  },
  {
    title: "運営",
    links: [
      { label: "AptiPass Englishについて", href: "/about" },
      { label: "編集方針・掲載基準", href: "/editorial-policy" },
      { label: "お問い合わせ", href: "/contact" },
    ],
  },
  {
    title: "ポリシー",
    links: [
      { label: "広告・Affiliateについて", href: "/advertising-policy" },
      { label: "プライバシーポリシー", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-lg font-extrabold text-transparent">
              AptiPass English
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              英語学習サービスを、短時間で探す・比較する・選ぶための情報サイトです。
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold text-white">
                {column.title}
              </p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 border-t border-slate-800 pt-6 text-xs text-slate-500">
          &copy; {new Date().getFullYear()} AptiPass English
        </p>
      </div>
    </footer>
  );
}
