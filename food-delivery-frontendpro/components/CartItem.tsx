"use client";

import { CartItemType } from "../context/CartContext";

interface CartItemProps {
    item: CartItemType;
    onRemove: (menuId: number) => void;
}

export default function CartItem({ item, onRemove }: CartItemProps) {
    return (
        <div className="cart-item-glass" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <img src={item.imagePath} alt={item.name} style={{ width: "60px", height: "60px", borderRadius: "10px", objectFit: "cover" }} />
                <div>
                    <h3 style={{ color: "white" }}>{item.name}</h3>
                    <p style={{ color: "#aaa" }}>₹{item.price} x {item.quantity}</p>
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <span style={{ color: "white", fontWeight: "bold", fontSize: "1.2rem" }}>₹{(item.price * item.quantity).toFixed(2)}</span>
                <button 
                    onClick={() => onRemove(item.menuId)} 
                    style={{ background: "red", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                >
                    Remove
                </button>
            </div>
        </div>
    );
}
