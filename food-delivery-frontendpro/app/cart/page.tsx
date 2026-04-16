"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { resolvePublicImage } from "@/lib/imageUrl";
import Navbar from "@/components/Navbar";

export default function CartPage() {
    const { cart, removeFromCart, addToCart, getCartTotal, clearCart } = useCart();

    const deliveryFee = cart.length > 0 ? 40 : 0;
    const subtotal = getCartTotal();
    const total = subtotal + deliveryFee;

    return (
        <div className="app-container">
            <Navbar />

            <h1 className="page-title" style={{ marginBottom: "2rem", color: "white" }}>Your Cart</h1>

            {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem", background: "rgba(255,255,255,0.05)", borderRadius: "20px" }}>
                    <h2 style={{ color: "var(--text-gray)" }}>Your cart is empty!</h2>
                    <Link href="/" className="btn-hero" style={{ display: "inline-block", marginTop: "2rem" }}>Go to Restaurants</Link>
                </div>
            ) : (
                <div className="cart-page-container">
                    <div className="cart-items-section">
                        {cart.map((item) => (
                            <div className="cart-card-item" key={item.menuId}>
                                <img src={resolvePublicImage(item.imagePath)} alt={item.name} className="cart-img-square" />
                                <div style={{ flex: 1 }}>
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <p style={{ color: "var(--text-gray)" }}>₹ {item.price}</p>
                                </div>
                                <div className="qty-counter">
                                    <button className="qty-btn" onClick={() => removeFromCart(item.menuId)}>−</button>
                                    <span style={{ color: "white", fontWeight: "bold" }}>{item.quantity}</span>
                                    <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                                </div>
                                <p style={{ fontWeight: "bold", minWidth: "80px", textAlign: "right" }}>₹ {item.price * item.quantity}</p>
                            </div>
                        ))}
                        <button className="tab-btn" onClick={clearCart} style={{ marginTop: "1rem", borderColor: "#ff4081", color: "#ff4081" }}>Clear Cart</button>
                    </div>

                    <div className="glass-summary-card">
                        <h2 style={{ marginBottom: "1.5rem" }}>Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹ {subtotal}</span>
                        </div>
                        <div className="summary-row">
                            <span>Delivery Fee</span>
                            <span>₹ {deliveryFee}</span>
                        </div>
                        <div className="summary-row summary-total">
                            <span>Total</span>
                            <span>₹ {total}</span>
                        </div>
                        <Link href="/checkout" className="btn-checkout-gradient" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
