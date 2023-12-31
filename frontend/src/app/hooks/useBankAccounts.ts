import { useQuery } from '@tanstack/react-query';
import { bankAccountService } from '../services/bankAccountService';

export const useBankAccounts = () => {
  const { data = [], isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccountService.getAll,
    staleTime: Infinity,
  });
  return { bankAccounts: data ?? [], isFetching };
};
