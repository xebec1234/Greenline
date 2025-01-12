-- CreateTable
CREATE TABLE "Comment_Votes" (
    "vote_id" SERIAL NOT NULL,
    "user_Id" INTEGER NOT NULL,
    "post_Id" TEXT NOT NULL,
    "comment_Id" TEXT NOT NULL,
    "vote_type" TEXT NOT NULL,
    "vote_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_Votes_pkey" PRIMARY KEY ("vote_id")
);

-- AddForeignKey
ALTER TABLE "Comment_Votes" ADD CONSTRAINT "Comment_Votes_comment_Id_fkey" FOREIGN KEY ("comment_Id") REFERENCES "Comments"("comment_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_Votes" ADD CONSTRAINT "Comment_Votes_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment_Votes" ADD CONSTRAINT "Comment_Votes_post_Id_fkey" FOREIGN KEY ("post_Id") REFERENCES "Posts"("post_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
