import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { authService } from '../../../app/services/authService';
import { SigninParams } from '../../../app/services/authService/signin';
import { useAuth } from '../../../app/hooks/useAuth';
const schema = z.object({
  email: z
    .string()
    .nonempty('E-mail é obrigatório.')
    .email('Informe um E-mail válido.'),
  password: z
    .string()
    .nonempty('Senha é obrigatório')
    .min(8, 'Senha deve conter pelo menos 8 dígitos.'),
});

type FormData = {
  email: string;
  password: string;
};

//type FormData = z.infer<typeof schema>;

export const useLoginController = () => {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationKey: ['signin'],
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data); //Retorno da mutation Function
      signin(accessToken);
    } catch {
      toast.error('Credenciais Inválidas!');
    }
  });

  return { handleSubmit, register, errors, isLoading };
};
