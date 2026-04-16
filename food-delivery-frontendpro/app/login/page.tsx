"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { LockIcon, MailIcon } from "@/components/AuthFieldIcons";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [fromSignup] = useState(() => {
        if (typeof window === "undefined") return false;
        const params = new URLSearchParams(window.location.search);
        return params.get("signup") === "success";
    });

    const router = useRouter();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (res.ok) {
                const payload = await res.json();
                const resolved =
                    (payload && typeof payload === "object" && "user" in payload && (payload as { user: unknown }).user)
                        ? (payload as { user: unknown }).user
                        : payload;
                const fallbackName = email.includes("@") ? email.split("@")[0] : "User";

                login({
                    ...(typeof resolved === "object" && resolved ? (resolved as Record<string, unknown>) : {}),
                    email,
                    userName:
                        (typeof resolved === "object" && resolved && "userName" in (resolved as Record<string, unknown>)
                            ? (resolved as Record<string, unknown>).userName
                            : undefined) ||
                        (typeof resolved === "object" && resolved && "name" in (resolved as Record<string, unknown>)
                            ? (resolved as Record<string, unknown>).name
                            : undefined) ||
                        fallbackName,
                });
                router.push("/");
            } else {
                setErrorMessage("Oops... login failed. Please check your email/password and try again.");
            }
        } catch (err) {
            console.error(err);
            setErrorMessage("Oops... login failed due to a network issue. Please try again.");
        }
    };

    return (
        <div className="auth-page">
            <div className="bg-collage">
                <div className="collage-item" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd')" }}></div>
                <div className="collage-overlay"></div>
            </div>
            <div className="auth-container">
                <div className="auth-glass-modal signup-modal">
                    <h2 className="auth-title">🔒 SavorSecure</h2>
                    {fromSignup && (
                        <div className="auth-message success-msg">
                            Account created successfully. Please login to continue.
                        </div>
                    )}
                    {errorMessage && <div className="auth-message error-msg">{errorMessage}</div>}
                    <form onSubmit={handleLogin}>
                        <div className="input-icon-group icon-dark">
                            <span className="input-icon" aria-hidden="true"><MailIcon className="input-icon-svg" /></span>
                            <input type="email" className="input-glass-icon" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div className="input-icon-group icon-dark">
                            <span className="input-icon" aria-hidden="true"><LockIcon className="input-icon-svg" /></span>
                            <input type={showPassword ? "text" : "password"} className="input-glass-icon" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                            <span className="pass-toggle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "👁" : "👁‍🗨"}</span>
                        </div>
                        <button type="submit" className="btn-auth-gradient btn-login">Login</button>
                    </form>
                    <div className="signup-footer">Don't have an account? <Link href="/signup">Sign Up</Link></div>
                </div>
            </div>
        </div>
    );
}
