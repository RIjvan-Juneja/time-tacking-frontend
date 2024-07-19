import React, { useEffect, useState } from 'react';

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

export const SelectBox = ({ id, name, label, options, value, onChange, error, multiple }) => {
  return (
    <>
      <div className="mb-4">

        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <select
          id={id}
          value={value}
          name={name}
          multiple={multiple}
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
}

export const Textarea = ({ id, label, value, error, onChange }) => {
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
          onChange={onChange}
        ></textarea>
        <p className={`text-red-500 text-sm mt-1 ${error ? ' ' : 'invisible'}`}>{(error) ? error : "."}</p>
      </div>
    </>
  )
}

export const Button = ({ id, type, lable, onClick, customClass, isDisabled }) => {
  return (
    <>
      <button
        type={type}
        id={id}
        onClick={onClick}
        disabled={isDisabled}
        className={`${isDisabled? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${customClass}`}
      >
        {lable}
      </button>
    </>
  )
}

export const MultiCheckBox = ({ value, id, label, isChecked, name, onChange }) => {
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
}

export const FileField = ({ id, name, label, error, onChange, previewsrc }) => {
  const [file, setFile] = useState({
    type : null,
    url : null,
  });
  const previewTypes = [ 'image/gif', 'image/jpeg', 'image/jpg', 'image/png' , 'image/svg+xml' ]

  function handleChange(e) {
    setFile(null)
    console.log(e.target.files[0].type);

    if(previewTypes.includes(e.target.files[0].type)){
      setFile({
        type : 'image',
        url : URL.createObjectURL(e.target.files[0])
      });
    }

    if(onChange) onChange(e);
  }

  useEffect(() => {
    previewsrc && setFile(previewsrc)
  },[previewsrc])

  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={id}>{label}</label>
      <input className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" name={name} aria-describedby="user_avatar_help" id={id} type="file" onChange={handleChange} />
      <p className={`text-red-500 text-sm mt-1 ${error ? ' ' : 'invisible'}`}>{(error) ? error : "."}</p>
      {(file?.type == 'image') && (<img className='mt-7 w-[350px]' src={file.url} />) }
      {(file?.type == 'file') && ( <a  href={file.url} download> download File </a>)}
    </>
  )
}
