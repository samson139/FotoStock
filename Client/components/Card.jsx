/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom"

const Card = ({ id, imagename, price, description, url, firstname, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`image/${id}`, { state: { from: location } })
  }
  return (
    <div className="w-[70%] h-full md:w-[90%] lg:w-[72%] mx-auto p-1 mt-1 mb-1" onClick={handleClick}>
      <img className="w-full h-[250px] lg:h-[200px] rounded-lg hover:opacity-70" src={url} alt={imagename} />
      <div className="flex justify-between px-2">
        <p className="dark:text-amber-100 font-bold font-mono tracking-widest text-gray-700 text-l pt-2">
          {imagename}</p>
        <span className="dark:text-amber-100 w-15 text-sm my-auto tracking-widest font-bold text-gray-800">{price}$</span>
      </div>
      <p className="dark:text-amber-50 text-gray-700 tracking-widest text-sm px-2 overflow-scroll mb-1">{description} </p>
      <div className='dark:bg-slate-600 flex justify-between items-center bg-slate-200 rounded-2xl mt-auto'>
        <div className='dark:text-amber-100 text-gray-600 font-semibold tracking-wider px-2'>By {firstname ? (firstname[0] + firstname.slice(1).toLowerCase()) : "anonymous"}</div>
        {children}
      </div>
    </div>
  )
}


export default Card
