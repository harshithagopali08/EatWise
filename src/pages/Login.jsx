import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

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

      // ✅ Store user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const userId = res.data.user.id;

      let profile = null;

      // 🔥 FETCH USER DETAILS (IMPORTANT)
      try {
        const profileRes = await axios.get(
          `http://localhost:5000/api/user/profile/${userId}`,
        );
        profile = profileRes.data;
      } catch (err) {
        console.log("Profile fetch failed:", err.message);
      }

      // 🔥 FINAL DECISION (FIXED)
      if (!profile || profile.height === null || profile.height === undefined) {
        // 🆕 NEW USER
        navigate("/onboarding/language");
      } else {
        // 🔁 EXISTING USER
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#e8f5ec] via-[#f4fff8] to-[#e6fff7] p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#134611] text-center mb-2">
          Login
        </h1>

        <p className="text-gray-500 text-center mb-8">Welcome back</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-2 border-[#134611] rounded-lg p-3 mb-4"
        />

        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-[#134611] rounded-lg p-3 pr-10"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold
          ${loading ? "bg-gray-400" : "bg-[#EF8A17]"}`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-[#134611] cursor-pointer"
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
