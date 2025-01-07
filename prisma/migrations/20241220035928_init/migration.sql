-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "reputation" TEXT NOT NULL,
    "Join_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profile_pic_url" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnonymousUsers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "join_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "temp_user_id" TEXT NOT NULL,

    CONSTRAINT "AnonymousUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "post_Id" SERIAL NOT NULL,
    "user_Id" INTEGER,
    "anon_user_Id" INTEGER,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "post_type" TEXT NOT NULL,
    "parent_id" INTEGER,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("post_Id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "comment_Id" SERIAL NOT NULL,
    "post_Id" INTEGER NOT NULL,
    "user_Id" INTEGER,
    "anon_user_Id" INTEGER,
    "content" TEXT NOT NULL,
    "comment_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("comment_Id")
);

-- CreateTable
CREATE TABLE "Post_Tags" (
    "post_Id" SERIAL NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "Post_Tags_pkey" PRIMARY KEY ("post_Id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "tag_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "notification_id" SERIAL NOT NULL,
    "post_Id" INTEGER NOT NULL,
    "comment_Id" INTEGER NOT NULL,
    "user_Id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "is_read" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "Votes" (
    "vote_id" SERIAL NOT NULL,
    "user_Id" INTEGER NOT NULL,
    "post_Id" INTEGER NOT NULL,
    "vote_type" TEXT NOT NULL,
    "vote_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("vote_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AnonymousUsers_email_key" ON "AnonymousUsers"("email");

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_anon_user_Id_fkey" FOREIGN KEY ("anon_user_Id") REFERENCES "AnonymousUsers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_post_Id_fkey" FOREIGN KEY ("post_Id") REFERENCES "Posts"("post_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_anon_user_Id_fkey" FOREIGN KEY ("anon_user_Id") REFERENCES "AnonymousUsers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Tags" ADD CONSTRAINT "Post_Tags_post_Id_fkey" FOREIGN KEY ("post_Id") REFERENCES "Posts"("post_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post_Tags" ADD CONSTRAINT "Post_Tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_post_Id_fkey" FOREIGN KEY ("post_Id") REFERENCES "Posts"("post_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_comment_Id_fkey" FOREIGN KEY ("comment_Id") REFERENCES "Comments"("comment_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_post_Id_fkey" FOREIGN KEY ("post_Id") REFERENCES "Posts"("post_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
