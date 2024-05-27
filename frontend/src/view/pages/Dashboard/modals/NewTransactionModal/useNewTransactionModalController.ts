import { useForm } from 'react-hook-form';
import { useDashboard } from '../../components/DashboardContext/useDashboard';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../../../../../app/services/transactionsService';
import { toast } from 'react-hot-toast';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { queryKeys } from '../../../../../app/config/queryKeys';

const schema = z.object({
  value: z.string().nonempty('Informe o valor'),
  name: z.string().nonempty('Informe o nome'),
  categoryId: z.string().nonempty('Informe a categoria'),
  bankAccountId: z.string().nonempty('Informe a conta bancária'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

/* type FormData = {
  value: string | number;
  name: string;
  categoryId: 'CHECKING' | 'INVESTMENT' | 'CASH';
  bankAccountId: string;
  date: Date;
}; */

export const useNewTransactionModalController = () => {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransationType,
  } = useDashboard();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { bankAccounts } = useBankAccounts();

  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: transactionsService.create,
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === newTransationType
    );
  }, [categoriesList, newTransationType]);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value:
          currencyStringToNumber(data.value) ??
          (data.value as unknown as number),
        type: newTransationType!,
        date: data.date.toISOString(),
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.BANK_ACCOUNTS, queryKeys.TRANSACTIONS],
      });
      toast.success(
        newTransationType === 'EXPENSE'
          ? 'Despesa cadastrada com sucesso'
          : 'Receita cadastrada com sucesso'
      );
      closeNewTransactionModal();
      reset();
    } catch (error) {
      toast.error(
        newTransationType === 'EXPENSE'
          ? 'Ocorreu um erro ao cadastrar a despesa '
          : 'Ocorreu um erro ao cadastrar a receita '
      );
    }
  });

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransationType,
    register,
    control,
    errors,
    handleSubmit,
    bankAccounts,
    categories,
    isLoading,
  };
};
