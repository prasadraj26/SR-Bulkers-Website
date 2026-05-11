import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ YOUR ADMIN EMAIL
  const ADMIN_EMAIL = "srbulkers@gmail.com";

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Only admin email allowed
        if (user.email === ADMIN_EMAIL) {
          navigate("/admin/dashboard");
        } else {
          await signOut(auth);
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // ✅ Firebase login
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // ✅ Check admin email
      if (result.user.email !== ADMIN_EMAIL) {
        await signOut(auth);

        setError("Access denied. Not an admin account.");
        setLoading(false);
        return;
      }

      // ✅ Success
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid admin credentials");
    }

    setLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">

        <h1>Admin Login</h1>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="admin-login-form"
        >

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default AdminLogin;