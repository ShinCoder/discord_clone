-- CreateEnum
CREATE TYPE "RELATIONSHIP_STATUS" AS ENUM ('REQUESTING', 'PENDING', 'FRIEND', 'BLOCKED');

-- CreateTable
CREATE TABLE "relationships" (
    "account_id" TEXT NOT NULL,
    "target_id" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "status" "RELATIONSHIP_STATUS" NOT NULL DEFAULT 'REQUESTING',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "relationships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "relationships_account_id_target_id_key" ON "relationships"("account_id", "target_id");

-- AddForeignKey
ALTER TABLE "relationships" ADD CONSTRAINT "relationships_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relationships" ADD CONSTRAINT "relationships_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
