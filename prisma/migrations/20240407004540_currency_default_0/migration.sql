-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Cents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Cents" ("amount", "id", "userId") SELECT "amount", "id", "userId" FROM "Cents";
DROP TABLE "Cents";
ALTER TABLE "new_Cents" RENAME TO "Cents";
CREATE UNIQUE INDEX "Cents_userId_key" ON "Cents"("userId");
CREATE INDEX "cents_user_id_idx" ON "Cents"("userId");
CREATE TABLE "new_Gems" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Gems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Gems" ("amount", "id", "userId") SELECT "amount", "id", "userId" FROM "Gems";
DROP TABLE "Gems";
ALTER TABLE "new_Gems" RENAME TO "Gems";
CREATE UNIQUE INDEX "Gems_userId_key" ON "Gems"("userId");
CREATE INDEX "gems_user_id_idx" ON "Gems"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
