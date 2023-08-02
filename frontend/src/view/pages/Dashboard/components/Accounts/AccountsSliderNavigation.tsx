import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

interface AccountsSliderNavigationProps {
  isBeginning: boolean;
  isEnd: boolean;
}

export const AccountsSliderNavigation = ({ isBeginning, isEnd }: AccountsSliderNavigationProps) => {
  const swiper = useSwiper();
  console.log("Swiper in Accounts Slider", swiper);
  return (
    <div>
      <button
        disabled={isBeginning}
        onClick={() => swiper.slidePrev()}
        className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
      >
        <ChevronLeftIcon className=" text-white h-6 w-6" />
      </button>
      <button
        disabled={isEnd}
        onClick={() => swiper.slideNext()}
        className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
      >
        <ChevronRightIcon className=" text-white h-6 w-6" />
      </button>
    </div>
  );
};
