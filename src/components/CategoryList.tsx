import React, { useEffect, useState } from "react";

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await res.json();
      if (data.categories) {
        setCategories(data.categories.map((cat: any) => cat.strCategory));
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Recipe Categories</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat}>{cat}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
