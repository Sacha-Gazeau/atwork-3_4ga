/*
  Warnings:

  - You are about to drop the column `email` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Request` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Request" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "gardenStyle" TEXT NOT NULL,
    "maxPrice" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Request" ("address", "city", "gardenStyle", "id", "maxPrice", "number", "startDate", "userId", "zipCode") SELECT "address", "city", "gardenStyle", "id", "maxPrice", "number", "startDate", "userId", "zipCode" FROM "Request";
DROP TABLE "Request";
ALTER TABLE "new_Request" RENAME TO "Request";
CREATE UNIQUE INDEX "Request_userId_key" ON "Request"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
