import React, { useState, useEffect } from 'react';
import '../index.css';

const Quiz = ({ subjects, onClose }) => {
    const [selectedSubject, setSelectedSubject] = useState('');
    const [quizStarted, setQuizStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);

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
        return (
            <div className="quiz-modal">
                <div className="quiz-modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h3>{questions[currentQuestionIndex].question}</h3>
                    <div className="options">
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <button className="quiz-option-button" key={index} onClick={() => handleOptionClick(option)}>{option}</button>
                        ))}
                    </div>
                    <div className="timer">Time left: {timeLeft} seconds</div>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-modal">
            <div className="quiz-modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>Select a subject to start the quiz</h3>
                <select className="quiz-select" onChange={handleSubjectChange} value={selectedSubject}>
                    <option value="" disabled>Select a subject</option>
                    <option value="weightLossContent">Weight Loss</option>
                    <option value="muscleGrowthContent">Muscle Growth</option>
                    <option value="pediatricsContent">Pediatrics</option>
                </select>
                <button className="quiz-button" onClick={startQuiz} disabled={!selectedSubject}>Start Quiz</button>
            </div>
        </div>
    );
};

export default Quiz;
