import Link from "next/link";
import { env } from "~/env";
import { hydrateLangInApiUrl } from "~/server/api/helpers";
import type { Product } from "~/server/api/routers/products";

function formatPrice(price: number) {
  return new Intl.NumberFormat('nl-NL', { currency: 'EUR', style: 'currency', compactDisplay: 'short' }).format(price);
}

export function ProductCard({ product }: { product: Product}) {
  return (
    <Link
      href={`/p/${product.slug}/${product.id}`}
      className="overflow-hidden rounded-sm border-1 border-slate-300 bg-white transition-colors hover:border-slate-500"
    >
      <img className="w-[325px] h-[250px] object-contain mx-auto" src={`${env.NEXT_PUBLIC_IMAGE_ROOT}${product.picture.small}`} alt={product.name} />
      <div className="p-2">
        <span className="text-lg font-semibold">
          {product.name}
        </span>
        <div className="flex items-baseline gap-1">
          {product.prices.consumer}
          {formatPrice(product.prices.sale)}
        </div>
      </div>
    </Link>
  );
}
