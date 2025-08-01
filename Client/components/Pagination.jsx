
// eslint-disable-next-line react/prop-types
const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Logic to show only 10 pages at a time
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
    <div className="fixed bottom-4 mx-auto">
      <button
        className="dark:bg-slate-100 join-item btn ml-1 font-semibold dark:text-black text-white"
        onClick={() => setCurrentPage((prev) => prev - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          className={`dark:bg-slate-100 join-item btn mx-1 ${page === currentPage ? 'dark:bg-blue-400 bg-blue-400 text-black' : ''}`}

          onClick={() => setCurrentPage(page)}
        >
          <span className="font-bold text-white dark:text-black">{page}</span>
        </button>
      ))}

      <button
        className="dark:bg-slate-100 join-item btn ml-1 font-semibold dark:text-black text-white"
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};


export default Pagination
