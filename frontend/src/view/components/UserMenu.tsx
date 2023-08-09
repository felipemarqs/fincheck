import { ExitIcon } from '@radix-ui/react-icons';
import { DropdownMenu } from './DropdownMenu';
import { useAuth } from '../../app/hooks/useAuth';
export const UserMenu = () => {
  const { signout, user } = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-50 border border-teal-100 rounded-full w-12 h-12 flex items-center justify-center">
          <span className="text-sm tracking-[-0.5px] text-emerald-900 font-medium">
            {user?.name.slice(0, 2).toLocaleUpperCase()}
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-32">
        <DropdownMenu.Item
          onSelect={() => signout()}
          className="flex items-center justify-between"
        >
          Sair <ExitIcon className="w-6 h-6" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
