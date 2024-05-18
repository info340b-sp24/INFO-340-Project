import React, { useState } from 'react';
import "../CSS/Quiz.css";

// Quiz component
const QuizPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [newQuiz, setNewQuiz] = useState({ title: '', questions: [] });
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [viewQuiz, setViewQuiz] = useState(null);

    // Function to handle adding a new quiz
    const addQuiz = () => {
        if (newQuiz.title && newQuiz.questions.length > 0) {
            setQuizzes([...quizzes, { ...newQuiz, likes: 0 }]);
            setNewQuiz({ title: '', questions: [] });
        }
    };

    // Function to handle adding a new question to the current quiz
    const addQuestion = () => {
        if (currentQuestion && currentAnswer) {
            setNewQuiz({
                ...newQuiz,
                questions: [...newQuiz.questions, { question: currentQuestion, answer: currentAnswer }]
            });
            setCurrentQuestion('');
            setCurrentAnswer('');
        }
    };

    // Function to handle liking a quiz
    const likeQuiz = (index) => {
        const updatedQuizzes = quizzes.map((quiz, i) => (
            i === index ? { ...quiz, likes: quiz.likes + 1 } : quiz
        ));
        setQuizzes(updatedQuizzes);
    };

    // Sort quizzes by number of likes
    const sortedQuizzes = quizzes.sort((a, b) => b.likes - a.likes);

    return (
        <div id="quizPage">
            <section>
                <h1>Sort by: Likes</h1>
                <div id="quizCards">
                    {sortedQuizzes.map((quiz, index) => (
                        <div key={index} className="quiz-card">
                            <h3>{quiz.title}</h3>
                            <p>Likes: {quiz.likes}</p>
                            <div className="quiz-card-buttons">
                                <button onClick={() => likeQuiz(index)}>Like</button>
                                <button onClick={() => setViewQuiz(quiz)}>View Quiz</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {viewQuiz && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setViewQuiz(null)}>&times;</span>
                        <h2>{viewQuiz.title}</h2>
                        <ul>
                            {viewQuiz.questions.map((qa, index) => (
                                <li key={index}>{qa.question} - {qa.answer}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <section>
                <h1>Generate Your Own Quiz</h1>
                <div id="generateCards">
                    <div className="create-quiz-form">
                        <input
                            type="text"
                            placeholder="Quiz Title"
                            value={newQuiz.title}
                            onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                        />
                        <div className="question-form">
                            <input
                                type="text"
                                placeholder="Question"
                                value={currentQuestion}
                                onChange={(e) => setCurrentQuestion(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Answer"
                                value={currentAnswer}
                                onChange={(e) => setCurrentAnswer(e.target.value)}
                            />
                            <button onClick={addQuestion}>Add Question</button>
                        </div>
                        <button onClick={addQuiz}>Create Quiz</button>
                    </div>
                    <div className="current-quiz">
                        <h3>Current Quiz: {newQuiz.title}</h3>
                        <ul>
                            {newQuiz.questions.map((qa, index) => (
                                <li key={index}>{qa.question} - {qa.answer}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default QuizPage;