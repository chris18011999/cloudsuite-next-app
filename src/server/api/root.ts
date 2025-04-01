import { treesRouter } from "~/server/api/routers/trees";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { productsRouter } from "~/server/api/routers/products";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  trees: treesRouter,
  products: productsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
