import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/common/layout/Layout';
import CategoryBig from './components/common/widgets/CategoryBig';
import AddAddressPage from './pages/address/AddAddressPage';
import AddressPage from './pages/address/AddressPage';
import EditAddressPage from './pages/address/EditAddressPage';
import Login from './pages/auth/Login';
import PartnerLogin from './pages/partner/Login';
import RegisterPage from './pages/auth/RegisterPage';
import BestPage from './pages/BestPage';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import CouponPage from './pages/CouponPage';
import HomePage from './pages/HomePage';
import Mypage from './pages/Mypage';
import NewPage from './pages/NewPage';
import PartnershipPage from './pages/PartnershipPage';
import ContactHistory from './pages/productDetail/ContactHistory';
// import ContactSeller from './pages/productDetail/ContactSeller';
import AddProduct from './pages/partner/AddProduct';
import ProductDetail from './pages/productDetail/ProductDetail';
import PurchaseDetail from './pages/purchase/PurchaseDetail';
import PurchaseHistory from './pages/purchase/PurchaseHistory';
import PurchasePage from './pages/purchase/PurchasePage';
import AddReviewPage from './pages/review/AddReviewPage';
import EditReviewPage from './pages/review/EditReviewPage';
import Writable from './pages/review/reviewManage/Writable';
import Written from './pages/review/reviewManage/Written';
import ReviewManagePage from './pages/review/ReviewManagePage';
import Register from './pages/partner/Register';
import FindPassword from './pages/partner/FindPassword';
import FindId from './pages/partner/FindId';
import FindIdFound from './pages/partner/FindIdFound';
import ResetPassword from './pages/partner/ResetPassword';
import CheckTokenExpired from './components/partner/common/CheckTokenExpired';
import Sidebar from './components/partner/common/Sidebar';
import PartersLayout from './components/common/layout/PartersLayout';

function App() {
  // const { user } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<Layout />}>
          <Route path="" element={<HomePage />} />

          {/* 인증 */}
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<Login />} />

          <Route
            path="category/:category/sub/:sub"
            element={<CategoryPage />}
          />

          <Route path="best" element={<BestPage />} />
          <Route path="new" element={<NewPage />} />

          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="product/:id/contacts" element={<ContactHistory />} />

          {/* 팝업으로 변경 */}
          {/* <Route path="/product/:id/contact/add" element={<ContactSeller />} /> */}
          <Route
            path="product/:id/contact/edit/:contactId:"
            element={<div></div>}
          />

          <Route path="cart" element={<CartPage />} />
          <Route path="address" element={<AddressPage />} />
          <Route path="address/add" element={<AddAddressPage />} />
          <Route path="address/edit/:id" element={<EditAddressPage />} />

          {/* 리뷰 관리 */}
          <Route path="review" element={<ReviewManagePage />}>
            {/* 하위 라우트 */}
            <Route path="writable" element={<Writable />} />
            <Route path="written" element={<Written />} />
          </Route>
          <Route path="review/add/:id" element={<AddReviewPage />} />
          <Route path="review/edit/:id" element={<EditReviewPage />} />

          {/* 입점/제휴 신청 */}
          <Route path="partnership" element={<PartnershipPage />} />

          <Route path="coupon" element={<CouponPage />} />

          <Route path="mypage" element={<Mypage />} />

          {/* 주문관련 */}
          <Route path="purchase" element={<PurchasePage />} />
          <Route path="purchase/history" element={<PurchaseHistory />} />
          <Route path="purchase/:id" element={<PurchaseDetail />} />
        </Route>

        <Route path="*" element={<div>없는 페이지</div>} />

        {/* 브랜드 파트너 페이지 */}
        {/* 임시로 지정 서버 나누고 나서는 /partner depth에서 로그인/회원가입 제외 */}

        <Route path="/partner" element={<PartersLayout />}>
          {/* 하위 라우트 */}

          {/* 인증 */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<PartnerLogin />} />

          {/* 아이디 비밀번호 찾기 */}
          <Route path="find-id" element={<FindId />} />
          <Route path="find-id/found" element={<FindIdFound />} />
          <Route path="find-password" element={<FindPassword />} />
          <Route path="find-password/reset" element={<ResetPassword />} />

          {/* 상품 */}
          <Route
            path="management"
            element={
              <CheckTokenExpired>
                <Sidebar />
              </CheckTokenExpired>
            }
          >
            <Route path="product/add" element={<AddProduct />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
