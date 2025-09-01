import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./components/register.css";
import Wishlist from "./wishlist";

export default function Register() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");

  const navigate = useNavigate();

  async function handleregister(e) {
    e.preventDefault();
    const existinguser = await axios.get(
      `http://localhost:4006/users?email=${email}`
    );
    if (password.length < 4) {
      seterror("password must be atleast 4 characters long");
    } else if (existinguser.data.length > 0) {
      seterror("user already exist");
    } else {
      try {
        await axios.post("http://localhost:4006/users", {
          username: username,
          email: email,
          password: password,
          cart: [],
          wishlist: [],
          role:"user",
          active:true
        });
        navigate("/login");
      } catch (err) {
        seterror("Failed to register. Please try again.");
        console.log(err);
      }
    }
  }

  return (
    <div className="register">
      <h2>Register</h2>

      {error && <p className="regerror">{error}</p>}

      <form onSubmit={handleregister}>
        <label>username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          placeholder="Enter your username"
          required
        />

        <label>email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label>password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
