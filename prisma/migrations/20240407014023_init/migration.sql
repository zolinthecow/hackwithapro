-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "classId" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "lng" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassTime" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "lastClaimedTimeStamp" BIGINT NOT NULL,

    CONSTRAINT "ClassTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gems" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Gems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cents" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Cents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "class_user_id_idx" ON "Class"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_classId_key" ON "Location"("classId");

-- CreateIndex
CREATE INDEX "location_class_idx" ON "Location"("classId");

-- CreateIndex
CREATE INDEX "time_class_idx" ON "ClassTime"("classId");

-- CreateIndex
CREATE UNIQUE INDEX "Gems_userId_key" ON "Gems"("userId");

-- CreateIndex
CREATE INDEX "gems_user_id_idx" ON "Gems"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cents_userId_key" ON "Cents"("userId");

-- CreateIndex
CREATE INDEX "cents_user_id_idx" ON "Cents"("userId");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassTime" ADD CONSTRAINT "ClassTime_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gems" ADD CONSTRAINT "Gems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cents" ADD CONSTRAINT "Cents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
