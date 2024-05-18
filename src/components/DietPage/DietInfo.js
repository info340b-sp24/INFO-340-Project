import React, { useState } from 'react';
import { essentialNutrients, additionalNutrients } from './constants';
import { MdExpandMore } from "react-icons/md";

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
                    <MdExpandMore />
                </button>
                {showMore && (
                    <div className="nutrient-modal">
                        <div className="nutrient-modal-content">
                            <span className="close" onClick={() => setShowMore(false)}>&times;</span>
                            <h2>Select Additional Nutrients</h2>
                            <div className="nutrient-list">
                                {additionalNutrients.map(nutrient => (
                                    <button
                                        key={nutrient}
                                        className={`nutrient-button ${selectedNutrients.includes(nutrient) ? 'active' : ''}`}
                                        onClick={() => handleToggleNutrient(nutrient)}
                                    >
                                        {nutrient.replace('_', ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DietInfo;