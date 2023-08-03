import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";
import { useAccountsController } from "./useAccountsController";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";
import { PlusIcon } from "@radix-ui/react-icons";

export const Accounts = () => {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading,
    accounts,
  } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl h-full md:p-10 px-6 py-8 flex flex-col">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="text-teal-950/50 fill-white w-12 h-12" />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="tracking-[-1px] text-white block">Saldo Total</span>
            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  `text-2xl text-white tracking-[-1px]`,
                  !areValuesVisible && "blur-md"
                )}
              >
                {formatCurrency(10000.0)}
              </strong>
              <button
                className="h-8 w-8 flex items-center justify-center"
                onClick={toggleValuesVisibility}
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            {accounts.length === 0 && (
              <>
                <div className="mb-2">
                  <strong className="text-white tracking-[-1px] text-lg">Minhas contas</strong>
                </div>

                <button className="mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col justify-center items-center gap-4 text-white hover:bg-teal-950/5 transition-colors">
                  <div className="h-11 w-11 rounded-full border-2 border-dashed border-white flex justify-center items-center">
                    <PlusIcon className="w-6 h-6" />
                  </div>
                  <span className="font-medium tracking-[-0.5px] block w-32 text-center">
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}
            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={windowWidth >= 560 ? 2.2 : 1.2}
                  onSlideChange={(swiper) => {
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    });
                  }}
                >
                  <div className="flex items-center justify-between mb-2" slot="container-start">
                    <strong className="text-white tracking-[-1px] text-lg">Minhas contas</strong>
                    <AccountsSliderNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  </div>

                  <SwiperSlide>
                    <AccountCard color="#7950f2" name="Nubank" balance={10000.0} type="CHECKING" />
                  </SwiperSlide>

                  <SwiperSlide>
                    <AccountCard color="#1C7B7B" name="Carteira" balance={5000.0} type="CASH" />
                  </SwiperSlide>

                  <SwiperSlide>
                    <AccountCard
                      color="#7950f2"
                      name="Nu Invest"
                      balance={10000.0}
                      type="INVESTMENT"
                    />
                  </SwiperSlide>

                  <SwiperSlide>
                    <AccountCard
                      color="#7950f2"
                      name="Nu Invest"
                      balance={10000.0}
                      type="INVESTMENT"
                    />
                  </SwiperSlide>

                  <SwiperSlide>
                    <AccountCard
                      color="#7950f2"
                      name="Nu Invest"
                      balance={10000.0}
                      type="INVESTMENT"
                    />
                  </SwiperSlide>

                  <SwiperSlide>
                    <AccountCard
                      color="#7950f2"
                      name="Nu Invest"
                      balance={10000.0}
                      type="INVESTMENT"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
