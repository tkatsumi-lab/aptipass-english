import Link from "next/link";
import JsonLd from "./JsonLd";
import { buildBreadcrumbJsonLd, type BreadcrumbItem } from "@/lib/seo";

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const fullItems: BreadcrumbItem[] = [
    { name: "AptiPass English", path: "/" },
    ...items,
  ];

  return (
    <nav aria-label="パンくずリスト" className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
      <JsonLd data={buildBreadcrumbJsonLd(fullItems)} />
      <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-500 sm:text-sm">
        {fullItems.map((item, index) => {
          const isLast = index === fullItems.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {index > 0 && (
                <span aria-hidden="true" className="text-slate-300">
                  /
                </span>
              )}
              {isLast ? (
                <span className="font-medium text-slate-700" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} prefetch={false} className="hover:text-blue-600">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
