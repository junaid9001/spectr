import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./components/login.css";

export default function Login() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [navigate, user]);

  async function handlelogin(e) {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:4006/users?email=${email.trim()}`
      );
      const user = res.data[0];

      if (!user || user.password !== password || user.active === false) {
        seterror("invalid email or password");

        return;
      }
      localStorage.setItem("user", JSON.stringify(user));
      if (user.active && user.role === "admin") {
        navigate("/admin");
        window.location.reload();
      } else if (user.active && user.role === "user") {
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="login">
        <h2>Login</h2>
        {error && <p className="regerror">{error}</p>}

        <form onSubmit={handlelogin}>
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
        <p className="login-register">
          Don't have an account?{" "}
          <Link to="/register" className="register-link">
            Register
          </Link>
        </p>
      </div>
    </>
  );
}
