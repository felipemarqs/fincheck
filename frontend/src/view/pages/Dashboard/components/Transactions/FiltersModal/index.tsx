import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../../components/Modal";
import { Button } from "../../../../../components/Button";
import { useFiltersModal } from "./useFiltersModal";
import { cn } from "../../../../../../app/utils/cn";

interface FiltersModalProps {
  open: boolean;
  onClose(): void;
}

const mockedAccounts = [
  {
    id: "123",
    name: "Nubank",
  },
  {
    id: "456",
    name: "XP Invest",
  },
  {
    id: "789",
    name: "Dinheiro",
  },
];

export const FiltersModal = ({ open, onClose }: FiltersModalProps) => {
  const { selectedBankAccountId, handleSelectBankAccount, seletedYear, handleChangeYear } =
    useFiltersModal();
  return (
    <Modal open={open} title="Receitas" onClose={onClose}>
      <div>
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">Conta</span>
        <div className="space-y-2 mt-2">
          {mockedAccounts.map(({ id, name }) => (
            <button
              key={id}
              onClick={() => handleSelectBankAccount(id)}
              className={cn(
                "p-2 rounded-2xl  w-full text-left text-gray-800 hover:bg-gray-50 transition-colors",
                id === selectedBankAccountId && "!bg-gray-200"
              )}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">Ano</span>

        <div className="w-52 mt-2 flex justify-between items-center">
          <button
            onClick={() => handleChangeYear(-1)}
            className="w-12 h-12 flex items-center justify-center"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <div className="flex-1 text-center">
            <span className="text-sm tracking-[-0.5px] font-medium">{seletedYear}</span>
          </div>
          <button
            onClick={() => handleChangeYear(1)}
            className="w-12 h-12 flex items-center justify-center"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Button className="w-full mt-10">Aplicar Filtros</Button>
    </Modal>
  );
};
