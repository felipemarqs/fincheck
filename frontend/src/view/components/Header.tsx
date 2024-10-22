import { useAuth } from '@/app/hooks/useAuth';
import { UserMenu } from './UserMenu';
import { Sheet, SheetContent, SheetTrigger } from './Sheet';
import { CircleUserRound, CreditCard, Menu, ScanLine } from 'lucide-react';
import { BankAccountIcon } from './icons/BankAccountIcon';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { user } = useAuth();
  return (
    <div className=" flex items-center p-4 justify-between border-b">
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="h-5 w-5 md:hidden" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-[#F1F3F5] flex flex-col gap-12">
          <Logo className="h-8 text-primary" />
          <nav className="flex flex-col  gap-6 text-lg font-medium">
            <div className="flex justify-start items-center gap-4">
              <BankAccountIcon />
              <span className="text-primary">Contas Bancárias</span>
            </div>

            <div className="flex justify-start items-center gap-4">
              <div className="w-11 h-11 bg-orange-100 rounded-full flex items-center justify-center border-2 border-white">
                <CircleUserRound className="text-orange-600" />
              </div>
              <span className="text-primary">Contatos</span>
            </div>

            <Link
              to="/contacts"
              className="flex justify-start items-center gap-4"
            >
              <div className="w-11 h-11 bg-orange-100 rounded-full flex items-center justify-center border-2 border-white">
                <CircleUserRound className="text-orange-600" />
              </div>

              <span className="text-primary">Contatos</span>
            </Link>
            <Link
              to="/credit-cards"
              className="flex justify-start items-center gap-4"
            >
              <div className="w-11 h-11 bg-purple-100 rounded-full flex items-center justify-center border-2 border-white">
                <CreditCard className="text-purple-600" />
              </div>

              <span className="text-primary">Cartões</span>
            </Link>

            <Link
              to="/installment-purchases"
              className="flex justify-start items-center gap-4"
            >
              <div className="w-11 h-11 bg-sky-100 rounded-full flex items-center justify-center border-2 border-white">
                <ScanLine className="text-sky-500" />
              </div>

              <span className="text-primary">Compras Parceladas</span>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <span className="font-semibold text-2xl text-primary">
        Bem vindo, {user?.name}
      </span>
      <UserMenu />
    </div>
  );
};
