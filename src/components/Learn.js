import React, { useState } from 'react';
import '../index.css';
import Flashcard from './Flashcard';

const LearnPage = () => {
    const [flashcardContent, setFlashcardContent] = useState([]);
    const [isFlashcardVisible, setIsFlashcardVisible] = useState(false);

    const showFlashcard = (content) => {
        setFlashcardContent(content);
        setIsFlashcardVisible(true);
    };

    const hideFlashcard = () => {
        setIsFlashcardVisible(false);
    };

    const weightLossContent = [
        "Trans Fats: Found in fried foods and baked goods, trans fats increase bad cholesterol levels and should be avoided.",
        "Saturated Fats: Limit intake of saturated fats found in red meat, butter, and cheese to reduce heart disease risk.",
        "High Cholesterol Foods: Foods high in cholesterol, such as organ meats and shellfish, should be consumed in moderation.",
        "Healthy Fats: Incorporate healthy fats like avocados, nuts, and olive oil into your diet for better heart health.",
        "Fiber-Rich Foods: Foods high in fiber, such as vegetables and whole grains, help reduce cholesterol levels.",
        "Processed Foods: Avoid highly processed foods as they often contain unhealthy fats and added sugars.",
        "Reading Labels: Always check nutrition labels for trans fats and cholesterol content.",
        "Low-Fat Dairy: Opt for low-fat or fat-free dairy products to reduce fat intake.",
        "Omega-3 Fatty Acids: Include sources of omega-3 fatty acids like fish and flaxseeds for heart health.",
        "Hydration: Drink plenty of water to help manage weight and reduce the need for high-calorie beverages."
    ];

    const muscleGrowthContent = [
        "Lean Meats: Chicken, turkey, and lean cuts of beef are excellent sources of high-quality protein.",
        "Fish: Rich in protein and omega-3 fatty acids, fish like salmon and tuna support muscle growth.",
        "Eggs: Eggs are a versatile and complete protein source ideal for muscle repair and growth.",
        "Dairy Products: Greek yogurt, cottage cheese, and milk provide protein and calcium for muscle development.",
        "Plant-Based Proteins: Include beans, lentils, quinoa, and tofu for vegetarian protein options.",
        "Protein Timing: Consume protein post-workout to aid in muscle recovery and growth.",
        "Protein Supplements: Whey and casein protein powders can help meet daily protein needs.",
        "Nuts and Seeds: Almonds, chia seeds, and peanuts offer protein and healthy fats.",
        "Balanced Diet: Ensure a balanced intake of carbohydrates and fats along with protein for optimal muscle growth.",
        "Hydration: Proper hydration is crucial for muscle function and recovery."
    ];

    const pediatricsContent = [
        "Calcium: Essential for bone development, found in dairy products, fortified plant milks, and leafy greens.",
        "Iron: Important for growth and development, found in lean meats, beans, and fortified cereals.",
        "Vitamin D: Supports bone health and immune function, sourced from sunlight, fortified foods, and fish.",
        "Vitamin A: Critical for vision and immune function, found in carrots, sweet potatoes, and spinach.",
        "Vitamin C: Aids in healing and iron absorption, found in citrus fruits, strawberries, and bell peppers.",
        "Foods to Avoid: Limit sugary snacks, drinks, and highly processed foods to prevent obesity and tooth decay.",
        "Whole Grains: Provide essential nutrients and fiber, found in oatmeal, whole wheat bread, and brown rice.",
        "Healthy Snacks: Encourage fruits, vegetables, and whole grain snacks for better nutrition.",
        "Hydration: Ensure children drink plenty of water and limit sugary drinks.",
        "Allergen Awareness: Be cautious of common allergens like nuts, dairy, and gluten in children’s diets."
    ];

    return (
        <div className="learn-page">
            <h1 className="learn-heading">Learn Page</h1>
            <div className="learn-content">
                <div className="learn-item">
                    <h3>Weight Loss</h3>
                    <p>Nutrition tips for weight loss.</p>
                    <button onClick={() => showFlashcard(weightLossContent)}>Learn About Weight Loss</button>
                </div>
                <div className="learn-item">
                    <h3>Muscle Growth</h3>
                    <p>Nutrition tips for muscle growth.</p>
                    <button onClick={() => showFlashcard(muscleGrowthContent)}>Learn About Muscle Growth</button>
                </div>
                <div className="learn-item">
                    <h3>Pediatrics</h3>
                    <p>Nutrition tips for children.</p>
                    <button onClick={() => showFlashcard(pediatricsContent)}>Learn About Pediatrics</button>
                </div>
            </div>
            {isFlashcardVisible && (
                <Flashcard content={flashcardContent} onClose={hideFlashcard} />
            )}
        </div>
    );
};

export default LearnPage;
