import React from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";

interface PaginationProps {
  page: number;
  totalPages: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (count: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  perPage,
  onPageChange,
  onPerPageChange,
}) => {
  const handleFirst = () => onPageChange(1);
  const handleLast = () => onPageChange(totalPages);
  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };
  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPerPageChange(parseInt(e.target.value));
    onPageChange(1); // reset to first page
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10 text-sm text-gray-300">
      <div className="flex items-center space-x-2">
        {/* First Page */}
        <button
          onClick={handleFirst}
          disabled={page === 1}
          className={`p-2 rounded-md border border-gray-600 hover:bg-gray-700 transition ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="First Page"
        >
          <BiChevronsLeft size={20} />
        </button>

        {/* Previous */}
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`p-2 rounded-md border border-gray-600 hover:bg-gray-700 transition ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Previous Page"
        >
          <BiChevronLeft size={20} />
        </button>

        {/* Page Info */}
        <span className="text-gray-400 px-3">
          Page {page} of {totalPages}
        </span>

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={`p-2 rounded-md border border-gray-600 hover:bg-gray-700 transition ${
            page === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Next Page"
        >
          <BiChevronRight size={20} />
        </button>

        {/* Last Page */}
        <button
          onClick={handleLast}
          disabled={page === totalPages}
          className={`p-2 rounded-md border border-gray-600 hover:bg-gray-700 transition ${
            page === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Last Page"
        >
          <BiChevronsRight size={20} />
        </button>
      </div>

      {/* Items per page */}
      <div className="flex items-center gap-2">
        <label htmlFor="perPage" className="text-gray-400">
          Items per page:
        </label>
        <select
          id="perPage"
          value={perPage}
          onChange={handlePerPageChange}
          className="bg-black/60 border border-gray-700 text-gray-200 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          <option value={9}>9</option>
          <option value={15}>15</option>
          <option value={27}>27</option>
          <option value={36}>36</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
