import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import ServiceFilterList from "@/components/ServiceFilterList";
import { categories } from "@/data/categories";
import { services } from "@/data/services";
import { buildItemListJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/services";

export const metadata: Metadata = buildMetadata({
  title: "英語学習サービス一覧 | AptiPass English",
  description:
    "オンライン英会話、AI英会話、発音アプリなど、比較できる英語学習サービスの一覧です。",
  path: PATH,
});

export default function ServicesPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "サービス一覧", path: PATH }]} />
      <JsonLd
        data={buildItemListJsonLd(
          "英語学習サービス一覧",
          services.map((s) => ({ name: s.name, path: `/services/${s.slug}` })),
        )}
      />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          サービス一覧
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
          掲載中の英語学習サービスです。カテゴリやキーワードで絞り込んで探せます。
        </p>

        <div className="mt-8">
          <ServiceFilterList services={services} categories={categories} />
        </div>
      </section>
    </>
  );
}
