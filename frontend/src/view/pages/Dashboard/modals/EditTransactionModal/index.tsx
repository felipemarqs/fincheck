import { Controller } from 'react-hook-form';
import { Button } from '../../../../components/Button';
import { DatePickerInput } from '../../../../components/DatePickerInput';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useEditTransactionModalController } from './useEditTransactionModalController';
import { Transaction } from '../../../../../app/entities/Transaction';

import { Switch } from '@/view/components/Switch';
import { DeleteModal } from '@/view/components/DeleteModal';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/view/components/Tabs';

interface EditTransactionModalprops {
  transaction: Transaction | null;
  open: boolean;
  onClose(): void;
}

export const EditTransactionModal = ({
  transaction,
  open,
  onClose,
}: EditTransactionModalprops) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    bankAccounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleChangeSelectedTab,
    creditCardsSelectOptions,
    isFetchingCreditCards,
    isTransactionFromInstallmentPurchase,
    isFetchingBankAccounts,
  } = useEditTransactionModalController(transaction, onClose);

  const isExpense = transaction?.type === 'EXPENSE';

  if (isDeleteModalOpen) {
    return (
      <DeleteModal
        title={` Tem certeza que deseja excluir essa ${
          isExpense ? 'despesa' : 'receita'
        }?`}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteTransaction}
        isLoading={isLoadingDelete}
      />
    );
  }

  return (
    <Modal
      title={isExpense ? 'Editar Despesa' : 'Editar Receita'}
      open={open}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor {isExpense ? 'da despesa' : 'da receita'}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              defaultValue="0"
              control={control}
              name="value"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  onChange={onChange}
                  value={value}
                  error={errors.value?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isExpense ? 'Nome da despesa' : 'Nome da receita'}
            {...register('name')}
            error={errors.name?.message}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                value={value}
                error={errors.categoryId?.message}
                onChange={onChange}
                placeholder="Categoria"
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />

          <Tabs
            defaultValue={
              isTransactionFromInstallmentPurchase
                ? 'creditCard'
                : 'bankAccount'
            }
            onValueChange={(value) =>
              handleChangeSelectedTab(
                value as unknown as 'bankAccount' | 'creditCard'
              )
            }
          >
            <div className="w-full flex items-center justify-between">
              <span>Pagar com:</span>
              <TabsList>
                <TabsTrigger value="creditCard">Cartão de Crédito</TabsTrigger>
                <TabsTrigger
                  disabled={!!isTransactionFromInstallmentPurchase}
                  value="bankAccount"
                >
                  Conta Bancária
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="bankAccount">
              <Controller
                control={control}
                name="bankAccountId"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <Select
                    isLoading={isFetchingBankAccounts}
                    value={value}
                    onChange={onChange}
                    error={errors.bankAccountId?.message}
                    placeholder={'Conta'}
                    options={bankAccounts.map((account) => ({
                      value: account.id,
                      label: account.name,
                    }))}
                  />
                )}
              />
            </TabsContent>
            <TabsContent value="creditCard">
              <Controller
                control={control}
                name="creditCardId"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <Select
                    isLoading={isFetchingCreditCards}
                    value={value as string}
                    onChange={onChange}
                    error={errors.creditCardId?.message}
                    placeholder={'Cartão'}
                    options={creditCardsSelectOptions}
                  />
                )}
              />
            </TabsContent>
          </Tabs>

          <Controller
            control={control}
            defaultValue={new Date()}
            name="date"
            render={({ field: { /* value, */ onChange } }) => (
              <DatePickerInput
                //value={value}
                onChange={onChange}
                error={errors.date?.message}
              />
            )}
          />

          <div className="flex justify-between items-center px-2">
            <label
              className="text-black text-[15px] leading-none pr-[15px]"
              htmlFor="isPaid"
            >
              Marcar como pago
            </label>

            <Controller
              control={control}
              name="isPaid"
              shouldUnregister={true}
              render={({ field: { onChange, value } }) => {
                return (
                  <Switch
                    id="isPaid"
                    name="isPaid"
                    checked={!!value}
                    onCheckedChange={onChange}
                  />
                );
              }}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
            Salvar
          </Button>

          <Button
            variant="danger"
            className="w-full mt-6"
            isLoading={isLoading}
            onClick={handleOpenDeleteModal}
            disabled={!!isTransactionFromInstallmentPurchase}
          >
            Deletar
          </Button>
        </div>
      </form>
    </Modal>
  );
};
