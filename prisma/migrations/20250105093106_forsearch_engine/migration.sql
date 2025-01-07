/*
  Warnings:

  - You are about to drop the `CommentBodyContainers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentCodeContainers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostBodyContainers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostCodeContainers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommentBodyContainers" DROP CONSTRAINT "CommentBodyContainers_comment_Id_fkey";

-- DropForeignKey
ALTER TABLE "CommentCodeContainers" DROP CONSTRAINT "CommentCodeContainers_comment_Id_fkey";

-- DropForeignKey
ALTER TABLE "CommentCodeContainers" DROP CONSTRAINT "CommentCodeContainers_postCodeContainer_Id_fkey";

-- DropForeignKey
ALTER TABLE "PostBodyContainers" DROP CONSTRAINT "PostBodyContainers_post_Id_fkey";

-- DropForeignKey
ALTER TABLE "PostCodeContainers" DROP CONSTRAINT "PostCodeContainers_post_Id_fkey";

-- DropTable
DROP TABLE "CommentBodyContainers";

-- DropTable
DROP TABLE "CommentCodeContainers";

-- DropTable
DROP TABLE "PostBodyContainers";

-- DropTable
DROP TABLE "PostCodeContainers";
