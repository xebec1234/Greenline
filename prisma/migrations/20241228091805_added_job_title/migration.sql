/*
  Warnings:

  - The `is_read` column on the `Notification` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "is_read",
ADD COLUMN     "is_read" BOOLEAN NOT NULL DEFAULT false;
