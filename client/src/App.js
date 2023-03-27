import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Products from './components/products/Products';
import Product from './components/products/Product';
import Carts from './cart/Carts';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import Home from './components/pages/Home';
import PrivateRoute from './components/routing/PrivateRoute';
import AddBtn from './components/layout/Addbtn';
import Footer from './components/layout/Footer';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import ProductState from './context/product/ProductState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
 };

const App = () => {

  useEffect(() => {
    M.AutoInit();
  });

  return (
    <AuthState>
      <ProductState>
        <AlertState>
          <Router>
            <div className="App container">
              <header>
                <Navbar />
              </header>
              <main>
                <div className=''>
                  <Alerts />
                  <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/product/:id' element={<Product />} />
                    <Route exact path='/products' element={<Products />} />
                    <Route exact path='/carts' element={
                      <PrivateRoute>
                        <Carts />
                      </PrivateRoute>
                    } />
                    <Route exact path='/register' element={<Register />} />
                    <Route exact path='/login' element={<Login />} />
                  </Routes>
                </div>
                <AddBtn />
              </main>
              <footer>
                <Footer />
              </footer>
            </div>
          </Router>
        </AlertState>
      </ProductState>
    </AuthState>
  );
}

export default App;
