/*
  Warnings:

  - Added the required column `resturant_id` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "resturant_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_resturant_id_fkey" FOREIGN KEY ("resturant_id") REFERENCES "resturants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
