import React, { useState } from 'react';
import { essentialNutrients, additionalNutrients } from './constants';
import { MdExpandMore } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";
import { FaPen } from "react-icons/fa";

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
            acc[nutrient] = (acc[nutrient] || 0) + parseFloat(food[nutrient] || 0);
        });
        additionalNutrients.forEach(nutrient => {
            acc[nutrient] = (acc[nutrient] || 0) + parseFloat(food[nutrient] || 0);
        });
        return acc;
    }, {});

    const handleMealNameChange = (e) => {
        setMealName(e.target.value);
    };

    const handleMealNameBlur = () => {
        setIsEditingName(false);
    };

    const renderedNutrients = nutrientsToShow.map(nutrient => (
        <div key={nutrient}>
            <h3>{nutrient.replace('_', ' ')}:</h3>
            <p>{(totalNutrients[nutrient] || 0).toFixed(2)}g</p>
        </div>
    ));

    const renderedFoods = meal.foods.map((food, index) => (
        <div key={index} className="food-item">
            <div>{food.key}</div>
            <div>
                Calories: {food.Calories} | Carbs: {food.Carbs}g
                | Fat: {food.Fat}g | Fiber: {food.Fiber}g | Protein: {food.Protein}g
            </div>
            <button className="remove-food" onClick={() => onRemoveFood(meal.id, index)}><CiCircleRemove/></button>
        </div>
    ));


    const renderedAdditionalNutrients = additionalNutrients.map(nutrient => (
        <button
            key={nutrient}
            className={`nutrient-button ${selectedNutrients.includes(nutrient) ? 'active' : ''}`}
            onClick={() => handleToggleNutrient(nutrient)}
        >
            {nutrient.replace('_', ' ')}
        </button>
    ));

    return (
        <div>
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
                    <h3 onClick={() => setIsEditingName(true)}>{mealName} <span role="img" aria-label="edit"><FaPen/></span></h3>
                )}
                <button className="remove-meal" onClick={onRemove}>Remove Meal</button>
            </div>

            <div className="diet-intake">
                {renderedNutrients}
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
                                    {renderedAdditionalNutrients}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="meal-foods">
                {renderedFoods}
            </div>
            <button className="add-food-button" onClick={onAddFood}>Add Food</button>
        </div>
    );
};

export default Meal;