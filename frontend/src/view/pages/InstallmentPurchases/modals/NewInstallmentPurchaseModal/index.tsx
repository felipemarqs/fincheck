import { Controller } from 'react-hook-form';
import { Button } from '../../../../components/Button';
import { DatePickerInput } from '../../../../components/DatePickerInput';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';

import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
} from '@/view/components/Tabs';

import { useNewInstallmentPurchaseController } from './useNewInstallmentPurchaseController';

// import { Switch } from '../../../../components/Switch';

export const NewInstallmentPurchaseModal = () => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    bankAccounts,
    categories,
    isLoading,
    isNewInstallmentPurchaseModalOpen,
    closeNewInstallmentPurchaseModal,
    numberOfInstallments,
    totalValue,
    isFetchingBankAccounts,
    isFetchingCreditCards,
    creditCardsSelectOptions,
    handleChangeSelectedTab,
  } = useNewInstallmentPurchaseController();

  return (
    <Modal
      title={'Nova compra parcelada'}
      open={isNewInstallmentPurchaseModalOpen}
      onClose={closeNewInstallmentPurchaseModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor compra
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              defaultValue="0"
              control={control}
              name="totalValue"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  onChange={onChange}
                  value={value}
                  error={errors.totalValue?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={'Nome da despesa'}
            {...register('name')}
            error={errors.name?.message}
          />
          <Controller
            control={control}
            defaultValue={new Date()}
            name="startDate"
            render={({ field: { /* value, */ onChange } }) => (
              <DatePickerInput
                //value={value}
                onChange={onChange}
                error={errors.startDate?.message}
              />
            )}
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
            defaultValue="creditCard"
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
                <TabsTrigger value="bankAccount">Conta Bancária</TabsTrigger>
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
          <Input
            type="number"
            maxLength={2}
            placeholder={'Nº de parcelas'}
            {...register('numberOfInstallments')}
            error={errors.numberOfInstallments?.message}
          />
        </div>

        {numberOfInstallments && totalValue && (
          <div>{`Serão criadas ${numberOfInstallments} parcelas de R$ ${
            Number(totalValue) / Number(numberOfInstallments)
          }`}</div>
        )}

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Criar
        </Button>
      </form>
    </Modal>
  );
};
