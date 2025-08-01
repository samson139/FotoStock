/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


const FormRange = ({ label, name, value, onChange, defaultValue, size }) => {
  const step = 5;
  const maxPrice = 100;

  const handleSliderChange = (event) => {

    onChange(event);
  };
  return (
    <div className='form-control relative '>
      <label htmlFor={name} className='label cursor-pointer'>
        <span className='text-xs dark:text-amber-50 font-medium text-black'>{label}</span>
      </label>

      <input
        type='range'
        name={name}
        min={0}
        max={maxPrice}
        value={value}
        className={`bg-gray-400 text-xs dark:bg-slate-900 relative range range-primary ${size}`}
        onChange={handleSliderChange}
        step={step}
      />
      <span className='dark:text-amber-50 text-xs absolute right-2 top-2 text-black font-serif font-semibold'>0 - {value}</span>

      <div className='w-full flex justify-between px-2 mt-2 relative'>
        <span className='dark:text-amber-50 text-xs font-bold text-md text-black'>0</span>

        <span className='dark:text-amber-50 text-xs font-bold text-md text-black'>Max : {maxPrice}</span>
      </div>
    </div>
  );
};
export default FormRange;