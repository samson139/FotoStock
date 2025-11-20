// eslint-disable-next-line react/prop-types
const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const maxButtons = 10;
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(currentPage - half, 1);
  let end = start + maxButtons - 1;
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(end - maxButtons + 1, 1);
  }

  const visiblePages = pages.slice(start - 1, end);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-50">
      {/* Prev Button */}
      <button
        onClick={() => setCurrentPage(prev => prev - 1)}
        disabled={currentPage === 1}
        className={`
          px-4 py-2 rounded-lg font-semibold transition-all duration-300
          ${currentPage === 1
            ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 shadow-lg dark:hover:bg-blue-700"}
        `}
      >
        Prev
      </button>

      {/* Page Buttons */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`
            px-4 py-2 rounded-lg font-bold transition-all duration-300
            ${page === currentPage
              ? "bg-blue-600 text-white shadow-xl scale-105"
              : "bg-gray-200 dark:bg-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 hover:scale-105"}
          `}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => setCurrentPage(prev => prev + 1)}
        disabled={currentPage === totalPages}
        className={`
          px-4 py-2 rounded-lg font-semibold transition-all duration-300
          ${currentPage === totalPages
            ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 shadow-lg dark:hover:bg-blue-700"}
        `}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
