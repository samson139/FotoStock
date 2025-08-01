/* eslint-disable react/prop-types */
const FormSelect = ({ label, name, list, onChange, defaultValue, size }) => {
  return (
    <div className='form-control '>
      <label htmlFor={name} className='label'>
        <span className='dark:text-white text-black text-sm capitalize'>{label}</span>
      </label>
      <select
        name={name}
        id={name}
        className={`w-full dark:bg-slate-900 dark:text-white text-black bg-slate-400 select select-bordered ${size}`}
        onChange={onChange}
        defaultValue={defaultValue}

      >
        {list.map((item) => {
          return (
            <option key={item} value={item} className="dark:text-white">
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );

};
export default FormSelect;