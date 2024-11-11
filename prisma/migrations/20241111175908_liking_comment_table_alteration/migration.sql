/*
  Warnings:

  - A unique constraint covering the columns `[user_id,post_id,comment_id]` on the table `like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "LikeType" AS ENUM ('post', 'comment');

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_post_id_fkey";

-- DropIndex
DROP INDEX "like_user_id_post_id_key";

-- AlterTable
ALTER TABLE "like" ADD COLUMN     "comment_id" TEXT,
ADD COLUMN     "type" "LikeType" NOT NULL DEFAULT 'post',
ALTER COLUMN "post_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "like_user_id_post_id_comment_id_key" ON "like"("user_id", "post_id", "comment_id");

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
