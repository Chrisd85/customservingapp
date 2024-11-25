import React, { useState } from 'react';
import ServingForm from './ServingForm';
import MealSummary from './MealSummary';
import './CustomServingApp.css';

function CustomServingApp() {
    const [meal, setMeal] = useState([]);
    const [totalNutrition, setTotalNutrition] = useState({
        calories: 0,
        fat: 0,
        carbs: 0,
        fiber: 0,
        protein: 0,
        netCarbs: 0,
    });
    const [savedItems, setSavedItems] = useState([]); 
    const [selectedItem, setSelectedItem] = useState(null);

    const addToMeal = (adjustedNutrition) => {
        setMeal([...meal, adjustedNutrition]);
        setTotalNutrition(prevTotal => ({
            calories: prevTotal.calories + adjustedNutrition.calories,
            fat: prevTotal.fat + adjustedNutrition.fat,
            carbs: prevTotal.carbs + adjustedNutrition.carbs,
            fiber: prevTotal.fiber + adjustedNutrition.fiber,
            protein: prevTotal.protein + adjustedNutrition.protein,
            netCarbs: prevTotal.netCarbs + adjustedNutrition.netCarbs,
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
            fiber: prevTotal.fiber - removedItem.fiber,
            protein: prevTotal.protein - removedItem.protein,
            netCarbs: prevTotal.netCarbs - removedItem.netCarbs,
        }));
    };

    const handleSaveItem = (item) => {
        const { name, servingSize, calories, fat, carbs, fiber, protein, netCarbs } = item;
        setSavedItems([...savedItems, { name, servingSize, calories, fat, carbs, fiber, protein, netCarbs }]);
    };

    const togglePreview = (item) => {
        setSelectedItem(selectedItem === item ? null : item); // Toggle preview for the clicked item
    };

    const handleLoadItem = (item) => {
        setSelectedItem(item); // Load the item’s information into the form
    };

    return (
        <div className="four-panel-container">
            <div className="saved-items-list">
                <h2>Saved Items</h2>
                <ul>
                    {savedItems.map((item, index) => (
                        <li key={index} className="saved-item">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span 
                                    onClick={() => togglePreview(item)} 
                                    style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                    {item.name}
                                </span>
                                <button onClick={() => handleLoadItem(item)}>Load</button>
                            </div>
                            {selectedItem === item && (
                                <div className="preview">
                                    <p><strong>Serving Size:</strong> {item.servingSize}g</p>
                                    <p><strong>Calories:</strong> {item.calories.toFixed(2)}</p>
                                    <p><strong>Fat:</strong> {item.fat.toFixed(2)}g</p>
                                    <p><strong>Carbs:</strong> {item.carbs.toFixed(2)}g</p>
                                    <p><strong>Fiber:</strong> {item.fiber.toFixed(2)}g</p>
                                    <p><strong>Net Carbs:</strong> <span className="net-carbs">{item.netCarbs.toFixed(2)}g</span></p>
                                    <p><strong>Protein:</strong> {item.protein.toFixed(2)}g</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="serving-calculator">
                <h1>Custom Serving Calculator</h1>
                <ServingForm onAddToMeal={addToMeal} onSaveItem={handleSaveItem} loadedItem={selectedItem} />
            </div>
            <div className="meal-breakdown">
                <MealSummary meal={meal} onRemove={removeFromMeal} />
            </div>
            <div className="total-nutrition">
                <h2>Total Nutrition</h2>
                <p><strong>Calories:</strong> {totalNutrition.calories.toFixed(2)}</p>
                <p><strong>Fat:</strong> {totalNutrition.fat.toFixed(2)}g</p>
                <p><strong>Carbs:</strong> {totalNutrition.carbs.toFixed(2)}g</p>
                <p><strong>Fiber:</strong> {totalNutrition.fiber.toFixed(2)}g</p>
                <p><strong>Net Carbs:</strong> <span className="net-carbs">{totalNutrition.netCarbs.toFixed(2)}g</span></p>
                <p><strong>Protein:</strong> {totalNutrition.protein.toFixed(2)}g</p>
            </div>
        </div>
    );
}

export default CustomServingApp;
