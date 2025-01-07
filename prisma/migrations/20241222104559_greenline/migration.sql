-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "reputation" DROP NOT NULL,
ALTER COLUMN "profile_pic_url" DROP NOT NULL;
