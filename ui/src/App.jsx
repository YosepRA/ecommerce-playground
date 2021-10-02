import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import './App.css';

import ShopProvider from './components/shop/ShopProvider.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';

const { VITE_PAYPAL_CLIENT } = import.meta.env;
// const theme = createTheme({
//   typography: {
//     h3: {
//       fontWeight: 300,
//     },
//     h4: {
//       fontWeight: 300,
//     },
//     h5: {
//       fontWeight: 300,
//     },
//   },
// });

function App() {
  return (
    <ShopProvider>
      <PayPalScriptProvider options={{ 'client-id': VITE_PAYPAL_CLIENT }}>
        <CssBaseline />
        <Router>
          <Layout>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/cart" component={Cart} />
              <Route path="/checkout" component={Checkout} />

              <Redirect to="/" />
            </Switch>
          </Layout>
        </Router>
      </PayPalScriptProvider>
    </ShopProvider>
  );
}

export default App;
