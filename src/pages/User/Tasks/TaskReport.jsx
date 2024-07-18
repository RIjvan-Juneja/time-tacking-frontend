import { useEffect, useState } from "react"
import DynamicTable from "../../../common/components/Tables/DynamicTable";
import useFetch from "../../../hooks/useFetch";

const TaskReport = () => {
  const [data, setData] = useState([]);
  const { sendData } = useFetch();

  const columns = [
    { Header: 'Id', accessor: 'id' },
    { Header: 'Task Type', accessor: 'category_name' },
    { Header: 'Title', accessor: 'title' },
    { Header: 'Total Minute', accessor: 'totalHours' },
  ]

  const fetchReportData = async (reportType) => {

    const response = await sendData(`/tasklogs/api/report`, JSON.stringify({ reportType }), {
      headers: {
        "Content-Type": "application/json",
      }
    })

    if (response.response_type === 'success') {
      setData(response.data)
    } else {
      console.log(response.message);
    }
  }

  useEffect(() => {
    fetchReportData('day');
  }, [])

  return (
    <>
      <div className="flex justify-between">
        <h3 className="mx-9 mt-9 text-3xl font-bold dark:text-white">Task Reports</h3>
      </div>
      <div className="mx-9 mt-7 bg-white p-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5" >
          <select onChange={(e) => fetchReportData(e.target.value)} id="small" className="block absolute w-[270px] p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected value='day'>Day</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
          <DynamicTable columns={columns} data={data} />
        </div>
      </div>
    </>
  )
}

export default TaskReport