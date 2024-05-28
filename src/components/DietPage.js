import React, { useState, useEffect } from 'react';
import DietInfo from './DietPage/DietInfo';
import Meal from './DietPage/Meal';
import FoodSearchModal from './DietPage/FoodSearchModel';
import CaloriesChart from './DietPage/CaloriesChart';
import PieChart from './PieChart';
import '../CSS/dietpage.css';
import { useDiet } from './Context';

const DietPage = () => {
    const { meals, setMeals } = useDiet();
    const [showModal, setShowModal] = useState(false);
    const [currentMealId, setCurrentMealId] = useState(null);
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);

    //search food feature
    const openModal = (mealId) => {
        console.log("model open");
        setCurrentMealId(mealId);
        setShowModal(true);
    };

    const closeModal = () => {
        console.log("model closed");
        setShowModal(false);
        setCurrentMealId(null);
    };
    //


    const addMeal = () => {
        console.log("meal added");
        const newMealId = meals.length ? meals[meals.length - 1].id + 1 : 1;
        setMeals([...meals, { id: newMealId, name: `Meal ${newMealId}`, foods: [] }]);
    };

    const removeMeal = (id) => {
        console.log("meal removed");
        setMeals(meals.filter(meal => meal.id !== id));
    };


    const addFoodToMeal = (food) => {
        console.log(food.key);
        console.log("meal add to the meal");
        setMeals(meals.map(meal => {
            if (meal.id === currentMealId) {
                return {
                    ...meal,
                    foods: [...meal.foods, food]
                };
            }

            console.log(meal)
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
            acc.Carbs += parseFloat(food.Carbs);
            acc.Fat += parseFloat(food.Fat);
            acc.Fiber += parseFloat(food.Fiber);
            acc.Protein += parseFloat(food.Protein);
        });

        console.log(acc);
        return acc;
    }, { Carbs: 0, Fat: 0, Fiber: 0, Protein: 0 });

    const mealList = meals.map(meal => (
        <div className="meal-box" key={meal.id}>
            <Meal
                meal={meal}
                onRemove={() => removeMeal(meal.id)}
                onAddFood={() => openModal(meal.id)}
                onRemoveFood={removeFoodFromMeal}
            />
        </div>
    ));

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

            {showDetailedAnalysis && (
                <div className="analysis-modal-content">
                    <span className="close" onClick={() => setShowDetailedAnalysis(false)}>&times;</span>
                    <div className="summary-container">
                        <DietInfo totalNutrients={totalNutrients}/>
                    </div>
                </div>
            )}

            <button className="add-meal-button" onClick={addMeal}>Add Meal</button>

            <div className="chart-container">
                <CaloriesChart meals={meals}/>
                <PieChart data={totalNutrients}/>
            </div>

            <div className="mealContainer">
                {mealList}
            </div>

            <FoodSearchModal
                show={showModal}
                onClose={closeModal}
                onAddFood={addFoodToMeal}
            />

        </div>
    );
};

export default DietPage;