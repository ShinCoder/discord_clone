-- CreateEnum
CREATE TYPE "CONNECTION_STATUS" AS ENUM ('ONLINE', 'OFFLINE');

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "connection_status" "CONNECTION_STATUS" NOT NULL DEFAULT 'OFFLINE';
