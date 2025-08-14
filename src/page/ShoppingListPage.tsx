// src/pages/ShoppingListPage.tsx
import React, { useEffect, useState } from "react";

interface ShoppingItem {
  id: number;
  name: string;
  quantity: string;
  unit: string;
  category: string;
  purchased: boolean;
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
  const [sortOption, setSortOption] = useState("name-asc");
  const [sortOrderAsc, setSortOrderAsc] = useState(true); // true -> ascending

  const filteredItems =
    filterCategory === "All"
      ? items
      : items.filter((item) => item.category === filterCategory);

  // Sort items based on sortOption
  const sortedItems = [...filteredItems].sort((a, b) => {
    let comparison = 0;
    switch (sortOption) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "category":
        comparison = a.category.localeCompare(b.category);
        break;
      case "purchased":
        comparison = Number(a.purchased) - Number(b.purchased);
        break;
      default:
        comparison = 0;
    }
    return sortOrderAsc ? comparison : -comparison;
  });

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
    setItems([...items, { id: Date.now(), name, quantity, unit, category, purchased: false }]);
    setName("");
    setQuantity("");
    setUnit("pieces");
    setCategory("Other");
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleEditItem = (
    id: number,
    field: keyof ShoppingItem,
    value: string
  ) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };
  const handleTogglePurchased = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
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

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="category">Sort by Category</option>
          <option value="purchased">Sort by Purchased</option>
        </select>
        <button onClick={() => setSortOrderAsc(!sortOrderAsc)}>
          {sortOrderAsc ? "↑ Ascending" : "↓ Descending"}
        </button>
      </div>

      {/*List Items */}
      <ul>

        {sortedItems.map((item) => (
          <li key={item.id} style={{ marginBottom: "0.5rem" }}>
            {item.purchased ? (
              <span style={{ textDecoration: "line-through" }}>
                {item.name} - {item.quantity} {item.unit} ({item.category})
              </span>
            ) : (
              <>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleEditItem(item.id, "name", e.target.value)}
                  style={{ width: "150px" }}
                />
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleEditItem(item.id, "quantity", e.target.value)}
                  style={{ width: "70px", marginLeft: "0.5rem" }}
                />
                <select
                  value={item.unit}
                  onChange={(e) => handleEditItem(item.id, "unit", e.target.value)}
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
                  onChange={(e) => handleEditItem(item.id, "category", e.target.value)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Meat">Meat</option>
                  <option value="Pantry">Pantry</option>
                  <option value="Other">Other</option>
                </select>
              </>
            )}
            <input
              type="checkbox"
              checked={item.purchased}
              onChange={() => handleTogglePurchased(item.id)}
              style={{ marginRight: "0.5rem" }}
            />
            <button
              onClick={() => handleRemoveItem(item.id)}
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
