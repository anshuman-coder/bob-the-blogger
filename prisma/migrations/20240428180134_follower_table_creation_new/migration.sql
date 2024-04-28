/*
  Warnings:

  - You are about to drop the `Follower` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_following_id_fkey";

-- DropTable
DROP TABLE "Follower";

-- CreateTable
CREATE TABLE "follower" (
    "id" TEXT NOT NULL,
    "follower_id" TEXT NOT NULL,
    "following_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follower_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "follower" ADD CONSTRAINT "follower_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follower" ADD CONSTRAINT "follower_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
