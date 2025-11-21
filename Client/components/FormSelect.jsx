/* eslint-disable react/prop-types */
const FormSelect = ({ label, name, list, onChange, defaultValue, size }) => {
  return (
    <div className="w-full mb-4 flex flex-col">
      {/* Label */}
      <label htmlFor={name} className="mb-1 font-manrope text-gray-700 dark:text-amber-50">
        {label}
      </label>

      {/* Select */}
      <select
        id={name}
        name={name}
        defaultValue={defaultValue || ""}
        onChange={onChange}
        className={`
          w-full
          text-gray-900 dark:text-white
          bg-gray-100 dark:bg-slate-800
          border border-gray-300 dark:border-gray-600
          rounded-lg
          focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-amber-400
          transition-all
          ${size || ""}
        `}
      >
        {list.map((item, idx) => (
          <option key={idx} value={item} className="text-gray-900 dark:text-white">
            {item || "Select"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
