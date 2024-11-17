/*
  Warnings:

  - You are about to drop the column `owner_ids` on the `channels` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `channels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "channels" DROP COLUMN "owner_ids",
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "direct_messages" (
    "id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "target_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "MESSAGES_TYPES" NOT NULL DEFAULT 'TEXT',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "direct_messages_pkey" PRIMARY KEY ("id")
);
