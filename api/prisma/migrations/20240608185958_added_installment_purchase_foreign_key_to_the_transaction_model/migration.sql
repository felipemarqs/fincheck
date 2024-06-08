/*
  Warnings:

  - You are about to drop the column `creditCardId` on the `transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_creditCardId_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "creditCardId",
ADD COLUMN     "credit_card_id" UUID,
ADD COLUMN     "installment_purchase_id" UUID;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_credit_card_id_fkey" FOREIGN KEY ("credit_card_id") REFERENCES "credit_cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_installment_purchase_id_fkey" FOREIGN KEY ("installment_purchase_id") REFERENCES "installment_purchases"("id") ON DELETE SET NULL ON UPDATE CASCADE;
