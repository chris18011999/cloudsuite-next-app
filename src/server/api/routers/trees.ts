import { z } from "zod";
import { env } from "~/env";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { hydrateLangInApiUrl } from "~/server/api/helpers";

interface Tree {
  id: number;
  name: string;
  slug: string;
  children: Tree[];
}

export const treesRouter = createTRPCRouter({
  getChildrenFromTree: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      if (!input.id) throw new Error("Tree ID is required");

      const URL = `${hydrateLangInApiUrl(env.NEXT_PUBLIC_API_ROOT)}/tree/${input.id}`;

      const res = await fetch(URL, { cache: "force-cache" });
      const tree = await res.json();

      return tree.children as Tree[];
    }),
  getTreeData: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      if (!input.id) throw new Error("Tree ID is required");

      const URL = `${hydrateLangInApiUrl(env.NEXT_PUBLIC_API_ROOT)}/tree/${input.id}`;

      const res = await fetch(URL, { cache: "force-cache" });
      const tree = await res.json();

      if (tree.message) {
        return null;
      }

      return tree as Tree;
    }),
});
