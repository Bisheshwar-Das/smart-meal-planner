import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CategoryList from "./components/CategoryList";
import ShoppingListPage from "./page/ShoppingListPage";
import HomePage from "./page/HomePage";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/shopping-list" element={<ShoppingListPage/>}/>
      </Routes>
    </Router>
    </>
  );
};

export default App;
