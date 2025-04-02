import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import { ProductCard } from "../../_components/ProductCard";

export default async function TreePage({
  params,
}: {
  params: Promise<{ tree_id: string; tree_slug: string }>;
}) {
  // check if tree can be found by id, if not -> 404

  const { tree_id } = await params;
  const treeData = await api.trees.getTreeData({ id: parseInt(tree_id) });

  if (!treeData) notFound();

  const [{ products }] = await Promise.all([
    api.products.getProductsByTree({
      tree_id: parseInt(tree_id),
    }),
  ]);

  return (
    <div className="flex gap-3">
      <div className="w-1/3"></div>
      <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
