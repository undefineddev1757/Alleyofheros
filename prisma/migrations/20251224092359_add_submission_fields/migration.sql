-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "birthDate" TEXT,
ADD COLUMN     "deathDate" TEXT,
ADD COLUMN     "mediaFiles" TEXT[],
ADD COLUMN     "residence" TEXT,
ADD COLUMN     "telegramUsername" TEXT;
