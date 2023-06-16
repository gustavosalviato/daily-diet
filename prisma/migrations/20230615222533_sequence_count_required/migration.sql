/*
  Warnings:

  - Made the column `sequenceCount` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "githubId" INTEGER,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sequenceCount" INTEGER NOT NULL,
    "bestSequence" INTEGER NOT NULL
);
INSERT INTO "new_User" ("avatar", "bestSequence", "createdAt", "email", "githubId", "id", "name", "sequenceCount") SELECT "avatar", "bestSequence", "createdAt", "email", "githubId", "id", "name", "sequenceCount" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
