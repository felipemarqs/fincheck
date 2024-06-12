import { Controller } from 'react-hook-form';
import { Button } from '../../../../components/Button';
import { ColorsDropdownInput } from '../../../../components/ColorsDropdownInput';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useNewCreditCardModalController } from './useNewCreditCardModalController';

export const NewCreditCardModal = () => {
  const {
    closeNewCreditCardModal,
    isNewCreditCardModalOpen,
    register,
    control,
    errors,
    handleSubmit,
    isLoading,
    bankAccounts,
  } = useNewCreditCardModalController();

  return (
    <Modal
      title="Novo Cartão"
      open={isNewCreditCardModalOpen}
      onClose={closeNewCreditCardModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Saldo Inicial
          </span>

          {/* <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              control={control}
              name="initialBalance"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  onChange={onChange}
                  value={value}
                  error={errors.initialBalance?.message}
                />
              )}
            />
          </div> */}
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                value={value}
                onChange={onChange}
                error={errors.bankAccountId?.message}
                placeholder="Conta Bancária"
                options={bankAccounts.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
              />
            )}
          />

          <Input
            type="number"
            placeholder="Fecha Dia:"
            error={errors.closingDay?.message}
            {...register('closingDay')}
          />

          <Input
            type="number"
            placeholder="Vence Dia:"
            error={errors.dueDay?.message}
            {...register('dueDay')}
          />
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Criar
        </Button>
      </form>
    </Modal>
  );
};
