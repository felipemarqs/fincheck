import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../components/icons/BankAccountTypeIcon";
import { useDashboard } from "../DashboardContext/useDashboard";

interface AccountCardProps {
  color: string;
  name: string;
  balance: number;
  type: "CASH" | "INVESTMENT" | "CHECKING";
}
export const AccountCard = ({ color, name, balance, type }: AccountCardProps) => {
  const { areValuesVisible } = useDashboard();
  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4  border-teal-950"
      style={{ borderColor: color }}
    >
      <div>
        <BankAccountTypeIcon type={type} />

        <span className="text-gray-800 tracking-[-0.5] font-medium mt-4 block">{name}</span>
      </div>
      <div>
        <span
          className={cn(
            "text-gray-800 tracking-[-0.5] font-medium mt-4 block",
            !areValuesVisible && "blur-sm"
          )}
        >
          {formatCurrency(balance)}
        </span>
        <span className="text-gray-600 text-sm">Saldo Atual</span>
      </div>
    </div>
  );
};
