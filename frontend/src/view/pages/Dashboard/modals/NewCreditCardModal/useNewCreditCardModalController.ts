import z from 'zod';
import { useDashboard } from '../../components/DashboardContext/useDashboard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { queryKeys } from '../../../../../app/config/queryKeys';
import { creditCardsService } from '@/app/services/creditCardsService';
import { useBankAccounts } from '@/app/hooks/useBankAccounts';

const schema = z.object({
  bankAccountId: z.string().min(1, 'Conta bancária é obrigatória!'),
  name: z.string().min(1, 'Conta bancária é obrigatória!'),
  limit: z.number({ required_error: 'Limite é obrigatório' }).default(0),
  closingDay: z.number({ required_error: 'Dia de fechamento é obrigatório' }),
  dueDay: z.number({ required_error: 'Dia de vencimento é obrigatório' }),
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
  });

  const queryClient = useQueryClient();

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: creditCardsService.create,
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.BANK_ACCOUNTS] });
      toast.success('Cartão Cadastrado!');
      closeNewCreditCardModal();
      reset();
    } catch (error) {
      toast.error('Ocorreu um erro');
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
