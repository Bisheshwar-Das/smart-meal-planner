export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  dietary: string[]; // e.g. ["vegan", "gluten-free"]
}

export const recipes: Recipe[] = [
  {
    id: 1,
    name: "Vegan Pasta",
    ingredients: ["pasta", "tomato", "olive oil", "garlic"],
    dietary: ["vegan"],
  },
  {
    id: 2,
    name: "Chicken Salad",
    ingredients: ["chicken", "lettuce", "tomato", "olive oil"],
    dietary: ["gluten-free"],
  },
  {
    id: 3,
    name: "Gluten-Free Pancakes",
    ingredients: ["gluten-free flour", "milk", "egg"],
    dietary: ["gluten-free"],
  },
];
