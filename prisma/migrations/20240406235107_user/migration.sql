/*
  Warnings:

  - You are about to drop the column `lastClaimTimestamp` on the `ClassTime` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Cents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Gems` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nickname" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    CONSTRAINT "Cents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Cents" ("amount", "id") SELECT "amount", "id" FROM "Cents";
DROP TABLE "Cents";
ALTER TABLE "new_Cents" RENAME TO "Cents";
CREATE UNIQUE INDEX "Cents_userId_key" ON "Cents"("userId");
CREATE INDEX "cents_user_id_idx" ON "Cents"("userId");
CREATE TABLE "new_Class" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Class_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Class" ("id", "name") SELECT "id", "name" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
CREATE INDEX "class_user_id_idx" ON "Class"("userId");
CREATE TABLE "new_Gems" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    CONSTRAINT "Gems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Gems" ("amount", "id") SELECT "amount", "id" FROM "Gems";
DROP TABLE "Gems";
ALTER TABLE "new_Gems" RENAME TO "Gems";
CREATE UNIQUE INDEX "Gems_userId_key" ON "Gems"("userId");
CREATE INDEX "gems_user_id_idx" ON "Gems"("userId");
CREATE TABLE "new_ClassTime" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "classId" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    CONSTRAINT "ClassTime_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ClassTime" ("classId", "dayOfWeek", "id", "startTime") SELECT "classId", "dayOfWeek", "id", "startTime" FROM "ClassTime";
DROP TABLE "ClassTime";
ALTER TABLE "new_ClassTime" RENAME TO "ClassTime";
CREATE INDEX "time_class_idx" ON "ClassTime"("classId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
