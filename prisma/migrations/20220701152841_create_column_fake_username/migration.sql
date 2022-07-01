/*
  Warnings:

  - Added the required column `fakeUsername` to the `Feed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fakeUsername` to the `SubFeed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `feed` ADD COLUMN `fakeUsername` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `subfeed` ADD COLUMN `fakeUsername` VARCHAR(191) NOT NULL;
