/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom";

const Card = ({
  id,
  imagename,
  price,
  description,
  url,
  firstname,
  uploadedAt,
  children
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`image/${id}`, { state: { from: location } });
  };

  return (
    <div
      onClick={handleClick}
      className="
        group relative backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 
        border border-white/30 dark:border-gray-600/30 rounded-3xl
        shadow-xl overflow-hidden mx-auto cursor-pointer
        w-full max-w-sm h-full flex flex-col justify-between transition-all duration-500 ease-out
        hover:scale-[1.04] hover:shadow-2xl hover:border-white/60
        hover:dark:border-gray-400
      "
    >
      {/* SHIMMER HOVER EFFECT */}
      <div className="
        absolute inset-0 opacity-0 group-hover:opacity-20 
        bg-gradient-to-r from-transparent via-white to-transparent 
        dark:via-gray-300
        transition-opacity duration-500 pointer-events-none
        animate-shimmer
      "></div>

      {/* Top Content */}
      <div className="flex-1 flex flex-col">
        {/* IMAGE */}
        <div className="relative h-60">
          <img
            src={url}
            alt={imagename}
            className="w-full h-full object-cover rounded-t-3xl 
                       transition-all duration-400 group-hover:opacity-80"
          />
        </div>

        {/* TITLE + DESCRIPTION */}
        <div className="px-5 py-4 flex-1 flex flex-col">
          <h3 className="text-xl font-extrabold bg-gradient-to-r 
                         from-blue-700 to-purple-600 dark:from-amber-300 dark:to-pink-300
                         bg-clip-text text-transparent tracking-wide mb-1">
            {imagename}
          </h3>

          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-2 flex-1">
            {description}
          </p>
        </div>
      </div>

      {/* UPLOAD INFO + PRICE */}
      <div className="px-5 py-3 flex justify-between items-center 
                      bg-white/50 dark:bg-gray-700/50 rounded-b-3xl backdrop-blur-md mt-auto">
        <div className="flex flex-col text-xs font-medium text-gray-600 dark:text-gray-400">
          <span>
            {uploadedAt
              ? new Date(uploadedAt).toLocaleDateString()
              : "Unknown date"}
          </span>
          <span>
            By{" "}
            {firstname
              ? firstname[0].toUpperCase() + firstname.slice(1).toLowerCase()
              : "Anonymous"}
          </span>
        </div>

        <span className="text-lg font-extrabold text-blue-700 dark:text-blue-400">
          ${price}
        </span>
      </div>
      <div className="px-5 py-3 ">
        {children}
      </div>
    </div>
  );
};

export default Card;




