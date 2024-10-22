/*
  Warnings:

  - You are about to drop the column `creditCardId` on the `installment_purchases` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "installment_purchases" DROP CONSTRAINT "installment_purchases_creditCardId_fkey";

-- AlterTable
ALTER TABLE "installment_purchases" DROP COLUMN "creditCardId",
ADD COLUMN     "credit_card_id" UUID;

-- AlterTable
ALTER TABLE "recurring_transactions" ADD COLUMN     "credit_card_id" UUID;

-- AddForeignKey
ALTER TABLE "recurring_transactions" ADD CONSTRAINT "recurring_transactions_credit_card_id_fkey" FOREIGN KEY ("credit_card_id") REFERENCES "credit_cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "installment_purchases" ADD CONSTRAINT "installment_purchases_credit_card_id_fkey" FOREIGN KEY ("credit_card_id") REFERENCES "credit_cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;
