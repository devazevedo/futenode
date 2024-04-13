/*
  Warnings:

  - Added the required column `city` to the `teams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `teams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `popularName` to the `teams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sigla` to the `teams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stadium` to the `teams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `teams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "popularName" TEXT NOT NULL,
ADD COLUMN     "sigla" TEXT NOT NULL,
ADD COLUMN     "stadium" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
