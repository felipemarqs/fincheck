import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../config/queryKeys';
import { contactsService } from '../services/contactsService';

export const useContacts = () => {
  const {
    data = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [queryKeys.CONTACTS],
    queryFn: contactsService.getAll,
  });
  return {
    contacts: data ?? [],
    isFetchingContacts: isFetching,
    refetchContacts: refetch,
  };
};
