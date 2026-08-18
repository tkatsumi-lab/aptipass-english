import Link from "next/link";
import type { Category } from "@/data/categories";

type CategoryBadgeProps = {
  category: Category;
  /** When true, renders a link to the category hub instead of static text */
  linked?: boolean;
};

export default function CategoryBadge({
  category,
  linked = false,
}: CategoryBadgeProps) {
  const className = `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${category.chipBg} ${category.chipText} ${category.chipRing}`;

  if (linked) {
    return (
      <Link href={`/categories/${category.slug}`} className={`${className} hover:brightness-95`}>
        {category.name}
      </Link>
    );
  }

  return <span className={className}>{category.name}</span>;
}
