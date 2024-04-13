-- CreateEnum
CREATE TYPE "EnumTournamentFormat" AS ENUM ('LEAGUE', 'KNOCKOUT', 'GROUPS');

-- CreateTable
CREATE TABLE "tournaments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "edition" INTEGER NOT NULL,
    "format" "EnumTournamentFormat" NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tournaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" TEXT NOT NULL,
    "home_team_id" TEXT NOT NULL,
    "away_team_id" TEXT NOT NULL,
    "home_score" INTEGER NOT NULL,
    "away_score" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "stadium_id" TEXT NOT NULL,
    "tournamentId" TEXT,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statistics" (
    "id" TEXT NOT NULL,
    "match_id" TEXT NOT NULL,
    "home_shots" INTEGER NOT NULL,
    "away_shots" INTEGER NOT NULL,
    "home_fouls" INTEGER NOT NULL,
    "away_fouls" INTEGER NOT NULL,
    "home_corners" INTEGER NOT NULL,
    "away_corners" INTEGER NOT NULL,
    "home_yellow_cards" INTEGER NOT NULL,
    "away_yellow_cards" INTEGER NOT NULL,
    "home_red_cards" INTEGER NOT NULL,
    "away_red_cards" INTEGER NOT NULL,
    "home_offsides" INTEGER NOT NULL,
    "away_offsides" INTEGER NOT NULL,
    "home_possession" INTEGER NOT NULL,
    "away_possession" INTEGER NOT NULL,
    "home_pass_accuracy" INTEGER NOT NULL,
    "away_pass_accuracy" INTEGER NOT NULL,

    CONSTRAINT "statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_tournaments" (
    "id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "tournament_id" TEXT NOT NULL,

    CONSTRAINT "team_tournaments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_stadium_id_fkey" FOREIGN KEY ("stadium_id") REFERENCES "stadiums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_home_team_id_fkey" FOREIGN KEY ("home_team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_away_team_id_fkey" FOREIGN KEY ("away_team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statistics" ADD CONSTRAINT "statistics_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "matches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_tournaments" ADD CONSTRAINT "team_tournaments_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_tournaments" ADD CONSTRAINT "team_tournaments_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
