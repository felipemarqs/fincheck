import z from 'zod';
import { useDashboard } from '../../components/DashboardContext/useDashboard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { bankAccountService } from '../../../../../app/services/bankAccountService';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { queryKeys } from '../../../../../app/config/queryKeys';
import { treatAxiosError } from '@/app/utils/treatAxiosError';
import { AxiosError } from 'axios';

const schema = z.object({
  initialBalance: z.string().nonempty('Saldo inicial é obrigatório'),
  name: z.string().nonempty('Nome da conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().nonempty('Cor é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export const useNewAccountModalController = () => {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

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
    mutationFn: bankAccountService.create,
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance:
          currencyStringToNumber(data.initialBalance) ??
          (data.initialBalance as unknown as number),
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.BANK_ACCOUNTS] });
      toast.success('Conta Cadastrada!');
      closeNewAccountModal();
      reset();
    } catch (error) {
      treatAxiosError(error as AxiosError);
    }
  });

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
  };
};
