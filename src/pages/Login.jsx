import { useState } from "react";
import { useAuth , AuthConsumer } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



export default function Login() {
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const ok = await login(form.email, form.password);
    if (ok){
        toast.success("Logged in successfully!");
        nav("/dashboard")
    }
    else {
        toast.error("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <div className="card col" style={{ maxWidth: 480, margin: "2rem auto" }}>
        <h2>Login</h2>
        <form onSubmit={submit}>
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
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>
        <p style={{ marginTop: ".5rem" }}>
          No account? <Link to="/register">Register</Link>
        </p>

        {/* Example of Context Consumer usage */}
        <AuthConsumer>
          {(ctx) => (
            <p style={{ color: "#9ca3af", fontSize: ".9rem" }}>
              Auth via Context Consumer: {ctx?.user ? "Authenticated" : "Guest"}
            </p>
          )}
        </AuthConsumer>
      </div>
    </div>
  );
}
