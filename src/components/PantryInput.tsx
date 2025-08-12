import React, { useState } from "react";
import { Recipe, recipes } from "../data/recipes";

const PantryInput: React.FC = () => {
  const [ingredient, setIngredient] = useState("");
  const [pantry, setPantry] = useState<string[]>([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState<Recipe[]>([]);

  const handleAdd = () => {
    if (ingredient.trim() !== "") {
      const newPantry = [...pantry, ingredient.trim()];
      setPantry(newPantry);
      setIngredient("");
      updateSuggestions(newPantry);
    }
  };

  const handleRemove = (indexToRemove: number) => {
    const newPantry = pantry.filter((_, index) => index != indexToRemove);
    setPantry(newPantry);
    updateSuggestions(newPantry);
  };

  // Suggest recipes where all recipe ingredients are in the pantry
  const updateSuggestions = (currentPantry: string[]) => {
    const matched = recipes.filter((recipe) =>
      recipe.ingredients.every((ing) => currentPantry.includes(ing))
    );
    setSuggestedRecipes(matched);
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Pantry Ingredients</h2>
      <input
        type="text"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder="Enter ingredient"
        style={{ padding: 8, width: "70%" }}
      />
      <button
        onClick={handleAdd}
        style={{ padding: "8px 12px", marginLeft: 8 }}
      >
        Add
      </button>

      <ul>
        {pantry.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            {item}
            <button
              onClick={() => handleRemove(index)}
              style={{ color: "red" }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <h3>Suggested Recipes</h3>
      {suggestedRecipes.length === 0 && <p>No recipes match your pantry.</p>}
      <ul>
        {suggestedRecipes.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PantryInput;
