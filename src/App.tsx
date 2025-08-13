import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CategoryList from "./components/CategoryList";

const App: React.FC = () => {
  return (
    <>
    <CategoryList/>
    </>
  );
};

export default App;
