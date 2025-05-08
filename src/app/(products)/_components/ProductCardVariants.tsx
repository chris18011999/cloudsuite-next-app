import type { ProductVariant } from "~/server/api/routers/products";

export const ProductVariants = ({
  variants,
}: {
  variants: ProductVariant[];
}) => {
  return (
    <div className="mt-2 flex flex-wrap gap-1">
      {variants.map((variant) => (
        <span
          key={variant.id}
          className="rounded-sm bg-slate-200 px-2 py-1 text-sm font-semibold text-slate-700"
        >
          {variant.name}
        </span>
      ))}
    </div>
  );
};
