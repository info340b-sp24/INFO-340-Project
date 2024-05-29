import React, { useState, useEffect } from 'react';
import DietInfo from './DietPage/DietInfo';
import Meal from './DietPage/Meal';
import FoodSearchModal from './DietPage/FoodSearchModel';
import CaloriesChart from './DietPage/CaloriesChart';
import PieChart from './PieChart';
import { useDiet } from './Context';
import {getDatabase, ref, set, onValue} from 'firebase/database';
import {getAuth} from 'firebase/auth';
import '../index.css';


const DietPage = () => {
    const { meals, setMeals } = useDiet();
    const [showModal, setShowModal] = useState(false);
    const [currentMealId, setCurrentMealId] = useState(null);
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
    const [calorieGoal, setCalorieGoal] = useState(null);
    const [isCloseToGoal, setIsCloseToGoal] = useState(false);

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
    }, {Calories: 0, Carbs: 0, Fat: 0, Fiber: 0, Protein: 0 });

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

                set(mealsRef, updatedMeals)
                    .then(() => {
                        console.log('Meals saved successfully.');
                    })
                    .catch((error) => {
                        console.error('Error saving meals:', error);
                    });
            }, {
                onlyOnce: true
            });
        } else {
            console.error('No user is currently logged in.');
        }
    };

    useEffect(() => {
        setDate(new Date().toLocaleDateString());
    }, []);

    return (
        <div className="diet-page">

            <div className="header-container">
                <h2 className="date-heading">Diet for {date}</h2>

                {isCloseToGoal && <p className="calories-warning">Warning: You are over your calorie goal!</p>}

                <button className="detailed-analysis-button" onClick={() => setShowDetailedAnalysis(true)}>
                    See Detailed Analysis
                </button>
                <button className="save-currMeal-button" onClick={saveCurrentMeals}>
                    Save Current Meals
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