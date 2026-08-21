import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { buildMetadata } from "@/lib/seo";

const PATH = "/about";

export const metadata: Metadata = buildMetadata({
  title: "AptiPass Englishについて | AptiPass English",
  description:
    "AptiPass Englishは、英語学習サービスを短時間で発見・比較できる情報サイトです。サイトの目的と運営方針の概要をまとめています。",
  path: PATH,
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "AptiPass Englishについて", path: PATH }]} />

      <article className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          AptiPass Englishについて
        </h1>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
          <p>
            AptiPass Englishは、英語学習サービスを短時間で発見・比較できることを目的とした情報サイトです。長文のレビュー記事を大量に読ませるのではなく、カテゴリ・目的・比較から候補を絞り込めることを重視しています。
          </p>
          <p>
            本サイトは、意思決定支援サービス「AptiPass」の姉妹プロジェクトとして運営しています。英語学習サービスの発見・比較に特化した領域を担い、より深い意思決定が必要な場合はAptiPass Decision Engineへご案内します。
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            href="/editorial-policy"
            prefetch={false}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-sm font-semibold text-slate-900">編集方針・掲載基準</p>
            <p className="mt-1 text-xs text-slate-500">
              サービスの調査方法、掲載基準、比較・ランキングの考え方
            </p>
          </Link>
          <Link
            href="/advertising-policy"
            prefetch={false}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-sm font-semibold text-slate-900">広告・Affiliateについて</p>
            <p className="mt-1 text-xs text-slate-500">
              広告掲載の方針と、Affiliateリンクに関する開示
            </p>
          </Link>
          <Link
            href="/privacy"
            prefetch={false}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-sm font-semibold text-slate-900">プライバシーポリシー</p>
            <p className="mt-1 text-xs text-slate-500">
              取得する情報とその利用目的
            </p>
          </Link>
          <Link
            href="/contact"
            prefetch={false}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-sm font-semibold text-slate-900">お問い合わせ</p>
            <p className="mt-1 text-xs text-slate-500">
              ご連絡方法について
            </p>
          </Link>
        </div>
      </article>
    </>
  );
}
