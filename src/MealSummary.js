import React from 'react';
import './MealSummary.css';

function MealSummary({ meal, totalNutrition, onRemove }) {
    const netCarbs = totalNutrition.carbs - totalNutrition.fiber;

    return (
        <div>
            <h2>Meal Breakdown</h2>
            <ul>
                {meal.map((item, index) => (
                    <li key={index}>
                        <p>Item {index + 1} - Calories: {item.calories.toFixed(2)}, Fat: {item.fat.toFixed(2)}, Carbs: {item.carbs.toFixed(2)}, Fiber: {item.fiber.toFixed(2)}, Protein: {item.protein.toFixed(2)}</p>
                        <div className="net-carbs-box">
                            <p>Net Carbs: <span className="net-carbs">{(item.carbs - item.fiber).toFixed(2)}g</span></p>
                        </div>
                        <button onClick={() => onRemove(index)}>Remove</button>
                    </li>
                ))}
            </ul>

            <h2>Total Nutrition</h2>
            <p>Calories: {totalNutrition.calories.toFixed(2)}</p>
            <p>Fat: {totalNutrition.fat.toFixed(2)}g</p>
            <p>Carbs: {totalNutrition.carbs.toFixed(2)}g</p>
            <p>Fiber: {totalNutrition.fiber.toFixed(2)}g</p>
            <div className="net-carbs-box">
                <p>Net Carbs: <span className="net-carbs">{netCarbs.toFixed(2)}g</span></p>
            </div>
            <p>Protein: {totalNutrition.protein.toFixed(2)}g</p>
        </div>
    );
}

export default MealSummary;
