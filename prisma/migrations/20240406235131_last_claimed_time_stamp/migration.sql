/*
  Warnings:

  - Added the required column `lastClaimedTimeStamp` to the `ClassTime` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClassTime" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "classId" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "lastClaimedTimeStamp" BIGINT NOT NULL,
    CONSTRAINT "ClassTime_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ClassTime" ("classId", "dayOfWeek", "id", "startTime") SELECT "classId", "dayOfWeek", "id", "startTime" FROM "ClassTime";
DROP TABLE "ClassTime";
ALTER TABLE "new_ClassTime" RENAME TO "ClassTime";
CREATE INDEX "time_class_idx" ON "ClassTime"("classId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
