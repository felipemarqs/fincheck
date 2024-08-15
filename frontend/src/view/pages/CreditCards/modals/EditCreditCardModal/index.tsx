import { Controller } from 'react-hook-form';
import { Button } from '../../../../components/Button';
import { ColorsDropdownInput } from '../../../../components/ColorsDropdownInput';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useEditCreditCardModalController } from './useEditCreditCardModalController';
import { monthDays } from '@/app/utils/monthDays';
import { DeleteModal } from '@/view/components/DeleteModal';

export const EditCreditCardModal = () => {
  const {
    closeEditCreditCardModal,
    isEditCreditCardModalOpen,
    register,
    control,
    errors,
    handleSubmit,
    isLoading,
    bankAccounts,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleDeleteCreditCard,
    isLoadingRemoveCreditCard,
  } = useEditCreditCardModalController();

  if (isDeleteModalOpen) {
    return (
      <DeleteModal
        title={` Tem certeza que deseja excluir esse cartão?`}
        description="Todas as transações vinculadas a esse cartão serão afetadas!"
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteCreditCard}
        isLoading={isLoadingRemoveCreditCard}
      />
    );
  }

  return (
    <Modal
      title="Editar Cartão"
      open={isEditCreditCardModalOpen}
      onClose={closeEditCreditCardModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Limite
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              control={control}
              name="limit"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  onChange={onChange}
                  value={value}
                  error={errors.limit?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome do Cartão"
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

          <div className="flex gap-2 w-full">
            <div className="flex-1">
              <Controller
                control={control}
                name="closingDay"
                render={({ field: { onChange, value } }) => (
                  <Select
                    value={value}
                    onChange={onChange}
                    error={errors.closingDay?.message}
                    placeholder="Fecha dia: "
                    options={monthDays}
                  />
                )}
              />
            </div>

            <div className="flex-1">
              <Controller
                control={control}
                name="dueDay"
                render={({ field: { onChange, value } }) => (
                  <Select
                    value={value}
                    onChange={onChange}
                    error={errors.dueDay?.message}
                    placeholder="Vence dia: "
                    options={monthDays}
                  />
                )}
              />
            </div>
          </div>

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                onChange={onChange}
                value={value}
                error={errors.color?.message}
              />
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
            Salvar
          </Button>

          <Button
            type="submit"
            variant="danger"
            className="w-full mt-6"
            isLoading={isLoading}
            onClick={handleOpenDeleteModal}
          >
            Deletar
          </Button>
        </div>
      </form>
    </Modal>
  );
};
