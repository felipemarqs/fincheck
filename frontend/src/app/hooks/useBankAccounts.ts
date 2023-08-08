import { useQuery } from '@tanstack/react-query';
import { bankAccountService } from '../services/bankAccountService';

export const useBankAccounts = () => {
  const { data = [], isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccountService.getAll,
  });
  return { bankAccounts: data ?? [], isFetching };
};
