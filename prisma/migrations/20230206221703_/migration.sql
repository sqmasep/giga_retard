-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "PostRating" (
    "id" TEXT NOT NULL,
    "note" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostSaved" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostSaved_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostRating" ADD CONSTRAINT "PostRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostRating" ADD CONSTRAINT "PostRating_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostSaved" ADD CONSTRAINT "PostSaved_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostSaved" ADD CONSTRAINT "PostSaved_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
