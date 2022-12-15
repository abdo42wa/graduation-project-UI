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
          <Route path='/success' element={<LoginSuccsess />} />
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
          <Route path='/admin/orders' element={<OrderList />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/admin/approve' element={<ApproveProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
