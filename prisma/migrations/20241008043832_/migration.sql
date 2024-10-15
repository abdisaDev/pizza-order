-- DropForeignKey
ALTER TABLE "resturants" DROP CONSTRAINT "resturants_admin_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "resturant_id" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_resturant_id_fkey" FOREIGN KEY ("resturant_id") REFERENCES "resturants"("admin_id") ON DELETE SET NULL ON UPDATE CASCADE;
