import React, { useState } from 'react';
import ServingForm from './ServingForm';
import MealSummary from './MealSummary';

function CustomServingApp() {
    const [meal, setMeal] = useState([]);
    const [totalNutrition, setTotalNutrition] = useState({
        calories: 0,
        fat: 0,
        carbs: 0,
        fiber: 0, // Added fiber to avoid undefined errors
        protein: 0,
    });

    const addToMeal = (adjustedNutrition) => {
        setMeal([...meal, adjustedNutrition]);
        setTotalNutrition(prevTotal => ({
            calories: prevTotal.calories + adjustedNutrition.calories,
            fat: prevTotal.fat + adjustedNutrition.fat,
            carbs: prevTotal.carbs + adjustedNutrition.carbs,
            fiber: prevTotal.fiber + adjustedNutrition.fiber, // Include fiber in total calculations
            protein: prevTotal.protein + adjustedNutrition.protein,
        }));
    };

    const removeFromMeal = (index) => {
        const removedItem = meal[index];
        const updatedMeal = meal.filter((_, i) => i !== index);

        setMeal(updatedMeal);
        setTotalNutrition(prevTotal => ({
            calories: prevTotal.calories - removedItem.calories,
            fat: prevTotal.fat - removedItem.fat,
            carbs: prevTotal.carbs - removedItem.carbs,
            fiber: prevTotal.fiber - removedItem.fiber, // Subtract fiber when item is removed
            protein: prevTotal.protein - removedItem.protein,
        }));
    };

    return (
        <div>
            <h1>Custom Serving Calculator</h1>
            <ServingForm onAddToMeal={addToMeal} />
            <MealSummary meal={meal} totalNutrition={totalNutrition} onRemove={removeFromMeal} />
        </div>
    );
}

export default CustomServingApp;
