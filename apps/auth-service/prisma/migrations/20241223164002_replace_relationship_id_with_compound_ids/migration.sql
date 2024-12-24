/*
  Warnings:

  - The primary key for the `relationships` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `relationships` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "relationships_account_id_target_id_key";

-- AlterTable
ALTER TABLE "relationships" DROP CONSTRAINT "relationships_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "relationships_pkey" PRIMARY KEY ("account_id", "target_id");
