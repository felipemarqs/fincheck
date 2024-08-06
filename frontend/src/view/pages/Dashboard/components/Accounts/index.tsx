import { EyeIcon } from '../../../../components/icons/EyeIcon';
import { AccountCard } from './AccountCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { AccountsSliderNavigation } from './AccountsSliderNavigation';
import { useAccountsController } from './useAccountsController';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { cn } from '../../../../../app/utils/cn';
import { Spinner } from '../../../../components/Spinner';
import { PlusIcon } from '@radix-ui/react-icons';

interface AccountsProps {
  className?: string;
}

export const Accounts = ({ className }: AccountsProps) => {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading,
    accounts,
    openNewAccountModal,
    currentBalance,
  } = useAccountsController();

  return (
    <div
      className={cn(
        'bg-gray-50 rounded-2xl h-full md:p-10 px-6 pt-8 flex flex-col border border-gray-400',
        className
      )}
    >
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="text-teal-950/50 fill-white w-12 h-12" />
        </div>
      )}

      {!isLoading && (
        <>
          <div className="flex-1 flex flex-col md:px-56 max-h-full lg:p-0 ">
            <strong className="text-primary tracking-[-1px] text-lg">
              Minhas contas
            </strong>
            {accounts.length > 0 && (
              <div className="h-full overflow-y-auto scrollbar-none flex flex-col gap-4 mb-8">
                {/*  <div
                    className="flex items-center justify-between mb-2 bg-red-500"
                    slot="wrapper-start"
                  >
                    <AccountsSliderNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  </div> */}

                {accounts.map((account) => (
                  <AccountCard data={account} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
