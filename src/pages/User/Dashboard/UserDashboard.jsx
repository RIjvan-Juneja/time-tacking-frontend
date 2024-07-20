import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks } from '../../../redux/slices/TasksSlice';
import Chart from 'react-apexcharts';
import useFetch from '../../../hooks/useFetch';
import { format, subMonths } from 'date-fns';
import CounterCard from './components/CounterCard';
import { logout } from '../../../redux/slices/UserSlice';
import { fetchCategory } from '../../../redux/slices/CategorySlice';


const UserDashboard = () => {
  const [dashboard, setDashboard] = useState({
    runningTask: 0,
    comparisonData: { todayTasks: 0, yesterdayTasks: 0 },
    monthlyProgress: { thisMonthTasks: 0, lastMonthTasks: 0 },
  })

  const tasks = useSelector((state) => state.tasks.task);

  const dispatch = useDispatch();
  const { sendData } = useFetch();


  useEffect(() => {
    const fetchComparisonData = async () => {
      const response = await sendData('/task/api/daycompare');
      if(response.response_type === 'unauthorized'){
        dispatch(logout());
      }
      setDashboard((prevState) => {
        return { ...prevState, comparisonData: { ...prevState.comparisonData, ...response.data } }
      })
    };

    const fetchMonthlyProgress = async () => {
      const response = await sendData('/task/api/monthlyprogress');
      setDashboard((prevState) => {
        return { ...prevState, monthlyProgress: { ...prevState.monthlyProgress, ...response.data } }
      })
    };

    const runningTask = async () => {
      const response = await sendData('/tasklogs/api/runningtask');
      setDashboard((prevState) => {
        return { ...prevState, runningTask: response.data.length }
      })
    }

    fetchComparisonData();
    fetchMonthlyProgress();
    runningTask();
    dispatch(fetchCategory())
  }, []);

  const comparisonChartOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
      }
    },
    dataLabels: {
      enabled: true
    },
    xaxis: {
      categories: ['Yesterday', 'Today']
    }
  };

  const monthlyProgressChartOptions = {
    chart: {
      type: 'line',
      height: 350
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: [
        format(subMonths(new Date(), 1), 'MMMM yyyy'),
        format(new Date(), 'MMMM yyyy')
      ]
    }
  };

  useEffect(() => {
    if (tasks.status === 'idle') {
      dispatch(fetchTasks());
    }

    // if(categorys)

  }, [tasks.status, dispatch]);

  return (
    <>
      <div className="mx-9 mt-7 bg-white p-4">
        <div className="grid grid-cols-3 gap-3 mt-8">
          {(tasks.status === 'success') && <CounterCard icon={<i className='bx bx-task text-4xl'></i>} title='Total Tasks' data={tasks.data.data.length} />}
          <CounterCard icon={<i className='bx bxs-time-five text-4xl'></i>} title='Total Running Task' data={dashboard.runningTask} />
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div className='mt-14 p-4 shadow-md '>
            <h2> Today & Yesterday Progress </h2>
            <Chart
              options={comparisonChartOptions}
              series={[{ data: [dashboard.comparisonData.yesterdayTasks, dashboard.comparisonData.todayTasks] }]}
              type="bar"
              height={350}
            />
          </div>

          <div className='mt-14 p-4 shadow-md'>
            <h2> Monthly Progress </h2>
            <Chart
              options={monthlyProgressChartOptions}
              series={[{ data: [dashboard.monthlyProgress.lastMonthTasks, dashboard.monthlyProgress.thisMonthTasks] }]}
              type="line"
              height={350}
            />
          </div>
        </div>

      </div>
    </>
  )
}

export default UserDashboard