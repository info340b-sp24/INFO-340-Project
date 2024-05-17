import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const Summary = ({ totalNutrition }) => {
    const data = {
        labels: Object.keys(totalNutrition).filter(key => key !== 'calories'),
        datasets: [
            {
                data: Object.values(totalNutrition).filter((_, index) => index !== Object.keys(totalNutrition).indexOf('calories')),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }
        ]
    };

    return (
        <div className="summary">
            <div className="summary-chart">
                <Doughnut data={data} />
            </div>
            <div className="summary-details">
                <div className="summary-item">
                    <h3>Diet intake</h3>
                    <p>{totalNutrition.calories || 0} calories</p>
                </div>
                <div className="summary-item">
                    <h3>Workout</h3>
                    <p>0 calories</p>
                </div>
            </div>
        </div>
    );
};

export default Summary;