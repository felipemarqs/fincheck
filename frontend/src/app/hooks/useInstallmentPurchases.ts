import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../config/queryKeys';

import { installmentPurchasesService } from '../services/installmentPurchasesService';

export const useInstallmentPurchases = () => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: [queryKeys.ISNTALLMENT_PURCHASES],
    queryFn: installmentPurchasesService.getAll,
    staleTime: Infinity,
  });
  return {
    installmentPurchases: data ?? [],
    isFetchingInstallmentPurchases: isFetching,
    refetchInstallmentPurchases: refetch,
  };
};
