import React, { useState, useEffect } from 'react';
import DietInfo from './DietPage/DietInfo';
import Meal from './DietPage/Meal';
import FoodSearchModal from './DietPage/FoodSearchModel';
import ChartModal from './DietPage/ChartModal';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { FaSave } from "react-icons/fa";
import { MdOutlineCalculate } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import '../index.css';

const DietPage = () => {
    const [meals, setMeals] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentMealId, setCurrentMealId] = useState(null);
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
    const [showChartModal, setShowChartModal] = useState(false); // New state for chart modal
    const [calorieGoal, setCalorieGoal] = useState(null);
    const [isCloseToGoal, setIsCloseToGoal] = useState(false);

    const openModal = (mealId) => {
        console.log("modal open");
        setCurrentMealId(mealId);
        setShowModal(true);
    };

    const closeModal = () => {
        console.log("modal closed");
        setShowModal(false);
        setCurrentMealId(null);
    };

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
        console.log("food added to the meal");
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

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const userId = user.uid;
            const db = getDatabase();
            const userRef = ref(db, 'users/' + userId);

            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setCalorieGoal(data.calorieGoal);
                }
            });
        }
    }, []);

    const totalNutrients = meals.reduce((acc, meal) => {
        meal.foods.forEach(food => {
            acc.Calories += parseFloat(food.Calories);
            acc.Carbs += parseFloat(food.Carbs);
            acc.Fat += parseFloat(food.Fat);
            acc.Fiber += parseFloat(food.Fiber);
            acc.Protein += parseFloat(food.Protein);
        });
        return acc;
    }, { Calories: 0, Carbs: 0, Fat: 0, Fiber: 0, Protein: 0 });

    useEffect(() => {
        if (calorieGoal !== null && totalNutrients.Calories > calorieGoal) {
            setIsCloseToGoal(true);
        } else {
            setIsCloseToGoal(false);
        }
    }, [calorieGoal, totalNutrients.Calories]);

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

    const saveCurrentMeals = () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const userId = user.uid;
            const db = getDatabase();
            const mealsRef = ref(db, 'users/' + userId + '/meals');

            onValue(mealsRef, (snapshot) => {
                const existingMeals = snapshot.val() || [];
                const updatedMeals = [...existingMeals, ...meals];

                console.log(updatedMeals);

                set(mealsRef, updatedMeals)
                    .then(() => {
                        alert('Meals saved successfully!');
                    })
                    .catch((error) => {
                        alert('Something went wrong');
                    });
            }, {
                onlyOnce: true
            });
        } else {
            alert('No user is currently logged in.');
        }
    };

    useEffect(() => {
        const options = { month: 'long', day: 'numeric' };
        setDate(new Date().toLocaleDateString(undefined, options));
    }, []);

    return (
        <div className="diet-page">
            <div className="header-container">
                <button className="detailed-analysis-button" onClick={() => setShowDetailedAnalysis(true)}>
                    <MdOutlineCalculate />
                </button>
                <h1 className="date-heading">{date}</h1>
                <button className="save-currMeal-button" onClick={saveCurrentMeals}>
                    <FaSave />
                </button>
            </div>

            {isCloseToGoal && <p className="calories-warning">Warning: You are over your calorie goal!</p>}

            {showDetailedAnalysis && (
                <div className="analysis-modal-content">
                    <span className="close" onClick={() => setShowDetailedAnalysis(false)}>&times;</span>
                    <div className="summary-container">
                        <DietInfo totalNutrients={totalNutrients}/>
                    </div>
                </div>
            )}

            <div className="diet-button-container">
            <button className="show-chart-button" onClick={() => setShowChartModal(true)}>Show Charts</button>

            </div>
            <div className="dietOutput">
                <div className="mealContainer">
                    <div className="mealContainerHeader">
                        <button className="add-meal-button" onClick={addMeal}><IoIosAddCircle /></button>
                        <h2>Your Daily Meals</h2>
                    </div>
                        {mealList}
                        </div>
                            <ChartModal
                                show={showChartModal}
                                onClose={() => setShowChartModal(false)}
                                meals={meals}
                                totalNutrients={totalNutrients}
                            />
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