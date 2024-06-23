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
        'bg-gray-50 rounded-2xl h-full md:p-10 px-6 py-8 flex flex-col border border-gray-400',
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
          <div className="flex-1 flex flex-col  max-h-full ">
            {accounts.length > 0 && (
              <div className="h-full">
                <Swiper
                  direction={'vertical'}
                  spaceBetween={52}
                  slidesPerView={windowWidth >= 560 ? 3.1 : 2.2}
                  onSlideChange={(swiper) => {
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    });
                  }}
                  style={{ height: '100%' }}
                >
                  <div
                    className="flex items-center justify-between mb-2"
                    slot="container-start"
                  >
                    <strong className="text-primary tracking-[-1px] text-lg">
                      Minhas contas
                    </strong>
                    {/* <AccountsSliderNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    /> */}
                  </div>

                  {accounts.map((account) => (
                    <SwiperSlide key={account.id}>
                      <AccountCard data={account} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
