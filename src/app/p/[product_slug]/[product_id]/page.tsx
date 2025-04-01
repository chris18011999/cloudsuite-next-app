import { notFound } from "next/navigation";
import { api } from "~/trpc/server";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ product_id: string; product_slug: string }>;
}) {

  const { product_id } = await params;
  const productData = await api.products.getProductById({ id: parseInt(product_id) });

  if (!productData) notFound();

  return <div>{productData.name}</div>
}
