import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../config/queryKeys';
import { creditCardsService } from '../services/creditCardsService';

export const useCreditCards = () => {
  const {
    data = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [queryKeys.CREDIT_CARDS],
    queryFn: creditCardsService.getAll,
    staleTime: Infinity,
  });
  return {
    creditCards: data ?? [],
    isFetchingCreditCards: isFetching,
    refetchCreditCards: refetch,
  };
};
