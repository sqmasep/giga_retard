/*
  Warnings:

  - Added the required column `rating` to the `RatedPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saved` to the `SavedPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RatedPost" ADD COLUMN     "postId" TEXT,
ADD COLUMN     "rating" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SavedPost" ADD COLUMN     "postId" TEXT,
ADD COLUMN     "saved" BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE "SavedPost" ADD CONSTRAINT "SavedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatedPost" ADD CONSTRAINT "RatedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
