// import { useCallback, useEffect, useState } from "react";

// const DynamicTable = ({ columns = [], data = [] }) => {

//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     setFilteredData(data);
//     console.log(filteredData,"89");
//   }, [data]); 

//   const search = useCallback((searchValue) => {
//     setSearchTerm(searchValue)
//     if (!searchTerm) {
//       setFilteredData(data);
//       console.log("inside");
//       return;
//     }

//     const searchFilter = data.filter((row) =>
//       columns.some((col) =>
//         String(row[col.accessor]).toLowerCase().includes(searchValue?.toLowerCase())
//       )
//     );
//     setFilteredData(searchFilter)
//   },[searchTerm])

//   const handleInputChange = (e) => {
//     search(e.target.value)
//   }

//   return (
//     <>
//       <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
//         <div>
//         </div>
//         <label htmlFor="table-search" className="sr-only">Search</label>
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
//             <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
//           </div>
//           <input type="text" id="table-search" value={searchTerm} onChange={handleInputChange} className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Tasks" />
//         </div>
//       </div>
//       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//           <tr>
//             {columns.map((col) => (
//               <th key={col.accessor} scope="col" className="px-6 py-3">{col.Header}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.length <= 0 ? (
//             <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
//               <td colSpan={columns.length} className='px-6 py-4 text-center'>No data Found</td>
//             </tr>
//           ) : (
//             filteredData.map((row) => (
//               <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                 {columns.map((col) => (
//                   <td key={col.accessor} className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
//                     {col.Cell ? col.Cell(row[col.accessor], row) : row[col.accessor]}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           )}

//         </tbody>
//       </table>
//     </>
//   )
// };

// export default DynamicTable;

import { useEffect, useState } from "react";

const DynamicTable = ({ columns = [], data = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    setFilteredData(data);
    setCurrentPage(1)
  }, [data]);

  const search = (searchValue) => {
    setSearchTerm(searchValue);
    if (!searchValue) {
      setFilteredData(data);
      return;
    }

    const searchFilter = data.filter((row) =>
      columns.some((col) =>
        String(row[col.accessor]).toLowerCase().includes(searchValue?.toLowerCase())
      )
    );
    setFilteredData(searchFilter);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleInputChange = (e) => {
    search(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedData = filteredData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <>
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div></div>
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            value={searchTerm}
            onChange={handleInputChange}
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for Tasks"
          />
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} scope="col" className="px-6 py-3">{col.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length <= 0 ? (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td colSpan={columns.length} className="px-6 py-4 text-center">No data Found</td>
            </tr>
          ) : (
            paginatedData.map((row) => (
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
      {filteredData.length >= rowsPerPage && (<div className="flex justify-between items-center py-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>)}

    </>
  );
};

export default DynamicTable;
