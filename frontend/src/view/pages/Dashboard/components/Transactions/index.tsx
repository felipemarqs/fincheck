import { FilterIcon } from '../../../../components/icons/FilterIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MONTHS } from '../../../../../app/config/constants';
import { SliderOption } from './SliderOption';
import { TransactionsSliderNavigation } from './TransactionsSliderNavigation';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';
import { useTransactionsController } from './useTransactionsController';
import { cn } from '../../../../../app/utils/cn';
import { Spinner } from '../../../../components/Spinner';
import emptyStateImage from '../../../../../assets/EmptyState.svg';
import { TransactionTypeDropdown } from './TransactionTypeDropdown';
import { FiltersModal } from './FiltersModal';
import { formatDate } from '../../../../../app/utils/formatDate';
import { EditTransactionModal } from '../../modals/EditTransactionModal';

export const Transactions = () => {
  const {
    areValuesVisible,
    isInitialLoading,
    transactions,
    isLoading,
    isFiltersModalOpen,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    handleApplyFilters,
    handleChangeFilters,
    filters,
    isEditModalOpen,
    handleOpenEditTransactionModal,
    handleCloseEditTransactionModal,
    transactionBeingEdit,
  } = useTransactionsController();

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
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />

          <header>
            <div className="flex justify-between items-center">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />

              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                initialSlide={filters.month}
                slidesPerView={3}
                centeredSlides
                onSlideChange={(swiper) => {
                  handleChangeFilters('month')(swiper.realIndex);
                }}
              >
                <TransactionsSliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={index}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
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
                    <p className="text-gray-700">
                      Não encontramos nenhuma transação!
                    </p>
                  </>
                )}
              </div>
            )}
            {hasTransations && !isLoading && (
              <>
                {transactionBeingEdit && (
                  <EditTransactionModal
                    open={isEditModalOpen}
                    onClose={handleCloseEditTransactionModal}
                    transaction={transactionBeingEdit}
                  />
                )}

                {transactions.map((transaction) => (
                  <div
                    className="bg-white p-4 rounded-2xl items-center justify-between flex gap-4"
                    key={transaction.id}
                    role="button"
                    onClick={() => handleOpenEditTransactionModal(transaction)}
                  >
                    <div className="flex-1 flex items-center gap-3 ">
                      <CategoryIcon
                        type={
                          transaction.type === 'EXPENSE' ? 'expense' : 'income'
                        }
                        category={transaction.category?.icon}
                      />
                      <div>
                        <strong className="font-bold tracking-[-0.5px] block">
                          {transaction.name}
                        </strong>
                        <span className="text-sm text-gray-600">
                          {formatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        'tracking-[-0.5px] font-medium',
                        !areValuesVisible && 'blur-sm',
                        transaction.type === 'EXPENSE'
                          ? 'text-red-800'
                          : 'text-green-800'
                      )}
                    >
                      {transaction.type === 'EXPENSE' ? '-' : '+'}

                      {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
