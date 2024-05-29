/*
  Warnings:

  - Added the required column `type` to the `recurring_transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recurring_transactions" ADD COLUMN     "type" "transaction_type" NOT NULL;
