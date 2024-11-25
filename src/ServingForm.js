import React, { useState, useEffect } from 'react';
import './ServingForm.css';

function ServingForm({ onAddToMeal, onSaveItem, loadedItem }) {
    const [itemName, setItemName] = useState('');
    const [nutrition, setNutrition] = useState({ calories: '', fat: '', carbs: '', protein: '', fiber: '' });
    const [servingSize, setServingSize] = useState('');
    const [precookedWeight, setPrecookedWeight] = useState('');
    const [cookedWeight, setCookedWeight] = useState('');
    const [amountServed, setAmountServed] = useState('');
    const [previewNutrition, setPreviewNutrition] = useState(null);

    useEffect(() => {
        if (loadedItem) {
            setItemName(loadedItem.name);
            setServingSize(loadedItem.servingSize);
            setNutrition({
                calories: loadedItem.calories,
                fat: loadedItem.fat,
                carbs: loadedItem.carbs,
                fiber: loadedItem.fiber,
                protein: loadedItem.protein,
            });
        }
    }, [loadedItem]);

    useEffect(() => {
        if (amountServed && servingSize && cookedWeight && precookedWeight) {
            setPreviewNutrition(calculateNutrition());
        } else {
            setPreviewNutrition(null); // Reset preview when inputs are incomplete
        }
    }, [amountServed, servingSize, cookedWeight, precookedWeight, nutrition]);

    const calculateNutrition = () => {
        const parsedServingSize = parseFloat(servingSize) || 0;
        const parsedPrecookedWeight = parseFloat(precookedWeight) || 0;
        const parsedCookedWeight = parseFloat(cookedWeight) || 0;
        const parsedAmountServed = parseFloat(amountServed) || 0;

        if (!parsedServingSize || !parsedPrecookedWeight || !parsedCookedWeight || !parsedAmountServed) {
            return null; // Ensure valid inputs for calculations
        }

        const totalServings = parsedPrecookedWeight / parsedServingSize;
        const totalCalories = nutrition.calories * totalServings;
        const totalFat = nutrition.fat * totalServings;
        const totalCarbs = nutrition.carbs * totalServings;
        const totalFiber = nutrition.fiber * totalServings;
        const totalProtein = nutrition.protein * totalServings;

        const fractionServed = parsedAmountServed / parsedCookedWeight;

        return {
            calories: totalCalories * fractionServed,
            fat: totalFat * fractionServed,
            carbs: totalCarbs * fractionServed,
            fiber: totalFiber * fractionServed,
            protein: totalProtein * fractionServed,
            netCarbs: (totalCarbs - totalFiber) * fractionServed,
        };
    };

    const handleSave = () => {
        const item = calculateNutrition();
        onSaveItem({
            name: itemName,
            servingSize,
            calories: nutrition.calories,
            fat: nutrition.fat,
            carbs: nutrition.carbs,
            fiber: nutrition.fiber,
            protein: nutrition.protein,
            netCarbs: nutrition.carbs - nutrition.fiber,
        });
    };

    const handleCalculate = () => {
        const adjustedNutrition = calculateNutrition();
        if (adjustedNutrition) {
            onAddToMeal(adjustedNutrition);
        }
    };

    const handleClearAll = () => {
        setItemName('');
        setNutrition({ calories: '', fat: '', carbs: '', protein: '', fiber: '' });
        setServingSize('');
        setPrecookedWeight('');
        setCookedWeight('');
        setAmountServed('');
        setPreviewNutrition(null); // Clear preview explicitly
    };

    return (
        <form>
            <div className="input-group">
                <label>Item Name:</label>
                <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Enter item name"
                />
            </div>
            <div className="input-group">
                <label>Serving Size:</label>
                <input
                    type="number"
                    value={servingSize}
                    onChange={(e) => setServingSize(e.target.value === '' ? '' : parseFloat(e.target.value))}
                />
            </div>
            <fieldset className="nutrition-box">
                <legend>Nutrition per Serving</legend>
                <div className="nutrition-grid">
                    <label>Calories</label>
                    <label>Fat</label>
                    <label>Carbs</label>
                    <label>Fiber</label>
                    <label>Protein</label>

                    <input type="number" value={nutrition.calories} onChange={(e) => setNutrition({ ...nutrition, calories: e.target.value === '' ? '' : parseFloat(e.target.value) })} />
                    <input type="number" value={nutrition.fat} onChange={(e) => setNutrition({ ...nutrition, fat: e.target.value === '' ? '' : parseFloat(e.target.value) })} />
                    <input type="number" value={nutrition.carbs} onChange={(e) => setNutrition({ ...nutrition, carbs: e.target.value === '' ? '' : parseFloat(e.target.value) })} />
                    <input type="number" value={nutrition.fiber} onChange={(e) => setNutrition({ ...nutrition, fiber: e.target.value === '' ? '' : parseFloat(e.target.value) })} />
                    <input type="number" value={nutrition.protein} onChange={(e) => setNutrition({ ...nutrition, protein: e.target.value === '' ? '' : parseFloat(e.target.value) })} />
                </div>
            </fieldset>
            <div className="input-group">
                <label>Precooked Weight:</label>
                <input
                    type="number"
                    value={precookedWeight}
                    onChange={(e) => setPrecookedWeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                />
            </div>
            <div className="input-group">
                <label>Total Cooked Weight:</label>
                <input
                    type="number"
                    value={cookedWeight}
                    onChange={(e) => setCookedWeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                />
            </div>
            <div className="input-group">
                <label>Amount Served:</label>
                <input
                    type="number"
                    value={amountServed}
                    onChange={(e) => setAmountServed(e.target.value === '' ? '' : parseFloat(e.target.value))}
                />
            </div>
            {previewNutrition && (
                <div className="preview-box">
                    <h3>Nutrition Preview for Amount Served</h3>
                    <p><strong>Calories:</strong> {previewNutrition.calories.toFixed(2)}</p>
                    <p><strong>Fat:</strong> {previewNutrition.fat.toFixed(2)}g</p>
                    <p><strong>Carbs:</strong> {previewNutrition.carbs.toFixed(2)}g</p>
                    <p><strong>Fiber:</strong> {previewNutrition.fiber.toFixed(2)}g</p>
                    <p><strong>Net Carbs:</strong> <span className="net-carbs">{previewNutrition.netCarbs.toFixed(2)}g</span></p>
                    <p><strong>Protein:</strong> {previewNutrition.protein.toFixed(2)}g</p>
                </div>
            )}
            <div className="button-group">
                <button type="button" onClick={handleCalculate}>Add to Meal</button>
                <button type="button" onClick={handleSave}>Save Item</button>
                <button type="button" onClick={handleClearAll} style={{ marginLeft: 'auto' }}>Clear All</button>
            </div>
        </form>
    );
}

export default ServingForm;
