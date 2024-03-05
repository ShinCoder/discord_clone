-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "friend_ids" TEXT[] DEFAULT ARRAY[]::TEXT[];
