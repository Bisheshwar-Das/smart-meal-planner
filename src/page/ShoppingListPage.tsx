// src/pages/ShoppingListPage.tsx
import React, { useEffect, useState } from "react";

interface ShoppingItem {
  name: string;
  quantity: string;
  unit: string;
  category: string;
}
const LOCAL_STORAGE_KEY = "shoppingList";
const ShoppingListPage: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("pieces");
  const [category, setCategory] = useState("Other");
  const [filterCategory, setFilterCategory] = useState("All");
  const [loaded, setLoaded] = useState(false);

  const filteredItems =
    filterCategory === "All"
      ? items
      : items.filter((item) => item.category === filterCategory);

  // Load once on mount
  useEffect(() => {
    const saved = localStorage.getItem("shoppingList");
    if (saved) {
      setItems(JSON.parse(saved));
    }
    setLoaded(true); // to control the other effect from setting item
  }, []);

  // Save only after initial load to prevent seeing items list empty
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("shoppingList", JSON.stringify(items));
    }
  }, [items, loaded]);


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

  const handleEditItem = (
    index: number,
    field: keyof ShoppingItem,
    value: string
  ) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
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

      {/* Category Filter */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "0.5rem" }}>Filter by category:</label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
          <option value="Pantry">Pantry</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/*List Items */}
      <ul>
        {filteredItems.map((item, idx) => (
          <li key={idx} style={{ marginBottom: "0.5rem" }}>
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleEditItem(idx, "name", e.target.value)}
              style={{ width: "150px" }}
            />
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleEditItem(idx, "quantity", e.target.value)}
              style={{ width: "70px", marginLeft: "0.5rem" }}
            />
            <select
              value={item.unit}
              onChange={(e) => handleEditItem(idx, "unit", e.target.value)}
              style={{ marginLeft: "0.5rem" }}
            >
              <option value="pieces">pieces</option>
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="litres">litres</option>
              <option value="ml">ml</option>
            </select>
            <select
              value={item.category}
              onChange={(e) => handleEditItem(idx, "category", e.target.value)}
              style={{ marginLeft: "0.5rem" }}
            >
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Dairy">Dairy</option>
              <option value="Meat">Meat</option>
              <option value="Pantry">Pantry</option>
              <option value="Other">Other</option>
            </select>
            <button
              onClick={() => handleRemoveItem(idx)}
              style={{ marginLeft: "0.5rem" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingListPage;
