import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { buildMetadata } from "@/lib/seo";

const PATH = "/advertising-policy";

export const metadata: Metadata = buildMetadata({
  title: "広告・Affiliateについて | AptiPass English",
  description:
    "AptiPass Englishにおける広告・Affiliateリンクの扱いと、掲載・比較判断との分離方針を説明します。",
  path: PATH,
});

const sections = [
  {
    id: "affiliate-overview",
    title: "Affiliateリンクについて",
    body: [
      "本サイトは、一部のサービス紹介にAffiliate（成果報酬型広告）リンクを使用することがあります。Affiliateリンク経由でユーザーが該当サービスに申し込んだ場合、運営者が広告主またはASP（アフィリエイトサービスプロバイダ）から成果報酬を受け取る可能性があります。",
      "Affiliateリンクを使用しているサービスページには、そのリンクの近くに広告である旨を明記します。隠したり、分かりにくくしたりすることはありません。",
    ],
  },
  {
    id: "separation-principle",
    title: "掲載・比較判断との分離",
    body: [
      "最も重要な方針として明記します：Affiliate提携の有無・報酬額は、サービスを掲載するかどうか、比較・表示順をどうするかの判断に一切影響しません。Affiliate提携がないサービスも、比較上有力な候補として通常どおり掲載・表示されます。",
      "Affiliateリンクがある場合でも、そのサービスの「向いている人」「向いていない可能性がある人」といった評価内容を、提携の有無に合わせて変更することはありません。",
    ],
  },
  {
    id: "program-scope",
    title: "提携プログラムの範囲について",
    body: [
      "Affiliate提携は、サービス単位ではなく個別のプログラム単位で管理しています。同じ運営会社が複数のサービス（例: 成人向けサービスと子ども向けサービス）を提供している場合でも、提携しているプログラムが片方のサービスのみを対象としていれば、そのAffiliateリンクはそのサービスの紹介にのみ使用し、関連する別のサービスへ無条件に転用することはありません。",
    ],
  },
  {
    id: "link-mechanics",
    title: "リンクの技術的な扱い",
    body: [
      "Affiliateリンクには、検索エンジン向けに rel=\"sponsored\" を設定し、広告リンクであることを技術的にも示しています。公式サイトへの通常のリンク（Affiliate契約のないサービス）とは、コード上も明確に区別しています。",
    ],
  },
];

export default function AdvertisingPolicyPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "広告・Affiliateについて", path: PATH }]} />

      <article className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          広告・Affiliateについて
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          広告掲載の方針と、Affiliateリンクに関する開示です。
        </p>

        <div className="mt-8 space-y-10">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-20">
              <h2 className="text-lg font-bold text-slate-900">{section.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                {section.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
