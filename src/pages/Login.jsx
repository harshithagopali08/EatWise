import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ added
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  // 🔥 FINAL LOGIN FUNCTION
  async function handleLogin() {
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email address");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // ✅ Store token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center
      bg-linear-to-br from-[#e8f5ec] via-[#f4fff8] to-[#e6fff7] p-6"
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#134611] text-center mb-2">
          Login
        </h1>

        <p className="text-gray-500 text-center mb-8">Welcome back</p>

        {/* Error */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-[#134611] font-semibold mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-[#134611] rounded-lg p-3"
          />
        </div>

        {/* Password with Eye */}
        <div className="mb-4 relative">
          <label className="block text-[#134611] font-semibold mb-2">
            Password
          </label>

          <input
            type={showPassword ? "text" : "password"} // 👁️ toggle
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-[#134611] rounded-lg p-3 pr-10"
          />

          {/* Eye icon */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-11 cursor-pointer text-gray-600"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold
          ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#EF8A17] hover:bg-[#e07810]"}`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup link */}
        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-[#134611] font-semibold cursor-pointer"
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
