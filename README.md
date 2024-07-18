import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { format } from 'date-fns';

const UserStatistics = () => {
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const fetchUserStats = async () => {
      const response = await axios.get('/api/users/statistics');
      setUserStats(response.data);
    };

    fetchUserStats();
  }, []);

  const months = userStats.map(stat => format(new Date(stat.month), 'MMMM'));
  const userCounts = userStats.map(stat => stat.userCount);

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
    <div>
      <h2>User Statistics</h2>
      <Chart options={chartOptions} series={series} type="bar" height={350} />
    </div>
  );
};

export default UserStatistics;
