import { useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.jpeg";

export default function Dashboard() {

  const [clubs, setClubs] = useState([]);

  const navigate = useNavigate();
  const { cart } = useCart();

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  useEffect(() => {

    axios
      .get("http://localhost:8080/api/clubs")
      .then((res) => {
        setClubs(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to load clubs");
      });

  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F0E8D5" }}>

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex items-center justify-between sticky top-0 z-10">

        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Unimerch"
            className="w-10 h-10 rounded-full object-cover"
          />

          <h1
            className="text-xl font-bold tracking-widest"
            style={{
              color: "#3D0C0C",
              fontFamily: "'Playfair Display', serif"
            }}
          >
            UNIMERCH
          </h1>
        </div>

        <div className="flex items-center gap-5">

          <button
            onClick={() => navigate("/cart")}
            className="relative text-gray-700 hover:text-red-800 transition"
          >
            <ShoppingCart size={22} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate("/login")}
            className="text-gray-700 hover:text-red-800 transition"
          >
            <LogOut size={22} />
          </button>

        </div>
      </nav>

      {/* Clubs */}
      <div className="max-w-5xl mx-auto px-8 py-10">

        <h2
          className="text-2xl font-semibold mb-8"
          style={{
            color: "#3D0C0C",
            fontFamily: "'Playfair Display', serif"
          }}
        >
          University Clubs
        </h2>

        <div className="grid grid-cols-3 gap-6">

          {clubs.map((club) => (

            <button
              key={club.id}
              onClick={() => navigate(`/club/${club.mongoId}`)}
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all text-left group border border-gray-200 bg-white"
            >

              <div
                className="h-44 flex items-center justify-center text-6xl"
                style={{ backgroundColor: "#FEF3C7" }}
              >
                {club.emoji}
              </div>
              

              <div className="p-5">

                <h3
                  className="font-semibold text-base mb-1"
                  style={{
                    color: "#3D0C0C",
                    fontFamily: "'Playfair Display', serif"
                  }}
                >
                  {club.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {club.desc}
                </p>

              </div>
            </button>

          ))}

        </div>
      </div>
    </div>
  );
}