import { ProductList } from './product/ProductList';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Product from './product/Product';
import Navbar from './components/Navbar';
import CreateProduct from './admin/CreateProduct';
import LoginPage from './login/LoginPage';
import SignupPage from './login/SignupPage';

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/Product/:id' element={<Product />} />
          <Route path='/create/product' element={<CreateProduct />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
