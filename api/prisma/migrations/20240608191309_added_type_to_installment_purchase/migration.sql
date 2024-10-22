/*
  Warnings:

  - Added the required column `type` to the `installment_purchases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "installment_purchases" ADD COLUMN     "type" "transaction_type" NOT NULL;
