-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "settings" JSONB NOT NULL DEFAULT '{}';
