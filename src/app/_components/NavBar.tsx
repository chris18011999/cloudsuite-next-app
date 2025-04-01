import Link from "next/link";
import { api } from "~/trpc/server";

export default async function NavBar() {
  const trees = await api.trees.getChildrenFromTree({ id: 1 });

  return (
    <div>
      <ul className="flex items-center gap-2">
        {trees.map((tree) => (
          <li key={tree.id}><Link href={`/${tree.slug}/${tree.id}`}>{tree.name}</Link></li>
        ))}
      </ul>
    </div>
  );
}
