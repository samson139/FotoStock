/* eslint-disable react/prop-types */

const FormInput = ({ label, name, type, onChange, defaultValue, placeholder }) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-extralight text-gray-700 dark:text-amber-50 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue}
        placeholder={placeholder || ''}
        onChange={onChange}
        className="
          w-full px-4 py-1
          rounded-xl
          border border-gray-300 dark:border-gray-600
          bg-gray-100 dark:bg-gray-800
          text-gray-900 dark:text-white
          focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-amber-400
          transition
          placeholder-gray-400 dark:placeholder-gray-300
          shadow-sm
        "
      />
    </div>
  );
};

export default FormInput;
