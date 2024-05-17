import React, { useState, useEffect } from 'react';
import DietInfo from './DietPage/DietInfo';
import Meal from './DietPage/Meal';
import FoodSearchModal from './DietPage/FoodSearchModel';
import CaloriesChart from './DietPage/CaloriesChart';
import PieChart from './PieChart';
import '../CSS/dietpage.css';
import foodData from '../Data/JSON/foodData.json';

const DietPage = () => {
    const [meals, setMeals] = useState([{ id: 1, name: 'Meal 1', foods: [] }]);
    const [showModal, setShowModal] = useState(false);
    const [currentMealId, setCurrentMealId] = useState(null);
    const [date, setDate] = useState(new Date().toLocaleDateString());

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
            <h2 className="date-heading">Here is your diet for {date}</h2>
            <div className="chart-container">
                <div className="chart-wrapper">
                    <CaloriesChart meals={meals} />
                </div>
                <div className="chart-wrapper">
                    <PieChart data={totalNutrients} />
                </div>
            </div>
            <DietInfo totalNutrients={totalNutrients} />
            <div className="mealContainer">
                {meals.map(meal => (
                    <Meal
                        key={meal.id}
                        meal={meal}
                        onRemove={() => removeMeal(meal.id)}
                        onAddFood={() => openModal(meal.id)}
                        onRemoveFood={removeFoodFromMeal}
                    />
                ))}
            </div>
            <button className="add-food-button" onClick={addMeal}>Add Meal</button>
            <FoodSearchModal
                show={showModal}
                onClose={closeModal}
                onAddFood={addFoodToMeal}
            />
        </div>
    );
};

export default DietPage;