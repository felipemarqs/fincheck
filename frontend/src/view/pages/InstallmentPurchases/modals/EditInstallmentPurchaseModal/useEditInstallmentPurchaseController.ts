import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { queryKeys } from '../../../../../app/config/queryKeys';
import { installmentPurchasesService } from '@/app/services/installmentPurchasesService';
import { useCreditCards } from '@/app/hooks/useCreditCards';
import { useInstallmentPurchasesContext } from '../../components/InstallmentPurchasesContext/useInstallmentPurchasesContext';
import { AxiosError } from 'axios';
import { treatAxiosError } from '@/app/utils/treatAxiosError';

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

export const useEditInstallmentPurchaseController = () => {
  const {
    isEditInstallmentPurchaseModalOpen,
    closeEditInstallmentPurchaseModal,
    installmentPurchaseBeingEdited,
  } = useInstallmentPurchasesContext();

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
    defaultValues: {
      bankAccountId: installmentPurchaseBeingEdited?.bankAccountId,
      creditCardId: installmentPurchaseBeingEdited?.creditCardId,
      categoryId: installmentPurchaseBeingEdited?.categoryId,
      name: installmentPurchaseBeingEdited?.name,
      numberOfInstallments:
        installmentPurchaseBeingEdited?.numberOfInstallments.toString(),
      startDate: installmentPurchaseBeingEdited
        ? new Date(installmentPurchaseBeingEdited?.startDate)
        : new Date(),
      totalValue: installmentPurchaseBeingEdited?.totalValue.toString(),
    },
  });

  const { bankAccounts, refetchBankAccounts, isFetchingBankAccounts } =
    useBankAccounts();
  const { creditCards, isFetchingCreditCards } = useCreditCards();
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: installmentPurchasesService.update,
  });

  const {
    isPending: isRemovingInstallmentPurchase,
    mutateAsync: mutateAsyncRemoveInstallmentPurchase,
  } = useMutation({
    mutationFn: installmentPurchasesService.remove,
  });

  const numberOfInstallments = watch('numberOfInstallments');
  const totalValue = watch('totalValue');

  const creditCardId = watch('creditCardId');

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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleChangeSelectedTab = (
    selectedTab: 'bankAccount' | 'creditCard'
  ) => {
    setSelectedTab(selectedTab);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
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
    return categoriesList.filter((category) => category.type === 'EXPENSE');
  }, [categoriesList]);

  const handleDeleteInstallmentPurchase = async () => {
    try {
      await mutateAsyncRemoveInstallmentPurchase(
        installmentPurchaseBeingEdited!.id
      );
      queryClient.invalidateQueries({
        queryKey: [queryKeys.TRANSACTIONS, queryKeys.BANK_ACCOUNTS],
      });
      toast.success('Transação deletada com sucesso!');
      handleCloseDeleteModal();
    } catch (error) {
      treatAxiosError(error as AxiosError);
    }
  };

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
        id: installmentPurchaseBeingEdited?.id!,
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
      toast.success('Compra parcelada editada com sucesso.');
      closeEditInstallmentPurchaseModal();
      reset();
    } catch (error) {
      treatAxiosError(error as AxiosError);
    }
  });

  return {
    isEditInstallmentPurchaseModalOpen,
    closeEditInstallmentPurchaseModal,
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
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    isRemovingInstallmentPurchase,
    handleDeleteInstallmentPurchase,
  };
};
