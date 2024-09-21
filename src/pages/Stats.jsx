import React, { useMemo } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import NavBar from '../components/TopBar';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const Dashboard = ({ books }) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const booksReadPerMonth = [3, 5, 2, 7, 10, 6, 4, 12, 9, 7, 8, 6];
  const pagesReadPerMonth = [1000, 1500, 800, 2500, 3500, 2000, 1400, 3800, 3000, 2400, 2100, 1800];

  const moodsData = useMemo(() => ({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Funny',
        data: [12, 15, 8, 9, 5, 18, 10, 12, 7, 10, 9, 13],
        borderColor: '#FF6384',
        fill: false,
      },
      {
        label: 'Lighthearted',
        data: [10, 7, 12, 8, 9, 11, 6, 14, 9, 12, 8, 15],
        borderColor: '#36A2EB',
        fill: false,
      },
      {
        label: 'Informative',
        data: [5, 6, 7, 12, 9, 14, 10, 12, 8, 9, 6, 10],
        borderColor: '#FFCE56',
        fill: false,
      },
      {
        label: 'Emotional',
        data: [8, 9, 12, 10, 7, 13, 9, 11, 5, 10, 6, 12],
        borderColor: '#4BC0C0',
        fill: false,
      },
      {
        label: 'Dark',
        data: [4, 8, 6, 7, 10, 9, 11, 6, 7, 8, 10, 12],
        borderColor: '#9966FF',
        fill: false,
      },
      {
        label: 'Adventurous',
        data: [7, 5, 10, 8, 9, 12, 10, 8, 12, 7, 9, 11],
        borderColor: '#FF9F40',
        fill: false,
      },
    ],
  }), []);

  const readingPaceData = useMemo(() => ({
    labels: ['Fast', 'Medium', 'Slow'],
    datasets: [
      {
        data: [15, 40, 12],  // Example data for reading pace
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  }), []);

  const readStatusData = useMemo(() => {
    const statusCounts = { 'To Read': 0, 'Reading': 0, 'Completed': 0 };
    books.forEach(book => {
      statusCounts[book.status] = (statusCounts[book.status] || 0) + 1;
    });

    return {
      labels: ['To Read', 'Reading', 'Completed'],
      datasets: [
        {
          label: 'Read Status',
          data: [statusCounts['To Read'], statusCounts['Reading'], statusCounts['Completed']],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
  }, [books]);

  const barData = useMemo(() => ({
    labels: months,
    datasets: [
      {
        label: 'Books Read',
        data: booksReadPerMonth,
        backgroundColor: '#36A2EB',
      },
      {
        label: 'Pages Read',
        data: pagesReadPerMonth,
        backgroundColor: '#FF6384',
      },
    ],
  }), [booksReadPerMonth, pagesReadPerMonth, months]);

  return (
    <>
    <NavBar/>
    <div className="dashboard-container flex flex-col justify-center items-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-custom-blue mb-8">Book Collection Dashboard</h1>

      <div className="w-full grid grid-cols-2 gap-8">
        
        <div className="bg-white p-6 rounded-lg shadow-lg h-[400px]">
          <h2 className="text-2xl font-bold mb-4 text-center">Books and Pages Read per Month</h2>
          <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg h-[400px]">
          <h2 className="text-2xl font-bold mb-4 text-center">Read Status</h2>
          <Bar data={readStatusData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg h-[500px] col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-center">Moods & Reading Pace</h2>
          <div className="flex justify-around h-[300px]">
            {/* Moods Distribution (Line Chart) */}
            <div className="w-1/2">
              <Line data={moodsData} options={{ responsive: true, maintainAspectRatio: false }} />
              <h3 className="text-center mt-4 font-bold">Moods Distribution</h3>
            </div>
            {/* Reading Pace */}
            <div className="w-1/2">
              <Doughnut data={readingPaceData} options={{ responsive: true, maintainAspectRatio: false }} />
              <h3 className="text-center mt-4 font-bold">Reading Pace</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default Dashboard;
