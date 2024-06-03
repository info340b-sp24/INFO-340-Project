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
                { question: 'Which fat should be avoided for weight loss?', options: ['Healthy Fats', 'Omega-3 Fatty Acids', 'Trans Fats', 'Fiber-Rich Foods'], answer: 'Trans Fats' },
                { question: 'Which foods help reduce cholesterol levels?', options: ['Processed Foods', 'Fiber-Rich Foods', 'High Cholesterol Foods', 'Trans Fats'], answer: 'Fiber-Rich Foods' },
                { question: 'Which type of dairy products should you opt for weight loss?', options: ['Cheese', 'Butter', 'Low-Fat Dairy', 'Full-Fat Dairy'], answer: 'Low-Fat Dairy' },
                { question: 'Which fats should be included in your diet for better heart health?', options: ['Trans Fats', 'Saturated Fats', 'High Cholesterol Foods', 'Healthy Fats'], answer: 'Healthy Fats' },
                { question: 'Which foods should be consumed in moderation due to high cholesterol content?', options: ['Processed Foods', 'Healthy Fats', 'Fiber-Rich Foods', 'High Cholesterol Foods'], answer: 'High Cholesterol Foods' }
            ];
        } else if (subject === "muscleGrowthContent") {
            return [
                { question: 'Which food is a rich source of high-quality protein?', options: ['High Cholesterol Foods', 'Processed Foods', 'Trans Fats', 'Lean Meats'], answer: 'Lean Meats' },
                { question: 'Which is a plant-based protein option?', options: ['Lean Meats', 'Eggs', 'Tofu', 'Fish'], answer: 'Tofu' },
                { question: 'Which dairy product is good for muscle development?', options: ['Cream', 'Cheese', 'Butter', 'Greek Yogurt'], answer: 'Greek Yogurt' },
                { question: 'Which type of timing is crucial for muscle recovery and growth?', options: ['Processed Foods', 'Healthy Fats', 'High Cholesterol Foods', 'Protein Timing'], answer: 'Protein Timing' },
                { question: 'Which type of nuts are beneficial for muscle growth?', options: ['High Cholesterol Foods', 'Trans Fats', 'Processed Foods', 'Almonds'], answer: 'Almonds' }
            ];
        } else if (subject === "pediatricsContent") {
            return [
                { question: 'Which nutrient is essential for bone development?', options: ['Omega-3 Fatty Acids', 'Iron', 'Vitamin C', 'Calcium'], answer: 'Calcium' },
                { question: 'Which vitamin supports vision and immune function?', options: ['Fiber-Rich Foods', 'Vitamin C', 'Iron', 'Vitamin A'], answer: 'Vitamin A' },
                { question: 'Which food should be limited to prevent obesity and tooth decay?', options: ['Lean Meats', 'Fiber-Rich Foods', 'Sugary Snacks', 'Whole Grains'], answer: 'Sugary Snacks' },
                { question: 'Which nutrient aids in healing and iron absorption?', options: ['Vitamin A', 'Vitamin D', 'Iron', 'Vitamin C'], answer: 'Vitamin C' },
                { question: 'Which type of grains should be included for better nutrition?', options: ['Sugary Snacks', 'Processed Foods', 'Whole Grains', 'High Cholesterol Foods'], answer: 'Whole Grains' }
            ];
        } else if (subject === "veganContent") {
            return [
                { question: 'Which food combination provides complete proteins?', options: ['Pasta and Cheese', 'Rice and Beans', 'Fruit and Yogurt', 'Bread and Butter'], answer: 'Rice and Beans' },
                { question: 'What is a good plant-based source of omega-3 fatty acids?', options: ['Butter', 'Chicken', 'Cheese', 'Flaxseeds'], answer: 'Flaxseeds' },
                { question: 'Which nutrient is not naturally found in plant foods and should be supplemented?', options: ['Vitamin B12', 'Vitamin A', 'Iron', 'Vitamin C'], answer: 'Vitamin B12' },
                { question: 'What is an excellent plant-based protein source?', options: ['Chicken', 'Tofu', 'Fish', 'Eggs'], answer: 'Tofu' },
                { question: 'Which food is high in iron for vegans?', options: ['Milk', 'Beef', 'Cheese', 'Lentils'], answer: 'Lentils' }
            ];
        } else if (subject === "healthyAgingContent") {
            return [
                { question: 'Which nutrient is essential for bone health in aging adults?', options: ['Vitamin C', 'Calcium', 'Iron', 'Omega-3 Fatty Acids'], answer: 'Calcium' },
                { question: 'What is a good source of antioxidants for healthy aging?', options: ['Soda', 'Candy', 'Berries', 'Fried Foods'], answer: 'Berries' },
                { question: 'Which type of fat should be included for heart and brain health?', options: ['Saturated Fats', 'High Cholesterol Foods', 'Omega-3 Fatty Acids', 'Trans Fats'], answer: 'Omega-3 Fatty Acids' },
                { question: 'Which vitamin is crucial for nerve function in older adults?', options: ['Vitamin D', 'Iron', 'Vitamin C', 'Vitamin B12'], answer: 'Vitamin B12' },
                { question: 'What is a good dietary source of fiber for aging adults?', options: ['Soda', 'White Bread', 'Whole Grains', 'Candy'], answer: 'Whole Grains' }
            ];
        } else if (subject === "diabetesManagementContent") {
            return [
                { question: 'Which type of food helps manage blood sugar levels?', options: ['Sugary Snacks', 'White Bread', 'Candy', 'Low-Glycemic Foods'], answer: 'Low-Glycemic Foods' },
                { question: 'What should be included in a diet to support heart health in diabetics?', options: ['Sugary Snacks', 'Trans Fats', 'Healthy Fats', 'High Cholesterol Foods'], answer: 'Healthy Fats' },
                { question: 'Which nutrient helps control blood sugar spikes?', options: ['Salt', 'Fiber', 'Sugar', 'Fats'], answer: 'Fiber' },
                { question: 'What is important to monitor for portion control in diabetics?', options: ['Proteins', 'Vitamins', 'Minerals', 'Carbohydrates'], answer: 'Carbohydrates' },
                { question: 'Which beverage should be consumed to prevent dehydration in diabetics?', options: ['Juice', 'Alcohol', 'Soda', 'Water'], answer: 'Water' }
            ];
        } else if (subject === "heartHealthContent") {
            return [
                { question: 'Which type of fat supports heart health?', options: ['Trans Fats', 'Healthy Fats', 'Saturated Fats', 'High Cholesterol Foods'], answer: 'Healthy Fats' },
                { question: 'Which food is a good source of omega-3 fatty acids?', options: ['Chicken', 'Fish', 'Butter', 'Cheese'], answer: 'Fish' },
                { question: 'Which nutrient helps lower cholesterol levels?', options: ['Salt', 'Fiber', 'Fats', 'Sugar'], answer: 'Fiber' },
                { question: 'What should be reduced to maintain healthy blood pressure levels?', options: ['Potassium', 'Sodium', 'Magnesium', 'Calcium'], answer: 'Sodium' },
                { question: 'What should be combined with a healthy diet for heart health?', options: ['Smoking', 'Drinking', 'Stress', 'Regular Exercise'], answer: 'Regular Exercise' }
            ];
        } else if (subject === "immuneSupportContent") {
            return [
                { question: 'Which vitamin boosts immune function?', options: ['Vitamin D', 'Vitamin E', 'Vitamin C', 'Vitamin K'], answer: 'Vitamin C' },
                { question: 'Which food is a good source of probiotics?', options: ['Bread', 'Yogurt', 'Pasta', 'Rice'], answer: 'Yogurt' },
                { question: 'Which nutrient supports immune health and can be sourced from sunlight?', options: ['Vitamin C', 'Vitamin D', 'Vitamin B12', 'Iron'], answer: 'Vitamin D' },
                { question: 'Which food is known for its immune-boosting properties?', options: ['Butter', 'Salt', 'Garlic', 'Sugar'], answer: 'Garlic' },
                { question: 'What should be included in the diet for overall immune health?', options: ['Trans Fats', 'Healthy Fats', 'Processed Foods', 'Sugary Snacks'], answer: 'Healthy Fats' }
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
                    <h3>{`Your score: ${score}/${questions.length} - ${score >= 4 ? 'You passed!' : 'You failed, study some more and try again!'}`}</h3>
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
