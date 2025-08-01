/* eslint-disable react/prop-types */

const FormInput = ({ label, name, type, onChange, defaultValue }) => {
  return (
    <div className='w-full mb-2'>
      <label htmlFor={name} className='w-full text-left flex justify-around'>
        <span className='dark:text-amber-50 w-[50%] font-serif tracking-wider text-xs text-blue-950'>{label}</span>
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          onChange={onChange}
          className="w-[90%] dark:text-white dark:border-2 dark:border-gray-100 dark:bg-slate-900 border-2 border-slate-900 text-black bg-slate-100 rounded-md sm:w-[70%] px-4 py-1"
        />
      </label>
    </div>
  );
};
export default FormInput;