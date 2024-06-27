import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../../../../../app/services/transactionsService';
import { toast } from 'react-hot-toast';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { Transaction } from '../../../../../app/entities/Transaction';
import { queryKeys } from '../../../../../app/config/queryKeys';
import { formatCurrency } from '@/app/utils/formatCurrency';

const schema = z.object({
  value: z.string().min(1, 'Informe o valor'),
  name: z.string().min(1, 'Informe o nome'),
  isRecurring: z.literal(undefined),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a conta bancária'),
  date: z.date(),
  isPaid: z.boolean({
    required_error: 'isActive is required',
    invalid_type_error: 'isActive must be a boolean',
  }),
});

type FormData = z.infer<typeof schema>;

/* type FormData = {
  value: string | number;
  name: string;
  bankAccountId: string;
  date: Date;
  categoryId: string;
}; */

export const useEditTransactionModalController = (
  transaction: Transaction | null,
  onClose: () => void
) => {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: formatCurrency(transaction?.value!),
      date: transaction ? new Date(transaction?.date) : new Date(),
      isPaid: transaction?.isPaid,
    },
  });

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: transactionsService.update,
  });

  const {
    isPending: isLoadingRemoveTransaction,
    mutateAsync: mutateAsyncRemoveTransaction,
  } = useMutation({ mutationFn: transactionsService.remove });

  const handleDeleteTransaction = async () => {
    try {
      await mutateAsyncRemoveTransaction(transaction!.id);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.TRANSACTIONS, queryKeys.BANK_ACCOUNTS],
      });
      toast.success('Transação deletada com sucesso!');
      onClose();
    } catch (error) {
      toast.error('Erro ao deletar a transação!');
      console.log(error);
    }
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { bankAccounts } = useBankAccounts();

  const { categories: categoriesList } = useCategories();

  const queryClient = useQueryClient();

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === transaction?.type
    );
  }, [categoriesList, transaction]);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    console.log('edit', data);
    try {
      await mutateAsync({
        ...data,
        id: transaction!.id,
        value:
          currencyStringToNumber(data.value) ??
          (data.value as unknown as number),
        type: transaction!.type,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: [queryKeys.TRANSACTIONS] });
      toast.success(
        transaction!.type === 'EXPENSE'
          ? 'Despesa cadastrada com sucesso'
          : 'Receita cadastrada com sucesso'
      );
      onClose();
      reset();
    } catch (error) {
      toast.error(
        transaction!.type === 'EXPENSE'
          ? 'Ocorreu um erro ao cadastrar a despesa'
          : 'Ocorreu um erro ao cadastrar a receita'
      );
    }
  });

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    bankAccounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete: isLoadingRemoveTransaction,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
  };
};
