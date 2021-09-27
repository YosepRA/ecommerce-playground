import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import './App.css';

import ShopProvider from './components/shop/ShopProvider.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';

function App() {
  return (
    <ShopProvider>
      <CssBaseline />
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </Layout>
      </Router>
    </ShopProvider>
  );
}

export default App;
