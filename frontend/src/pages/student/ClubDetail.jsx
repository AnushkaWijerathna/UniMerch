// import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { ShoppingCart, ArrowLeft } from "lucide-react";
// import { useCart } from "../../context/CartContext";


// export default function ClubDetail() {
//   const { clubId } = useParams();
//   const navigate = useNavigate();
//   const { addToCart, cart } = useCart();
//   const club = clubsData[clubId] || clubsData["engineering"];
//   const cartCount = cart.reduce((s, i) => s + i.qty, 0);

//   const [sizes, setSizes] = useState(() =>
//     Object.fromEntries(club.products.map((p) => [p.id, p.sizes[0]]))
//   );
//   const [toast, setToast] = useState(null);

//   const handleAdd = (product) => {
//     addToCart({ ...product, size: sizes[product.id] });
//     setToast(`${product.name} added to cart!`);
//     setTimeout(() => setToast(null), 2500);
//   };

//   return (
//     <div className="min-h-screen" style={{ backgroundColor: "#FBF5E6" }}>
//       {/* Toast */}
//       {toast && (
//         <div className="fixed top-4 right-4 z-50 bg-white border border-green-200 text-green-700 px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm">
//           <span className="text-green-500">✓</span> {toast}
//         </div>
//       )}

//       {/* Header */}
//       <nav className="bg-white shadow-sm px-8 py-3 flex items-center justify-between sticky top-0 z-10">
//         <button
//           onClick={() => navigate("/dashboard")}
//           className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-800"
//         >
//           <ArrowLeft size={16} /> Back
//         </button>
//         <h2
//           className="text-base font-semibold"
//           style={{ color: "#3D0C0C", fontFamily: "'Playfair Display', serif" }}
//         >
//           {club.name}
//         </h2>
//         <button
//           onClick={() => navigate("/cart")}
//           className="relative text-gray-700 hover:text-red-800"
//         >
//           <ShoppingCart size={22} />
//           {cartCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//               {cartCount}
//             </span>
//           )}
//         </button>
//       </nav>

//       {/* Club Banner */}
//       <div
//         className="relative h-40 flex items-center px-10 gap-5"
//         style={{
//           background: "linear-gradient(to right, #3D0C0C88, #3D0C0C22)",
//           backgroundImage: "url(https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=60)",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow">
//           {club.emoji}
//         </div>
//         <div>
//           <h1
//             className="text-2xl text-white font-bold"
//             style={{ fontFamily: "'Playfair Display', serif" }}
//           >
//             {club.name}
//           </h1>
//           <p className="text-white/80 text-sm">{club.desc}</p>
//         </div>
//       </div>

//       {/* Products */}
//       <div className="max-w-4xl mx-auto px-8 py-10">
//         <h3
//           className="text-xl font-semibold mb-6"
//           style={{ color: "#3D0C0C", fontFamily: "'Playfair Display', serif" }}
//         >
//           Merchandise
//         </h3>
//         <div className="grid grid-cols-3 gap-6">
//           {club.products.map((product) => (
//             <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-44 object-cover"
//               />
//               <div className="p-4">
//                 <h4
//                   className="font-semibold text-sm mb-1"
//                   style={{ color: "#3D0C0C" }}
//                 >
//                   {product.name}
//                 </h4>
//                 <p className="text-lg font-bold mb-3" style={{ color: "#3D0C0C" }}>
//                   ${product.price}
//                 </p>
//                 <label className="text-xs text-gray-500 mb-1 block">Select Size:</label>
//                 <select
//                   value={sizes[product.id]}
//                   onChange={(e) =>
//                     setSizes((prev) => ({ ...prev, [product.id]: e.target.value }))
//                   }
//                   className="w-full border border-gray-200 rounded px-3 py-2 text-sm mb-3 outline-none"
//                 >
//                   {product.sizes.map((s) => (
//                     <option key={s}>{s}</option>
//                   ))}
//                 </select>
//                 <button
//                   onClick={() => handleAdd(product)}
//                   className="w-full py-2 rounded text-white text-sm font-semibold transition hover:opacity-90"
//                   style={{ backgroundColor: "#3D0C0C" }}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { ShoppingCart, ArrowLeft } from "lucide-react";
// import { useCart } from "../../context/CartContext";
// import axios from "axios";

// export default function ClubDetail() {

//   const { clubId } = useParams();

//   const navigate = useNavigate();

//   const { addToCart, cart } = useCart();

//   const [club, setClub] = useState(null);

//   const [products, setProducts] = useState([]);

//   const [variants, setVariants] = useState({});

//   const [toast, setToast] = useState(null);

//   const cartCount = cart.reduce((s, i) => s + i.qty, 0);

//   useEffect(() => {

//     axios
//       .get(`http://localhost:8080/api/clubs/${clubId}`)
//       .then((res) => {
//         setClub(res.data);
//       });

//     axios
//       .get(`http://localhost:8080/api/products/club/${clubId}`)
//       .then((res) => {

//         setProducts(res.data);

//         const initialVariants = {};

//         res.data.forEach((p) => {
//           initialVariants[p.id] = p.variants[0];
//         });

//         setVariants(initialVariants);
//       });

//   }, [clubId]);

//   const handleAdd = (product) => {

//     addToCart({
//       ...product,
//       variant: variants[product.id]
//     });

//     setToast(`${product.name} added to cart!`);

//     setTimeout(() => setToast(null), 2500);
//   };

//   if (!club) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen" style={{ backgroundColor: "#FBF5E6" }}>

//       {toast && (
//         <div className="fixed top-4 right-4 z-50 bg-white border border-green-200 text-green-700 px-5 py-3 rounded-xl shadow-lg text-sm">
//           {toast}
//         </div>
//       )}

//       <nav className="bg-white shadow-sm px-8 py-3 flex items-center justify-between sticky top-0 z-10">

//         <button
//           onClick={() => navigate("/dashboard")}
//           className="flex items-center gap-2 text-sm"
//         >
//           <ArrowLeft size={16} />
//           Back
//         </button>

//         <h2 className="font-semibold">
//           {club.name}
//         </h2>

//         <button
//           onClick={() => navigate("/cart")}
//           className="relative"
//         >
//           <ShoppingCart size={22} />

//           {cartCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//               {cartCount}
//             </span>
//           )}
//         </button>
//       </nav>

//       <div className="max-w-5xl mx-auto px-8 py-10">

//         <h1 className="text-3xl font-bold mb-2">
//           {club.name}
//         </h1>

//         <p className="text-gray-600 mb-8">
//           {club.desc}
//         </p>

//         <div className="grid grid-cols-3 gap-6">

//           {products.map((product) => (

//             <div
//               key={product.id}
//               className="bg-white rounded-2xl overflow-hidden shadow-sm"
//             >

//               <img
//                 src={product.imageUrl}
//                 alt={product.name}
//                 className="w-full h-44 object-cover"
//               />

//               <div className="p-4">

//                 <h4 className="font-semibold mb-2">
//                   {product.name}
//                 </h4>

//                 <p className="font-bold mb-3">
//                   ${product.price}
//                 </p>

//                 <select
//                   value={variants[product.id]}
//                   onChange={(e) =>
//                     setVariants((prev) => ({
//                       ...prev,
//                       [product.id]: e.target.value
//                     }))
//                   }
//                   className="w-full border rounded px-3 py-2 mb-3"
//                 >
//                   {product.variants.map((s) => (
//                     <option key={s}>
//                       {s}
//                     </option>
//                   ))}
//                 </select>

//                 <button
//                   onClick={() => handleAdd(product)}
//                   className="w-full py-2 rounded text-white"
//                   style={{ backgroundColor: "#3D0C0C" }}
//                 >
//                   Add to Cart
//                 </button>

//               </div>
//             </div>

//           ))}

//         </div>
//       </div>
//     </div>
//   );
// }

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "../../context/CartContext";
import axios from "axios";

export default function ClubDetail() {

  const { clubId } = useParams();

  const navigate = useNavigate();

  const { addToCart, cart } = useCart();

  const [club, setClub] = useState(null);

  const [products, setProducts] = useState([]);

  const [variants, setVariants] = useState({});

  const [toast, setToast] = useState(null);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {

    axios
      .get(`http://localhost:8080/api/clubs/${clubId}`)
      .then((res) => {
        setClub(res.data);
      })
      .catch((err) => {
        console.error("Failed to load club", err);
      });

    axios
      .get(`http://localhost:8080/api/products/club/${clubId}`)
      .then((res) => {

        setProducts(res.data);

        const initialVariants = {};

        res.data.forEach((p) => {
          initialVariants[p.id] = p.variants?.[0] || "";
        });

        setVariants(initialVariants);
      })
      .catch((err) => {
        console.error("Failed to load products", err);
      });

  }, [clubId]);

  const handleAdd = (product) => {

    addToCart({
      ...product,
      clubId: club.id,
      variant: variants[product.id]
    });

    setToast(`${product.name} added to cart!`);

    setTimeout(() => setToast(null), 2500);
  };

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#FBF5E6" }}
    >

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-white border border-green-200 text-green-700 px-5 py-3 rounded-xl shadow-lg text-sm">
          {toast}
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-3 flex items-center justify-between sticky top-0 z-10">

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-red-800"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h2
          className="font-semibold"
          style={{
            color: "#3D0C0C",
            fontFamily: "'Playfair Display', serif"
          }}
        >
          {club.name}
        </h2>

        <button
          onClick={() => navigate("/cart")}
          className="relative text-gray-700 hover:text-red-800"
        >
          <ShoppingCart size={22} />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

      </nav>

      {/* Club Banner */}
      <div
        className="relative h-48 flex items-center px-10 gap-5"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(61,12,12,0.75),
              rgba(61,12,12,0.25)
            ),
            url(${club.bannerImageUrl})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {/* Emoji */}
        <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center text-4xl shadow-lg">
          {club.emoji}
        </div>

        {/* Club Info */}
        <div>

          <h1
            className="text-3xl text-white font-bold mb-2"
            style={{
              fontFamily: "'Playfair Display', serif"
            }}
          >
            {club.name}
          </h1>

          <p className="text-white/90 text-sm max-w-xl">
            {club.desc}
          </p>

        </div>

      </div>

      {/* Products */}
      <div className="max-w-5xl mx-auto px-8 py-10">

        <h2
          className="text-2xl font-semibold mb-8"
          style={{
            color: "#3D0C0C",
            fontFamily: "'Playfair Display', serif"
          }}
        >
          Merchandise
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
            >

              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">

                <h4
                  className="font-semibold text-base mb-1"
                  style={{ color: "#3D0C0C" }}
                >
                  {product.name}
                </h4>

                <p
                  className="text-lg font-bold mb-3"
                  style={{ color: "#3D0C0C" }}
                >
                  ${product.price}
                </p>

                <label className="text-xs text-gray-500 mb-1 block">
                  Select Size
                </label>

                <select
                  value={variants[product.id]}
                  onChange={(e) =>
                    setVariants((prev) => ({
                      ...prev,
                      [product.id]: e.target.value
                    }))
                  }
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm mb-3 outline-none"
                >

                  {product.variants?.map((s) => (
                    <option key={s}>
                      {s}
                    </option>
                  ))}

                </select>

                <button
                  onClick={() => handleAdd(product)}
                  className="w-full py-2 rounded text-white text-sm font-semibold transition hover:opacity-90"
                  style={{ backgroundColor: "#3D0C0C" }}
                >
                  Add to Cart
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}