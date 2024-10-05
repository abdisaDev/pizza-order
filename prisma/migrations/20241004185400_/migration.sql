/*
  Warnings:

  - You are about to drop the column `quantity` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `pizzas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pizzas" DROP CONSTRAINT "pizzas_order_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "pizzas" DROP COLUMN "order_id";

-- CreateTable
CREATE TABLE "OrderOnPizza" (
    "order_id" TEXT NOT NULL,
    "pizza_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderOnPizza_pkey" PRIMARY KEY ("order_id","pizza_id")
);

-- AddForeignKey
ALTER TABLE "OrderOnPizza" ADD CONSTRAINT "OrderOnPizza_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderOnPizza" ADD CONSTRAINT "OrderOnPizza_pizza_id_fkey" FOREIGN KEY ("pizza_id") REFERENCES "pizzas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
