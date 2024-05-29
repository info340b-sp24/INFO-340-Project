import React, { useState } from 'react';
import '../index.css';

const Flashcard = ({ content, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        if (currentIndex < content.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const goToPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const formatContent = (text) => {
        const [firstPart, ...rest] = text.split(': ');
        return <><strong>{firstPart}:</strong> {rest.join(': ')}</>;
    };

    return (
        <div className="flashcard-modal">
            <div className="flashcard-modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="flashcard-content">
                    {formatContent(content[currentIndex])}
                </div>
                <div className="flashcard-navigation">
                    <button onClick={goToPrev} disabled={currentIndex === 0}>Previous</button>
                    <button onClick={goToNext} disabled={currentIndex === content.length - 1}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
