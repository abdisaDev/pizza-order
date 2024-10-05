/*
  Warnings:

  - A unique constraint covering the columns `[pizza_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pizza_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pizzas" DROP CONSTRAINT "pizzas_order_id_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "pizza_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orders_pizza_id_key" ON "orders"("pizza_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_pizza_id_fkey" FOREIGN KEY ("pizza_id") REFERENCES "pizzas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
