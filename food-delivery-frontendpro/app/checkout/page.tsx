"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { resolvePublicImage } from "@/lib/imageUrl";

export default function CheckoutPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { cart, getCartTotal, clearCart } = useCart();

    const [name, setName] = useState(user?.userName ?? "");
    const [phone, setPhone] = useState(user?.phone ?? "");
    const [address, setAddress] = useState(user?.address ?? "");
    const [notes, setNotes] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"COD" | "UPI" | "CARD">("COD");
    const [upiApp, setUpiApp] = useState<"GPay" | "PhonePe" | "Paytm">("GPay");
    const [upiId, setUpiId] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!user) return;
        setName((prev) => prev || user.userName || "");
        setPhone((prev) => prev || user.phone || "");
        setAddress((prev) => prev || user.address || "");
    }, [user]);

    const subtotal = getCartTotal();
    const deliveryFee = cart.length > 0 ? 40 : 0;
    const total = subtotal + deliveryFee;
    const itemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

    const handlePlaceOrder = (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        if (cart.length === 0) {
            setErrorMessage("Your cart is empty. Add items before placing an order.");
            return;
        }
        if (!phone.trim() || phone.trim().length < 10) {
            setErrorMessage("Please enter a valid phone number.");
            return;
        }
        if (!name.trim()) {
            setErrorMessage("Please enter your name.");
            return;
        }
        if (!address.trim()) {
            setErrorMessage("Please enter your delivery address.");
            return;
        }
        if (paymentMethod === "UPI") {
            if (!upiId.trim() || !upiId.includes("@")) {
                setErrorMessage("Please enter a valid UPI ID (example: name@okaxis).");
                return;
            }
        }
        if (paymentMethod === "CARD") {
            const digits = cardNumber.replace(/\D/g, "");
            if (digits.length < 12) {
                setErrorMessage("Please enter a valid card number.");
                return;
            }
            if (!cardName.trim()) {
                setErrorMessage("Please enter name on card.");
                return;
            }
            if (!/^\d{2}\/\d{2}$/.test(cardExpiry.trim())) {
                setErrorMessage("Please enter expiry in MM/YY format.");
                return;
            }
            if (!/^\d{3,4}$/.test(cardCvv.trim())) {
                setErrorMessage("Please enter valid CVV.");
                return;
            }
        }

        const payload = {
            name,
            phone,
            address,
            notes,
            paymentMethod,
            paymentDetails:
                paymentMethod === "UPI"
                    ? { upiApp, upiId }
                    : paymentMethod === "CARD"
                        ? { cardNumber: `**** **** **** ${cardNumber.replace(/\D/g, "").slice(-4)}`, cardName, cardExpiry }
                        : { type: "Cash on Delivery" },
            total,
            itemCount,
            placedAt: new Date().toISOString(),
        };
        localStorage.setItem("zuzu_last_order", JSON.stringify(payload));
        clearCart();
        router.push("/place-order");
    };

    return (
        <div className="app-container">
            <Navbar />
            <h1 className="page-title" style={{ marginBottom: "1.4rem", color: "white" }}>Checkout</h1>

            {errorMessage && (
                <div className="auth-message error-msg" style={{ marginBottom: "1rem" }}>
                    {errorMessage}
                </div>
            )}

            <form className="checkout-grid-glass" onSubmit={handlePlaceOrder}>
                <div className="glass-summary-card">
                    <div className="glass-header">
                        <span className="step-number">1</span>
                        <h3>Delivery Details</h3>
                    </div>
                    <div className="glass-input-group">
                        <label className="glass-label">Name</label>
                        <input className="glass-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                    </div>
                    <div className="glass-input-group">
                        <label className="glass-label">Phone Number</label>
                        <input className="glass-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" />
                    </div>
                    <div className="glass-input-group">
                        <label className="glass-label">Delivery Address</label>
                        <textarea className="glass-input" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House no, area, city" rows={3} />
                    </div>
                    <div className="glass-input-group">
                        <label className="glass-label">Order Notes (optional)</label>
                        <textarea className="glass-input" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Less spicy, no onion, etc." rows={2} />
                    </div>

                    <div className="glass-header" style={{ marginTop: "1.5rem" }}>
                        <span className="step-number">2</span>
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment-grid-glass">
                        <label className="payment-option-glass">
                            <input type="radio" name="payment" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} />
                            <div className="payment-card-box"><span>Cash on Delivery</span></div>
                        </label>
                        <label className="payment-option-glass">
                            <input type="radio" name="payment" checked={paymentMethod === "UPI"} onChange={() => setPaymentMethod("UPI")} />
                            <div className="payment-card-box"><span>UPI</span></div>
                        </label>
                        <label className="payment-option-glass">
                            <input type="radio" name="payment" checked={paymentMethod === "CARD"} onChange={() => setPaymentMethod("CARD")} />
                            <div className="payment-card-box"><span>Card</span></div>
                        </label>
                    </div>

                    {paymentMethod === "UPI" && (
                        <div className="payment-details-box">
                            <div className="payment-app-row">
                                <button type="button" className={`upi-app-btn ${upiApp === "GPay" ? "active" : ""}`} onClick={() => setUpiApp("GPay")}>
                                    <span className="upi-logo gpay">G</span> GPay
                                </button>
                                <button type="button" className={`upi-app-btn ${upiApp === "PhonePe" ? "active" : ""}`} onClick={() => setUpiApp("PhonePe")}>
                                    <span className="upi-logo phonepe">P</span> PhonePe
                                </button>
                                <button type="button" className={`upi-app-btn ${upiApp === "Paytm" ? "active" : ""}`} onClick={() => setUpiApp("Paytm")}>
                                    <span className="upi-logo paytm">P</span> Paytm
                                </button>
                            </div>
                            <div className="glass-input-group" style={{ marginTop: "1rem" }}>
                                <label className="glass-label">UPI ID</label>
                                <input className="glass-input" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="yourname@okaxis" />
                            </div>
                        </div>
                    )}

                    {paymentMethod === "CARD" && (
                        <div className="payment-details-box">
                            <div className="glass-input-group">
                                <label className="glass-label">Card Number</label>
                                <input className="glass-input" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="glass-input-group">
                                <label className="glass-label">Name on Card</label>
                                <input className="glass-input" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Card holder name" />
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                <div className="glass-input-group">
                                    <label className="glass-label">Expiry (MM/YY)</label>
                                    <input className="glass-input" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} placeholder="08/29" />
                                </div>
                                <div className="glass-input-group">
                                    <label className="glass-label">CVV</label>
                                    <input className="glass-input" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} placeholder="123" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="glass-summary-card">
                    <h3 style={{ marginBottom: "1rem" }}>Order Summary</h3>
                    {cart.length === 0 ? (
                        <p style={{ color: "var(--text-gray)" }}>
                            Cart is empty. <Link href="/cart">Go back to cart</Link>
                        </p>
                    ) : (
                        <>
                            {cart.map((item) => (
                                <div key={item.menuId} className="summary-item-row">
                                    <img src={resolvePublicImage(item.imagePath, "menu")} alt={item.name} className="checkout-item-img" />
                                    <span className="summary-item-name">{item.name}</span>
                                    <span className="summary-item-qty">x{item.quantity}</span>
                                </div>
                            ))}
                            <div className="summary-row" style={{ marginTop: "1rem" }}>
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
                            <button type="submit" className="btn-checkout-gradient">Place Order</button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}
