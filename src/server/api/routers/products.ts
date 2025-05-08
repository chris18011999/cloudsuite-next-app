import { z } from "zod";
import { env } from "~/env";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { hydrateLangInApiUrl } from "~/server/helpers";

export interface ProductVariant {
  id: number;
  name: string;
  type: string;
  attributes:
    {
      id: number;
      name: string;
      value: string;
      value_id: 0;
      picture: string;
      css_color: string;
      display_mode: string;
    }[]
  picture: Record<'src' | 'mini' | 'small' | 'normal' | 'large', string>;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  analytics_name: string;
  name_with_attributes: string;
  description: string;
  code: string;
  catalogs: unknown[];
  partition_catalog: Record<string, unknown>;
  brand: Record<string, unknown>;
  picture: Record<string, unknown>;
  default_picture: Record<string, unknown>;
  extra_pictures: unknown[];
  num_variants: number;
  rating: Record<string, unknown>;
  un_classifications: Record<string, unknown>;
  configurator: Record<string, unknown>;
  featured_attributes: [];
  attributes: Record<string, unknown>;
  tags: unknown[];
  trees: unknown[];
  status: Record<string, unknown>;
  prices: Record<string, string | number>;
  stock: Record<string, unknown>;
  ordering: Record<string, unknown>;
  shipping: Record<string, unknown>;
  assets: unknown[];
  page_link: string;
  analytics_tree_path: unknown[];
  variants: ProductVariant[];
}

interface Paginator {
  num_pages: number;
  page: number;
  page_size: number;
  has_prev: boolean;
  has_next: boolean;
  first_page_api_link: string | null;
  prev_page_api_link: string | null;
  next_page_api_link: string | null;
  last_page_api_link: string | null;
  first_page_search_link: string | null;
  prev_page_search_link: string | null;
  next_page_search_link: string | null;
  last_page_search_link: string | null;
}

interface TreeSearchResponse {
  total_found: number;
  search_term: string;
  suggested_search_term: string;
  search_filters: Record<string, unknown>;
  paginator: Paginator;
  products: Product[];
}

export const productsRouter = createTRPCRouter({
  getProductById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const URL = `${hydrateLangInApiUrl(env.NEXT_PUBLIC_API_ROOT)}/product/${input.id}`;

      const req = await fetch(`${URL}`, { cache: "force-cache" });

      const response = (await req.json()) as Product;

      return response;
    }),
  getProductsByTree: publicProcedure
    .input(
      z.object({ tree_id: z.number(), page: z.number().optional().default(1) }),
    )
    .query(async ({ input }) => {
      const URL = `${hydrateLangInApiUrl(env.NEXT_PUBLIC_API_ROOT)}/search/products/`;

      // Map all values to strings because search params should always be strings
      // change below to reduce()
      const a = Object.entries(input).reduce(
        (acc, [k, v]) => {
          acc.push([k, `${v}`]);
          return acc;
        },
        [] as [string, string][],
      );
      const query = new URLSearchParams(a);

      const req = await fetch(`${URL}?${query.toString()}`, {
        cache: "force-cache",
      });

      const response = (await req.json()) as TreeSearchResponse;

      return response;
    }),
});
