import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, className }) => {
  if (totalPages <= 1) return null;
  return (
    <div className={`flex justify-center items-center mt-6 gap-2 ${className || ""}`}>
      <button
        className="px-3 py-1 rounded bg-gray-200 dark:bg-zinc-800 text-foreground dark:text-white font-semibold"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="mx-2 text-base font-medium">Page {currentPage} of {totalPages}</span>
      <button
        className="px-3 py-1 rounded bg-gray-200 dark:bg-zinc-800 text-foreground dark:text-white font-semibold"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
