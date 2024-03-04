import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";

//components

import Layout from "./Components/Layout";

//pages
import MainPage from "./Pages/MainPage";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
