import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { buildMetadata } from "@/lib/seo";

const PATH = "/about";

export const metadata: Metadata = buildMetadata({
  title: "運営情報・掲載基準について | AptiPass English",
  description:
    "AptiPass Englishの運営方針、サービスの調査・掲載基準、比較方針、Affiliate（広告）に関する方針をまとめています。",
  path: PATH,
});

const sections = [
  {
    id: "about-site",
    title: "AptiPass Englishについて",
    body: [
      "AptiPass Englishは、英語学習サービスを短時間で発見・比較できることを目的とした情報サイトです。長文のレビュー記事を大量に読ませるのではなく、カテゴリ・目的・比較から候補を絞り込めることを重視しています。",
      "本サイトは、AptiPass（意思決定支援サービス）の姉妹プロジェクトとして運営しています。",
    ],
  },
  {
    id: "research-policy",
    title: "情報の調査方針",
    body: [
      "サービスの特徴は、公式サイト・公式料金ページ・公式App Store／Google Playの情報を優先して確認しています。確認できていない情報（料金の具体的な金額、無料体験の詳細な条件など）は、断定せず「未確認」として扱い、推測で埋めることはしません。",
      "確認した情報には、確認したタイミングを記録しています。時間の経過とともに内容が変わっている可能性があるため、最終判断の前には必ず公式サイトでの確認をお願いします。",
    ],
  },
  {
    id: "inclusion-policy",
    title: "掲載基準",
    body: [
      "サービスを掲載するかどうかは、「英語学習サービスを比較検討するユーザーにとって、比較対象として意味があるか」だけで判断しています。Affiliate（広告）提携の有無や、提携している場合の報酬額は、掲載するかどうかの判断に一切使用していません。",
      "公式情報が確認できないサービス、サービス提供が終了しているサービス、英語学習との関連が極端に薄いサービス、他の掲載サービスと実質的に同一のサービスは、掲載を見送っています。",
    ],
  },
  {
    id: "comparison-policy",
    title: "比較・ランキング方針",
    body: [
      "本サイトは「万人におすすめの1位」のような根拠のない総合ランキングを作成していません。比較ページでは、どちらが優れているかを決めるのではなく、それぞれのサービスが「向く条件」を条件ベースで示しています。",
      "カテゴリ・目的ページでのサービスの表示順は、Affiliateの有無や提携条件によって変えていません。",
    ],
  },
  {
    id: "affiliate-policy",
    title: "広告・Affiliateに関する方針",
    body: [
      "本サイトは将来的に、一部のサービス紹介にAffiliate（成果報酬型広告）リンクを使用する可能性があります。Affiliateリンクを使用する場合は、そのリンクであることが分かるようにします。",
      "重要な方針として明記します：Affiliate提携の有無・報酬額は、サービスを掲載するかどうか、比較・表示順をどうするかの判断に一切影響しません。Affiliate提携がないサービスも、比較上有力な候補として通常どおり掲載・表示されます。",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "運営情報・掲載基準", path: PATH }]} />

      <article className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          運営情報・掲載基準について
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          AptiPass Englishの運営方針と、サービスの調査・掲載・比較に関する考え方をまとめています。
        </p>

        <nav aria-label="このページの目次" className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-500">目次</p>
          <ul className="mt-2 space-y-1 text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-blue-600 hover:text-blue-700">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

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
