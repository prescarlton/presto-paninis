-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "ordered_by" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "order_mods" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
