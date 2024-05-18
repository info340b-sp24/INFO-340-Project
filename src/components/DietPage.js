import React, { useState, useEffect } from 'react';
import DietInfo from './DietPage/DietInfo';
import Meal from './DietPage/Meal';
import FoodSearchModal from './DietPage/FoodSearchModel';
import CaloriesChart from './DietPage/CaloriesChart';
import PieChart from './PieChart';
import '../CSS/dietpage.css';
import { useDiet } from './Context';
import foodData from '../Data/JSON/foodData.json';

const DietPage = () => {
    const { meals, setMeals } = useDiet();
    const [showModal, setShowModal] = useState(false);
    const [currentMealId, setCurrentMealId] = useState(null);
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);


    const addMeal = () => {
        const newMealId = meals.length ? meals[meals.length - 1].id + 1 : 1;
        setMeals([...meals, { id: newMealId, name: `Meal ${newMealId}`, foods: [] }]);
    };

    const removeMeal = (id) => {
        setMeals(meals.filter(meal => meal.id !== id));
    };

    const openModal = (mealId) => {
        setCurrentMealId(mealId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentMealId(null);
    };

    const addFoodToMeal = (food) => {
        setMeals(meals.map(meal => {
            if (meal.id === currentMealId) {
                return {
                    ...meal,
                    foods: [...meal.foods, food]
                };
            }
            return meal;
        }));
        closeModal();
    };

    const removeFoodFromMeal = (mealId, foodIndex) => {
        setMeals(meals.map(meal => {
            if (meal.id === mealId) {
                return {
                    ...meal,
                    foods: meal.foods.filter((_, index) => index !== foodIndex)
                };
            }
            return meal;
        }));
    };

    const totalNutrients = meals.reduce((acc, meal) => {
        meal.foods.forEach(food => {
            acc.Energy_kcal += food.Energy_kcal;
            acc.Protein_g += food.Protein_g;
            acc.Fat_g += food.Fat_g;
            acc.Carb_g += food.Carb_g;
        });
        return acc;
    }, { Energy_kcal: 0, Protein_g: 0, Fat_g: 0, Carb_g: 0 });

    useEffect(() => {
        setDate(new Date().toLocaleDateString());
    }, []);

    return (
        <div className="diet-page">
            <div className="header-container">
                <h2 className="date-heading">Diet for {date}</h2>
                <button className="detailed-analysis-button" onClick={() => setShowDetailedAnalysis(true)}>
                    See Detailed Analysis
                </button>
            </div>
            <div className="chart-container">
                <CaloriesChart meals={meals}/>
                <PieChart data={totalNutrients}/>
            </div>
            {showDetailedAnalysis && (
                <div className="analysis-modal-content">
                    <span className="close" onClick={() => setShowDetailedAnalysis(false)}>&times;</span>
                    <div className="summary-container">
                        <DietInfo totalNutrients={totalNutrients}/>
                    </div>
                </div>
            )}
            <div className="mealContainer">
                {meals.map(meal => (
                    <div className="meal-box" key={meal.id}>
                        <Meal
                            meal={meal}
                            onRemove={() => removeMeal(meal.id)}
                            onAddFood={() => openModal(meal.id)}
                            onRemoveFood={removeFoodFromMeal}
                        />
                    </div>
                ))}
            </div>
            <button className="add-meal-button" onClick={addMeal}>Add Meal</button>
            <FoodSearchModal
                show={showModal}
                onClose={closeModal}
                onAddFood={addFoodToMeal}
            />
        </div>
    );
};

export default DietPage;