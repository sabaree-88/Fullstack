import { useState } from "react";

const usePagination = (initialPage = 1, itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);

  const startEntry = (currentPage - 1) * itemsPerPage + 1;
  const endEntry = Math.min(currentPage * itemsPerPage, totalEntries);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return {
    currentPage,
    totalPages,
    totalEntries,
    itemsPerPage,
    startEntry,
    endEntry,
    handlePageChange,
    setTotalPages,
    setTotalEntries,
  };
};

export default usePagination;
