import { useState } from "react";
import { useQuery } from "react-query";
import customFetch from "../src/utils/utils";
import Card from "./Card";
import Loading from "./Loading";
import Pagination from "./Pagination";

const Cards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const { isLoading, data, error } = useQuery({
    queryKey: ["images"],
    queryFn: () =>
      customFetch.get("/getimages", { withCredentials: true }),
  });

  if (isLoading) return <Loading />;

  if (error)
    return (
      <div className="flex justify-center items-center">
        <p className="text-3xl text-red-500 font-serif tracking-wide">
          {error.response?.data || "Error fetching images"}
        </p>
      </div>
    );
  console.log("data", data);
  const allPosts = data?.data || [];
  const currentPosts = allPosts.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="w-full min-h-screen px-4 py-8">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {currentPosts.map((img) => {
          const { _id, imagename, price, description, url, firstname, updatedAt } = img;
          return (
            <div
              key={_id}
              className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-lg 
                         hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out 
                         overflow-hidden animate-fadeIn"
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
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <Pagination
        totalPosts={allPosts.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Cards;
