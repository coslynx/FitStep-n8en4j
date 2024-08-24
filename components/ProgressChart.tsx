import React from 'react';
import { Line } from 'react-chartjs-2';
import { useStore } from '../store';
import { ProgressData } from '../types';

interface ProgressChartProps {
  goalId: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goalId }) => {
  const { progressData } = useStore();

  const goalProgress = progressData.filter((data) => data.goalId === goalId);

  const chartData = {
    labels: goalProgress.map((data) => data.date),
    datasets: [
      {
        label: 'Progress',
        data: goalProgress.map((data) => data.progress),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ProgressChart;