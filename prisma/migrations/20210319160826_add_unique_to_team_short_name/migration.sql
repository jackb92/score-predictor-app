/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[shortName]` on the table `Team`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Team.shortName_unique" ON "Team"("shortName");
