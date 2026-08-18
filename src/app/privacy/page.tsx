import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { buildMetadata } from "@/lib/seo";

const PATH = "/privacy";

export const metadata: Metadata = buildMetadata({
  title: "プライバシーポリシー | AptiPass English",
  description: "AptiPass Englishが取得する情報の種類と、その利用目的について説明します。",
  path: PATH,
});

const sections = [
  {
    id: "no-account",
    title: "アカウント登録・個人情報の入力",
    body: [
      "本サイトは現在、アカウント登録やログイン機能を持たず、氏名・メールアドレス・電話番号などの個人情報を入力するフォームもありません。閲覧にあたって個人情報の登録は必要ありません。",
    ],
  },
  {
    id: "analytics",
    title: "アクセス解析について",
    body: [
      "本サイトは、将来的にアクセス解析ツール（Google Analytics等）を導入する場合があります。導入する場合は、閲覧ページ・滞在時間・流入経路などの匿名化された利用状況データを収集し、サイト改善の目的にのみ利用します。",
      "本ページ公開時点では、アクセス解析用のIDは設定されておらず、解析ツールは動作していません。導入した場合は、このページを更新してお知らせします。",
    ],
  },
  {
    id: "affiliate-tracking",
    title: "Affiliateリンクのクリック計測",
    body: [
      "サービス紹介ページの一部リンクは、Affiliate（成果報酬型広告）プログラム経由のリンクです。これらのリンクをクリックすると、広告主またはASP（アフィリエイトサービスプロバイダ、例: A8.net）が提供するトラッキング技術（クッキーや計測用ピクセル等）により、クリックの発生や申し込みの成立を計測する場合があります。この計測は各ASP・広告主のプライバシーポリシーに基づいて行われ、本サイトが直接個人を特定する情報を取得するものではありません。詳しくは",
      "広告・Affiliateについて（/advertising-policy）もあわせてご覧ください。",
    ],
  },
  {
    id: "cookies",
    title: "Cookieについて",
    body: [
      "本サイト自体は現時点でユーザーを識別するための独自Cookieを発行していません。上記のAffiliateリンク経由のCookie、および将来導入する可能性のあるアクセス解析ツールのCookieについては、それぞれのサービス提供元のポリシーに従います。",
    ],
  },
  {
    id: "contact",
    title: "本ポリシーに関するお問い合わせ",
    body: [
      "本ポリシーについてご不明な点がある場合は、お問い合わせページをご確認ください。",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "プライバシーポリシー", path: PATH }]} />

      <article className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          プライバシーポリシー
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          取得する情報の種類と、その利用目的について説明します。
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
