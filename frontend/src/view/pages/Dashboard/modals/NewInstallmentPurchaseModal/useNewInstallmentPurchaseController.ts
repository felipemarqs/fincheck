import { useForm } from 'react-hook-form';
import { useDashboard } from '../../components/DashboardContext/useDashboard';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { queryKeys } from '../../../../../app/config/queryKeys';
import { recurrencyTransactionsService } from '../../../../../app/services/recurrencyTransactionsService';
import { useTransactions } from '../../../../../app/hooks/useTransactions';
import { installmentPurchasesService } from '@/app/services/installmentPurchasesService';
import { useCreditCards } from '@/app/hooks/useCreditCards';

const formSchema = z.object({
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a conta bancária'),
  name: z.string().min(1, 'Obrigatório.'),
  startDate: z.date(),
  numberOfInstallments: z.string().min(1, 'Obrigatório.'),
  totalValue: z.string().min(1, 'Informe o valor'),
  creditCardId: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

export const useNewInstallmentPurchaseController = () => {
  const {
    isNewInstallmentPurchaseModalOpen,
    closeNewInstallmentPurchaseModal,
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

  const { bankAccounts, refetchBankAccounts, isFetchingBankAccounts } =
    useBankAccounts();
  const { creditCards, isFetchingCreditCards, refetchCreditCards } =
    useCreditCards();
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: installmentPurchasesService.create,
  });

  const numberOfInstallments = watch('numberOfInstallments');
  const totalValue = watch('totalValue');

  const creditCardId = watch('creditCardId');
  const bankAccountId = watch('bankAccountId');

  const creditCardsSelectOptions = creditCards.map((creditCard) => ({
    label: creditCard.name,
    value: creditCard.id,
  }));

  /*  console.log("selectedSeverity", selectedSeverity);
  console.log("errors", errors);
  occurrenceSeveritySelectOptions;
  console.log(
    "occurrenceSeveritySelectOptions",
    occurrenceSeveritySelectOptions
  ); */

  const [selectedTab, setSelectedTab] = useState<'bankAccount' | 'creditCard'>(
    'creditCard'
  );

  const handleChangeSelectedTab = (
    selectedTab: 'bankAccount' | 'creditCard'
  ) => {
    setSelectedTab(selectedTab);
  };
  console.log(selectedTab);

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
    return categoriesList.filter((category) => category.type === 'EXPENSE');
  }, [categoriesList]);

  const handleSubmit = hookFormHandleSubmit(async (data: FormData) => {
    console.log({
      bankAccountId: data.bankAccountId,
      categoryId: data.categoryId,
      creditCardId: data.creditCardId,
      name: data.name,
      numberOfInstallments: Number(data.numberOfInstallments),
      startDate: data.startDate.toISOString(),
      totalValue:
        currencyStringToNumber(data.totalValue) ??
        (data.totalValue as unknown as number),
      type: 'EXPENSE',
    });

    try {
      await mutateAsync({
        bankAccountId: data.bankAccountId,
        categoryId: data.categoryId,
        creditCardId: data.creditCardId,
        name: data.name,
        numberOfInstallments: Number(data.numberOfInstallments),
        startDate: data.startDate.toISOString(),
        totalValue:
          currencyStringToNumber(data.totalValue) ??
          (data.totalValue as unknown as number),
        type: 'EXPENSE',
      });

      refetchBankAccounts();
      queryClient.invalidateQueries({
        queryKey: [queryKeys.BANK_ACCOUNTS, queryKeys.TRANSACTIONS],
      });
      toast.success('Compra parcelada criada com sucesso');
      closeNewInstallmentPurchaseModal();
      reset();
    } catch (error) {
      toast.error('Ocorreu um erro ao cadastrar a transação');
    }
  });

  return {
    isNewInstallmentPurchaseModalOpen,
    closeNewInstallmentPurchaseModal,
    register,
    control,
    errors,
    handleSubmit,
    bankAccounts,
    categories,
    isLoading,
    watch,
    numberOfInstallments,
    totalValue,
    isFetchingBankAccounts,
    isFetchingCreditCards,
    creditCardsSelectOptions,
    handleChangeSelectedTab,
  };
};
