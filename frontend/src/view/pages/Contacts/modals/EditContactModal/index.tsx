import { DeleteModal } from '@/view/components/DeleteModal';
import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';
import { useEditAccountModalController } from './useEditAccountModalController';

export const EditContactModal = () => {
  const {
    closeEditContactModal,
    isEditContactModalOpen,
    register,
    errors,
    handleSubmit,
    isLoadingRemoveContact,
    isLoadingUpdateContact,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    isDeleteModalOpen,
    handleDeleteContact,
  } = useEditAccountModalController();

  if (isDeleteModalOpen) {
    return (
      <DeleteModal
        title=" Tem certeza que deseja excluir esse contato?"
        description=" Essa ação não poderá ser desfeita."
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteContact}
        isLoading={isLoadingRemoveContact}
      />
    );
  }

  return (
    <Modal
      title="Editar Contato"
      open={isEditContactModalOpen}
      onClose={closeEditContactModal}
    >
      <form onSubmit={handleSubmit}>
        {/*   <div>
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
 */}
        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome"
            error={errors.name?.message}
            {...register('name')}
          />

          <Input
            //defaultValue={undefined}
            type="email"
            placeholder="Email"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            //defaultValue={undefined}
            type="text"
            placeholder="Número"
            error={errors.phone?.message}
            {...register('phone')}
          />

          {/* <Controller
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
          </div> */}
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            className="w-full mt-6"
            isLoading={isLoadingUpdateContact}
          >
            Editar
          </Button>

          <Button
            type="submit"
            variant="danger"
            className="w-full mt-6"
            isLoading={isLoadingRemoveContact}
            onClick={handleOpenDeleteModal}
          >
            Deletar
          </Button>
        </div>
      </form>
    </Modal>
  );
};
