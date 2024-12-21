import React, { useState, useEffect } from 'react';
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

    // Load saved items from LocalStorage on initialization
    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
        setSavedItems(storedItems);
    }, []);

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

    const handleSaveItem = (item) => {
        const updatedItems = [...savedItems, item];
        setSavedItems(updatedItems);
        localStorage.setItem('savedItems', JSON.stringify(updatedItems));
    };

    const handleItemClick = (item) => {
        setSelectedItem(selectedItem === item ? null : item); // Toggle preview
    };

    const handleRemoveItem = (index) => {
        const updatedItems = savedItems.filter((_, i) => i !== index);
        setSavedItems(updatedItems);
        localStorage.setItem('savedItems', JSON.stringify(updatedItems));
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
                                    onClick={() => handleItemClick(item)} 
                                    style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                    {item.name}
                                </span>
                                <button 
                                    onClick={() => handleRemoveItem(index)} 
                                    style={{ marginLeft: '0.5rem', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                                >
                                    Remove
                                </button>
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
                <MealSummary meal={meal} onRemove={handleRemoveItem} />
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
