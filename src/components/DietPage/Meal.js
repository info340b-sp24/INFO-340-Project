import React, { useState } from 'react';
import { essentialNutrients, additionalNutrients } from './constants';

const Meal = ({ meal, onRemove, onAddFood, onRemoveFood }) => {
    const [showMore, setShowMore] = useState(false);
    const [selectedNutrients, setSelectedNutrients] = useState([]);
    const [mealName, setMealName] = useState(meal.name);
    const [isEditingName, setIsEditingName] = useState(false);

    const handleToggleNutrient = (nutrient) => {
        if (selectedNutrients.includes(nutrient)) {
            setSelectedNutrients(selectedNutrients.filter(n => n !== nutrient));
        } else {
            setSelectedNutrients([...selectedNutrients, nutrient]);
        }
    };

    const nutrientsToShow = [...essentialNutrients, ...selectedNutrients];

    const totalNutrients = meal.foods.reduce((acc, food) => {
        essentialNutrients.forEach(nutrient => {
            acc[nutrient] = (acc[nutrient] || 0) + (food[nutrient] || 0);
        });
        additionalNutrients.forEach(nutrient => {
            acc[nutrient] = (acc[nutrient] || 0) + (food[nutrient] || 0);
        });
        return acc;
    }, {});

    const handleMealNameChange = (e) => {
        setMealName(e.target.value);
    };

    const handleMealNameBlur = () => {
        setIsEditingName(false);
    };

    return (
        <div className="meal-container">
            <div className="meal-header">
                {isEditingName ? (
                    <input
                        type="text"
                        value={mealName}
                        onChange={handleMealNameChange}
                        onBlur={handleMealNameBlur}
                        autoFocus
                    />
                ) : (
                    <h3 onClick={() => setIsEditingName(true)}>{mealName} <span role="img" aria-label="edit">✏️</span></h3>
                )}
                <button className="remove-meal" onClick={onRemove}>Remove Meal</button>
            </div>
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
            <div className="meal-foods">
                {meal.foods.map((food, index) => (
                    <div key={index} className="food-item">
                        <div>{food.Descrip}</div>
                        <div>
                            Calories: {food.Energy_kcal} | Protein: {food.Protein_g}g | Carbs: {food.Carb_g}g | Fat: {food.Fat_g}g
                        </div>
                        <button className="remove-food" onClick={() => onRemoveFood(meal.id, index)}>-</button>
                    </div>
                ))}
            </div>
            <button className="add-food-button" onClick={onAddFood}>Add Food</button>
        </div>
    );
};

export default Meal;