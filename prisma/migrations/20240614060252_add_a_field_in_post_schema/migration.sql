-- CreateEnum
CREATE TYPE "IsDeleted" AS ENUM ('true', 'false');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "isDeleted" "IsDeleted" NOT NULL DEFAULT 'true';
