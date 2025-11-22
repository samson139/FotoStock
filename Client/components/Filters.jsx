/* eslint-disable react/prop-types */
import { useState } from "react";
import FormInput from "./FormInput";
import FormRange from "./FormRange";
import FormSelect from "./FormSelect";
import { toast } from "react-toastify";

const Filters = ({ sendFormData, setShowFilters }) => {
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendFormData(formData);
    setShowFilters(false);
    toast.success("Fetching results...");
  };

  const alphalist = ["", "A-Z", "Z-A"];
  const pricelist = ["", "Low to High", "High to Low"];
  const datelist = ["", "Latest", "Oldest"];

  return (
    <form
      onSubmit={handleSubmit}
      className="
    w-full h-full flex flex-col justify-center px-6 space-y-6
    bg-white/90 dark:bg-gray-900/70
    backdrop-blur-md
    shadow-[0_10px_40px_rgba(0,0,0,0.15)]
    transition-all duration-500
  "
    >


      <div className="flex flex-col gap-4">
        <FormInput
          label="Search by username"
          name="name"
          type="search"
          onChange={handleInputChange}
          className="rounded-lg focus:ring-2 focus:ring-purple-400 dark:focus:ring-amber-400 shadow-sm"
        />
        <FormInput
          label="Search by image name"
          name="imagename"
          type="search"
          onChange={handleInputChange}
          className="rounded-lg focus:ring-2 focus:ring-purple-400 dark:focus:ring-amber-400 shadow-sm"
        />
      </div>

      <FormRange
        label="Price Range"
        value={formData.pricerange}
        name="pricerange"
        defaultValue="50"
        size="input-xs"
        onChange={handleInputChange}
      />

      <div className="flex flex-col gap-2">
        <FormSelect label="Name" name="sortbyname" list={alphalist} size="input-sm" onChange={handleInputChange} />
        <FormSelect label="Price" name="sortbyprice" list={pricelist} size="input-sm" onChange={handleInputChange} />
        <FormSelect label="Uploaded" name="sortbydateuploaded" list={datelist} size="input-sm" onChange={handleInputChange} />
      </div>

      <button
        type="submit"
        className="
     bg-gradient-to-r from-blue-500 to-blue-700
    dark:from-blue-600 dark:to-blue-800
    text-white font-mono py-1 rounded-xl shadow-lg
    hover:shadow-2xl hover:scale-105 transition-all duration-300
  "
      >
        Search
      </button>
    </form>
  );
};

export default Filters;

