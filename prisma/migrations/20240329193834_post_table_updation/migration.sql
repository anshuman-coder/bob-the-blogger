/*
  Warnings:

  - You are about to drop the column `name` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author_id` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_user_id_fkey";

-- DropIndex
DROP INDEX "post_name_idx";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "name",
DROP COLUMN "user_id",
ADD COLUMN     "author_id" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "featured_image" TEXT,
ADD COLUMN     "html" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "text" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "post_title_key" ON "post"("title");

-- CreateIndex
CREATE UNIQUE INDEX "post_slug_key" ON "post"("slug");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
