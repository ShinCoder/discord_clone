/*
  Warnings:

  - You are about to drop the `account_profiles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `banner_color` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "account_profiles" DROP CONSTRAINT "account_profiles_account_id_fkey";

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "about" TEXT,
ADD COLUMN     "banner_color" TEXT NOT NULL,
ADD COLUMN     "pronouns" TEXT;

-- DropTable
DROP TABLE "account_profiles";
