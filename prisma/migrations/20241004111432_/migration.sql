/*
  Warnings:

  - You are about to drop the column `total_amount` on the `orders` table. All the data in the column will be lost.
  - The `type` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[pizza_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_id]` on the table `pizzas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pizza_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resturant_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `pizzas` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `total_orders` on the `resturants` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('CUSTOMER', 'RESTURANT');

-- DropIndex
DROP INDEX "orders_user_id_key";

-- DropIndex
DROP INDEX "pizzas_resturant_id_key";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "total_amount",
ADD COLUMN     "pizza_id" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "resturant_id" TEXT NOT NULL,
ADD COLUMN     "toppings" TEXT[],
ADD COLUMN     "total_price" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pizzas" ADD COLUMN     "order_id" TEXT,
ADD COLUMN     "price" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "resturants" DROP COLUMN "total_orders",
ADD COLUMN     "total_orders" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "type",
ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'CUSTOMER';

-- CreateIndex
CREATE UNIQUE INDEX "orders_pizza_id_key" ON "orders"("pizza_id");

-- CreateIndex
CREATE UNIQUE INDEX "pizzas_order_id_key" ON "pizzas"("order_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_resturant_id_fkey" FOREIGN KEY ("resturant_id") REFERENCES "resturants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_pizza_id_fkey" FOREIGN KEY ("pizza_id") REFERENCES "pizzas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
