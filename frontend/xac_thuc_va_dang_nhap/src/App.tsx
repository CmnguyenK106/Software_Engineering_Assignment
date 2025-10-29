import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Wireframe1 from './pages/Wireframe1';
function App() {
  return (
    <BrowserRouter>
        <Routes>
			<Route path="/" element={<Wireframe1 />} />
			<Route path="/Wireframe1" element={<Wireframe1 />} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;