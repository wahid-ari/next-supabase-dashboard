'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
// import { useTheme } from 'next-themes';
// import useWindowSize from '@hooks/useWindowSize';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// function optionsBarChart(theme?: string) {
//   return {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: '#888',
//         },
//         grid: {
//           color: theme == 'dark' ? '#3f3f46' : '#e2e8f0',
//         },
//       },
//       y: {
//         ticks: {
//           color: '#888',
//           stepSize: 1,
//         },
//         grid: {
//           color: theme == 'dark' ? '#3f3f46' : '#e2e8f0',
//         },
//       },
//     },
//   };
// }

// const data = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr'],
//   datasets: [
//     {
//       label: 'Total',
//       backgroundColor: '#adfa1d',
//       categoryPercentage: 0.8,
//       barPercentage: 0.8,
//       data: [1000, 2000, 3000, 4000],
//     },
//   ],
// };

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export function Overview() {
  // const { theme } = useTheme();
  // const { width } = useWindowSize();
  return (
    // <Bar options={optionsBarChart(theme)} data={data} height={width > 500 ? 200 : 250} />
    <ResponsiveContainer width='99%' height={350}>
      <BarChart data={data}>
        <XAxis dataKey='name' stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey='total' fill='#adfa1d' radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
