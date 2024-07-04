import { FC } from "react";

const ButtonPage = ({ number, onChange }) => {
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

const SelectedButtonPage = ({ number, onChange }) => {
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

interface Props {
  pages: number;
  currentPage: number;
}

const Paginacion: FC<Props> = ({ pages, currentPage, onChange }) => {
  return (
    <>
      <div className="flex items-center gap-4 p-[30px]">
        <div className="flex items-center gap-2">
          {[...Array(pages).keys()].map((_, index) => {
            return index + 1 === currentPage ? (
              <SelectedButtonPage number={index + 1} onChange={onChange} />
            ) : (
              <ButtonPage number={index + 1} onChange={onChange} />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Paginacion;
