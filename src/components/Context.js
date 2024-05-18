import React, { createContext, useContext, useState, useEffect } from 'react';

const DietContext = createContext({
    meals: [],
    setMeals: () => {},
});

export const useDiet = () => {
    return useContext(DietContext);
};

export const ContextProvider = ({ children }) => {
    const [meals, setMeals] = useState(() => {
        const savedMeals = localStorage.getItem('meals');
        return savedMeals ? JSON.parse(savedMeals) : [{ id: 1, name: 'Meal 1', foods: [] }];
    });

    useEffect(() => {
        localStorage.setItem('meals', JSON.stringify(meals));
    }, [meals]);

    return (
        <DietContext.Provider value={{ meals, setMeals }}>
            {children}
        </DietContext.Provider>
    );
};