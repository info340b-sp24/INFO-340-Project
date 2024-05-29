import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {

    const filteredData = Object.keys(data).reduce((acc, key) => {
        if (key.toLowerCase() !== 'calories') {
            acc[key] = data[key];
        }
        return acc;
    }, {});

    const chartData = {

        labels: Object.keys(filteredData),
        datasets: [
            {
                data: Object.values(filteredData),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            position: 'top',
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Nutrient Distribution',
            },
        },
    };

    return (
        <div className="chart-wrapper">
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default PieChart;