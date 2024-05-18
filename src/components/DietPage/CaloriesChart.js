import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

const CaloriesChart = ({ meals }) => {
    const labels = [];
    const data = [];

    meals.forEach(meal => {
        meal.foods.forEach(food => {
            labels.push(food.Descrip);
            data.push(food.Energy_kcal);
        });
    });

    const chartData = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: [
                    '#FF6384', // Color for first food
                    '#36A2EB', // Color for second food
                    '#FFCE56', // Color for third food
                    '#4BC0C0', // Color for fourth food
                    '#9966FF', // Color for fifth food
                    '#FF9F40', // Color for sixth food
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
                text: 'Calories Contribution by Food',
            },
        },
    };

    return (
        <div className="chart-wrapper">
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default CaloriesChart;