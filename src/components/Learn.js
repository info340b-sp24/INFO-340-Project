import React, { useState } from 'react';
import './Learn.css';

const QuizPage = () => {
    const [popupContent, setPopupContent] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const showPopup = (content) => {
        setPopupContent(content);
        setIsPopupVisible(true);
    };

    const hidePopup = () => {
        setIsPopupVisible(false);
    };

    const weightLossContent = (
        <ul>
            <li>Trans Fats: Found in fried foods and baked goods, trans fats increase bad cholesterol levels and should be avoided.</li>
            <li>Saturated Fats: Limit intake of saturated fats found in red meat, butter, and cheese to reduce heart disease risk.</li>
            <li>High Cholesterol Foods: Foods high in cholesterol, such as organ meats and shellfish, should be consumed in moderation.</li>
            <li>Healthy Fats: Incorporate healthy fats like avocados, nuts, and olive oil into your diet for better heart health.</li>
            <li>Fiber-Rich Foods: Foods high in fiber, such as vegetables and whole grains, help reduce cholesterol levels.</li>
            <li>Processed Foods: Avoid highly processed foods as they often contain unhealthy fats and added sugars.</li>
            <li>Reading Labels: Always check nutrition labels for trans fats and cholesterol content.</li>
            <li>Low-Fat Dairy: Opt for low-fat or fat-free dairy products to reduce fat intake.</li>
            <li>Omega-3 Fatty Acids: Include sources of omega-3 fatty acids like fish and flaxseeds for heart health.</li>
            <li>Hydration: Drink plenty of water to help manage weight and reduce the need for high-calorie beverages.</li>
        </ul>
    );

    const muscleGrowthContent = (
        <ul>
            <li>Lean Meats: Chicken, turkey, and lean cuts of beef are excellent sources of high-quality protein.</li>
            <li>Fish: Rich in protein and omega-3 fatty acids, fish like salmon and tuna support muscle growth.</li>
            <li>Eggs: Eggs are a versatile and complete protein source ideal for muscle repair and growth.</li>
            <li>Dairy Products: Greek yogurt, cottage cheese, and milk provide protein and calcium for muscle development.</li>
            <li>Plant-Based Proteins: Include beans, lentils, quinoa, and tofu for vegetarian protein options.</li>
            <li>Protein Timing: Consume protein post-workout to aid in muscle recovery and growth.</li>
            <li>Protein Supplements: Whey and casein protein powders can help meet daily protein needs.</li>
            <li>Nuts and Seeds: Almonds, chia seeds, and peanuts offer protein and healthy fats.</li>
            <li>Balanced Diet: Ensure a balanced intake of carbohydrates and fats along with protein for optimal muscle growth.</li>
            <li>Hydration: Proper hydration is crucial for muscle function and recovery.</li>
        </ul>
    );

    const pediatricsContent = (
        <ul>
            <li>Calcium: Essential for bone development, found in dairy products, fortified plant milks, and leafy greens.</li>
            <li>Iron: Important for growth and development, found in lean meats, beans, and fortified cereals.</li>
            <li>Vitamin D: Supports bone health and immune function, sourced from sunlight, fortified foods, and fish.</li>
            <li>Vitamin A: Critical for vision and immune function, found in carrots, sweet potatoes, and spinach.</li>
            <li>Vitamin C: Aids in healing and iron absorption, found in citrus fruits, strawberries, and bell peppers.</li>
            <li>Foods to Avoid: Limit sugary snacks, drinks, and highly processed foods to prevent obesity and tooth decay.</li>
            <li>Whole Grains: Provide essential nutrients and fiber, found in oatmeal, whole wheat bread, and brown rice.</li>
            <li>Healthy Snacks: Encourage fruits, vegetables, and whole grain snacks for better nutrition.</li>
            <li>Hydration: Ensure children drink plenty of water and limit sugary drinks.</li>
            <li>Allergen Awareness: Be cautious of common allergens like nuts, dairy, and gluten in children’s diets.</li>
        </ul>
    );

    return (
        <div>
            <h1>Nutrition Information</h1>

            <p>
                <span className="popup-button" onClick={() => showPopup(weightLossContent)}>Weight Loss</span>
            </p>
            <p>
                <span className="popup-button" onClick={() => showPopup(muscleGrowthContent)}>Muscle Growth</span>
            </p>
            <p>
                <span className="popup-button" onClick={() => showPopup(pediatricsContent)}>Pediatrics</span>
            </p>

            {isPopupVisible && (
                <div className="popup">
                    <span className="close" onClick={hidePopup}>&times;</span>
                    {popupContent}
                </div>
            )}
        </div>
    );
};

export default QuizPage;