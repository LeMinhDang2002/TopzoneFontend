
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import ShowCategory from './pages/Category';
import Post from './pages/Post';
import Cart from './pages/Cart';

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />}/> 
        <Route path="/product/:id" element={<Product />}/> 
        <Route path="/products/:type" element={<ShowCategory />}/> 
        <Route path="/posts" element={<Post />}/> 
        <Route path="/cart" element={<Cart />}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
