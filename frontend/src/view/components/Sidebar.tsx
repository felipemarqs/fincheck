import { useState } from 'react';
import { Logo } from './Logo';
import { LogoIcon } from './LogoIcon';
import { BankAccountIcon } from './icons/BankAccountIcon';
import { Menu, MenuItem, Sidebar as ReactProSidebar } from 'react-pro-sidebar';
import {
  ChevronRight,
  CircleUserRound,
  CreditCard,
  ScanLine,
} from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn('hidden lg:flex h-full', className)}>
      <ReactProSidebar collapsed={isCollapsed} className="bg-[#F1F3F5]">
        <div className="flex flex-col h-full">
          <div className="p-5 mb-8 mt-6 flex  items-center justify-between">
            <Link to="/">
              {!isCollapsed && <Logo className="h-8 text-primary" />}
              {isCollapsed && <LogoIcon className="h-8" />}
            </Link>

            <ChevronRight
              className={cn(
                'text-gray-500 transform transition-transform duration-200 ease-in',
                !isCollapsed ? '-rotate-180' : 'rotate-0'
              )}
              onClick={() => setIsCollapsed((prevState) => !prevState)}
            />
          </div>
          <div className="flex-1  h-full">
            <Menu>
              <MenuItem icon={<BankAccountIcon />}>
                <span className="text-primary">Contas Bancárias</span>
              </MenuItem>
              <Link to="/contacts">
                <MenuItem
                  icon={
                    <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center border-2 border-white">
                      <CircleUserRound className="text-orange-600" />
                    </div>
                  }
                >
                  <span className="text-primary">Contatos</span>
                </MenuItem>
              </Link>
              <Link to="/credit-cards">
                <MenuItem
                  icon={
                    <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center border-2 border-white">
                      <CreditCard className="text-purple-600" />
                    </div>
                  }
                >
                  <span className="text-primary">Cartões</span>
                </MenuItem>
              </Link>

              <Link to="/installment-purchases">
                <MenuItem
                  icon={
                    <div className="w-11 h-11 bg-sky-100 rounded-full flex items-center justify-center border-2 border-white">
                      <ScanLine className="text-sky-500" />
                    </div>
                  }
                >
                  <span className="text-primary">Compras Parceladas</span>
                </MenuItem>
              </Link>
            </Menu>
          </div>
          <div className="  p-4">
            <Button className="w-full" variant="ghost">
              Sair
            </Button>
          </div>
        </div>
      </ReactProSidebar>
    </div>
  );
};
