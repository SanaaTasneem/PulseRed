import React, { useState } from "react";
import "./Login.css";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ToastContext";

function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        login(data);
        showToast("Welcome!", "success");
        navigate("/");
      } else {
        showToast("Invalid login!", "error");
      }
    } catch {
      showToast("Server error", "error");
    }

    setLoading(false);
  }

  return (
    <div className="login-page">
      <h2 className="login-title">Staff Login</h2>

      <form className="login-card" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button className="login-submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
