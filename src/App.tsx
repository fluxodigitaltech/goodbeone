import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Obrigado from './pages/Obrigado';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/obrigado" element={<Obrigado />} />
      </Routes>
    </Router>
  );
}

export default App;