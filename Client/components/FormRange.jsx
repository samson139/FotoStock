/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const FormRange = ({ label, name, value, onChange, defaultValue, size }) => {
  const step = 5;
  const maxPrice = 100;

  const handleSliderChange = (event) => {
    onChange(event);
  };

  return (
    <div className="w-full mb-4 relative flex flex-col">
      {/* Label */}
      <label htmlFor={name} className="text-sm mb-4 font-extralight text-gray-700 dark:text-amber-50">
        {label}: <span className="font-bold text-purple-600 dark:text-amber-400">{value}</span>
      </label>

      {/* Slider */}
      <input
        type="range"
        id={name}
        name={name}
        min={0}
        max={maxPrice}
        value={value}
        onChange={handleSliderChange}
        step={step}
        className={`
          w-full
          rounded-lg
          h-1
          appearance-none
          bg-gray-300 dark:bg-gray-700
          accent-purple-500 dark:accent-amber-400
          cursor-pointer
          transition
          ${size || ""}
        `}
      />

      {/* Min/Max Labels */}
      <div className="flex justify-between mt-1 text-xs text-gray-600 dark:text-amber-50 font-medium">
        <span>0</span>
        <span>Max: {maxPrice}</span>
      </div>
    </div>
  );
};

export default FormRange;
