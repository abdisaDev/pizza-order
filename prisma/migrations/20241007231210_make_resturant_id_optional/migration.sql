-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_resturant_id_fkey";

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "resturant_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_resturant_id_fkey" FOREIGN KEY ("resturant_id") REFERENCES "resturants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
