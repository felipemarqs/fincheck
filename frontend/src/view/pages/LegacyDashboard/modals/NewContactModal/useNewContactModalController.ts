import z from 'zod';
import { useDashboard } from '../../components/DashboardContext/useDashboard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { queryKeys } from '../../../../../app/config/queryKeys';
import { contactsService } from '@/app/services/contactsService';

const schema = z.object({
  name: z.string().min(1, 'Conta bancária é obrigatória!'),
  email: z
    .string()
    .optional()
    .transform((e) => (e === '' ? undefined : e)),
  phone: z
    .string()
    .optional()
    .transform((e) => (e === '' ? undefined : e)),
});

type FormData = z.infer<typeof schema>;

export const useNewContactModalController = () => {
  const { isNewContactModalOpen, closeNewContactModal } = useDashboard();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  console.log('errors', errors);

  const queryClient = useQueryClient();

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: contactsService.create,
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const { name, email, phone } = data;
    console.log('Data', data);
    try {
      await mutateAsync({
        name,
        email: email ?? undefined,
        phone: phone ?? undefined,
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.BANK_ACCOUNTS] });
      toast.success('Contato Cadastrado!');
      closeNewContactModal();
      reset();
    } catch (error) {
      toast.error('Ocorreu um erro');
    }
  });

  return {
    isNewContactModalOpen,
    closeNewContactModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
  };
};
