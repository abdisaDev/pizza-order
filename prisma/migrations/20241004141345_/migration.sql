/*
  Warnings:

  - You are about to drop the column `pizza_id` on the `orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_pizza_id_fkey";

-- DropIndex
DROP INDEX "orders_pizza_id_key";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "pizza_id";

-- AddForeignKey
ALTER TABLE "pizzas" ADD CONSTRAINT "pizzas_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
