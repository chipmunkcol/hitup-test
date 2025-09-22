import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BestPage from './pages/BestPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/best" element={<BestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
