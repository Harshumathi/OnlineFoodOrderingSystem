"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { cart } = useCart();
    const { user, logout } = useAuth();
    const displayName = user?.userName?.trim() ? user.userName : "User";

    return (
        <>
            <nav className="navbar">
                <div className="navbar-inner">
                    <Link href="/" className="logo">
                        <div className="logo-icon">🍔</div> ZUZU EATS
                    </Link>

                    <ul className="nav-links">
                        <li><Link href="/" className="active">Restaurants</Link></li>
                        <li><Link href="/cart">Orders</Link></li>
                    </ul>

                    <div className="nav-actions">
                        {user ? (
                            <>
                                <div className="hello-name">{`Hi, ${displayName}`}</div>
                                <button type="button" onClick={logout} className="logout-btn">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="nav-auth-link">Login</Link>
                                <Link href="/signup" className="nav-auth-link nav-auth-link-signup">Sign Up</Link>
                            </>
                        )}
                        <Link href="/cart" className="icon-btn cart-btn" aria-label="Open cart">
                            🛒 <span className="cart-badge">{cart.length}</span>
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="navbar-spacer" aria-hidden="true" />
        </>
    );
}
