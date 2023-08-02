import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { TransactionsSliderNavigation } from "./TransactionsSliderNavigation";

export const Transactions = () => {
  return (
    <div className="bg-gray-100 rounded-2xl h-full p-10">
      <header>
        <div className="flex justify-between items-center">
          <button className="flex items-center gap-2">
            <TransactionsIcon />
            <span className="text-gray-800 text-sm tracking-[0.5] font-medium">Transações</span>
            <ChevronDownIcon className="text-gray-900" />
          </button>

          <button>
            <FilterIcon />
          </button>
        </div>

        <div className="mt-6 relative">
          <Swiper slidesPerView={3} centeredSlides>
            <TransactionsSliderNavigation />
            {MONTHS.map((month, index) => (
              <SwiperSlide>
                {({ isActive }) => <SliderOption isActive={isActive} month={month} index={index} />}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </header>

      <div className="mt-4">Conteudo</div>
    </div>
  );
};
