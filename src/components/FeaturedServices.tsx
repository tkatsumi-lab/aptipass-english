import Link from "next/link";
import { services } from "@/data/services";
import ServiceCard from "./ServiceCard";

export default function FeaturedServices() {
  return (
    <section id="featured" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          注目の英語学習サービス
        </h2>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          代表的なサービスをピックアップ。詳細は各サービスでご確認ください。
        </p>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </ul>

      <div className="mt-8 text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          サービス一覧をすべて見る
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
