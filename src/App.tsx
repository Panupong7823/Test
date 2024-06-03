import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shape from "./page/shape";
import From from "./page/form";
import Home from "./page/Home";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<From />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
