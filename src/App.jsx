import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import Hero from "./pages/user/hero";
import Shop from "./pages/user/shop";
import ContactUs from "./pages/user/contactus";
import Login from "./pages/user/login";
import Signup from "./pages/user/signup";
import BestSeller from "./pages/user/BestSeller";
import NewArrival from "./pages/user/NewArrival";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/admin/login";
import DashboardPage from "./pages/admin/dashboard";
import Product from "./pages/admin/product";
import Customers from "./pages/admin/customer";
import Complaints from "./pages/admin/complaints";
import Orders from "./pages/admin/order";
import CouponPage from "./pages/admin/coupon";
import Reviews from "./pages/admin/review";
import SEO from "./pages/admin/SEO";
import ShoppingCartPage from "./pages/user/cart";
import ProductDetails from "./pages/user/productDetails";
import Checkout from "./pages/user/checkout";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* User Routes with UserLayout */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Hero />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<ShoppingCartPage />} />
            <Route path="/best-sellers" element={<BestSeller />} />
            <Route path="/new-arrivals" element={<NewArrival />} />
            <Route path="/:productId" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* Add other user routes here */}
          </Route>

          {/* Admin Routes with AdminLayout */}
          <Route element={<AdminLayout />}>
            <Route path="/seller/login" element={<LoginPage />} />
            <Route path="/admin/:sellerId" element={<DashboardPage />} />
            <Route path="/admin/products" element={<Product />} />
            <Route path="/admin/complaints" element={<Complaints />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/seller/coupons" element={<CouponPage />} />
          <Route path="/admin/reviews" element={<Reviews />} />
          <Route path="/admin/SEO" element={<SEO />} />

            {/* Add other admin routes here */}
          </Route>
        </Routes>
        
      </AuthProvider>
    </Router>
  );
}

export default App;