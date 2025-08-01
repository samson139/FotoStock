import { useParams } from "react-router-dom"
import customFetch from "../src/utils/utils";
import { useQuery } from "react-query";
import { Loading, Error } from "../components"
import { useLocation, useNavigate } from 'react-router-dom';


const Imagedetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    const from = location.state?.from || '/user';
    navigate(from);
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ['image'],
    queryFn: () => customFetch.get(`/getimage/${id}`, {
      withCredentials: true,
    })
  })


  if (isLoading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  const img = data?.data;
  const givenDateStr = data?.data.updatedAt
  const givenDate = new Date(givenDateStr);
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = currentDate - givenDate;
  console.log("diff", diffInMs);
  // Convert milliseconds to days
  const msInDay = 1000 * 60 * 60 * 24;
  const diffInDays = Math.floor(diffInMs / msInDay);
  console.log("diffInDays", diffInDays);
  return (
    <>
      <button className="fixed left-10 top-70 md:top-24 btn btn-info" onClick={handleBack}>Back</button>
      <div className="mt-36 w-[67%] md:w-[70%] h-full max-w-[900px] mx-auto flex-col justify-between content-center items-center rounded-lg md:mt-10 md:flex md:flex-row">
        <div className="w-full max-w-[500px] h-[300px] md:h-[500px] mr-6 mx-auto">
          <img src={img.url} alt="its a cat" className="w-full h-full border border-gray-300 rounded-xl shadow-2xl shadow-gray-900" />
        </div>
        <div className="py-2 dark:text-amber-100 ">
          <h1 className="border-b-2 border-gray-700"><span className="dark:text-orange-500 font-mono sm:text-sm font-semibold tracking-wider text-green-800 lg:text-xl">Image name:</span><span className="font-light dark:text-gray-200 text-black tracking-wider italic">{img.imagename}</span> </h1>
          <h2 className="border-b-2 border-gray-700"><span className="dark:text-orange-500 font-mono sm:text-sm font-semibold tracking-wider text-green-800 lg:text-xl">Description: </span> <span className="font-light dark:text-gray-200 text-black tracking-wider italic">{img.description}</span></h2>
          <h3 className="border-b-2 border-gray-700"><span className="dark:text-orange-500 font-mono sm:text-sm font-semibold tracking-wider text-green-800 lg:text-xl">Uploaded by:</span> <span className="font-light dark:text-gray-200 text-black tracking-widest italic">{img.firstname[0] + img.firstname.slice(1).toLowerCase()}</span></h3>
          <h4 className="border-b-2 border-gray-700"><span className="dark:text-orange-500 font-mono sm:text-sm font-semibold tracking-wider text-green-800 lg:text-xl">Price:</span><span className="font-light dark:text-gray-200 text-black tracking-widest italic"> {img.price}$</span></h4>
          <h5 className="dark:text-orange-500 font-serif text-sm text-center font-semibold tracking-widest text-green-900"><span className="font-mono tracking-widest italic font-bold">Image {diffInDays == 0 ? `is uploaded today` : diffInDays == 1 ? `was uploaded 1 day ago` : `was uploaded ${diffInDays} days ago`}</span> </h5>
        </div>
      </div>
    </>
  )
}
export default Imagedetail;
