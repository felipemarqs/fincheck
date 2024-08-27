import { Controller } from 'react-hook-form';
import { Button } from '../../../../components/Button';
import { DatePickerInput } from '../../../../components/DatePickerInput';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useNewTransactionModalController } from './useNewTransactionModalController';
import { recurrenceFrequencies } from '../../../../../app/entities/recurrenceFrequencies';
import { Switch } from '@/view/components/Switch';
import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
} from '@/view/components/Tabs';
import { useState } from 'react';

// import { Switch } from '../../../../components/Switch';

export const NewTransactionModal = () => {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    creditCardsSelectOptions,
    isFetchingBankAccounts,
    isFetchingCreditCards,
    handleChangeSelectedTab,
    newTransationType,
    register,
    control,
    errors,
    handleSubmit,
    bankAccounts,
    isRecurring,
    categories,
    isLoading,
    isPaid,
  } = useNewTransactionModalController();

  const isExpense = newTransationType === 'EXPENSE';

  // Verifique se os campos específicos de recorrência existem nos erros
  const recurrenceError = errors as { recurrence?: { message: string } };
  //const endDateError = errors as { endDate?: { message: string } };

  return (
    <Modal
      title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
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
          {isExpense && (
            <Tabs
              defaultValue={isExpense ? 'creditCard' : 'bankAccount'}
              onValueChange={(value) =>
                handleChangeSelectedTab(
                  value as unknown as 'bankAccount' | 'creditCard'
                )
              }
            >
              <div className="w-full flex items-center justify-between">
                {isExpense && <span>Pagar com:</span>}

                <TabsList>
                  <TabsTrigger value="creditCard">
                    Cartão de Crédito
                  </TabsTrigger>
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
          )}

          {!isExpense && (
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
                  placeholder={'Receber na conta'}
                  options={bankAccounts.map((account) => ({
                    value: account.id,
                    label: account.name,
                  }))}
                />
              )}
            />
          )}

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

          {!isRecurring && (
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
                defaultValue={false}
                shouldUnregister={true}
                render={({ field: { onChange, value } }) => {
                  console.log('field', value);

                  return (
                    <Switch
                      id="isPaid"
                      name="isPaid"
                      checked={value}
                      onCheckedChange={onChange}
                    />
                  );
                }}
              />
            </div>
          )}

          {!isPaid && (
            <div className="flex justify-between items-center px-2">
              <label
                className="text-black text-[15px] leading-none pr-[15px]"
                htmlFor="recurrency"
              >
                Recorrente?
              </label>

              <Controller
                control={control}
                name="isRecurring"
                shouldUnregister={true}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Switch
                      id="recurrency"
                      name="recurrency"
                      checked={!!value}
                      onCheckedChange={onChange}
                    />
                  );
                }}
              />
            </div>
          )}

          {isRecurring && (
            <>
              <Controller
                control={control}
                name="recurrence"
                shouldUnregister={true}
                defaultValue="MONTHLY"
                render={({ field: { onChange, value } }) => (
                  <Select
                    value={value}
                    onChange={onChange}
                    error={recurrenceError.recurrence?.message}
                    placeholder="Recorrência"
                    options={Object.entries(recurrenceFrequencies).map(
                      ([key, label]) => ({
                        value: key,
                        label,
                      })
                    )}
                  />
                )}
              />

              {/*  <Controller
                control={control}
                defaultValue={undefined}
                name="endDate"
                render={({ field: { onChange, value } }) => (
                  <DatePickerInput
                    placeHolder="Data Fim"
                    onChange={onChange}
                    value={value}
                    error={endDateError.endDate?.message} // Ajuste aqui
                  />
                )}
              /> */}
            </>
          )}
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Criar
        </Button>
      </form>
    </Modal>
  );
};
