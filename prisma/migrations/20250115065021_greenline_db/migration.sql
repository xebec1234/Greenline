-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "reply_id" INTEGER;

-- CreateTable
CREATE TABLE "Reply" (
    "reply_id" SERIAL NOT NULL,
    "comment_id" TEXT NOT NULL,
    "user_id" INTEGER,
    "anon_user_id" INTEGER,
    "content" TEXT NOT NULL,
    "reply_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("reply_id")
);

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comments"("comment_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_anon_user_id_fkey" FOREIGN KEY ("anon_user_id") REFERENCES "AnonymousUsers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_reply_id_fkey" FOREIGN KEY ("reply_id") REFERENCES "Reply"("reply_id") ON DELETE SET NULL ON UPDATE CASCADE;
