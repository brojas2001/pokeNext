'use client'
import { FC } from "react";

interface Props {
  pages: number;
  currentPage: number;
  onChange: (pageNumber: number) => void;
}

const Paginacion: FC<Props> = ({ pages, currentPage, onChange }) => {
  const maxVisibleButtons = 3; 


  const renderPageButtons = () => {
    const pageButtons = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage = Math.min(pages, startPage + maxVisibleButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
      const isCurrent = i === currentPage;
      pageButtons.push(
        isCurrent ? (
          <SelectedButtonPage key={i} number={i} onChange={onChange} />
        ) : (
          <ButtonPage key={i} number={i} onChange={onChange} />
        )
      );
    }

    return pageButtons;
  };

  return (
    <div className="flex items-center gap-4 p-[30px]">
      <div className="flex items-center gap-2">
        {currentPage > 1 && (
          <button
            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={() => onChange(currentPage - 1)}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              {"<"}
            </span>
          </button>
        )}
        {renderPageButtons()}

        {currentPage < pages && (
          <button
            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={() => onChange(currentPage + 1)}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              {">"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

const ButtonPage = ({ number, onChange }: { number: number; onChange: (pageNumber: number) => void; }) => {
  return (
    <button
      className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
      onClick={() => onChange(number)}
    >
      <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        {number}
      </span>
    </button>
  );
};

const SelectedButtonPage = ({ number, onChange }: { number: number; onChange: (pageNumber: number) => void; }) => {
  return (
    <button
      className="text-[40px] relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full bg-[#ff793f] text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
      onClick={() => onChange(number)}
    >
      <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        {number}
      </span>
    </button>
  );
};

export default Paginacion;

