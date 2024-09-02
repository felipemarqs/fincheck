import z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { queryKeys } from '../../../../../app/config/queryKeys';
import { contactsService } from '@/app/services/contactsService';
import { useContactsContext } from '../../components/ContactsContext/useContactsContext';
import { useState } from 'react';
import { treatAxiosError } from '@/app/utils/treatAxiosError';
import { AxiosError } from 'axios';

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

export const useEditAccountModalController = () => {
  const {
    isEditContactModalOpen,
    closeEditContactModal,
    contactBeingEdited,
    refetchContacts,
  } = useContactsContext();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: contactBeingEdited?.name,
      email: contactBeingEdited?.email,
      phone: contactBeingEdited?.phone,
    },
  });

  console.log('errors', errors);

  const queryClient = useQueryClient();

  const {
    isPending: isLoadingUpdateContact,
    mutateAsync: mutateAsyncUpdateContact,
  } = useMutation({
    mutationFn: contactsService.update,
  });

  const {
    isPending: isLoadingRemoveContact,
    mutateAsync: mutateAsyncRemoveContact,
  } = useMutation({ mutationFn: contactsService.remove });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const { name, email, phone } = data;
    console.log('Data', data);
    try {
      await mutateAsyncUpdateContact({
        id: contactBeingEdited!.id,
        name,
        email: email ?? undefined,
        phone: phone ?? undefined,
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.CONTACTS] });
      toast.success('Contato Editado!');
      closeEditContactModal();
      reset();
    } catch (error) {
      treatAxiosError(error as AxiosError);
    }
  });

  const handleDeleteContact = async () => {
    try {
      await mutateAsyncRemoveContact(contactBeingEdited!.id);

      queryClient.invalidateQueries({ queryKey: [queryKeys.BANK_ACCOUNTS] });

      toast.success('Contato deletado com sucesso!');
      closeEditContactModal();
      refetchContacts();
    } catch (error) {
      treatAxiosError(error as AxiosError);
    }
  };

  return {
    isEditContactModalOpen,
    isLoadingRemoveContact,
    closeEditContactModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoadingUpdateContact,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteContact,
  };
};
