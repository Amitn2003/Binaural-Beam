import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register, loading } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const ok = await register(form);
    if (ok) nav("/login");
  };

  return (
    <div className="container">
      <div className="card col" style={{ maxWidth: 480, margin: "2rem auto" }}>
        <h2>Create account</h2>
        <form onSubmit={submit}>
          <input
            className="input"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          />
          <input
            className="input"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          />
          <input
            className="input"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
          />
          <button className="button" disabled={loading}>
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>
        <p style={{ marginTop: ".5rem" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
