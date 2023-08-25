import { z } from "zod";
import { clerkClient } from "@clerk/nextjs";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const createOrderProcedure = protectedProcedure.input(
  z.object({
    order: z.string({ required_error: "Your order is required!" }),
    orderMods: z.string().optional(),
  })
);
const completeOrderProcedure = protectedProcedure.input(
  z.object({
    orderId: z.number({ required_error: "Order ID is required!" }),
  })
);

export const ordersRouter = createTRPCRouter({
  createOrder: createOrderProcedure.mutation(async ({ ctx, input }) => {
    const userId = ctx.auth.userId;
    const user = await clerkClient.users.getUser(userId);
    const userFirstName = user.firstName;
    const { order, orderMods } = input;
    return ctx.prisma.order.create({
      data: {
        order,
        orderMods,
        orderedBy: userFirstName || "Unknown",
        orderedByUserId: userId,
      },
    });
  }),
  listAllOrders: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.order.findMany({
      orderBy: {
        created: "asc",
      },
      where: {
        completed: false,
      },
    });
  }),
  completeOrder: completeOrderProcedure.mutation(({ ctx, input }) => {
    const { orderId } = input;
    return ctx.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        completed: true,
      },
    });
  }),
  countOrders: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.order.count();
  }),
});
