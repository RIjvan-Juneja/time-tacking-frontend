import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { format } from 'date-fns';

const Dashboard = () => {
  const [comparisonData, setComparisonData] = useState({ todayTasks: 0, yesterdayTasks: 0 });
  const [monthlyProgress, setMonthlyProgress] = useState({ thisMonthTasks: 0, lastMonthTasks: 0 });

  useEffect(() => {
    const fetchComparisonData = async () => {
      const response = await axios.get('/api/tasks/comparison');
      setComparisonData(response.data);
    };

    const fetchMonthlyProgress = async () => {
      const response = await axios.get('/api/tasks/monthly-progress');
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

  return (
    <div>
      <h2>Task Comparison</h2>
      <Chart
        options={comparisonChartOptions}
        series={[{ data: [comparisonData.todayTasks, comparisonData.yesterdayTasks] }]}
        type="bar"
        height={350}
      />

      <h2>Monthly Progress</h2>
      <Chart
        options={monthlyProgressChartOptions}
        series={[{ data: [monthlyProgress.lastMonthTasks, monthlyProgress.thisMonthTasks] }]}
        type="line"
        height={350}
      />
    </div>
  );
};

export default Dashboard;
