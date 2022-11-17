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
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/succsess' element={<LoginSuccsess />} />
          <Route path='/' element={<ProductList />} />
          <Route path='/Product/:id' element={<Product />} />
          <Route path='/create/product' element={<CreateProduct />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
