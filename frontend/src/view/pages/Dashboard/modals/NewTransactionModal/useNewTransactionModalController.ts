import { useForm } from 'react-hook-form';
import { useDashboard } from '../../components/DashboardContext/useDashboard';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../../../../../app/services/transactionsService';
import { toast } from 'react-hot-toast';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { queryKeys } from '../../../../../app/config/queryKeys';
import { recurrencyTransactionsService } from '../../../../../app/services/recurrencyTransactionsService';
import { useTransactions } from '../../../../../app/hooks/useTransactions';
import { useCreditCards } from '@/app/hooks/useCreditCards';

const nonRecurringSchema = z.object({
  value: z.string().min(1, 'Informe o valor'),
  name: z.string().min(1, 'Informe o nome'),
  isRecurring: z.literal(undefined),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a conta bancária'),
  date: z.date(),
  isPaid: z
    .boolean({
      required_error: 'isActive is required',
      invalid_type_error: 'isActive must be a boolean',
    })
    .default(false)
    .optional(),
  creditCardId: z.string().optional(),
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
  creditCardId: z.string().optional(),
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
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const isRecurring = watch('isRecurring');
  const isPaid = watch('isPaid');

  const { bankAccounts, refetchBankAccounts, isFetchingBankAccounts } =
    useBankAccounts();
  const { creditCards, isFetchingCreditCards } = useCreditCards();
  const { refetchTransactions } = useTransactions(filters);
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();

  const [selectedTab, setSelectedTab] = useState<'bankAccount' | 'creditCard'>(
    'creditCard'
  );

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: transactionsService.create,
  });

  const { mutateAsync: createRecurringTransaction } = useMutation({
    mutationFn: recurrencyTransactionsService.create,
  });

  const creditCardsSelectOptions = creditCards.map((creditCard) => ({
    label: creditCard.name,
    value: creditCard.id,
  }));

  const creditCardId = watch('creditCardId');

  const handleChangeSelectedTab = (
    selectedTab: 'bankAccount' | 'creditCard'
  ) => {
    setSelectedTab(selectedTab);
  };

  useEffect(() => {
    if (selectedTab === 'bankAccount') {
      setValue('creditCardId', undefined); // Limpa o valor de category
    }

    if (creditCardId) {
      const bankAccountIdFound = creditCards.find(
        (creditCard) => creditCard.id === creditCardId
      )?.bankAccountId;
      setValue('bankAccountId', bankAccountIdFound ?? '');
    }
  }, [creditCardId, selectedTab]);

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
          creditCardId: data.creditCardId,
        });
      } else {
        await mutateAsync({
          ...data,
          value:
            currencyStringToNumber(data.value) ??
            (data.value as unknown as number),
          type: newTransationType!,
          date: data.date.toISOString(),
          isPaid: !!data.isPaid,
          creditCardId: data.creditCardId,
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
    isFetchingCreditCards,
    isFetchingBankAccounts,
    creditCardsSelectOptions,
    handleChangeSelectedTab,
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
    isPaid,
  };
};
