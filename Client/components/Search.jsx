import { useState } from 'react';
import customFetch from "../src/utils/utils";
import { useQuery } from 'react-query';
import Filters from './Filters';
import Loading from "./Loading";
import Card from "./Card";
import Pagination from "./Pagination";
import { addToCart } from '../Redux/Store/CartSlice';
import Error from './Error';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Search = () => {
  const dispatch = useDispatch();
  const [form, setFormData] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // 📌 Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const handleFormFromFilter = (formData) => {
    setFormData(formData);
    setCurrentPage(1);
  };

  const { data, isLoading, error } = useQuery(
    ['search', form],
    () =>
      customFetch.get('/getAll', {
        withCredentials: true,
        params: form,
      })
  );

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Item added to cart");
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const products = data?.data?.products || [];
  const totalPosts = products.length;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="relative w-full">

      {/* ⭐ Mobile Filter Toggle Button (Top-Left) */}
      <button
        className="
          md:hidden fixed top-24 left-4 z-[90] 
          px-2 py-1 rounded-xl text-white
          bg-gradient-to-r from-indigo-600 to-purple-600
          shadow-lg hover:scale-105 transition font-sm font-extralight
        "
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Close Filters" : "Filters"}
      </button>

      {/* Mobile Backdrop */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black/40 z-20 backdrop-blur-sm md:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}

      {/* Layout Wrapper */}
      <div className="flex w-full min-h-screen">

        {/* ⭐ Sidebar Filters (Fixed) */}
        <aside
          className={`
    fixed top-10 left-0 z-30
    w-[260px] h-screen
    bg-white dark:bg-gray-900/60
    shadow-xl border-r border-gray-900/30
    backdrop-blur-lg
    overflow-y-auto
    flex justify-center         /* horizontal centering */
    items-start md:items-start  /* align filters at top */
    transition-transform duration-300
    ${showFilters ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
        >
          <Filters sendFormData={handleFormFromFilter} setShowFilters={setShowFilters} />
        </aside>


        {/* ⭐ Main Content */}
        <main className="flex-1 p-6 ml-0 md:ml-[260px] pt-24 md:pt-20 bg-gray-100 dark:bg-slate-900 transition-all duration-300">

          <div className="flex flex-wrap justify-center gap-6">
            {currentProducts.map((img) => (
              <div
                key={img._id}
                className="
                  w-full sm:w-[48%] md:w-[45%] lg:w-[30%] xl:w-[28%]
                  hover:scale-[1.04] transition-transform duration-300
                "
              >
                <Card {...img}>
                  <button
                    className="
                      w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold
                      px-3 py-2 rounded-lg shadow-md transition
                    "
                    onClick={() => handleAddToCart(img)}
                  >
                    Add to Cart
                  </button>
                </Card>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPosts > postsPerPage && (
            <Pagination
              totalPosts={totalPosts}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Search;



