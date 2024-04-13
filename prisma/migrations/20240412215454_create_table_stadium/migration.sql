/*
  Warnings:

  - You are about to drop the column `city` on the `teams` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `teams` table. All the data in the column will be lost.
  - You are about to drop the column `stadium` on the `teams` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `teams` table. All the data in the column will be lost.
  - Added the required column `stadium_id` to the `teams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "teams" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "stadium",
DROP COLUMN "state",
ADD COLUMN     "stadium_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "stadiums" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "stadiums_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_stadium_id_fkey" FOREIGN KEY ("stadium_id") REFERENCES "stadiums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
