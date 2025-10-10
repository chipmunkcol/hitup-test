import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/common/layout/Layout';
import BestPage from './pages/BestPage';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import NewPage from './pages/NewPage';
import PurchasePage from './pages/PurchasePage';
import AddAddressPage from './pages/address/AddAddressPage';
import EditAddressPage from './pages/address/EditAddressPage';
import AddressPage from './pages/address/AddressPage';
import ContactSeller from './pages/contactSeller';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/best" element={<BestPage />} />
          <Route path="/new" element={<NewPage />} />

          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product/:id/contact" element={<ContactSeller />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/address/add" element={<AddAddressPage />} />
          <Route path="/address/edit/:id" element={<EditAddressPage />} />

          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="*" element={<div>없는 페이지</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
