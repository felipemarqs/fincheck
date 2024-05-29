import { useQuery } from '@tanstack/react-query';
import { bankAccountService } from '../services/bankAccountService';
import { queryKeys } from '../config/queryKeys';

export const useBankAccounts = () => {
  const {
    data = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [queryKeys.BANK_ACCOUNTS],
    queryFn: bankAccountService.getAll,
    staleTime: Infinity,
  });
  return { bankAccounts: data ?? [], isFetching, refetchBankAccounts: refetch };
};
