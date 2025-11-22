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

      {/* Mobile Filter Toggle Button */}
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

        {/* Sidebar Filters */}
        <aside
          className={`
            fixed top-10 left-0 z-30
            w-[260px] h-screen
            bg-white dark:bg-gray-900/60
            shadow-xl border-r border-gray-900/30
            backdrop-blur-lg
            overflow-y-auto
            flex justify-center
            items-start md:items-start
            transition-transform duration-300
            ${showFilters ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
        >
          <Filters sendFormData={handleFormFromFilter} setShowFilters={setShowFilters} />
        </aside>

        {/* Main Content */}
        {currentProducts.length === 0 ? (
          <div className="flex justify-center items-center min-h-screen w-full md:ml-[260px]">
            <p className="text-3xl font-sans text-gray-700 dark:text-gray-300 tracking-wide">
              No products found matching your criteria.
            </p>
          </div>
        ) : (
          <main className="flex-1 p-6 ml-0 md:ml-[260px] pt-24 md:pt-20 bg-gray-100 dark:bg-slate-900 transition-all duration-300">

            <div className="flex flex-wrap justify-center gap-6">
              {currentProducts.map((img) => {
                const { _id, imagename, price, description, url, firstname, updatedAt } = img;
                return (
                  <div
                    key={_id}
                    className="w-full sm:w-[48%] md:w-[45%] lg:w-[30%] xl:w-[28%] flex flex-col gap-4"
                  >
                    <Card
                      id={_id}
                      imagename={imagename}
                      price={price}
                      description={description}
                      url={url}
                      firstname={firstname}
                      uploadedAt={updatedAt}
                    />

                    <button
                      className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white font-mono py-1 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                      onClick={() => handleAddToCart(img)}
                    >
                      Add to Cart
                    </button>

                  </div>
                );
              })}
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
        )}

      </div>
    </div>
  );
};

export default Search;


