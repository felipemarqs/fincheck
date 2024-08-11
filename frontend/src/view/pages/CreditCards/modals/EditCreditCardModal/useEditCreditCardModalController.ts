import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { queryKeys } from '../../../../../app/config/queryKeys';
import { creditCardsService } from '@/app/services/creditCardsService';
import { useBankAccounts } from '@/app/hooks/useBankAccounts';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber';
import { useCreditCardsContext } from '../../components/CreditCardsContext/useCreditCardsContext';

const schema = z.object({
  bankAccountId: z.string().min(1, 'Conta bancária é obrigatória!'),
  name: z.string().min(1, 'Conta bancária é obrigatória!'),
  limit: z.string().min(1, 'Limite é obrigatório!'),
  closingDay: z.string().min(1, 'Conta bancária é obrigatória!'),
  dueDay: z.string().min(1, 'Conta bancária é obrigatória!'),
  color: z.string().min(1, 'Cor é obrigatória!'),
});

type FormData = z.infer<typeof schema>;

export const useEditCreditCardModalController = () => {
  const {
    isEditCreditCardModalOpen,
    closeEditCreditCardModal,
    creditCardBeingEdited,
  } = useCreditCardsContext();
  const { bankAccounts } = useBankAccounts();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: creditCardBeingEdited?.color,
      bankAccountId: creditCardBeingEdited?.bankAccountId,
      closingDay: creditCardBeingEdited?.closingDay!.toString(),
      dueDay: creditCardBeingEdited?.dueDay!.toString(),
      limit: creditCardBeingEdited?.limit.toString(),
      name: creditCardBeingEdited?.name,
    },
  });

  const queryClient = useQueryClient();

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: creditCardsService.update,
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        id: creditCardBeingEdited?.id!,
        ...data,
        dueDay: Number(data.dueDay),
        closingDay: Number(data.closingDay),
        limit:
          currencyStringToNumber(data.limit) ??
          (data.limit as unknown as number),
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.CREDIT_CARDS] });
      toast.success('Cartão Editado!');
      closeEditCreditCardModal();
      reset();
    } catch (error) {
      toast.error('Ocorreu um erro');
    }
  });

  return {
    isEditCreditCardModalOpen,
    closeEditCreditCardModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    bankAccounts,
  };
};
