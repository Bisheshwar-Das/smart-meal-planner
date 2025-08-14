import React, { useEffect, useState } from "react";

interface ShoppingItem {
  id: number;
  name: string;
  quantity: string;
  unit: string;
  category: string;
  purchased: boolean;
}

const ShoppingListPage: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("pieces");
  const [category, setCategory] = useState("Other");
  const [filterCategory, setFilterCategory] = useState("All");
  const [loaded, setLoaded] = useState(false);
  const [sortOption, setSortOption] = useState("name");
  const [sortOrderAsc, setSortOrderAsc] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);

  const categories = ["Vegetables", "Fruits", "Dairy", "Meat", "Pantry", "Other"];
  const units = ["pieces", "kg", "g", "litres", "ml"];

  const filteredItems =
    filterCategory === "All"
      ? items
      : items.filter((item) => item.category === filterCategory);

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
    setItems([...items, {
      id: Date.now(),
      name,
      quantity,
      unit,
      category,
      purchased: false
    }]);
    setName("");
    setQuantity("");
    setUnit("pieces");
    setCategory("Other");
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleEditItem = (id: number, field: keyof ShoppingItem, value: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleTogglePurchased = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Vegetables: "bg-green-100 text-green-800",
      Fruits: "bg-orange-100 text-orange-800",
      Dairy: "bg-blue-100 text-blue-800",
      Meat: "bg-red-100 text-red-800",
      Pantry: "bg-yellow-100 text-yellow-800",
      Other: "bg-gray-100 text-gray-800"
    } as const;
    type ColorKey = keyof typeof colors;
    return colors[category as ColorKey] || colors.Other;
  };

  const completedCount = items.filter(item => item.purchased).length;
  const totalCount = items.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-indigo-600 rounded-full">
              <span className="text-2xl">🛒</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Shopping List</h1>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <span className="px-3 py-1 bg-white rounded-full shadow-sm">
              {completedCount} of {totalCount} completed
            </span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Add Item Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Item</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="0"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            >
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button
              onClick={handleAddItem}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <span>➕</span>
              Add Item
            </button>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <span>🔍</span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              >
                <option value="All">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              >
                <option value="name">Sort by Name</option>
                <option value="category">Sort by Category</option>
                <option value="purchased">Sort by Status</option>
              </select>
              <button
                onClick={() => setSortOrderAsc(!sortOrderAsc)}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title={sortOrderAsc ? "Sort Descending" : "Sort Ascending"}
              >
                <span className="text-lg">{sortOrderAsc ? "↑" : "↓"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Shopping List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Your Items ({sortedItems.length})</h2>
          </div>

          {sortedItems.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500 text-lg">No items in your shopping list</p>
              <p className="text-gray-400">Add some items to get started!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {sortedItems.map((item) => (
                <div key={item.id} className={`p-4 transition-all duration-200 ${item.purchased ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => handleTogglePurchased(item.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${item.purchased
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 hover:border-green-400'
                        }`}
                    >
                      {item.purchased && <span className="text-white">✓</span>}
                    </button>

                    {/* Item Content */}
                    <div className="flex-1">
                      {editingId === item.id ? (
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleEditItem(item.id, "name", e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                          />
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleEditItem(item.id, "quantity", e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                          />
                          <select
                            value={item.unit}
                            onChange={(e) => handleEditItem(item.id, "unit", e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                          >
                            {units.map(u => <option key={u} value={u}>{u}</option>)}
                          </select>
                          <select
                            value={item.category}
                            onChange={(e) => handleEditItem(item.id, "category", e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                          >
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className={item.purchased ? 'opacity-50' : ''}>
                            <h3 className={`font-medium text-gray-900 ${item.purchased ? 'line-through' : ''}`}>
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {item.quantity} {item.unit}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                            {item.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {editingId === item.id ? (
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Save changes"
                        >
                          <span>✓</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditingId(item.id)}
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit item"
                        >
                          <span>✏️</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete item"
                      >
                        <span>🗑️</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListPage;