/*
  Warnings:

  - Made the column `categories` on table `tech_support_actions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `tech_support_actions` MODIFY `categories` LONGTEXT NOT NULL;
