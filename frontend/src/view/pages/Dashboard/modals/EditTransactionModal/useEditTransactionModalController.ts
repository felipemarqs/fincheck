import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../../../../../app/services/transactionsService';
import { toast } from 'react-hot-toast';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { Transaction } from '../../../../../app/entities/Transaction';
import { queryKeys } from '../../../../../app/config/queryKeys';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { useCreditCards } from '@/app/hooks/useCreditCards';
import { treatAxiosError } from '@/app/utils/treatAxiosError';
import { AxiosError } from 'axios';

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
  creditCardId: z.string().optional(),
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
    setValue,
    watch,
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
      creditCardId: transaction?.creditCardId ?? '',
    },
  });

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: transactionsService.update,
  });

  const {
    isPending: isLoadingRemoveTransaction,
    mutateAsync: mutateAsyncRemoveTransaction,
  } = useMutation({ mutationFn: transactionsService.remove });

  console.log('errors', errors);
  const handleDeleteTransaction = async () => {
    try {
      await mutateAsyncRemoveTransaction(transaction!.id);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.TRANSACTIONS, queryKeys.BANK_ACCOUNTS],
      });
      toast.success('Transação deletada com sucesso!');
      onClose();
    } catch (error) {
      treatAxiosError(error as AxiosError);
    }
  };

  const isTransactionFromInstallmentPurchase =
    transaction?.installmentPurchaseId;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { bankAccounts, refetchBankAccounts, isFetchingBankAccounts } =
    useBankAccounts();
  const { creditCards, isFetchingCreditCards } = useCreditCards();

  const [selectedTab, setSelectedTab] = useState<'bankAccount' | 'creditCard'>(
    'creditCard'
  );

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

  const { categories: categoriesList } = useCategories();

  const queryClient = useQueryClient();

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === transaction?.type
    );
  }, [categoriesList, transaction]);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    console.log({
      ...data,
      id: transaction!.id,
      value:
        currencyStringToNumber(data.value) ?? (data.value as unknown as number),
      type: transaction!.type,
      date: data.date.toISOString(),
      creditCardId:
        data.creditCardId?.length === 0 ? undefined : data.creditCardId,
    });

    try {
      await mutateAsync({
        ...data,
        id: transaction!.id,
        value:
          currencyStringToNumber(data.value) ??
          (data.value as unknown as number),
        type: transaction!.type,
        date: data.date.toISOString(),
        creditCardId:
          data.creditCardId?.length === 0 ? undefined : data.creditCardId,
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
      treatAxiosError(error as AxiosError);
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
    handleChangeSelectedTab,
    creditCardsSelectOptions,
    isFetchingCreditCards,
    refetchBankAccounts,
    isFetchingBankAccounts,
    isTransactionFromInstallmentPurchase,
  };
};
