-- AlterTable
ALTER TABLE "users" ADD COLUMN     "resturant_id" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_resturant_id_fkey" FOREIGN KEY ("resturant_id") REFERENCES "resturants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
