import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";
import { useAccountsController } from "./useAccountsController";

export const Accounts = () => {
  const { sliderState, setSliderState, windowWidth } = useAccountsController();
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
      <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
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
              <AccountCard color="#7950f2" name="Nu Invest" balance={10000.0} type="INVESTMENT" />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard color="#7950f2" name="Nu Invest" balance={10000.0} type="INVESTMENT" />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard color="#7950f2" name="Nu Invest" balance={10000.0} type="INVESTMENT" />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard color="#7950f2" name="Nu Invest" balance={10000.0} type="INVESTMENT" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};
