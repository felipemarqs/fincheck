import { useSwiper } from "swiper/react";
import { cn } from "../../../../../app/utils/cn";

interface SliderOptionProps {
  isActive: boolean;
  month: string;
  index: number;
}

export const SliderOption = ({ isActive, month, index }: SliderOptionProps) => {
  const swiper = useSwiper();
  return (
    <button
      onClick={() => swiper.slideTo(index)}
      className={cn(
        `w-full rounded-full h-12 text-gray-800 text-sm tracking-[0.5] font-medium`,
        isActive && "bg-white"
      )}
    >
      {month}
    </button>
  );
};
