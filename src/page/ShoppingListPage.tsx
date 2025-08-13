// src/pages/ShoppingListPage.tsx
import React, { useState } from "react";

interface ShoppingItem {
  name: string;
  quantity: string; 
  unit: string;
  category: string;
}

const ShoppingListPage: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("pieces");
  const [category, setCategory] = useState("Other");

  const handleAddItem = () => {
    if (!name || !quantity) return;
    setItems([...items, { name, quantity, unit, category }]);
    setName("");
    setQuantity("");
    setUnit("pieces");
    setCategory("Other");
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, idx) => idx !== index));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Shopping List</h1>

      {/* Form */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="0"
        />
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="pieces">pieces</option>
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="litres">litres</option>
          <option value="ml">ml</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
          <option value="Pantry">Pantry</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      {/* List */}
      <ul>
        {items.map((item, idx) => (
          <li key={idx} style={{ marginBottom: "0.5rem" }}>
            {item.name} — {item.quantity} {item.unit} ({item.category}){" "}
            <button onClick={() => handleRemoveItem(idx)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingListPage;
