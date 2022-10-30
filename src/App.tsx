import './App.css';
import { ProductList } from './product/ProductList';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Product from './product/Product';
import Navbar from './components/Navbar';
import CreateProduct from './admin/CreateProduct';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/Product/:id' element={<Product />} />
          <Route path='/create/product' element={<CreateProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
