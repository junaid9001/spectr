import "./App.css";
import Register from "./register";
import Login from "./login";
import Home from "./home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Store from "./store";
import Cart from "./cart";
import Checkout from "./checkout";
import Profile from "./profile";
import Productdetail from "./productdetail";
import Wishlist from "./wishlist";
import AdminProtected from "./admin/adminprotected";
import AdminLayout from "./admin/adminlayout";
import AdminDashboard from "./admin/dashboard";
import AdminUsers from "./admin/users";
import AdminOrders from "./admin/orders";
import AdminManageproduct from "./admin/manageproduct";
import AdminNewproduct from "./admin/newproduct";
import Userdetails from "./admin/userdetails";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />

          <Route path="/product_details/:id" element={<Productdetail />} />

        
              <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/admin" element={<AdminProtected />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="manageproducts" element={<AdminManageproduct />} />
              <Route path="addnewproduct" element={<AdminNewproduct />} />
              <Route path="userdetails/:id" element={<Userdetails />} />
            </Route>
          </Route>

          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
