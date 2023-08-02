import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { EyeIcon } from "../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";

export const Accounts = () => {
  return (
    <div className="bg-teal-900 rounded-2xl h-full md:p-10 px-6 py-8 flex flex-col">
      <div>
        <span className="tracking-[-1px] text-white block">Saldo Total</span>
        <div className="flex items-center gap-2">
          <strong className="text-2xl text-white tracking-[-1px]">R$ 1000,00</strong>
          <button className="h-8 w-8 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end">
        <div className="flex items-center justify-between">
          <strong className="text-white tracking-[-1px] text-lg">Minhas contas</strong>

          <div>
            <button
              disabled
              className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
            >
              <ChevronLeftIcon className=" text-white h-6 w-6" />
            </button>
            <button className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40">
              <ChevronRightIcon className=" text-white h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="mt-4">
          {" "}
          <AccountCard color="#7950f2" name="Nubank" balance={10000.0} type="CHECKING" />
          <AccountCard color="#1C7B7B" name="Carteira" balance={5000.0} type="CASH" />
          <AccountCard color="#7950f2" name="Nu Invest" balance={10000.0} type="INVESTMENT" />
        </div>
      </div>
    </div>
  );
};
