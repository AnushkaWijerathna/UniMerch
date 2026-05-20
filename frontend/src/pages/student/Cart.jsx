import { useNavigate } from "react-router-dom";
import { Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "../../context/CartContext";
import axios from "axios";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQty, total , clearCart} = useCart();
  const storedUser = localStorage.getItem("user");

const user = storedUser ? JSON.parse(storedUser) : null;

  const handleCheckout = async () => {

  try {

    if (cart.length === 0) return;
    
    const firstItem = cart[0];

    const orderData = {

      userId: user?.id,

      clubId: firstItem.clubId,

      totalAmount: total,

      status: "PENDING",

      qrCode: `QR${Date.now()}`,

      items: cart.map((item) => ({
        productId: item.id,
        productName: item.name,
        quantity: item.qty,
        size: item.variant,
        priceAtPurchase: item.price
      }))
    };

    const res = await axios.post(
      "http://localhost:8080/api/orders",
      orderData
    );

    clearCart();
    
    const clubRes = await axios.get(
      `http://localhost:8080/api/clubs/${firstItem.clubId}`
    );

    const club = clubRes.data;

    navigate("/order-confirmation", {
      state: {
        orderId: res.data.id,
        pickupDay: club.pickupDay,
        pickupLocation: club.pickupLocation,
        total
      }
    });

  } catch (err) {

    console.log(err);

    alert("Checkout failed");
  }
};
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FBF5E6" }}>

      {/* Header */}
      <nav className="bg-white shadow-sm px-8 py-3 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-800"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <h2
          className="text-base font-semibold"
          style={{ color: "#3D0C0C", fontFamily: "'Playfair Display', serif" }}
        >
          Shopping Cart
        </h2>
        <div />
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {cart.length === 0 ? (
          <div className="text-center text-gray-500 py-24">
            <p className="text-lg">Your cart is empty.</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-4 text-sm underline"
              style={{ color: "#3D0C0C" }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex flex-col gap-4 mb-6">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.variant}`}
                  className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm" style={{ color: "#3D0C0C" }}>
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {item.variant && `Size: ${item.variant}`}
                    </p>
                    <p className="text-sm font-bold mt-1" style={{ color: "#3D0C0C" }}>
                      ${item.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.id, item.variant)}
                      className="text-red-400 hover:text-red-600 mr-2"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => updateQty(item.id, item.variant, -1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-medium">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.variant, 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total & Checkout */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600 font-medium">Total:</span>
                <span className="text-xl font-bold" style={{ color: "#3D0C0C" }}>
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-3 rounded-xl text-white font-semibold transition hover:opacity-90"
                style={{ backgroundColor: "#3D0C0C" }}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}