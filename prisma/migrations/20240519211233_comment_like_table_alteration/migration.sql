/*
  Warnings:

  - A unique constraint covering the columns `[user_id,post_id]` on the table `like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `text` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comment" ADD COLUMN     "text" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "like_user_id_post_id_key" ON "like"("user_id", "post_id");
