import { useState, useEffect } from 'react';
import customFetch from "../src/utils/utils";
import { useQuery } from 'react-query';
import Filters from './Filters';
import Loading from "./Loading";
import Card from "./Card";
import { addToCart } from '../Redux/Store/CartSlice';
import Error from './Error';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Search = () => {
  const dispatch = useDispatch();
  const [form, setFormData] = useState("");
  const [showFilters, setShowFilters] = useState(false)


  const handleFormFromFilter = (formData) => {
    setFormData(formData);

  }

  const { data, isLoading, error } = useQuery(
    ['search', form],
    () => customFetch.get('/getAll',
      {
        withCredentials: true,
        params: form,
      }),
  );
  useEffect(() => {
    console.log('Form data:', form);
  }, [form]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Item added to cart")

  };

  if (isLoading) {
    return (
      <Loading />
    )
  }
  if (error) {
    return (
      <Error />
    )
  }

  return (

    <div className="w-full relative mt-0">
      {/* Toggle Button for Mobile */}
      <button
        className="dark:bg-yellow-500 dark:text-black md:hidden p-2 m-2 bg-gray-900 text-white rounded-lg"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {/* Backdrop for Mobile */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-10 md:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}

      {/* Layout */}
      <div className="flex w-full h-screen overflow-hidden">

        {/* Filters Sidebar */}
        <div
          className={`
          fixed top-0 left-0 z-20 w-[250px] h-full bg-white shadow-lg overflow-y-auto
          transform transition-transform duration-300
          ${showFilters ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:w-[250px]
        `}
        >
          <Filters sendFormData={handleFormFromFilter} />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 ml-0">
          <div className="w-full flex justify-evenly flex-wrap gap-y-2 gap-x-4">
            {data?.data?.products?.map((img) => {
              const { _id, imagename, price, description, url, firstname } = img
              return (
                <div
                  key={_id}
                  className="w-full sm:w-[48%] md:w-[45%] lg:w-[30%] xl:w-[28%] hover:scale-105 transition duration-300"
                >
                  <Card
                    id={_id}
                    imagename={imagename}
                    price={price}
                    description={description}
                    url={url}
                    firstname={firstname}
                  >
                    <button
                      className="w-[100%] text-sm btn btn-primary bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                      onClick={() => handleAddToCart(img)}
                    >
                      Add
                    </button>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
