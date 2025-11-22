import { useParams, useLocation, useNavigate } from "react-router-dom";
import customFetch from "../src/utils/utils";
import { useQuery } from "react-query";
import { Loading, Error } from "../components";

const Imagedetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    const from = location.state?.from || "/user";
    navigate(from);
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["image", id],
    queryFn: () =>
      customFetch.get(`/getimage/${id}`, {
        withCredentials: true,
      }),
  });

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const img = data?.data;

  const givenDate = new Date(img.updatedAt);
  const currentDate = new Date();
  const diffInDays = Math.floor((currentDate - givenDate) / (1000 * 60 * 60 * 24));

  return (
    <div
      className="
        pt-28 pb-16 min-h-screen flex justify-center items-start
        bg-gradient-to-b from-gray-100 to-gray-300
        dark:from-gray-900 dark:to-black
        transition-all duration-500
      "
    >

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="
          fixed left-6 top-28 z-50
          bg-white dark:bg-gray-800 text-gray-800 dark:text-white
          px-5 py-2 rounded-full font-medium shadow-xl
          border border-gray-300 dark:border-gray-700
          hover:shadow-2xl hover:scale-105 transition duration-300
        "
      >
        ← Back
      </button>

      {/* Card Container */}
      <div
        className="
          w-[90%] max-w-6xl rounded-3xl glass-card shadow-2xl
          flex flex-col md:flex-row gap-10 animate-fadeInUp
        "
      >

        {/* IMAGE */}
        <div className="flex-1">
          <img
            src={img.url}
            alt={img.imagename}
            className="
              w-full  h-[350px] md:h-[540px] object-cover rounded-2xl
              shadow-2xl hover:shadow-3xl transition-all duration-500
              hover:scale-[1.02]
            "
          />
        </div>

        {/* DETAILS */}
        <div className="flex-1 flex flex-col justify-between space-y-2 dark:text-white">

          {/* Title + Description */}
          <div className="space-y-10 py-8">
            <h1
              className="
                text-center text-4xl md:text-5xl font-extrabold tracking-wide
                text-gray-900 dark:text-amber-200
              "
            >
              {img.imagename}
            </h1>

            <p
              className="
                text-center text-gray-700 px-4 dark:text-gray-300
                text-lg leading-relaxed italic
              "
            >
              {img.description}
            </p>
          </div>

          {/* Uploaded By + Price */}
          <div
            className="
              flex justify-between items-center
        
              pt-6 px-4 rounded-xl
            "
          >
            {/* LEFT → Uploaded By */}
            <div className="text-md">
              <span className="font-semibold text-gray-900 dark:text-amber-300">
                Uploaded By:
              </span>
              <span className="ml-2 font-light italic text-gray-700 dark:text-gray-200">
                {img.firstname[0].toUpperCase() + img.firstname.slice(1).toLowerCase()}
              </span>
            </div>

            {/* RIGHT → Price */}
            <div className="text-md">
              <span className="font-bold text-green-700 dark:text-green-400 text-xl">
                ${img.price}
              </span>
            </div>
          </div>

          {/* UPLOAD TIME */}
          {/* UPLOAD TIME BADGE */}
          <div
            className="
    absolute top-0 right-4
    bg-gradient-to-r from-red-500 to-red-700
    text-white text-xs md:text-sm font-semibold
    px-4 py-2 rounded-full shadow-xl
    tracking-wide animate-fadeInUp
  "
          >
            {diffInDays === 0
              ? "Today"
              : diffInDays === 1
                ? "1 Day Ago"
                : `${diffInDays} Days Ago`}
          </div>


        </div>
      </div>

    </div>
  );
};

export default Imagedetail;


