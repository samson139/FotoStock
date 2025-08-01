import { useSelector, useDispatch } from "react-redux"
import { removeFromCart, clearCart } from "../Redux/Store/CartSlice";
import { NavLink } from "react-router-dom";

const CartItems = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cartSlice.cart);

  return (
    items.length > 0 ? (
      <div className="relative w-full rounded-lg font-sans mx-auto mt-20">
        <div className="w-full mx-auto min-w-[280px] max-w-[650px] ">
          <div className="mx-4 dark:bg-slate-900 dark:text-amber-50 dark:shadow-md dark:shadow-gray-300 md:col-span-2 bg-gray-100 p-4 rounded-md shadow-lg shadow-gray-700 border-2 border-rounded border-slate-900">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-amber-50">Cart</h2>
            <hr className="border-gray-300 mt-4 mb-8" />
            <div className="space-y-4">
              {items.map((item) => {
                const { _id, imagename, price, url } = item;
                return (
                  <div key={_id} className="grid grid-cols-3 items-center gap-4">
                    <div className="col-span-2 flex items-center gap-4">
                      <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                        <img src={url} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-800 dark:text-amber-50">{imagename}</h3>
                        <button className="text-xs text-red-500 dark:text-amber-50 cursor-pointer mt-0.5" onClick={() => dispatch(removeFromCart({ _id }))}>Remove</button>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <h4 className="text-base font-bold text-gray-800 dark:text-amber-50">${price}</h4>
                    </div>
                  </div>
                )
              }
              )
              }
            </div>
            <hr className="border-gray-300 mt-4 mb-8" />
            <div className="flex justify-around">
              <button className="btn btn-primary" onClick={() => dispatch(clearCart())}>Reset</button>
              <NavLink to="/user/checkout">
                <button className="btn btn-primary">Checkout</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    )
      :
      <h2 className="w-full dark:text-gray-200 flex justify-center items-center text-2xl text-center font-bold text-gray-800">Cart is Empty!</h2>
  )
}

export default CartItems;
