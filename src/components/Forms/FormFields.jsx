import React from 'react';

export const InputField = ({ id, name, label, type, value, placeholder, error, onChange }) => {
  return (
    <>
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <input
          type={type}
          id={id}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <p className={`text-red-500 text-sm mt-1 ${error ? ' ' : 'invisible'}`}>{(error) ? error : "."}</p>
      </div>
    </> 
  );
};

export const SelectBox =  React.memo(({ id, name, label, options, value, onChange, error, multiple }) => {
  return (
    <>
      <div className="mb-4">

        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <select
          id={id}
          value={value}
          name={name}
          multiple = {multiple}
          onChange={onChange}
          className={`block w-full px-4 py-3 bg-white border rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:focus:border-blue-500`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}

        </select>
        <p className={`text-red-500 text-sm mt-1 ${error ? ' ' : 'invisible'}`}>{(error) ? error : "."}</p>

      </div>


    </>
  )
})

export const Textarea =  React.memo(({ id, label, value, error, onChange }) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor={id}> {label} </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 resize-none"
          id={id}
          name={id}
          rows="3"
          value={value}
          onChange = {onChange}
        ></textarea>
        <p className={`text-red-500 text-sm mt-1 ${error ? ' ' : 'invisible'}`}>{(error) ? error : "."}</p>
      </div>
    </>
  )
})

export const Button =  ({ id, type, lable, onClick, customClass }) => {
  return (
    <>
      <button
        type={type}
        id={id}
        onClick={onClick}
        className={`bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${customClass}`}
      >
        {lable}
      </button>
    </>
  )
}

export const MultiCheckBox =  React.memo(({value, id, label, isChecked, name, onChange}) => {
  return (
    <>
      <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div className="flex items-center ps-3">
          <input 
          id={id} 
          type="checkbox" 
          value={value}
          name={name}
          onChange={onChange}
          defaultChecked={isChecked}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
          
          <label htmlFor={id} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
        </div>
      </li>
    </>
  )
})

