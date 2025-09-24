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
          <Route path="/new" element={<div>신상품 페이지</div>} />
          <Route path="/product/:id" element={<div>상품 상세 페이지</div>} />

          <Route path="*" element={<div>없는 페이지</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
