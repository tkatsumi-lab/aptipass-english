import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import DecisionCTA from "@/components/DecisionCTA";
import ServiceAvatar from "@/components/ServiceAvatar";
import { getCategory } from "@/data/categories";
import { comparePairs, getComparePairBySlug } from "@/data/comparePairs";
import { getServicesByIds } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return comparePairs.map((pair) => ({ slug: pair.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pair = getComparePairBySlug(slug);
  if (!pair) return {};

  const [a, b] = getServicesByIds(pair.serviceIds);
  const title = `${a?.name ?? ""} vs ${b?.name ?? ""} の違いを比較 | AptiPass English`;

  return buildMetadata({
    title,
    description: pair.summary,
    path: `/compare/${pair.slug}`,
  });
}

export default async function ComparePairPage({ params }: Props) {
  const { slug } = await params;
  const pair = getComparePairBySlug(slug);
  if (!pair) notFound();

  const [a, b] = getServicesByIds(pair.serviceIds);
  if (!a || !b) notFound();

  const categoryA = getCategory(a.categories[0]);
  const categoryB = getCategory(b.categories[0]);

  const breadcrumbItems = [{ name: `${a.name} vs ${b.name}`, path: `/compare/${pair.slug}` }];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          {a.name} <span className="text-slate-400">vs</span> {b.name}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-600 sm:text-base">
          {pair.summary}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {[a, b].map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <ServiceAvatar categoryId={service.categories[0]} initials={service.initials} />
              <p className="text-sm font-semibold text-slate-900">{service.name}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl shadow-sm ring-1 ring-slate-200">
          <table className="w-full min-w-[420px] border-collapse bg-white text-left text-sm">
            <thead>
              <tr>
                <th scope="col" className="w-32 bg-white p-4 text-xs font-medium text-slate-400">
                  比較ポイント
                </th>
                <th scope="col" className={`bg-gradient-to-br p-4 font-semibold text-white ${categoryA.gradient}`}>
                  {a.name}
                </th>
                <th scope="col" className={`bg-gradient-to-br p-4 font-semibold text-white ${categoryB.gradient}`}>
                  {b.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {pair.axes.map((axis, index) => (
                <tr key={axis.label} className={index % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                  <th scope="row" className="p-4 text-xs font-semibold text-slate-500">
                    {axis.label}
                  </th>
                  <td className="p-4 text-slate-700">{axis.a}</td>
                  <td className="p-4 text-slate-700">{axis.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className={`rounded-2xl bg-gradient-to-br p-5 text-white ${categoryA.gradient}`}>
            <h2 className="text-sm font-semibold">{a.name}が向く条件</h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              {pair.aFitsIf.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={`rounded-2xl bg-gradient-to-br p-5 text-white ${categoryB.gradient}`}>
            <h2 className="text-sm font-semibold">{b.name}が向く条件</h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              {pair.bFitsIf.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <DecisionCTA />
    </>
  );
}
