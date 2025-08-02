
import customFetch from "../src/utils/utils";
import Card from "./Card";
import { useQuery } from "react-query";
import Loading from "./Loading";
import { useState } from "react";
import Pagination from "./Pagination";
const Cards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const { isLoading, data, error } = useQuery({
    queryKey: ['images'],
    queryFn: () => customFetch.get("/getimages", {
      withCredentials: true,
    })
  })
  if (isLoading) {
    return (
      <Loading />
    )
  }
  const currentPosts = data.data.slice(firstPostIndex, lastPostIndex);
  if (error) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-4xl text-red-500 font-serif tracking-wider">{error.response.data}</p>
      </div>
    )
  }

  return (
    <>
      <div className="mt-2 w-full h-full flex flex-row justify-around flex-wrap">
        {currentPosts > 0 && currentPosts.map((img) => {
          const { _id, imagename, price, description, url, firstname } = img;
          return (
            <div key={_id} className="w-full h-full rounded-md sm:w-[45%] md:w-[40%] lg:w-[26%] xl:w-[24%] hover:scale-105 transition duration-300">
              <Card
                id={_id}
                imagename={imagename}
                price={price}
                description={description}
                url={url}
                firstname={firstname}
              />
            </div>
          )
        })}

      </div>
      <div className="flex justify-center items-center">
        <Pagination totalPosts={data.data.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div>
    </>
  )
}

export default Cards
