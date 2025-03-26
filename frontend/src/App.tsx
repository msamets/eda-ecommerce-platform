import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import theme from './styles/theme';
import store from './store';

// Import pages (to be created)
import HomePage from './pages/HomePage';
// import ProductsPage from '../frontend/src/pages/ProductsPage';
// import ProductDetailPage from '../frontend/src/pages/ProductDetailPage';
// import CartPage from '../frontend/src/pages/CartPage';
// import CheckoutPage from '../frontend/src/pages/CheckoutPage';
// import LoginPage from '../frontend/src/pages/LoginPage';
// import RegisterPage from '../frontend/src/pages/RegisterPage';
// import ProfilePage from '../frontend/src/pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Import components (to be created)
import Layout from './components/Layout';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} /> */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;