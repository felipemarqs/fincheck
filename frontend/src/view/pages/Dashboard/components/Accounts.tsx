import { EyeIcon } from "../../../components/icons/EyeIcon";

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
      <div className="bg-red-500 flex-1 flex flex-col justify-end">
        <div>Minhas contas</div>
        <div> contas</div>
      </div>
    </div>
  );
};
