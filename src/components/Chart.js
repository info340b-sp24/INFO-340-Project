import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import "../index.css"
import "../index.css"
import Chart from 'chart.js/auto';

const DynamicPieChart = ({data}) => {

    const commonColors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(240, 50, 230, 1)',
        'rgba(210, 245, 60, 1)',
        'rgb(255, 0, 0, 1)',
        'rgb(60, 179, 113, 1)',
        'rgb(255, 165, 0, 1)',
        'rgb(107,35,143, 1)',
        'rgba(0, 255, 255, 1)',
        'rgba(255, 105, 180, 1)',
        'rgba(128, 0, 0, 1)',
        'rgba(0, 128, 0, 1)',
        'rgba(128, 128, 0, 1)'
    ];

    const backgroundColors = data.map(() => commonColors[Math.floor(Math.random() * commonColors.length)]);

    const totalCalories = data.reduce((acc, item) => acc + item.calories, 0);


    const chartData  = {
        labels: data.map(item => item.name),
        datasets: [
            {
                data: data.map(item => item.calories),
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'left',
                labels: {
                    padding: 20
                },
            }
        }
    };

    return (
        <div className="chartOutput">
            <Doughnut data={chartData} options={options}/>.

            <div className="chartOutputText">
                {data.map((item, index) => (
                    <p key={index}><strong>{item.name} </strong>: {item.calories} calories /
                        {((item.calories / totalCalories) * 100).toFixed(2)}% of today's diet
                    </p>
                ))}
                <p>
                    Total Calorie: {totalCalories}
                </p>
            </div>
        </div>
    )
};


export default DynamicPieChart;