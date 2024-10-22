/*
  Warnings:

  - A unique constraint covering the columns `[transaction_id]` on the table `installments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transaction_id` to the `installments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "installments" ADD COLUMN     "transaction_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "installments_transaction_id_key" ON "installments"("transaction_id");

-- AddForeignKey
ALTER TABLE "installments" ADD CONSTRAINT "installments_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
