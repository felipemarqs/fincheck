import {
  CreditCardsContext,
  CreditCardsProvider,
} from './components/CreditCardsContext';
import { NewCreditCardModal } from './modals/NewCreditCardModal';

import { Card } from '@/view/components/Card';
import { ChevronRight, CreditCard, Edit, PlusIcon } from 'lucide-react';
import { EditCreditCardModal } from './modals/EditCreditCardModal';

export const CreditCards = () => {
  return (
    <CreditCardsProvider>
      <CreditCardsContext.Consumer>
        {({
          creditCards,
          openEditCreditCardModal,
          openNewCreditCardModal,
          creditCardBeingEdited,
        }) => (
          <>
            <div className=" w-full h-full  overflow-y-auto">
              <div className="grid grid-cols-2 w-full lg:p-10 lg:px-16 p-4 gap-4 ">
                <div className="flex justify-center lg:col-span-1 col-span-2">
                  <Card
                    className="w-full max-w-md p-6 grid gap-14 cursor-pointer lg:col-span-1 col-span-2 "
                    // onClick={() => openEditCreditCardCardModal(creditCard)}
                  >
                    <button
                      className="rounded-2xl flex flex-col justify-center items-center gap-4 text-white hover:bg-teal-950/5 transition-colors"
                      onClick={openNewCreditCardModal}
                    >
                      <div className="h-11 w-11 rounded-full border-2 border-dashed border-gray-700 flex justify-center items-center">
                        <PlusIcon className="w-6 h-6 text-gray-700" />
                      </div>
                      <span className="font-medium tracking-[-0.5px] block w-32 text-center text-gray-700">
                        Criar um novo cartão
                      </span>
                    </button>
                  </Card>
                </div>

                {creditCards.map((creditCard) => (
                  <div className="flex justify-center lg:col-span-1 col-span-2 ">
                    <Card
                      className="w-full max-w-md p-6 grid gap-14 cursor-pointer "
                      style={{ borderColor: creditCard.color }}
                    >
                      <div className="flex items-center justify-between ">
                        <div className="flex items-center gap-4 ">
                          <CreditCard
                            className="w-12 h-12"
                            style={{ color: creditCard.color }}
                          />
                          <div className="grid gap-1">
                            <div className="font-semibold text-xl">
                              {creditCard.name}
                            </div>
                            <div className="text-muted-foreground text-sm">
                              {creditCard.bankAccount.name}
                            </div>
                          </div>
                        </div>
                        <div className="flex  gap-4">
                          <Edit
                            onClick={() => openEditCreditCardModal(creditCard)}
                          />

                          <ChevronRight
                            onClick={() => openEditCreditCardModal(creditCard)}
                          />
                        </div>
                      </div>
                      <div className="grid gap-4">
                        {/*  <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-1">
                            <span>Fatura Atual</span>
                            <span>R${1000}</span>
                          </div>
                        </div> */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="grid gap-1 text-left">
                            <div className="text-muted-foreground text-sm">
                              Limite Disponível
                            </div>
                            <div className="font-semibold text-xl">
                              R${creditCard.availableLimit}
                            </div>
                          </div>
                          <div className="grid gap-1 text-left">
                            <div className="text-muted-foreground text-sm">
                              Fatura Atual
                            </div>
                            <div className="font-semibold text-xl">
                              R${creditCard.availableLimit}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {creditCardBeingEdited && <EditCreditCardModal />}
            <NewCreditCardModal />
          </>
        )}
      </CreditCardsContext.Consumer>
    </CreditCardsProvider>
  );
};
