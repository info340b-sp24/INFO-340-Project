import React from 'react';
import CaloriesChart from './CaloriesChart';
import PieChart from '../PieChart';

const ChartModal = ({ show, onClose, meals, totalNutrients }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="nutrient-modal">
            <div className="nutrient-modal-content">
                <h2 className="chart-header">Nutrional Charts</h2>

                <span className="close" onClick={onClose}>&times;</span>
                <div className="nutrient-chart">
                    <CaloriesChart meals={meals} />
                    <PieChart data={totalNutrients} />
                </div>
            </div>
        </div>
    );
};

export default ChartModal;