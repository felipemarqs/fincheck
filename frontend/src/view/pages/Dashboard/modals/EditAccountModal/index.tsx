import { Controller } from 'react-hook-form';
import { Button } from '../../../../components/Button';
import { ColorsDropdownInput } from '../../../../components/ColorsDropdownInput';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useEditAccountModalController } from './useEditAccountModalController';
import { DeleteModal } from '@/view/components/DeleteModal';

export const EditAccountModal = () => {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    control,
    errors,
    handleSubmit,
    isLoading,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    isDeleteModalOpen,
    handleDeleteAccount,
    isLoadingRemoveAccount,
  } = useEditAccountModalController();

  if (isDeleteModalOpen) {
    return (
      <DeleteModal
        title=" Tem certeza que deseja excluir essa conta?"
        description=" Ao excluir a conta, também serão excluídos todos os registros de receita e despesas
        relacionadas."
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAccount}
        isLoading={isLoadingRemoveAccount}
      />
    );
  }
  return (
    <Modal
      title="Editar Conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Saldo Inicial
          </span>

          <div className="flex items-center gap-2">
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
          </div>
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
            defaultValue="CHECKING"
            name="type"
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                value={value}
                placeholder="Tipo"
                options={[
                  { value: 'INVESTMENT', label: 'Investimentos' },
                  { value: 'CHECKING', label: 'Conta Corrente' },
                  { value: 'CASH', label: 'Dinheiro Físico' },
                ]}
                error={errors.type?.message}
              />
            )}
          />

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
