import { useContext } from 'react';
import { ContactsContext } from '.';

export const useContactsContext = () => {
  return useContext(ContactsContext);
};
