import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, SideBar, Footer, TopBar } from './components';
import {
  HomePage,
  AboutPage,
  CheckoutPage,
  ErrorPage,
  PrivateRoute,
  ProductsPage,
  SingleProductPage,
  CartPage,
  LoginPage,
  MePage,
  AddressPage,
  AddAdressPage,
  OrderPage,
  OrderDetailsPage,
  AccountPage,
  ChangePasswordPage,
  EditAccountPage,
  VerifyPage,
  ForgotPassword,
  ResetPasswordForm,
} from './pages';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer />
      <TopBar />
      <Navbar />
      <SideBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/verify-email" element={<VerifyPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/reset-password" element={<ResetPasswordForm />} />

        <Route path="/products/:id" element={<SingleProductPage />} />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/me"
          element={
            <PrivateRoute>
              <MePage />
            </PrivateRoute>
          }
        >
          <Route index element={<OrderPage />} />
          <Route path="orders/:id" element={<OrderDetailsPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="account/edit" element={<EditAccountPage />} />
          <Route
            path="account/change-password"
            element={<ChangePasswordPage />}
          />
          <Route path="addresses" element={<AddressPage />} />
          <Route path="add-address" element={<AddAdressPage />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
