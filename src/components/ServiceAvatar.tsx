import { getCategory, type CategoryId } from "@/data/categories";

type ServiceAvatarProps = {
  categoryId: CategoryId;
  initials: string;
  size?: "sm" | "md";
};

export default function ServiceAvatar({
  categoryId,
  initials,
  size = "md",
}: ServiceAvatarProps) {
  const category = getCategory(categoryId);
  const sizeClasses = size === "sm" ? "h-9 w-9 text-xs" : "h-12 w-12 text-sm";

  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-bold text-white ${category.gradient} ${sizeClasses}`}
    >
      {initials}
    </span>
  );
}
