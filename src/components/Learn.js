import React, { useState } from 'react';
import Flashcard from './Flashcard';
import Quiz from './Quiz';
import '../index.css';
import WeightLossImg from '../Data/Image/WeightLoss.jpg';
import MuscleGain from '../Data/Image/muscleGain.jpg';
import PediatricsImg from '../Data/Image/PediatricsImg.jpg';
import VeganImg from '../Data/Image/Vegan.jpg';  // Add image paths for new topics
import HealthyAgingImg from '../Data/Image/HealthyAging.jpg';
import DiabetesImg from '../Data/Image/Diabetes.jpg';
import HeartHealthImg from '../Data/Image/HeartHealth.jpg';
import ImmuneSupportImg from '../Data/Image/ImmuneSupport.jpg';

const LearnPage = () => {
    const [flashcardContent, setFlashcardContent] = useState([]);
    const [isFlashcardVisible, setIsFlashcardVisible] = useState(false);
    const [isQuizVisible, setIsQuizVisible] = useState(false);

    const showFlashcard = (content) => {
        setFlashcardContent(content);
        setIsFlashcardVisible(true);
    };

    const hideFlashcard = () => {
        setIsFlashcardVisible(false);
    };

    const showQuiz = () => {
        setIsQuizVisible(true);
    };

    const hideQuiz = () => {
        setIsQuizVisible(false);
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

    const veganContent = [
        "Complete Proteins: Combine grains and legumes, like rice and beans, to get all essential amino acids.",
        "Iron: Include lentils, chickpeas, tofu, and fortified cereals to ensure adequate iron intake.",
        "Calcium: Opt for fortified plant milks, leafy greens, and tofu to meet calcium needs.",
        "Vitamin B12: Since it's not naturally found in plant foods, take B12 supplements or consume fortified foods.",
        "Omega-3 Fatty Acids: Include flaxseeds, chia seeds, and walnuts for plant-based omega-3s.",
        "Protein Sources: Beans, lentils, tofu, tempeh, and quinoa are excellent sources of plant protein.",
        "Vitamin D: Get sufficient sunlight exposure and consume fortified foods or supplements.",
        "Zinc: Include beans, lentils, and seeds to ensure adequate zinc intake.",
        "Fiber: A vegan diet is naturally high in fiber, promoting digestive health.",
        "Hydration: Drink plenty of water and include hydrating foods like fruits and vegetables."
    ];

    const healthyAgingContent = [
        "Calcium and Vitamin D: Essential for bone health, found in dairy products and fortified plant milks.",
        "Fiber: Include fruits, vegetables, and whole grains to maintain digestive health.",
        "Omega-3 Fatty Acids: Found in fish, flaxseeds, and walnuts to support heart and brain health.",
        "Protein: Ensure adequate protein intake to maintain muscle mass with age.",
        "Antioxidants: Include berries, leafy greens, and nuts to combat oxidative stress.",
        "Hydration: Drink plenty of water to maintain skin health and overall well-being.",
        "Vitamin B12: Important for nerve function, found in fortified foods and supplements.",
        "Low Sodium: Reduce salt intake to maintain healthy blood pressure levels.",
        "Healthy Fats: Include avocados, nuts, and olive oil for overall health.",
        "Regular Meals: Maintain a regular eating schedule to support metabolic health."
    ];

    const diabetesManagementContent = [
        "Low-Glycemic Foods: Include whole grains, legumes, and non-starchy vegetables to manage blood sugar levels.",
        "Fiber: High-fiber foods like fruits, vegetables, and whole grains help control blood sugar spikes.",
        "Healthy Fats: Incorporate avocados, nuts, and olive oil to support heart health.",
        "Lean Protein: Choose lean meats, fish, tofu, and legumes to maintain muscle mass.",
        "Portion Control: Monitor portion sizes to manage calorie intake and blood sugar levels.",
        "Hydration: Drink plenty of water to support overall health and prevent dehydration.",
        "Carbohydrate Counting: Track carb intake to better manage blood sugar levels.",
        "Regular Meals: Eat at consistent times to stabilize blood sugar levels.",
        "Avoid Sugary Foods: Limit intake of sugary snacks and beverages.",
        "Exercise: Combine a balanced diet with regular physical activity for optimal diabetes management."
    ];

    const heartHealthContent = [
        "Healthy Fats: Include avocados, nuts, seeds, and olive oil for heart-healthy fats.",
        "Omega-3 Fatty Acids: Found in fish, flaxseeds, and walnuts to support heart health.",
        "Fiber: Consume fruits, vegetables, and whole grains to lower cholesterol levels.",
        "Lean Protein: Opt for lean meats, fish, and plant-based proteins.",
        "Low Sodium: Reduce salt intake to maintain healthy blood pressure levels.",
        "Antioxidants: Include berries, leafy greens, and dark chocolate to protect against oxidative stress.",
        "Whole Grains: Choose whole grains over refined grains for better heart health.",
        "Hydration: Drink plenty of water to support overall cardiovascular health.",
        "Avoid Trans Fats: Limit intake of trans fats found in fried and processed foods.",
        "Regular Exercise: Combine a healthy diet with regular physical activity."
    ];

    const immuneSupportContent = [
        "Vitamin C: Found in citrus fruits, strawberries, and bell peppers to boost immune function.",
        "Vitamin D: Supports immune health, sourced from sunlight, fortified foods, and supplements.",
        "Zinc: Include beans, lentils, nuts, and seeds to support immune function.",
        "Probiotics: Consume yogurt, kefir, and fermented foods to promote gut health.",
        "Antioxidants: Include berries, leafy greens, and nuts to combat oxidative stress.",
        "Hydration: Drink plenty of water to support overall immune health.",
        "Protein: Ensure adequate protein intake from lean meats, fish, tofu, and legumes.",
        "Garlic: Known for its immune-boosting properties, add garlic to your meals.",
        "Ginger: Incorporate ginger in your diet for its anti-inflammatory and immune-boosting effects.",
        "Healthy Fats: Include avocados, nuts, and olive oil for overall health."
    ];

    return (
        <div className="learn-page">
            <h1 className="learn-heading">Learn Page</h1>
            <div className="learn-content">
                <div className="learn-item">
                    <h2>Weight Loss</h2>
                    <p>Nutrition tips for weight loss.</p>
                    <img src={WeightLossImg} alt="Weight Loss"/>
                    <button onClick={() => showFlashcard(weightLossContent)}>Learn About Weight Loss</button>
                </div>
                <div className="learn-item">
                    <h3>Muscle Growth</h3>
                    <p>Nutrition tips for muscle growth.</p>
                    <img src={MuscleGain} alt="Muscle Gain"/>
                    <button onClick={() => showFlashcard(muscleGrowthContent)}>Learn About Muscle Growth</button>
                </div>
                <div className="learn-item">
                    <h2>Pediatrics</h2>
                    <p>Nutrition tips for children.</p>
                    <img src={PediatricsImg} alt="Pediatrics"/>
                    <button onClick={() => showFlashcard(pediatricsContent)}>Learn About Pediatrics</button>
                </div>
                <div className="learn-item">
                    <h2>Vegan and Vegetarian Nutrition</h2>
                    <p>Nutrition tips for vegans and vegetarians.</p>
                    <img src={VeganImg} alt="Vegan and Vegetarian Nutrition"/>
                    <button onClick={() => showFlashcard(veganContent)}>Learn About Vegan and Vegetarian Nutrition</button>
                </div>
                <div className="learn-item">
                    <h2>Healthy Aging</h2>
                    <p>Nutrition tips for healthy aging.</p>
                    <img src={HealthyAgingImg} alt="Healthy Aging"/>
                    <button onClick={() => showFlashcard(healthyAgingContent)}>Learn About Healthy Aging</button>
                </div>
                <div className="learn-item">
                    <h2>Diabetes Management</h2>
                    <p>Nutrition tips for managing diabetes.</p>
                    <img src={DiabetesImg} alt="Diabetes Management"/>
                    <button onClick={() => showFlashcard(diabetesManagementContent)}>Learn About Diabetes Management</button>
                </div>
                <div className="learn-item">
                    <h2>Heart Health</h2>
                    <p>Nutrition tips for heart health.</p>
                    <img src={HeartHealthImg} alt="Heart Health"/>
                    <button onClick={() => showFlashcard(heartHealthContent)}>Learn About Heart Health</button>
                </div>
                <div className="learn-item">
                    <h2>Immune Support</h2>
                    <p>Nutrition tips for supporting the immune system.</p>
                    <img src={ImmuneSupportImg} alt="Immune Support"/>
                    <button onClick={() => showFlashcard(immuneSupportContent)}>Learn About Immune Support</button>
                </div>
            </div>
            <div className="quiz-section">
                <h2 className="quiz-heading">Quizzes</h2>
                <p>Would you like to take a timed 30-second quiz?</p>
                <button className="quiz-button" onClick={showQuiz}>Start Quiz</button>
            </div>
            {isFlashcardVisible && (
                <Flashcard content={flashcardContent} onClose={hideFlashcard} />
            )}
            {isQuizVisible && (
                <div className="quiz-modal">
                    <div className="quiz-modal-content">
                        <Quiz onClose={hideQuiz} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LearnPage;
