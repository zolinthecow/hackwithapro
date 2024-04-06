-- CreateTable
CREATE TABLE "ClassTime" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "classId" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "lastClaimTimestamp" BIGINT NOT NULL,
    CONSTRAINT "ClassTime_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "time_class_idx" ON "ClassTime"("classId");
