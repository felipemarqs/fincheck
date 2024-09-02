import z from 'zod';
import { useDashboard } from '../../components/DashboardContext/useDashboard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { bankAccountService } from '../../../../../app/services/bankAccountService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { useState } from 'react';
import { queryKeys } from '../../../../../app/config/queryKeys';
import { treatAxiosError } from '@/app/utils/treatAxiosError';
import { AxiosError } from 'axios';

const schema = z.object({
  initialBalance: z.union([
    z.string().min(1, 'Saldo é obrigatório'),
    z.number(),
  ]),
  name: z.string().min(1, 'Nome da conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, 'Cor é obrigatória'),
});

type FormData = {
  initialBalance: string | number;
  name: string;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
  color: string;
};

export const useEditAccountModalController = () => {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
    useDashboard();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,

    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.initialBalance,
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { isPending: isLoading, mutateAsync: mutateAsyncUpdateAccount } =
    useMutation({ mutationFn: bankAccountService.update });

  const {
    isPending: isLoadingRemoveAccount,
    mutateAsync: mutateAsyncRemoveAccount,
  } = useMutation({ mutationFn: bankAccountService.remove });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsyncUpdateAccount({
        ...data,
        initialBalance:
          currencyStringToNumber(data.initialBalance as string) ??
          (data.initialBalance as number),
        id: accountBeingEdited!.id,
      });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast.success('Conta Editada com sucesso!');
      closeEditAccountModal();
    } catch (error) {
      treatAxiosError(error as AxiosError);
    }
  });

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await mutateAsyncRemoveAccount(accountBeingEdited!.id);

      queryClient.invalidateQueries({ queryKey: [queryKeys.BANK_ACCOUNTS] });

      toast.success('Conta deletada com sucesso!');
      closeEditAccountModal();
    } catch (error) {
      treatAxiosError(error as AxiosError);
    }
  };

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingRemoveAccount,
  };
};
