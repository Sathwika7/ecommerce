import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './pages/UserContextProvider';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import store from './redux/store';
import { Home, Product, Products, AboutPage, Cart, Login, Register, Checkout, PageNotFound } from "./pages"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
  <BrowserRouter>
    <Provider store={store}>
      <div>
        <ToastContainer autoClose={2000}/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/product/*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Provider>
  </BrowserRouter>
  </UserContextProvider>
); 
