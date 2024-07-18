import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks } from '../../../redux/slices/TasksSlice';
import Spinner from '../../../common/components/Layout/Spinner';
import Chart from 'react-apexcharts';
import useFetch from '../../../hooks/useFetch';
import { format, subMonths } from 'date-fns';


const UserDashboard = () => {
  const [comparisonData, setComparisonData] = useState({ todayTasks: 0, yesterdayTasks: 0 });
  const [monthlyProgress, setMonthlyProgress] = useState({ thisMonthTasks: 0, lastMonthTasks: 0 });

  const tasks = useSelector((state) => state.tasks.task);
  const dispatch = useDispatch();
  const { loading, sendData } = useFetch();


  useEffect(() => {
    const fetchComparisonData = async () => {
      const response = await sendData('/task/api/daycompare');
      setComparisonData(response.data);
    };

    const fetchMonthlyProgress = async () => {
      const response = await sendData('/task/api/monthlyprogress');
      setMonthlyProgress(response.data);
    };

    fetchComparisonData();
    fetchMonthlyProgress();
  }, []);

  const comparisonChartOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Today', 'Yesterday']
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
  }, [tasks.status, dispatch]);

  return (
    <>
      <div className="mx-9 mt-7 bg-white p-4">
        <div className="grid grid-cols-3 gap-3">
          <div className='border h-[100px] p-4 flex justify-center items-center'>
            {(tasks.status != 'success') ? <Spinner /> : (<>
              <div className="rounded-full border-dashed border-2 border-indigo-600 flex justify-center items-center h-[75px] w-[75px]"> <i className='bx bx-task text-4xl'></i></div>
              <div>
                <h4 className='ml-5'>Total Tasks</h4>
                <span className='ml-5 text-4xl'> {tasks.data.data.length} </span>
              </div>
            </>)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div className='mt-14 p-4'>
            <h2> Today & Yesterday Progress </h2>
            <Chart
              options={comparisonChartOptions}
              series={[{ data: [comparisonData.todayTasks, comparisonData.yesterdayTasks] }]}
              type="bar"
              height={350}
            />
          </div>

          <div className='mt-14 p-4'>
            <h2> Monthly Progress </h2>
            <Chart
              options={monthlyProgressChartOptions}
              series={[{ data: [monthlyProgress.lastMonthTasks, monthlyProgress.thisMonthTasks] }]}
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