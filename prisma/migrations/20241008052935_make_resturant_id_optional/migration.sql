/*
  Warnings:

  - You are about to drop the column `admin_id` on the `resturants` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_resturant_id_fkey";

-- DropIndex
DROP INDEX "resturants_admin_id_key";

-- AlterTable
ALTER TABLE "resturants" DROP COLUMN "admin_id";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_resturant_id_fkey" FOREIGN KEY ("resturant_id") REFERENCES "resturants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
