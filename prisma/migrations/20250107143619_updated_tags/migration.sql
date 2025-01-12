/*
  Warnings:

  - The primary key for the `Post_Tags` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Post_Tags" DROP CONSTRAINT "Post_Tags_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Post_Tags_pkey" PRIMARY KEY ("id");
