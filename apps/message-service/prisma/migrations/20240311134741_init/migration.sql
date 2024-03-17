-- CreateEnum
CREATE TYPE "CHANNEL_TYPES" AS ENUM ('DIRECT_MESSAGE', 'GROUP_CHANNEL');

-- CreateEnum
CREATE TYPE "MESSAGES_TYPES" AS ENUM ('TEXT', 'IMAGE');

-- CreateTable
CREATE TABLE "channels" (
    "id" TEXT NOT NULL,
    "type" "CHANNEL_TYPES" NOT NULL,
    "owner_ids" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "serverId" TEXT,
    "name" TEXT,
    "topic" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "MESSAGES_TYPES" NOT NULL DEFAULT 'TEXT',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);
