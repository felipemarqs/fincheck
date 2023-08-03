import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { TransactionsSliderNavigation } from "./TransactionsSliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useTransactionsController } from "./useTransactionsController";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";
import emptyStateImage from "../../../../../assets/EmptyState.svg";

export const Transactions = () => {
  const { areValuesVisible, isInitialLoading, transactions, isLoading } =
    useTransactionsController();

  const hasTransations = transactions.length > 0;
  return (
    <div className="bg-gray-100 rounded-2xl h-full p-10 flex flex-col">
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className=" w-12 h-12" />
        </div>
      )}

      {!isInitialLoading && (
        <>
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
                    {({ isActive }) => (
                      <SliderOption isActive={isActive} month={month} index={index} />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 overflow-y-auto flex-1">
            {isLoading && (
              <div className="h-full flex flex-col items-center justify-center">
                <Spinner className="w-10 h-10" />
              </div>
            )}
            {!hasTransations && !isLoading && (
              <div className="h-full flex flex-col items-center justify-center">
                {!hasTransations && (
                  <>
                    <img src={emptyStateImage} alt="Empty Illustration" />
                    <p className="text-gray-700">Não encontramos nenhuma transação!</p>
                  </>
                )}
              </div>
            )}
            {hasTransations && !isLoading && (
              <>
                <div className="bg-white p-4 rounded-2xl items-center justify-between flex gap-4">
                  <div className="flex-1 flex items-center gap-3 ">
                    <CategoryIcon type="expense" />
                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">Almoço</strong>
                      <span className="text-sm text-gray-600">14/14/2000</span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "text-red-800 tracking-[-0.5px] font-medium",
                      !areValuesVisible && "blur-sm"
                    )}
                  >
                    - {formatCurrency(1233.33)}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl items-center justify-between flex gap-4">
                  <div className="flex-1 flex items-center gap-3 ">
                    <CategoryIcon type="income" />
                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">Salário</strong>
                      <span className="text-sm text-gray-600">14/14/2000</span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "text-green-800 tracking-[-0.5px] font-medium",
                      !areValuesVisible && "blur-sm"
                    )}
                  >
                    - {formatCurrency(3323.33)}
                  </span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
