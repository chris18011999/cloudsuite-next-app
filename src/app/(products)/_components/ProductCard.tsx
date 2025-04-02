import Link from "next/link";
import { env } from "~/env";
import type { Product } from "~/server/api/routers/products";

function formatPrice(price: number) {
  return new Intl.NumberFormat("nl-NL", {
    currency: "EUR",
    style: "currency",
    compactDisplay: "short",
  }).format(price);
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      prefetch={true}
      href={`/p/${product.slug}/${product.id}`}
      className="block overflow-hidden rounded-sm border-slate-300 bg-gray-900 text-white transition-colors hover:border-slate-500"
    >
      <img
        className="mx-auto h-[250px] w-[325px] object-contain"
        src={`${env.NEXT_PUBLIC_IMAGE_ROOT}${product.picture.small as string}`}
        alt={product.name}
      />
      <div className="p-2">
        <span className="text-lg font-semibold">{product.name}</span>
        <div className="flex items-baseline gap-1">
          {formatPrice(product.prices.sale as number)}
        </div>
      </div>
    </Link>
  );
}
