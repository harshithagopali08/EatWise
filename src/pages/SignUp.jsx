import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password);
  }

  async function createAccount() {
    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      console.log("Signup response:", res.data); // 🔥 debug

      setSuccess("Account created successfully!");

      // ✅ STORE USER SAFELY
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } else {
        // fallback (if backend doesn't send user)
        localStorage.setItem("user", JSON.stringify({ name, email }));
      }

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // clear inputs
      setName("");
      setEmail("");
      setPassword("");

      // 🔥 DIRECT NAVIGATION (NO DELAY)
      navigate("/user-details");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-Linear-to-br from-[#e8f5ec] via-[#f4fff8] to-[#e6fff7] p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#134611] text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Start your Healthy Bites journey
        </p>

        {success && <p className="text-green-500 mb-4">{success}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Name */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-2 border-[#134611] rounded-lg p-3"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-[#134611] rounded-lg p-3"
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create password"
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
          onClick={createAccount}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold
          ${loading ? "bg-gray-400" : "bg-[#EF8A17] hover:bg-[#e07810]"}`}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#134611] cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
