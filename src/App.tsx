import { ProductList } from './product/ProductList';
import { useEffect } from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Product from './product/Product';
import Navbar from './components/Navbar';
import CreateProduct from './admin/CreateProduct';
import LoginPage from './auth/LoginPage';
import SignupPage from './auth/SignupPage';
import { getUser } from './reducers/userSlice';
import { useAppDispatch, useAppSelector } from './store';
import LoginSuccsess from './components/LoginSuccsess';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './admin/AdminDashboard';
import CreateCategory from './admin/CreateCategory';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import CheckOutPage from './pages/CheckOutPage';
import CheckOutSuccess from './components/CheckOutSuccess';
import CheckOutCancel from './components/CheckOutCancel';
import SellerShop from './pages/SellerShop';
import ApproveProduct from './admin/ApproveProduct';
import EditProduct from './admin/EditeProduct';
import OrderList from './admin/OrderList';
import Orders from './pages/Orders';
import EmailVerify from './auth/EmailVerify';
import AllProducts from './pages/AllProducts';
import ShopOrder from './pages/ShopOrder';
import AllProductList from './admin/ProductList';
import UserList from './admin/UserList';
import ReviewList from './admin/ReviewList';

function App() {
  const dispatch = useAppDispatch();
  const { currentUsername } = useAppSelector(state => state.user)

  useEffect(() => {
    if (currentUsername) {

      dispatch(getUser())
    }

  }, [dispatch, currentUsername])

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/login/success' element={<LoginSuccsess />} />
          <Route path='/success/checkout' element={<CheckOutSuccess />} />
          <Route path='/cancel/checkout' element={<CheckOutCancel />} />
          <Route path='/' element={<ProductList />} />
          <Route path='/Product/:id' element={<Product />} />
          <Route path='/checkout' element={<CheckOutPage />} />
          <Route path='/create/product' element={<CreateProduct />} />
          <Route path='/edit/product/:id' element={<EditProduct />} />
          <Route path='/create/category' element={<CreateCategory />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/shop' element={<SellerShop />} />
          <Route path='/shop/:rejected' element={<SellerShop />} />
          <Route path='/shop/:pending' element={<SellerShop />} />
          <Route path='/admin/orders' element={<OrderList />} />
          <Route path='/admin/products' element={<AllProductList />} />
          <Route path='/admin/users' element={<UserList />} />
          <Route path='/admin/reviews' element={<ReviewList />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/orders/shop' element={<ShopOrder />} />
          <Route path='/admin/approve' element={<ApproveProduct />} />
          <Route path='/succsess/user/:id/verify/:token' element={<EmailVerify />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/search/:search' element={<AllProducts />} />
          <Route path='/category/:id' element={<AllProducts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
