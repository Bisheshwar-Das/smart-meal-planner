import React, { useState } from "react";

const PantryInput: React.FC = () => {
  const [ingredient, setIngredient] = useState("");
  const [pantry, setPantry] = useState<string[]>([]);

  const handleAdd = () => {
    if (ingredient.trim() !== "") {
      setPantry([...pantry, ingredient.trim()]);
      setIngredient("");
    }
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
      <button onClick={handleAdd} style={{ padding: "8px 12px", marginLeft: 8 }}>
        Add
      </button>

      <ul>
        {pantry.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default PantryInput;
