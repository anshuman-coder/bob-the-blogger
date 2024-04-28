-- CreateTable
CREATE TABLE "Follower" (
    "id" TEXT NOT NULL,
    "follower_id" TEXT NOT NULL,
    "following_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follower_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
