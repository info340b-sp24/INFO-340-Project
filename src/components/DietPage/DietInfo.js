import React, { useState } from 'react';
import { essentialNutrients, additionalNutrients } from './constants';

const DietInfo = ({ totalNutrients }) => {
    const [showMore, setShowMore] = useState(false);
    const [selectedNutrients, setSelectedNutrients] = useState([]);

    const handleToggleNutrient = (nutrient) => {
        if (selectedNutrients.includes(nutrient)) {
            setSelectedNutrients(selectedNutrients.filter(n => n !== nutrient));
        } else {
            setSelectedNutrients([...selectedNutrients, nutrient]);
        }
    };

    const nutrientsToShow = [...essentialNutrients, ...selectedNutrients];

    return (
        <div className="diet-intake">
            {nutrientsToShow.map(nutrient => (
                <div key={nutrient}>
                    <h3>{nutrient.replace('_', ' ')}:</h3>
                    <p>{(totalNutrients[nutrient] || 0).toFixed(2)}g</p>
                </div>
            ))}
            <div style={{ position: 'relative' }}>
                <button
                    className={`show-more-button ${showMore ? 'clicked' : ''}`}
                    onClick={() => setShowMore(!showMore)}
                >
                    Show More Nutrients
                </button>
                {showMore && (
                    <div className="nutrient-popup">
                        {additionalNutrients.map(nutrient => (
                            <button
                                key={nutrient}
                                className={selectedNutrients.includes(nutrient) ? 'active' : ''}
                                onClick={() => handleToggleNutrient(nutrient)}
                            >
                                {nutrient.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DietInfo;