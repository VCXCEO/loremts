/*
  Warnings:

  - Added the required column `token` to the `CustomerToUserChat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomerToUserChat" ADD COLUMN     "token" TEXT NOT NULL;
