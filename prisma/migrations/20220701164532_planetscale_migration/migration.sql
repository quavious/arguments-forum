-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropForeignKey
ALTER TABLE `subfeed` DROP FOREIGN KEY `SubFeed_feedId_fkey`;

-- RedefineIndex
CREATE INDEX `Account_userId_idx` ON `Account`(`userId`);
DROP INDEX `Account_userId_fkey` ON `account`;

-- RedefineIndex
CREATE INDEX `Session_userId_idx` ON `Session`(`userId`);
DROP INDEX `Session_userId_fkey` ON `session`;

-- RedefineIndex
CREATE INDEX `SubFeed_feedId_idx` ON `SubFeed`(`feedId`);
DROP INDEX `SubFeed_feedId_fkey` ON `subfeed`;
