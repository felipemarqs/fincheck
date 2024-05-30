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
import { recurrencyTransactionsService } from '../../../../../app/services/recurrencyTransactionsService';
import { useTransactions } from '../../../../../app/hooks/useTransactions';

const nonRecurringSchema = z.object({
  value: z.string().min(1, 'Informe o valor'),
  name: z.string().min(1, 'Informe o nome'),
  isRecurring: z.literal(undefined),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a conta bancária'),
  date: z.date(),
});

const recurringSchema = z.object({
  value: z.string().min(1, 'Informe o valor'),
  name: z.string().min(1, 'Informe o nome'),
  isRecurring: z.literal(true),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a conta bancária'),
  date: z.date(),
  recurrence: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']),
  endDate: z.date().optional(),
});

const formSchema = z.discriminatedUnion('isRecurring', [
  nonRecurringSchema,
  recurringSchema,
]);

export type FormData = z.infer<typeof formSchema>;

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
    filters,
  } = useDashboard();

  //const [isRecurring, setIsRecurring] = useState(false);
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const isRecurring = watch('isRecurring');

  const { bankAccounts, refetchBankAccounts } = useBankAccounts();
  const { refetchTransactions } = useTransactions(filters);
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: transactionsService.create,
  });

  const { mutateAsync: createRecurringTransaction } = useMutation({
    mutationFn: recurrencyTransactionsService.create,
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === newTransationType
    );
  }, [categoriesList, newTransationType]);

  const handleSubmit = hookFormHandleSubmit(async (data: FormData) => {
    try {
      if (data.isRecurring) {
        await createRecurringTransaction({
          ...data,
          value:
            currencyStringToNumber(data.value) ??
            (data.value as unknown as number),
          type: newTransationType!,
          startDate: data.date.toISOString(),
          endDate: data.endDate?.toISOString(),
          recurrence: data.recurrence,
        });
      } else {
        await mutateAsync({
          ...data,
          value:
            currencyStringToNumber(data.value) ??
            (data.value as unknown as number),
          type: newTransationType!,
          date: data.date.toISOString(),
        });
      }
      refetchBankAccounts();
      refetchTransactions();
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
          ? 'Ocorreu um erro ao cadastrar a despesa'
          : 'Ocorreu um erro ao cadastrar a receita'
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
    watch,
    isRecurring,
  };
};
