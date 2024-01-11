/*
  Warnings:

  - You are about to drop the column `bio` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `bio`,
    DROP COLUMN `contactNumber`,
    DROP COLUMN `firstname`,
    DROP COLUMN `lastname`,
    DROP COLUMN `region`;
