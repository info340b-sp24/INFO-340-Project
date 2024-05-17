import React, { useState } from 'react';
import '../../CSS/dietpage.css'; // Import the specific CSS
import foodData from '../../Data/JSON/foodData.json';

const FoodSearchModal = ({ show, onClose, onAddFood }) => {
    const [query, setQuery] = useState('');
    const filteredFoods = foodData.filter(food => food.Descrip.toLowerCase().includes(query.toLowerCase()));

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
                            {food.Descrip}
                            <div className="nutrient-preview">
                                Calories: {food.Energy_kcal}<br />
                                Protein: {food.Protein_g}g<br />
                                Carbs: {food.Carb_g}g<br />
                                Fat: {food.Fat_g}g
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FoodSearchModal;