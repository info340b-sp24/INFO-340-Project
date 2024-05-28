import React, { useState, useEffect } from 'react';
import '../../index.css'; // Import the specific CSS
import {getDatabase, ref, onValue } from 'firebase/database';

const FoodSearchModal = ({ show, onClose, onAddFood }) => {
    const [query, setQuery] = useState('');
    const [foodData, setFoodData] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);

    useEffect(() => {

        const db = getDatabase();
        const foodRef = ref(db, 'nutrients/');

        onValue(foodRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                const foodArray = [];
                for (const category in data) {
                    for (const foodName in data[category]) {
                        const foodItem = data[category][foodName];
                        foodItem.key = foodName;
                        foodArray.push(foodItem);
                    }
                }
                setFoodData(foodArray);
            } else {
                console.error("No data available at the specified path.");
            }
        }, (error) => {
            console.error("Error fetching data:", error);
        });
    }, []);


    useEffect(() => {
        setFilteredFoods(foodData.filter(food => food.key.toLowerCase().includes(query.toLowerCase())));
    }, [query, foodData]);

    if (!show) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <input
                    type="text"
                    id="search-bar"
                    placeholder="Search for food..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div id="food-results">
                    {filteredFoods.map((food, index) => (
                        <div key={index} className="food-item" onClick={() => onAddFood(food)}>
                            {food.key}
                            <div className="nutrient-preview">
                                Calories: {food.Calories}<br/>
                                Carbs: {food.Carbs}g<br/>
                                Fat: {food.Fat}g<br/>
                                Fiber: {food.Fiber}g<br/>
                                Protein: {food.Protein}g
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FoodSearchModal;