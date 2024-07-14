import './style.css';
import React from "react";
import { Routes, Route } from 'react-router-dom';
import { Home } from "./Home";
import { Predictor } from "./Components/2D/Predictor";
import { Reference } from "./Components/2D/Reference";


function App() {
  return(
    <div>
    <Routes >
      <Route exact path="/" element={<Home />} />
      <Route exact path="/predictor" element={<Predictor />} />
      <Route exact path="/reference" element={<Reference />} />
    </Routes>
    </div>
  );
}

export default App;

