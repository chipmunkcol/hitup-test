import './App.css';

import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/common/layout/Layout';
import BestPage from './pages/BestPage';
import CartPage from './pages/CartPage';
import CouponPage from './pages/CouponPage';
import HomePage from './pages/HomePage';
import Mypage from './pages/Mypage';
import NewPage from './pages/NewPage';
import PartnershipPage from './pages/PartnershipPage';
import PurchasePage from './pages/purchase/PurchasePage';
import AddAddressPage from './pages/address/AddAddressPage';
import AddressPage from './pages/address/AddressPage';
import EditAddressPage from './pages/address/EditAddressPage';
import ContactHistory from './pages/productDetail/ContactHistory';
import ContactSeller from './pages/productDetail/ContactSeller';
import ProductDetail from './pages/productDetail/ProductDetail';
import { useAuthStore } from './store/useAuthStore';
import PurchaseDetail from './pages/purchase/PurchaseDetail';

function App() {
  const { user, fetchUser } = useAuthStore();
  console.log('user: ', user);

  useEffect(() => {
    // 로그인 체크
    // 토큰에 expired 시간 있으면 체크해서 로그아웃
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/best" element={<BestPage />} />
          <Route path="/new" element={<NewPage />} />

          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product/:id/contacts" element={<ContactHistory />} />
          <Route path="/product/:id/contact/add" element={<ContactSeller />} />
          <Route
            path="/product/:id/contact/edit/:contactId:"
            element={<div></div>}
          />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/address/add" element={<AddAddressPage />} />
          <Route path="/address/edit/:id" element={<EditAddressPage />} />

          {/* 입점/제휴 신청 */}
          <Route path="/partnership" element={<PartnershipPage />} />

          <Route path="/coupon" element={<CouponPage />} />

          <Route path="/mypage" element={<Mypage />} />

          {/* 주문관련 */}
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/purchase/:id" element={<PurchaseDetail />} />

          <Route path="*" element={<div>없는 페이지</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
