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
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`image/${id}`, { state: { from: location } });
  };

  return (
    <div
      className="
        group relative h-full backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 
        border border-white/30 dark:border-gray-600/30 rounded-3xl
        shadow-xl mx-auto cursor-pointer
        w-full max-w-sm flex flex-col transition-all duration-500 ease-out
        hover:scale-[1.04] hover:shadow-2xl hover:border-white/60
        hover:dark:border-gray-400
      "
    >

      {/* SHIMMER EFFECT */}
      <div
        className="
          absolute inset-0 opacity-0 group-hover:opacity-20 
          bg-gradient-to-r from-transparent via-white to-transparent 
          dark:via-gray-300 transition-opacity duration-500 pointer-events-none
          animate-shimmer
        "
      ></div>

      {/* IMAGE */}
      <div className="relative h-60 w-full" onClick={handleClick}>
        <img
          src={url}
          alt={imagename}
          className="
            w-full h-full object-cover rounded-t-3xl 
            transition-all duration-400 group-hover:opacity-80
          "
        />
      </div>

      {/* INFORMATION */}
      <div className="px-5 py-3 flex flex-col flex-1">
        <h3
          className="
            text-xl font-extrabold bg-gradient-to-r 
            from-blue-700 to-purple-600 dark:from-amber-300 dark:to-pink-300
            bg-clip-text text-transparent tracking-wide
          "
        >
          {imagename}
        </h3>

        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* FOOTER */}
      <div
        className="
          px-5 py-3 flex justify-between items-center 
          bg-white/50 dark:bg-gray-700/50 rounded-b-3xl backdrop-blur-md
        "
      >
        <div className="flex flex-col text-xs font-medium text-gray-600 dark:text-gray-400">
          <span>
            {uploadedAt
              ? new Date(uploadedAt).toLocaleDateString()
              : "Unknown date"}
          </span>
          <span>
            By {firstname
              ? firstname[0].toUpperCase() + firstname.slice(1).toLowerCase()
              : "Anonymous"}
          </span>
        </div>

        <span className="font-sans text-blue-700 dark:text-blue-400">
          ${price}
        </span>
      </div>
    </div>
  );
};

export default Card;
