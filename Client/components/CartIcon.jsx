

import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
// eslint-disable-next-line react/prop-types
const CartIcon = ({ size }) => {
  const noOfItems = useSelector((state) => state.cartSlice.cart.length);

  return (
    <div className="relative mr-4 hover:scale-125 transition duration-200 p-1">
      <FaShoppingCart className="text-gray-200 h-full w-full rounded-lg hover:text-yellow-100" size={size} />
      <span className=" flex justify-center items-center absolute bottom-5 left-5 h-1 w-1 rounded-full bg-gray-100 p-2 text-center text-gray-800 font-serif font-bold text-sm hover:bg-yellow-100">{noOfItems}</span>
    </div>
  )
}

export default CartIcon
