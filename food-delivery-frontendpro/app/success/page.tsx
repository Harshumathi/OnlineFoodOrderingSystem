import Link from "next/link";

export default function SuccessPage() {
    return (
        <div className="cart-page-bg">
            <div className="confirmation-container">
                <div className="confirmation-wrapper">
                    <div className="success-anim">
                        <span style={{ fontSize: '4rem' }}>✅</span>
                    </div>

                    <h1 className="order-title-neon">Order Placed!</h1>
                    <p className="order-subtitle">Your delicious food is being prepared.</p>

                    <div className="tracking-map-visual">
                        <div className="map-path"></div>
                        <div className="map-rider">🚲
                            <div style={{ fontSize: "0.6rem", background: "white", color: "black", padding: "2px 5px", borderRadius: "4px", position: "absolute", top: "-20px", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", fontWeight: "bold" }}>
                                You
                            </div>
                        </div>
                    </div>

                    <div className="order-details-glass">
                        <div className="detail-row-shine">
                            <span style={{ opacity: 0.7 }}>Estimated Time</span>
                            <span style={{ color: "#00ff88", fontWeight: 600 }}>30 - 45 mins</span>
                        </div>
                        <div className="detail-row-shine">
                            <span style={{ opacity: 0.7 }}>Payment</span>
                            <span style={{ color: "#00ff88", fontWeight: 600 }}>Paid Successfully ✅</span>
                        </div>
                    </div>

                    <button className="btn-track">Track Order</button>
                    <div style={{ marginTop: "10px" }}>
                        <Link href="/" className="btn-home-ghost">Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
