import './App.css';
import { ProductList } from './product/ProductList';
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Product from './product/Product';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/Product/:id' element={<Product />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
