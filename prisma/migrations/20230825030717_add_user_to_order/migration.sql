/*
  Warnings:

  - Added the required column `ordered_by_user_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "ordered_by_user_id" TEXT NOT NULL;
