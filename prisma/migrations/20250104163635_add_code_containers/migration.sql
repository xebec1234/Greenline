/*
  Warnings:

  - You are about to drop the column `code` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "code";

-- CreateTable
CREATE TABLE "PostCodeContainers" (
    "id" SERIAL NOT NULL,
    "post_Id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "PostCodeContainers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentCodeContainers" (
    "id" SERIAL NOT NULL,
    "comment_Id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "postCodeContainer_Id" INTEGER,

    CONSTRAINT "CommentCodeContainers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostCodeContainers" ADD CONSTRAINT "PostCodeContainers_post_Id_fkey" FOREIGN KEY ("post_Id") REFERENCES "Posts"("post_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentCodeContainers" ADD CONSTRAINT "CommentCodeContainers_comment_Id_fkey" FOREIGN KEY ("comment_Id") REFERENCES "Comments"("comment_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentCodeContainers" ADD CONSTRAINT "CommentCodeContainers_postCodeContainer_Id_fkey" FOREIGN KEY ("postCodeContainer_Id") REFERENCES "PostCodeContainers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
