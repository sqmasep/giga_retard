/*
  Warnings:

  - The values [LIKED] on the enum `Interaction` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[commentId,userId]` on the table `CommentInteraction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Interaction_new" AS ENUM ('LIKE', 'DISLIKE');
ALTER TABLE "CommentInteraction" ALTER COLUMN "interaction" TYPE "Interaction_new" USING ("interaction"::text::"Interaction_new");
ALTER TYPE "Interaction" RENAME TO "Interaction_old";
ALTER TYPE "Interaction_new" RENAME TO "Interaction";
DROP TYPE "Interaction_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "CommentInteraction" DROP CONSTRAINT "CommentInteraction_commentId_fkey";

-- DropForeignKey
ALTER TABLE "CommentInteraction" DROP CONSTRAINT "CommentInteraction_userId_fkey";

-- AlterTable
ALTER TABLE "CommentInteraction" ALTER COLUMN "commentId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "interaction" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Follow" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "byUserId" TEXT NOT NULL,
    "follow" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friend" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "byUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportComment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "ReportComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Follow_byUserId_userId_key" ON "Follow"("byUserId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Friend_byUserId_toUserId_key" ON "Friend"("byUserId", "toUserId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportComment_commentId_userId_key" ON "ReportComment"("commentId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentInteraction_commentId_userId_key" ON "CommentInteraction"("commentId", "userId");

-- AddForeignKey
ALTER TABLE "CommentInteraction" ADD CONSTRAINT "CommentInteraction_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentInteraction" ADD CONSTRAINT "CommentInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_byUserId_fkey" FOREIGN KEY ("byUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_byUserId_fkey" FOREIGN KEY ("byUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportComment" ADD CONSTRAINT "ReportComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportComment" ADD CONSTRAINT "ReportComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
