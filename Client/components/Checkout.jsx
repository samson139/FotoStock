import { NavLink } from "react-router-dom";

import { Form } from "react-router-dom";
const Checkout = () => {
  return (
    <>
      <div className="dark:bg-slate-700 w-full min-w-[200px] max-w-[750px] p-5 rounded-md bg-gray-100 shadow-lg shadow-zinc-600 mx-auto  mt-14">
        <div className="w-full m-4 mx-auto">
          <h1 className="dark:text-gray-300 w-full text-center font-serif text-black text-xl tracking-widest sm:text-2xl md:text-3xl md:mb-4">Shipping address</h1>
          <Form className="flex flex-col justify-center max-w-[700px] mx-auto py-2">
            <label htmlFor="exampleInputFirstName" className="dark:text-white dark:bg-slate-600 dark:border-slate-400 bg-gray-100 border-2 border-gray-800 text-black input input-bordered flex items-center gap-2 mb-3">
              First name
              <input
                type="text"
                name="firstname"
                id="exampleInputFirstName"
                required />
            </label>
            <label htmlFor="exampleInputLastName" className="dark:text-white dark:bg-slate-600 dark:border-slate-400 bg-gray-100 border-2 border-gray-800 text-black input input-bordered flex items-center gap-2 mb-3">Last name
              <input
                type="text"
                name="lastname"

                id="exampleInputLastName"
                required />
            </label>
            <label htmlFor="exampleInputEmail1" className="dark:text-white dark:bg-slate-600 dark:border-slate-400 bg-gray-100 border-2 border-gray-800 text-black input input-bordered flex items-center gap-2 mb-3">Email address
              <input
                type="email"
                name="email"

                id="exampleInputEmail1"
                required
              />
            </label>

            <label htmlFor="address" className="dark:text-white dark:bg-slate-600 dark:border-slate-400 bg-gray-100 border-2 border-gray-800 text-black  input input-bordered flex items-center gap-2 mb-3"> Address
              <input
                type="text"
                name="address"

                id="address"
                required
              />
            </label>

            <label htmlFor="city" className="dark:text-white dark:bg-slate-600 dark:border-slate-400 bg-gray-100 border-2 border-gray-800 text-black  input input-bordered flex items-center gap-2 mb-3">City
              <input
                type="text"
                name="city"

                id="city"
                required
              />
            </label>
            <label htmlFor="mobile" className="dark:text-white dark:bg-slate-600 dark:border-slate-400 bg-gray-100 border-2 border-gray-800 text-black  input input-bordered flex items-center gap-2 mb-3">Mobile number
              <input
                type="number"
                name="mobile"

                id="mobile"
                required
              />
            </label>
          </Form>
          <div className="flex justify-around py-5">
            <NavLink to="/user/cartitems">
              <button className="btn btn-primary">Back</button>
            </NavLink>
            <NavLink to="/user/payment">
              <button className="btn btn-primary">Click to pay</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}
export default Checkout;
