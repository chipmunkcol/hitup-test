import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BestPage from './pages/BestPage';
import HomePage from './pages/HomePage';
import Layout from './components/common/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/best" element={<BestPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
