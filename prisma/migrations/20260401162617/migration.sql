/*
  Warnings:

  - Added the required column `updatedAt` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Plant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "stock" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "imageUrl" TEXT
);
INSERT INTO "new_Plant" ("category", "createdAt", "id", "name", "price", "stock", "userId") SELECT "category", "createdAt", "id", "name", "price", "stock", "userId" FROM "Plant";
DROP TABLE "Plant";
ALTER TABLE "new_Plant" RENAME TO "Plant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
