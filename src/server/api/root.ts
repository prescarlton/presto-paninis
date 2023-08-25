import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { ordersRouter } from "./routers/orders";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  orders: ordersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
