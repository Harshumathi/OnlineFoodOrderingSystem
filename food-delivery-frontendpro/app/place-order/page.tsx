"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type LastOrder = {
    name?: string;
    phone: string;
    address: string;
    notes?: string;
    paymentMethod: "COD" | "UPI" | "CARD";
    paymentDetails?: {
        upiApp?: string;
        upiId?: string;
        cardNumber?: string;
        cardName?: string;
        cardExpiry?: string;
        type?: string;
    };
    total: number;
    itemCount: number;
    placedAt: string;
};

export default function PlaceOrderPage() {
    const [order, setOrder] = useState<LastOrder | null>(null);

    useEffect(() => {
        const data = localStorage.getItem("zuzu_last_order");
        if (!data) return;
        try {
            setOrder(JSON.parse(data));
        } catch {
            setOrder(null);
        }
    }, []);

    return (
        <div className="cart-page-bg">
            <div className="confirmation-container">
                <div className="confirmation-wrapper">
                    <div className="success-anim">
                        <span style={{ fontSize: "4rem" }}>✅</span>
                    </div>
                    <h1 className="order-title-neon">Order Placed!</h1>
                    <p className="order-subtitle">Your delicious food is being prepared.</p>

                    <div className="order-details-glass">
                        <div className="detail-row-shine">
                            <span style={{ opacity: 0.7 }}>Name</span>
                            <span style={{ color: "#00ff88", fontWeight: 600 }}>{order?.name ?? "-"}</span>
                        </div>
                        <div className="detail-row-shine">
                            <span style={{ opacity: 0.7 }}>Items</span>
                            <span style={{ color: "#00ff88", fontWeight: 600 }}>{order?.itemCount ?? 0}</span>
                        </div>
                        <div className="detail-row-shine">
                            <span style={{ opacity: 0.7 }}>Total</span>
                            <span style={{ color: "#00ff88", fontWeight: 600 }}>₹ {order?.total ?? 0}</span>
                        </div>
                        <div className="detail-row-shine">
                            <span style={{ opacity: 0.7 }}>Payment</span>
                            <span style={{ color: "#00ff88", fontWeight: 600 }}>{order?.paymentMethod ?? "COD"}</span>
                        </div>
                        {order?.paymentMethod === "UPI" && (
                            <div className="detail-row-shine">
                                <span style={{ opacity: 0.7 }}>UPI</span>
                                <span style={{ color: "#00ff88", fontWeight: 600 }}>
                                    {order.paymentDetails?.upiApp} ({order.paymentDetails?.upiId})
                                </span>
                            </div>
                        )}
                        {order?.paymentMethod === "CARD" && (
                            <div className="detail-row-shine">
                                <span style={{ opacity: 0.7 }}>Card</span>
                                <span style={{ color: "#00ff88", fontWeight: 600 }}>
                                    {order.paymentDetails?.cardNumber}
                                </span>
                            </div>
                        )}
                        <div className="detail-row-shine">
                            <span style={{ opacity: 0.7 }}>Phone</span>
                            <span style={{ color: "#00ff88", fontWeight: 600 }}>{order?.phone ?? "-"}</span>
                        </div>
                    </div>

                    <div style={{ marginTop: "10px" }}>
                        <Link href="/" className="btn-home-ghost">Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
