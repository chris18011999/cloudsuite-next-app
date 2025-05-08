import { z } from "zod";
import { env } from "~/env";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { hydrateLangInApiUrl } from "~/server/helpers";

interface Tree {
  id: number;
  name: string;
  slug: string;
  children?: Tree[];
}

export const treesRouter = createTRPCRouter({
  getChildrenFromTree: publicProcedure
    .input(
      z.object({
        id: z.number(),
        depth: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      if (!input.id) throw new Error("Tree ID is required");

      let URL = `${hydrateLangInApiUrl(env.NEXT_PUBLIC_API_ROOT)}/tree/?tree_id=${input.id}`;
      if (input.depth !== null && input.depth !== undefined) {
        URL += `&depth=${input.depth}`;
      }

      console.log(`[TRPC] Fetching tree data from ${URL}`);

      const res = await fetch(URL, { cache: "force-cache" });
      const trees = await res.json() as Tree[];

      return trees;
    }),
  getTreeData: publicProcedure
    .input(
      z.object({
        id: z.number(),
        page: z.number().optional().default(1),
      }),
    )
    .query(async ({ input }) => {
      if (!input.id) throw new Error("Tree ID is required");

      const URL = `${hydrateLangInApiUrl(env.NEXT_PUBLIC_API_ROOT)}/tree/${input.id}?page=${input.page}`;

      const res = await fetch(URL, { cache: "force-cache" });
      const tree = await res.json() as Tree & { message?: string};

      if (tree.message) {
        return null;
      }

      return tree;
    }),
});
