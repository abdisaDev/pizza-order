/*
  Warnings:

  - Added the required column `total_orders` to the `resturants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "resturants" ADD COLUMN     "total_orders" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "type" TEXT NOT NULL;
