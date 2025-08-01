/* eslint-disable react/prop-types */
import { useState } from "react";
import FormInput from "./FormInput";
import FormRange from "./FormRange";
import FormSelect from "./FormSelect";
import { toast } from "react-toastify";
const Filters = ({ sendFormData }) => {
  const [formData, setFormData] = useState({
    name: '',
    imagename: '',
    pricerange: 50,
    sortbyname: '',
    sortbyprice: '',
    sortbydateuploaded: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendFormData(formData);
    toast.success("fetching results");

  };
  const alphalist = ["", "A-Z", "Z-A"]
  const pricelist = ["", "low to high", "high to low"]
  const datelist = ["", "latest", "oldest"]
  return (
    <div className="dark:bg-slate-800 bg-gray-100 flex flex-col justify-center items-center h-screen shadow-lg shadow-slate-800 px-6">
      <form className="dark:bg-slate-800 dark:text-amber-50 w-full h-[70%] rounded-lg px-4 bg-gray-100 overflow-y-auto" onSubmit={handleSubmit}>

        <div className="mx-auto flex-col justify-center items-center">
          <FormInput label="Search by username" name="name" type="search" onChange={handleInputChange} />
          <FormInput label="Search by image name" name="imagename" type="search" onChange={handleInputChange} />
        </div>

        <div className="w-full mx-auto">
          <FormRange label="Price range" value={formData.pricerange} name="pricerange" defaultValue="50" size="input-xs" onChange={handleInputChange} />
        </div>

        <div className="dark:text-amber-50 flex flex-col sm:flex-row justify-around">
          <FormSelect label="sort by name" name="sortbyname" list={alphalist} size="input-sm" onChange={handleInputChange} />
        </div>

        <div className="dark:text-amber-50 flex flex-col sm:flex-row justify-around">
          <FormSelect label="sort by price" name="sortbyprice" list={pricelist} size="input-sm" onChange={handleInputChange} />
        </div>

        <div className="dark:text-amber-50 flex flex-col sm:flex-row justify-around">
          <FormSelect label="sort by uploaded data" name="sortbydateuploaded" list={datelist} size="input-sm" onChange={handleInputChange} />
        </div>

        <div className="mt-4 flex justify-center items-center">
          <button type="submit" className="btn btn-primary">Search</button>
        </div>

      </form>
    </div>
  )
}

export default Filters
