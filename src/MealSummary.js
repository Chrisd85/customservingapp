import React from 'react';

function MealSummary({ meal, onRemove }) {
    return (
        <div>
            <h2>Meal Breakdown</h2>
            <ul>
                {meal.map((item, index) => (
                    <li key={index} className="meal-item">
                        <div><strong>{item.name || `Item ${index + 1}`}</strong></div> {/* Display item name */}
                        <div><strong>Calories:</strong> {item.calories.toFixed(2)}</div>
                        <div><strong>Fat:</strong> {item.fat.toFixed(2)}g</div>
                        <div><strong>Carbs:</strong> {item.carbs.toFixed(2)}g</div>
                        <div><strong>Fiber:</strong> {item.fiber.toFixed(2)}g</div>
                        <div><strong>Net Carbs:</strong> <span className="net-carbs">{item.netCarbs.toFixed(2)}g</span></div>
                        <div><strong>Protein:</strong> {item.protein.toFixed(2)}g</div>
                        <button onClick={() => onRemove(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MealSummary;
