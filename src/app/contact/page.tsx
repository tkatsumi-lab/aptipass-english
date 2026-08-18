import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { buildMetadata } from "@/lib/seo";

const PATH = "/contact";

export const metadata: Metadata = buildMetadata({
  title: "お問い合わせ | AptiPass English",
  description: "AptiPass Englishへのお問い合わせ方法について。",
  path: PATH,
  index: false,
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "お問い合わせ", path: PATH }]} />

      <article className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          お問い合わせ
        </h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
          <p>
            現在、お問い合わせフォームおよび受付窓口を準備中です。掲載内容の誤りのご指摘や訂正のご依頼など、ご連絡いただく手段については近日中にこのページでご案内します。
          </p>
          <p>
            サービスの掲載基準や比較方針については
            <a href="/editorial-policy" className="text-blue-600 hover:text-blue-700">
              編集方針・掲載基準
            </a>
            を、広告に関するお問い合わせは
            <a href="/advertising-policy" className="text-blue-600 hover:text-blue-700">
              広告・Affiliateについて
            </a>
            もあわせてご確認ください。
          </p>
        </div>
      </article>
    </>
  );
}
