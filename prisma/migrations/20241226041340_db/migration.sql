/*
  Warnings:

  - The primary key for the `Comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Post_Tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Posts` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_post_Id_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_comment_Id_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_post_Id_fkey";

-- DropForeignKey
ALTER TABLE "Post_Tags" DROP CONSTRAINT "Post_Tags_post_Id_fkey";

-- DropForeignKey
ALTER TABLE "Votes" DROP CONSTRAINT "Votes_post_Id_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_pkey",
ALTER COLUMN "comment_Id" DROP DEFAULT,
ALTER COLUMN "comment_Id" SET DATA TYPE TEXT,
ALTER COLUMN "post_Id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Comments_pkey" PRIMARY KEY ("comment_Id");
DROP SEQUENCE "Comments_comment_Id_seq";

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "post_Id" SET DATA TYPE TEXT,
ALTER COLUMN "comment_Id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Post_Tags" DROP CONSTRAINT "Post_Tags_pkey",
ALTER COLUMN "post_Id" DROP DEFAULT,
ALTER COLUMN "post_Id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Post_Tags_pkey" PRIMARY KEY ("post_Id");
DROP SEQUENCE "Post_Tags_post_Id_seq";

-- AlterTable
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_pkey",
ALTER COLUMN "post_Id" DROP DEFAULT,
ALTER COLUMN "post_Id" SET DATA TYPE TEXT,
ALTER COLUMN "parent_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Posts_pkey" PRIMARY KEY ("post_Id");
DROP SEQUENCE "Posts_post_Id_seq";

-- AlterTable
ALTER TABLE "Votes" ALTER COLUMN "post_Id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_post_Id_fkey" FOREIGN KEY ("post_Id") REFERENCES "Posts"("post_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Tags" ADD CONSTRAINT "Post_Tags_post_Id_fkey" FOREIGN KEY ("post_Id") REFERENCES "Posts"("post_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_post_Id_fkey" FOREIGN KEY ("post_Id") REFERENCES "Posts"("post_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_comment_Id_fkey" FOREIGN KEY ("comment_Id") REFERENCES "Comments"("comment_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_post_Id_fkey" FOREIGN KEY ("post_Id") REFERENCES "Posts"("post_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
