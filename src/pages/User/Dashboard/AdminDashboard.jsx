import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch";
import { format } from 'date-fns';
import ReactApexChart from "react-apexcharts";
import CounterCard from "./components/CounterCard";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/UserSlice";

const AdminDashboard = () => {

  const dispatch = useDispatch();

  const { sendData } = useFetch();


  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    activeUsers: 0,
    userStats: []
  })

  useEffect(() => {
    const fetchTotalUsers = async () => {
    
      const response = await sendData('/users/api/userlist');

      if(response.response_type === 'unauthorized'){
        dispatch(logout());
      }

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
      type: 'line',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        // horizontal: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Register users',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
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
          <CounterCard icon={<i className='bx bxs-user text-4xl'></i>} title='Total Users' data={dashboard.totalUsers} />
          <CounterCard icon={<i className='bx bxs-objects-horizontal-right text-4xl'></i>} title='Active Users' data={dashboard.activeUsers} />
          <CounterCard icon={<i className='bx bx-no-signal text-4xl'></i>} title='Unactive Users' data={dashboard.totalUsers - dashboard.activeUsers} />
        </div>

        <div>
          <div className='mt-14 p-4 shadow-md '>
            <h2>User Statistics</h2>
            <ReactApexChart options={chartOptions} series={series} type="bar" height={350} />
          </div>
        </div>



      </div>
    </>
  )
}

export default AdminDashboard