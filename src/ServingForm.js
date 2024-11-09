import React, { useState, useEffect } from 'react';
import './ServingForm.css';

function ServingForm({ onAddToMeal }) {
    const [nutrition, setNutrition] = useState({ calories: 0, fat: 0, carbs: 0, protein: 0, fiber: 0 });
    const [servingSize, setServingSize] = useState(0);
    const [precookedWeight, setPrecookedWeight] = useState(0);
    const [cookedWeight, setCookedWeight] = useState(0);
    const [amountServed, setAmountServed] = useState(0);
    const [previewNutrition, setPreviewNutrition] = useState(null);

    const calculateNutrition = () => {
        const totalServings = precookedWeight / servingSize;
        const totalCalories = nutrition.calories * totalServings;
        const totalFat = nutrition.fat * totalServings;
        const totalCarbs = nutrition.carbs * totalServings;
        const totalFiber = nutrition.fiber * totalServings;
        const totalProtein = nutrition.protein * totalServings;

        const fractionServed = amountServed / cookedWeight;

        return {
            calories: totalCalories * fractionServed,
            fat: totalFat * fractionServed,
            carbs: totalCarbs * fractionServed,
            fiber: totalFiber * fractionServed,
            protein: totalProtein * fractionServed,
            netCarbs: (totalCarbs - totalFiber) * fractionServed,
        };
    };

    useEffect(() => {
        if (amountServed > 0) {
            setPreviewNutrition(calculateNutrition());
        }
    }, [amountServed, servingSize, precookedWeight, cookedWeight, nutrition]);

    const handleCalculate = () => {
        const adjustedNutrition = calculateNutrition();
        onAddToMeal(adjustedNutrition);
    };

    return (
        <form>
            <div className="input-group">
                <label>Serving Size:
                    <input type="number" value={servingSize} onChange={(e) => setServingSize(+e.target.value)} />
                </label>
            </div>
            <div>
            </div>

            {/* Updated Nutrition per Serving Section */}
            <fieldset className="nutrition-box">
    <legend>Nutrition per Serving</legend>
    <div className="nutrition-grid">
        <label>Calories</label>
        <label>Fat (g)</label>
        <label>Carbs (g)</label>
        <label>Fiber (g)</label>
        <label>Protein (g)</label>
        
        <input type="number" value={nutrition.calories} onChange={(e) => setNutrition({ ...nutrition, calories: +e.target.value })} />
        <input type="number" value={nutrition.fat} onChange={(e) => setNutrition({ ...nutrition, fat: +e.target.value })} />
        <input type="number" value={nutrition.carbs} onChange={(e) => setNutrition({ ...nutrition, carbs: +e.target.value })} />
        <input type="number" value={nutrition.fiber} onChange={(e) => setNutrition({ ...nutrition, fiber: +e.target.value })} />
        <input type="number" value={nutrition.protein} onChange={(e) => setNutrition({ ...nutrition, protein: +e.target.value })} />
    </div>
</fieldset>


            <div className="input-group">
                <label>Precooked Weight (grams):
                    <input type="number" value={precookedWeight} onChange={(e) => setPrecookedWeight(+e.target.value)} />
                </label>
            </div>
            <div className="input-group">
                <label>Total Cooked Weight (grams):
                    <input type="number" value={cookedWeight} onChange={(e) => setCookedWeight(+e.target.value)} />
                </label>
            </div>
            <div className="input-group">
                <label>Amount Served (grams):
                    <input type="number" value={amountServed} onChange={(e) => setAmountServed(+e.target.value)} />
                </label>
            </div>

            {previewNutrition && (
                <div className="preview-box">
                    <h3>Nutrition Preview for Amount Served</h3>
                    <p>Calories: {previewNutrition.calories.toFixed(2)}</p>
                    <p>Fat: {previewNutrition.fat.toFixed(2)}g</p>
                    <p>Carbs: {previewNutrition.carbs.toFixed(2)}g</p>
                    <p>Fiber: {previewNutrition.fiber.toFixed(2)}g</p>
                    <div className="net-carbs-box">
                        <p>Net Carbs: <span className="net-carbs">{previewNutrition.netCarbs.toFixed(2)}g</span></p>
                    </div>
                    <p>Protein: {previewNutrition.protein.toFixed(2)}g</p>
                </div>
            )}

            <button type="button" onClick={handleCalculate}>Add to Meal</button>
        </form>
    );
}

export default ServingForm;
