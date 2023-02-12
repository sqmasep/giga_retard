/*
  Warnings:

  - You are about to drop the column `userId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `PostRating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostSaved` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostRating" DROP CONSTRAINT "PostRating_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostRating" DROP CONSTRAINT "PostRating_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostSaved" DROP CONSTRAINT "PostSaved_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostSaved" DROP CONSTRAINT "PostSaved_userId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT,
ADD COLUMN     "favoritedById" TEXT;

-- DropTable
DROP TABLE "PostRating";

-- DropTable
DROP TABLE "PostSaved";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_favoritedById_fkey" FOREIGN KEY ("favoritedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
