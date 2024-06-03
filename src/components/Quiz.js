import React, { useState, useEffect } from 'react';
import '../index.css';

const Quiz = ({ subjects, onClose }) => {
    const [selectedSubject, setSelectedSubject] = useState('');
    const [quizStarted, setQuizStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if (quizStarted && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setShowResult(true);
        }
    }, [quizStarted, timeLeft]);

    const generateQuestions = (subject) => {
        if (subject === "weightLossContent") {
            return [
                { question: 'Which fat should be avoided for weight loss?', options: ['Trans Fats', 'Healthy Fats', 'Omega-3 Fatty Acids', 'Fiber-Rich Foods'], answer: 'Trans Fats' },
                { question: 'Which foods help reduce cholesterol levels?', options: ['Fiber-Rich Foods', 'Trans Fats', 'High Cholesterol Foods', 'Processed Foods'], answer: 'Fiber-Rich Foods' },
                { question: 'Which type of dairy products should you opt for weight loss?', options: ['Low-Fat Dairy', 'Full-Fat Dairy', 'Cheese', 'Butter'], answer: 'Low-Fat Dairy' },
                { question: 'Which fats should be included in your diet for better heart health?', options: ['Healthy Fats', 'Saturated Fats', 'Trans Fats', 'High Cholesterol Foods'], answer: 'Healthy Fats' },
                { question: 'Which foods should be consumed in moderation due to high cholesterol content?', options: ['High Cholesterol Foods', 'Fiber-Rich Foods', 'Processed Foods', 'Healthy Fats'], answer: 'High Cholesterol Foods' }
            ];
        } else if (subject === "muscleGrowthContent") {
            return [
                { question: 'Which food is a rich source of high-quality protein?', options: ['Lean Meats', 'Processed Foods', 'High Cholesterol Foods', 'Trans Fats'], answer: 'Lean Meats' },
                { question: 'Which is a plant-based protein option?', options: ['Tofu', 'Lean Meats', 'Eggs', 'Fish'], answer: 'Tofu' },
                { question: 'Which dairy product is good for muscle development?', options: ['Greek Yogurt', 'Butter', 'Cheese', 'Cream'], answer: 'Greek Yogurt' },
                { question: 'Which type of timing is crucial for muscle recovery and growth?', options: ['Protein Timing', 'Healthy Fats', 'High Cholesterol Foods', 'Processed Foods'], answer: 'Protein Timing' },
                { question: 'Which type of nuts are beneficial for muscle growth?', options: ['Almonds', 'High Cholesterol Foods', 'Trans Fats', 'Processed Foods'], answer: 'Almonds' }
            ];
        } else if (subject === "pediatricsContent") {
            return [
                { question: 'Which nutrient is essential for bone development?', options: ['Calcium', 'Iron', 'Vitamin C', 'Omega-3 Fatty Acids'], answer: 'Calcium' },
                { question: 'Which vitamin supports vision and immune function?', options: ['Vitamin A', 'Vitamin C', 'Iron', 'Fiber-Rich Foods'], answer: 'Vitamin A' },
                { question: 'Which food should be limited to prevent obesity and tooth decay?', options: ['Sugary Snacks', 'Whole Grains', 'Lean Meats', 'Fiber-Rich Foods'], answer: 'Sugary Snacks' },
                { question: 'Which nutrient aids in healing and iron absorption?', options: ['Vitamin C', 'Vitamin A', 'Vitamin D', 'Iron'], answer: 'Vitamin C' },
                { question: 'Which type of grains should be included for better nutrition?', options: ['Whole Grains', 'High Cholesterol Foods', 'Processed Foods', 'Sugary Snacks'], answer: 'Whole Grains' }
            ];
        } else if (subject === "veganContent") {
            return [
                { question: 'Which food combination provides complete proteins?', options: ['Rice and Beans', 'Bread and Butter', 'Pasta and Cheese', 'Fruit and Yogurt'], answer: 'Rice and Beans' },
                { question: 'What is a good plant-based source of omega-3 fatty acids?', options: ['Flaxseeds', 'Butter', 'Cheese', 'Chicken'], answer: 'Flaxseeds' },
                { question: 'Which nutrient is not naturally found in plant foods and should be supplemented?', options: ['Vitamin B12', 'Vitamin C', 'Vitamin A', 'Iron'], answer: 'Vitamin B12' },
                { question: 'What is an excellent plant-based protein source?', options: ['Tofu', 'Chicken', 'Fish', 'Eggs'], answer: 'Tofu' },
                { question: 'Which food is high in iron for vegans?', options: ['Lentils', 'Beef', 'Milk', 'Cheese'], answer: 'Lentils' }
            ];
        } else if (subject === "healthyAgingContent") {
            return [
                { question: 'Which nutrient is essential for bone health in aging adults?', options: ['Calcium', 'Iron', 'Vitamin C', 'Omega-3 Fatty Acids'], answer: 'Calcium' },
                { question: 'What is a good source of antioxidants for healthy aging?', options: ['Berries', 'Fried Foods', 'Soda', 'Candy'], answer: 'Berries' },
                { question: 'Which type of fat should be included for heart and brain health?', options: ['Omega-3 Fatty Acids', 'Trans Fats', 'Saturated Fats', 'High Cholesterol Foods'], answer: 'Omega-3 Fatty Acids' },
                { question: 'Which vitamin is crucial for nerve function in older adults?', options: ['Vitamin B12', 'Vitamin C', 'Vitamin D', 'Iron'], answer: 'Vitamin B12' },
                { question: 'What is a good dietary source of fiber for aging adults?', options: ['Whole Grains', 'White Bread', 'Soda', 'Candy'], answer: 'Whole Grains' }
            ];
        } else if (subject === "diabetesManagementContent") {
            return [
                { question: 'Which type of food helps manage blood sugar levels?', options: ['Low-Glycemic Foods', 'Sugary Snacks', 'White Bread', 'Candy'], answer: 'Low-Glycemic Foods' },
                { question: 'What should be included in a diet to support heart health in diabetics?', options: ['Healthy Fats', 'Trans Fats', 'High Cholesterol Foods', 'Sugary Snacks'], answer: 'Healthy Fats' },
                { question: 'Which nutrient helps control blood sugar spikes?', options: ['Fiber', 'Sugar', 'Salt', 'Fats'], answer: 'Fiber' },
                { question: 'What is important to monitor for portion control in diabetics?', options: ['Carbohydrates', 'Proteins', 'Vitamins', 'Minerals'], answer: 'Carbohydrates' },
                { question: 'Which beverage should be consumed to prevent dehydration in diabetics?', options: ['Water', 'Soda', 'Juice', 'Alcohol'], answer: 'Water' }
            ];
        } else if (subject === "heartHealthContent") {
            return [
                { question: 'Which type of fat supports heart health?', options: ['Healthy Fats', 'Trans Fats', 'Saturated Fats', 'High Cholesterol Foods'], answer: 'Healthy Fats' },
                { question: 'Which food is a good source of omega-3 fatty acids?', options: ['Fish', 'Butter', 'Cheese', 'Chicken'], answer: 'Fish' },
                { question: 'Which nutrient helps lower cholesterol levels?', options: ['Fiber', 'Sugar', 'Salt', 'Fats'], answer: 'Fiber' },
                { question: 'What should be reduced to maintain healthy blood pressure levels?', options: ['Sodium', 'Potassium', 'Magnesium', 'Calcium'], answer: 'Sodium' },
                { question: 'What should be combined with a healthy diet for heart health?', options: ['Regular Exercise', 'Smoking', 'Drinking', 'Stress'], answer: 'Regular Exercise' }
            ];
        } else if (subject === "immuneSupportContent") {
            return [
                { question: 'Which vitamin boosts immune function?', options: ['Vitamin C', 'Vitamin D', 'Vitamin E', 'Vitamin K'], answer: 'Vitamin C' },
                { question: 'Which food is a good source of probiotics?', options: ['Yogurt', 'Bread', 'Pasta', 'Rice'], answer: 'Yogurt' },
                { question: 'Which nutrient supports immune health and can be sourced from sunlight?', options: ['Vitamin D', 'Vitamin C', 'Vitamin B12', 'Iron'], answer: 'Vitamin D' },
                { question: 'Which food is known for its immune-boosting properties?', options: ['Garlic', 'Sugar', 'Salt', 'Butter'], answer: 'Garlic' },
                { question: 'What should be included in the diet for overall immune health?', options: ['Healthy Fats', 'Trans Fats', 'Sugary Snacks', 'Processed Foods'], answer: 'Healthy Fats' }
            ];
        } else {
            return [];
        }
    };

    const startQuiz = () => {
        const questions = generateQuestions(selectedSubject);
        setQuestions(questions);
        setQuizStarted(true);
    };

    const handleOptionClick = (option) => {
        if (option === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
    };

    const saveQuizResult = () => {
        // Placeholder for saving quiz result
        // In a real application, you would save the result to the user's profile
        alert('Quiz result saved');
        onClose();
    };

    if (showResult) {
        return (
            <div className="quiz-modal">
                <div className="quiz-modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h3>{score >= 4 ? 'You passed!' : 'You failed.'}</h3>
                    <button className="quiz-button" onClick={saveQuizResult}>Save Quiz</button>
                    <button className="quiz-button" onClick={onClose}>Close</button>
                </div>
            </div>
        );
    }

    if (quizStarted) {
        const optionsList = questions[currentQuestionIndex].options.map((option, index) => (
            <button className="quiz-option-button" key={index} onClick={() => handleOptionClick(option)}>{option}</button>
        ));

        return (
            <div className="quiz-modal">
                <div className="quiz-modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h3>{questions[currentQuestionIndex].question}</h3>
                    <div className="options">
                        {optionsList}
                    </div>
                    <div className="timer">Time left: {timeLeft} seconds</div>
                </div>
            </div>
        );
    }

    const subjectOptions = (
        <select className="quiz-select" onChange={handleSubjectChange} value={selectedSubject}>
            <option value="" disabled>Select a subject</option>
            <option value="weightLossContent">Weight Loss</option>
            <option value="muscleGrowthContent">Muscle Growth</option>
            <option value="pediatricsContent">Pediatrics</option>
            <option value="veganContent">Vegan and Vegetarian Nutrition</option>
            <option value="healthyAgingContent">Healthy Aging</option>
            <option value="diabetesManagementContent">Diabetes Management</option>
            <option value="heartHealthContent">Heart Health</option>
            <option value="immuneSupportContent">Immune Support</option>
        </select>
    );

    return (
        <div className="quiz-modal">
            <div className="quiz-modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>Select a subject to start the quiz</h3>
                {subjectOptions}
                <button className="quiz-button" onClick={startQuiz} disabled={!selectedSubject}>Start Quiz</button>
            </div>
        </div>
    );
};

export default Quiz;
