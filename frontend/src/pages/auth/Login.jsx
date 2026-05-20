import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.jpeg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {

    const res = await axios.post(
      "http://localhost:8080/api/auth/login",
      {
        email,
        password,
      }
    );

    const { token, role } = res.data;

    // STORE USER
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(res.data));

    // CLUB ADMIN
    if (role === "CLUB_ADMIN") {

      const clubRes = await axios.get(
        `http://localhost:8080/api/clubs/admin/${res.data.id}`
      );

      // STORE MONGO _id
      if (clubRes.data) {

        localStorage.setItem(
          "clubMongoId",
          clubRes.data.mongoId
        );

        // OPTIONAL SLUG
        localStorage.setItem(
          "clubSlug",
          clubRes.data.id
        );
      }

      navigate("/admin/dashboard");

    } else if (role === "STUDENT_STAFF") {

      navigate("/dashboard");

    } else if (role === "UNI_ADMIN") {

      navigate("/uni-admin/dashboard");

    } else {

      alert("Unknown role");

    }

  } catch (err) {

    console.log(err);
    alert("Login failed");

  }
};

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#3D0C0C" }}>

      {/* Left Panel - Logo */}
      <div className="w-1/2 flex items-center justify-center border-r border-white/10">
        <div className="bg-white rounded-full w-64 h-64 flex items-center justify-center shadow-2xl overflow-hidden">
          <img
            src={logo}
            alt="Unimerch Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-96">
          <h2 className="text-4xl mb-10 text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}>
            Login
          </h2>

          <div className="mb-6">
            <label className="block text-white mb-2 text-sm">email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded bg-white text-gray-800 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mb-8">
            <label className="block text-white mb-2 text-sm">password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded bg-white text-gray-800 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            onClick={handleLogin}
            className="px-8 py-3 rounded text-white font-semibold text-sm transition hover:opacity-90"
            style={{ backgroundColor: "#C0591A" }}
          >
            Login
          </button>

          <p className="mt-8 text-white/80 text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="underline cursor-pointer font-semibold text-white hover:text-orange-300"
            >
              SignUp
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}