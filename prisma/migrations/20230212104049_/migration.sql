/*
  Warnings:

  - Made the column `userId` on table `RatedPost` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postId` on table `RatedPost` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `SavedPost` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postId` on table `SavedPost` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "RatedPost" DROP CONSTRAINT "RatedPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "RatedPost" DROP CONSTRAINT "RatedPost_userId_fkey";

-- DropForeignKey
ALTER TABLE "SavedPost" DROP CONSTRAINT "SavedPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "SavedPost" DROP CONSTRAINT "SavedPost_userId_fkey";

-- AlterTable
ALTER TABLE "RatedPost" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "postId" SET NOT NULL;

-- AlterTable
ALTER TABLE "SavedPost" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "postId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "SavedPost" ADD CONSTRAINT "SavedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedPost" ADD CONSTRAINT "SavedPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatedPost" ADD CONSTRAINT "RatedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatedPost" ADD CONSTRAINT "RatedPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
