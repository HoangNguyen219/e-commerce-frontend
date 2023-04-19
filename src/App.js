import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, SideBar, Footer } from "./components";
import {
  HomePage,
  AboutPage,
  CheckoutPage,
  ErrorPage,
  PrivateRoute,
  ProductsPage,
  SingleProductPage,
  CartPage,
} from "./pages";
function App() {
  return (
    <Router>
      <Navbar />
      <SideBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:id" element={<SingleProductPage />} />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
