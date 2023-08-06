import { Button } from "../../../../components/Button";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";

export const NewTransactionModal = () => {
  const { isNewTransactionModalOpen, closeNewTransactionModal, newTransationType } =
    useNewTransactionModalController();

  const isExpense = newTransationType === "EXPENSE";
  return (
    <Modal
      title={isExpense ? "Nova Despesa" : "Nova Receita"}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor {isExpense ? "da despesa" : "da receita"}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder={isExpense ? "Nome da despesa" : "Nome da receita"}
          />
          <Select
            placeholder="Categoria"
            options={[
              { value: "INVESTMENT", label: "Investimentos" },
              { value: "CHECKING", label: "Conta Corrente" },
              { value: "CASH", label: "Dinheiro Físico" },
            ]}
          />

          <Select
            placeholder={isExpense ? "Pagar com" : "Receber na conta"}
            options={[
              { value: "INVESTMENT", label: "Investimentos" },
              { value: "CHECKING", label: "Conta Corrente" },
              { value: "CASH", label: "Dinheiro Físico" },
            ]}
          />
        </div>

        <Button type="submit" className="w-full mt-6">
          Criar
        </Button>
      </form>
    </Modal>
  );
};