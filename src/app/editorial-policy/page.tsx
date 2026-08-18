import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { buildMetadata } from "@/lib/seo";

const PATH = "/editorial-policy";

export const metadata: Metadata = buildMetadata({
  title: "編集方針・掲載基準 | AptiPass English",
  description:
    "AptiPass Englishがサービスをどう調査し、どう掲載を判断し、どう比較・ランキングするかの方針をまとめています。",
  path: PATH,
});

const sections = [
  {
    id: "research-policy",
    title: "情報の調査方針",
    body: [
      "サービスの特徴は、公式サイト・公式料金ページ・公式App Store／Google Playの情報を優先して確認しています。確認できていない情報（料金の具体的な金額、無料体験の詳細な条件など）は断定せず「未確認」として扱い、推測で埋めることはしません。",
      "確認した情報には確認したタイミングを記録しています。時間の経過とともに内容が変わっている可能性があるため、最終判断の前には必ず公式サイトでの確認をお願いします。",
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
      "カテゴリ・目的ページでのサービスの表示順は、Affiliateの有無や提携条件によって変えていません。表示順は登録データの並び順、またはカテゴリ・目的の該当関係のみで決まります。",
    ],
  },
  {
    id: "evidence-levels",
    title: "情報の確からしさ（Evidence Level）",
    body: [
      "各サービスの情報には、確からしさの区分（verified／partial）を記録しています。verifiedは公式情報を直接確認できたもの、partialは公式サイトのURL自体は確認できたものの、詳細な特徴については第三者サイトの情報に一部依拠しているものです。",
      "この区分を「全件verifiedにすること」自体を目標にはしていません。確認できないものを無理に確認済みとして扱うより、確からしさの段階を正直に示すことを優先しています。",
    ],
  },
];

export default function EditorialPolicyPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "編集方針・掲載基準", path: PATH }]} />

      <article className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          編集方針・掲載基準
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          AptiPass Englishがサービスをどう調査し、どう掲載を判断し、どう比較するかをまとめています。
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
