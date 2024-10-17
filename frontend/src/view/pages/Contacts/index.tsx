import { Button } from '@/view/components/Button';
import { NewContactModal } from './modals/NewContactModal';
import {
  ContactsContext,
  ContactsProvider,
} from './components/ContactsContext';
import { EditContactModal } from './modals/EditContactModal';

export const Contacts = () => {
  return (
    <ContactsProvider>
      <ContactsContext.Consumer>
        {({
          contacts,
          openNewContactModal,
          openEditContactModal,
          contactBeingEdited,
        }) => (
          <>
            <div className="bg-red-500 w-full h-full">
              <h1>Contacts:</h1>

              <Button onClick={openNewContactModal}>Novo Contato</Button>
              <div className="flex flex-col gap-3">
                {contacts.map((contact) => (
                  <div
                    onClick={() => openEditContactModal(contact)}
                    className="bg-pink-500 p-6 w-60 cursor-pointer"
                  >
                    Name: {contact.name}
                  </div>
                ))}
              </div>
            </div>

            {contactBeingEdited && <EditContactModal />}
            <NewContactModal />
          </>
        )}
      </ContactsContext.Consumer>
    </ContactsProvider>
  );
};
