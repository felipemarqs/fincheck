import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

/* interface TransactionsSliderNavigationProps {
  isBeginning: boolean;
  isEnd: boolean;
} */

export const TransactionsSliderNavigation = () => {
  const swiper = useSwiper();

  return (
    <>
      <button
        //disabled={isBeginning}
        onClick={() => swiper.slidePrev()}
        className="absolute left-0 top-1/2 bg-gradient-to-r from-gray-100 to-transparent z-10 -translate-y-1/2 w-12 h-12 flex items-center justify-center"
      >
        <ChevronLeftIcon className=" text-gray-800 h-6 w-6" />
      </button>
      <button
        //disabled={isEnd}
        onClick={() => swiper.slideNext()}
        className="absolute right-0 top-1/2 bg-gradient-to-l from-gray-100 to-transparent z-10  -translate-y-1/2 w-12 h-12 flex items-center justify-center"
      >
        <ChevronRightIcon className=" text-gray-800 h-6 w-6" />
      </button>
    </>
  );
};
