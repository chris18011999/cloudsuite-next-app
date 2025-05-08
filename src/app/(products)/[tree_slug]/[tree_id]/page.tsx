import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import { ProductCard } from "../../_components/ProductCard";

type SearchParams = {
  page: string;
};

export default async function TreePage({
  searchParams,
  params,
}: {
  searchParams: Promise<SearchParams>;
  params: Promise<{ tree_id: string; tree_slug: string }>;
}) {
  // check if tree can be found by id, if not -> 404

  const test = await params;
  const test2 = await searchParams;

  const { tree_id } = test;
  const { page = "1" } = test2;

  const treeData = await api.trees.getTreeData({ id: parseInt(tree_id) });

  if (!treeData) notFound();

  const [{ products }] = await Promise.all([
    api.products.getProductsByTree({
      tree_id: parseInt(tree_id),
      page: parseInt(page),
    }),
  ]);

  return (
    <div className="flex gap-3">
      <div className="w-1/3">
        <div className="rounded-sm border border-slate-300 p-4">
          {"Here will be the filters"}
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
