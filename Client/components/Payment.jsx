
import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "../Redux/Store/CartSlice";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import { Form } from "react-router-dom";

const Payment = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cartSlice.cart);
  let total = 0;
  return (
    <div className="w-full h-full flex flex-col justify-start items-center md:flex-row md:justify-around md:items-start gap-2 rounded-lg p-6 mt-14">
      <div className="flex-col justify-center items-center w-[70%] rounded-lg px-6 min-w-[450px] max-w-[400px] border border-gray-400 py-4">
        <h2 className="dark:text-amber-50 text-md font-bold text-gray-800 border-b-2 border-gray-300 text-center py-2">Your Purchase</h2>
        {items.map((item) => {
          const { _id, imagename, price, url } = item;
          total += price;
          return (
            <div key={_id} className="grid grid-cols-3 items-center border-b-2 border-gray-300">
              <div className="col-span-2 flex items-center gap-1 p-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <img src={url} className="w-full h-full rounded-lg object-contain" />
                </div>
                <div>
                  <h3 className="dark:text-amber-50 text-base font-bold text-gray-800">{imagename}</h3>
                </div>
              </div>
              <div className="ml-auto">
                <h4 className="dark:text-amber-50 text-base font-bold text-gray-800">${price}</h4>
              </div>
            </div>
          )
        }
        )
        }
      </div>
      <div className="relative rounded-lg p-8 border-2 border-slate-900 min-w-[450px]">
        <p className="font-mono tracking-wider font-semibold text-center mt-2 text-slate-950 dark:text-amber-50">Enter your card details</p>
        <Form className="mt-6 mx-auto flex flex-col justify-center items-center gap-4">
          <FormInput label="Card Number" type="text" id="cardnumber" name="cardnumber" required />
          <FormInput label="Name" type="text" id="cardOwner" name="cardOwner" required />
          <FormInput label="Valid Until" type="text" id="expiredate" name="expiredate" required />
          <FormInput label="CVV" type="password" id="cvv" name="cvv" required />
        </Form>
        <div className="flex flex-col justify-center items-center gap-2 ">
          <div className="w-full flex flex-col dark:text-gray-100 text-gray-900 border-2 border-gray-400 rounded-lg py-4 px-2 mt-4">
            <h2 className="font-mono font-extrabold border-b-2 border-gray-800">Order Summary</h2>
            <p className="w-full flex justify-between font-extralight px-2 border-b-2 border-gray-800"><span>Total no of items:</span><span className="font-mono">{items.length}</span> </p>
            <p className="w-full flex justify-between font-sm font-extralight px-2 border-b-2 border-gray-800"><span>Tax Percentage</span> <span className="font-mono">10%</span></p>
            <p className="w-full flex justify-between font-sm font-extralight px-2 border-b-2 border-gray-800"><span>Cost of the items:</span><span className="font-mono"> {total}$</span></p>
            <p className="w-full flex justify-between font-sm font-extralight px-2"><span>Total amount:</span><span className="font-mono"> {total * 10 * 0.01 + total}$</span></p>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-2 md:flex-row md:justify-around py-4">
            <Link to="/user/checkout"><button className="btn btn-primary">Back</button> </Link>
            <Link to="/user/success"><button className="btn btn-primary" onClick={() => dispatch(clearCart())}>Confirm Pay</button></Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Payment
