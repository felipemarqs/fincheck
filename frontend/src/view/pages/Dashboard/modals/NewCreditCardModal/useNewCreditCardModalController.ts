import z from 'zod';
import { useDashboard } from '../../components/DashboardContext/useDashboard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { queryKeys } from '../../../../../app/config/queryKeys';
import { creditCardsService } from '@/app/services/creditCardsService';
import { useBankAccounts } from '@/app/hooks/useBankAccounts';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber';
import { treatAxiosError } from '@/app/utils/treatAxiosError';
import { AxiosError } from 'axios';

const schema = z.object({
  bankAccountId: z.string().min(1, 'Conta bancária é obrigatória!'),
  name: z.string().min(1, 'Conta bancária é obrigatória!'),
  limit: z.string().min(1, 'Limite é obrigatório!'),
  closingDay: z.string().min(1, 'Conta bancária é obrigatória!'),
  dueDay: z.string().min(1, 'Conta bancária é obrigatória!'),
  color: z.string().min(1, 'Cor é obrigatória!'),
});

type FormData = z.infer<typeof schema>;

export const useNewCreditCardModalController = () => {
  const { isNewCreditCardModalOpen, closeNewCreditCardModal } = useDashboard();
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
      color: '#868E96',
    },
  });

  const queryClient = useQueryClient();

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: creditCardsService.create,
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        dueDay: Number(data.dueDay),
        closingDay: Number(data.closingDay),
        limit:
          currencyStringToNumber(data.limit) ??
          (data.limit as unknown as number),
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.BANK_ACCOUNTS] });
      toast.success('Cartão Cadastrado!');
      closeNewCreditCardModal();
      reset();
    } catch (error) {
      treatAxiosError(error as AxiosError);
    }
  });

  return {
    isNewCreditCardModalOpen,
    closeNewCreditCardModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    bankAccounts,
  };
};
