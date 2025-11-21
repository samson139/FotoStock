import { NavLink } from "react-router-dom";
import { Form } from "react-router-dom";
import FormInput from "./FormInput";

const Checkout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-lg p-8 md:p-10 rounded-3xl shadow-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-wider">
          Shipping Address
        </h1>

        <Form className="flex flex-col gap-4">
          <FormInput label="First Name" name="firstname" type="text" placeholder="John" />
          <FormInput label="Last Name" name="lastname" type="text" placeholder="Doe" />
          <FormInput label="Email Address" name="email" type="email" placeholder="example@mail.com" />
          <FormInput label="Address" name="address" type="text" placeholder="123 Main St" />
          <FormInput label="City" name="city" type="text" placeholder="New York" />
          <FormInput label="Mobile Number" name="mobile" type="number" placeholder="1234567890" />
        </Form>

        <div className="flex justify-between gap-4 mt-6">
          <NavLink to="/user/cartitems" className="flex-1">
            <button className="w-full py-2 rounded-xl bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold transition shadow-md">
              Back
            </button>
          </NavLink>

          <NavLink to="/user/payment" className="flex-1">
            <button className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition shadow-md">
              Click to Pay
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

