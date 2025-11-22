import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../Redux/Store/CartSlice";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import { Form } from "react-router-dom";

const Payment = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cartSlice.cart);
  let total = 0;

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center items-start gap-6 p-4 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

      {/* Items List */}
      <div className="w-full md:w-1/2 lg:w-2/5 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-4">
        <h2 className="text-center text-xl md:text-2xl font-bold text-gray-800 dark:text-amber-50 border-b-2 border-gray-300 dark:border-gray-600 pb-2">
          Your Purchase
        </h2>
        {items.map((item) => {
          const { _id, imagename, price, url } = item;
          total += price;
          return (
            <div key={_id} className="grid grid-cols-3 items-center border-b border-gray-300 dark:border-gray-600 py-2">
              <div className="col-span-2 flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md">
                  <img src={url} className="w-full h-full object-cover" alt={imagename} />
                </div>
                <h3 className="text-gray-900 dark:text-amber-50 font-semibold">{imagename}</h3>
              </div>
              <div className="flex justify-end text-lg font-bold text-blue-700 dark:text-blue-400">
                ${price}
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment Form */}
      <div className="w-full md:w-1/2 lg:w-2/5 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-6">
        <p className="text-center text-lg font-semibold text-gray-900 dark:text-amber-50">
          Enter your card details
        </p>

        <Form className="flex flex-col gap-4">
          <FormInput label="Card Number" type="text" id="cardnumber" name="cardnumber" placeholder="1234 5678 9012 3456" required />
          <FormInput label="Cardholder Name" type="text" id="cardOwner" name="cardOwner" placeholder="John Doe" required />
          <div className="flex gap-4">
            <FormInput label="Valid Until" type="text" id="expiredate" name="expiredate" placeholder="MM/YY" required />
            <FormInput label="CVV" type="password" id="cvv" name="cvv" placeholder="123" required />
          </div>
        </Form>

        {/* Order Summary */}
        <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4 shadow-inner flex flex-col gap-2">
          <h3 className="text-center font-bold text-gray-900 dark:text-amber-50 border-b border-gray-300 dark:border-gray-600 pb-1">Order Summary</h3>
          <div className="flex justify-between text-gray-800 dark:text-gray-200 font-medium">
            <span>Total Items:</span>
            <span>{items.length}</span>
          </div>
          <div className="flex justify-between text-gray-800 dark:text-gray-200 font-medium">
            <span>Tax:</span>
            <span>10%</span>
          </div>
          <div className="flex justify-between text-gray-800 dark:text-gray-200 font-medium">
            <span>Item Cost:</span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-blue-700 dark:text-blue-400 mt-2">
            <span>Total Amount:</span>
            <span>${(total + total * 0.1).toFixed(2)}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
          <Link to="/user/checkout" className="flex-1">
            <button className="w-full py-2 rounded-xl bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold transition shadow-md">
              Back
            </button>
          </Link>
          <Link to="/user/success" className="flex-1">
            <button
              className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition shadow-md"
              onClick={() => dispatch(clearCart())}
            >
              Confirm Pay
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Payment;

