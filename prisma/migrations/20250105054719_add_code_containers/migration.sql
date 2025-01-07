-- CreateTable
CREATE TABLE "PostBodyContainers" (
    "id" SERIAL NOT NULL,
    "post_Id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "PostBodyContainers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentBodyContainers" (
    "id" SERIAL NOT NULL,
    "comment_Id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "CommentBodyContainers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostBodyContainers" ADD CONSTRAINT "PostBodyContainers_post_Id_fkey" FOREIGN KEY ("post_Id") REFERENCES "Posts"("post_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentBodyContainers" ADD CONSTRAINT "CommentBodyContainers_comment_Id_fkey" FOREIGN KEY ("comment_Id") REFERENCES "Comments"("comment_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
