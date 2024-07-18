import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch";
import Chart from 'react-apexcharts';
import { format } from 'date-fns';

const AdminDashboard = () => {

  const { sendData } = useFetch();


  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    activeUsers: 0,
    userStats: []
  })

  useEffect(() => {
    const fetchTotalUsers = async () => {
      const response = await sendData('/users/api/userlist');
      setDashboard((prevState) => {
        return { ...prevState, totalUsers: response.data.length }
      })
    };
    const fetchActiveUsers = async () => {
      const response = await sendData('/users/api/active/users');
      setDashboard((prevState) => {
        return { ...prevState, activeUsers: response.data }
      })
    }

    const fetchUSerStatictic = async () => {
      const response = await sendData('/users/api/progresschart');
      setDashboard((prevState) => {
        return { ...prevState, userStats: response.data }
      })
    }

    fetchTotalUsers();
    fetchActiveUsers();
    fetchUSerStatictic();

  }, [])

  const months = dashboard.userStats.map(stat => format(new Date(stat.month), 'MMMM'));
  const userCounts = dashboard.userStats.map(stat => stat.userCount);
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: months,
    },
  };

  const series = [
    {
      name: 'New Users',
      data: userCounts,
    },
  ];
  return (
    <>
      <div className="mx-9 mt-7 bg-white p-4">

        <div className="grid grid-cols-3 gap-3 mt-8">
          <div className='border h-[130px] p-4 flex justify-center items-center shadow-md rounded-md'>
            <div className="rounded-full border-dashed border-2 border-indigo-600 flex justify-center items-center h-[75px] w-[75px]"> <i className='bx bxs-user text-4xl'></i></div>
            <div>
              <h4 className='ml-5'>Total Users</h4>
              <span className='ml-5 text-4xl'> {dashboard.totalUsers} </span>
            </div>
          </div>

          <div className='border h-[130px] p-4 flex justify-center items-center shadow-md rounded-md'>

            <div className="rounded-full border-dashed border-2 border-indigo-600 flex justify-center items-center h-[75px] w-[75px]"> <i className='bx bxs-objects-horizontal-right text-4xl'></i></div>
            <div>

              <h4 className='ml-5'>Active Users</h4>
              <span className='ml-5 text-4xl'>  {dashboard.activeUsers}  </span>
            </div>

          </div>

          <div className='border h-[130px] p-4 flex justify-center items-center shadow-md rounded-md'>

            <div className="rounded-full border-dashed border-2 border-indigo-600 flex justify-center items-center h-[75px] w-[75px]"> <i className='bx bx-no-signal text-4xl'></i></div>
            <div>

              <h4 className='ml-5'>Unactive Users</h4>
              <span className='ml-5 text-4xl'>  {dashboard.totalUsers - dashboard.activeUsers}  </span>
            </div>

          </div>

        </div>

        <div className="">
          <div className='mt-14 p-4 shadow-md '>
            <h2>User Statistics</h2>
            <Chart options={chartOptions} series={series} type="bar" height={350} />
          </div>
        </div>



      </div>
    </>
  )
}

export default AdminDashboard