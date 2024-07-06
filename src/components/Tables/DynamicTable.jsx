import { useEffect } from "react";
import { useState } from "react";
import { InputField } from "../Forms/FormFields";

const DynamicTable = ({ columns, data }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);


  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const search = (searchValue) => {
    setSearchTerm(searchValue)
    if (!searchTerm) {
      setFilteredData(data);
      console.log("inside");
      return;
    }

    const searchFilter = data.filter((row) =>
      columns.some((col) =>
        String(row[col.accessor]).toLowerCase().includes(searchValue?.toLowerCase())
      )
    );
    setFilteredData(searchFilter)
  }

  const handleInputChange = (e) =>{
    search(e.target.value)
  } 

  return (
    <>
      <InputField type="text" placeholder={"search......."} value={searchTerm} error={""} onChange={handleInputChange} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((col) => (
                <th key={col.accessor} scope="col" className="px-6 py-3">{col.Header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length <= 0 ? (
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <td colSpan={columns.length} className='px-6 py-4 text-center'>No data Found</td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  {columns.map((col) => (
                    <td key={col.accessor} className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {col.Cell ? col.Cell(row[col.accessor], row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
};

export default DynamicTable;
