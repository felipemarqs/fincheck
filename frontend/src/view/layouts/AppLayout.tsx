import { Outlet } from 'react-router-dom';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  MenuItemStyles,
} from 'react-pro-sidebar';
import { Button } from '../components/Button';
import { useState } from 'react';
import { ArrowBigDownDash, CircleUserRound } from 'lucide-react';
import { BankAccountIcon } from '../components/icons/BankAccountIcon';
import { Logo } from '../components/Logo';
import { LogoIcon } from '../components/LogoIcon';

export const AppLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className=" w-full h-full flex ">
      {/*  <Navbar /> */}
      {/*        <SystemVersion /> */}
      <div className="flex h-full ">
        <Sidebar collapsed={isCollapsed} className="bg-[#F1F3F5]">
          <div className="flex flex-col h-full">
            <div className="p-5 mb-8 mt-6 flex items-start justify-center">
              {!isCollapsed && <Logo className="h-8 text-primary" />}
              {isCollapsed && <LogoIcon className="h-8" />}
            </div>
            <div className="flex-1  h-full">
              <Menu>
                <MenuItem icon={<BankAccountIcon />}>
                  <span className="text-primary">Contas Bancárias</span>
                </MenuItem>
                <MenuItem
                  icon={
                    <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center border-2 border-white">
                      <CircleUserRound className="text-orange-600" />
                    </div>
                  }
                >
                  <span className="text-primary">Contatos</span>
                </MenuItem>
              </Menu>
            </div>
            <div className="  p-4">
              <Button className="w-full" variant="ghost">
                Sair
              </Button>
            </div>
          </div>
        </Sidebar>
      </div>
      <Button onClick={() => setIsCollapsed((prevState) => !prevState)}>
        {'>'}
      </Button>
      <Outlet />
    </div>
  );
};
