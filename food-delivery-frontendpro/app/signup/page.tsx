"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckIcon, LockIcon, MailIcon, UserIcon } from "@/components/AuthFieldIcons";

export default function SignupPage() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        if (password !== confirmPassword) {
            setErrorMessage("Password mismatch. Please make sure both passwords match.");
            return;
        }
        try {
            const res = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: fullname, email: email, password: password })
            });

            if (res.ok) {
                router.push("/login?signup=success");
            } else {
                setErrorMessage("Oops... signup failed. Try a different email or try again.");
            }
        } catch (err) {
            console.error(err);
            setErrorMessage("Could not create account right now. Please try again in a moment.");
        }
    };

    return (
        <div className="auth-page">
            <div className="bg-collage">
                <div className="collage-item" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')" }}></div>
                <div className="collage-overlay"></div>
            </div>
            <div className="auth-container">
                <div className="auth-glass-modal signup-modal">
                    <h2 className="auth-title">Premium Food Delivery<br/>App Signup</h2>
                    {errorMessage && <div className="auth-message error-msg">{errorMessage}</div>}
                    <form onSubmit={handleSignup}>
                        <div className="input-icon-group">
                            <span className="input-icon" aria-hidden="true"><UserIcon className="input-icon-svg" /></span>
                            <input type="text" className="input-glass-icon" placeholder="Full Name" value={fullname} onChange={e => setFullname(e.target.value)} required />
                        </div>
                        <div className="input-icon-group icon-dark">
                            <span className="input-icon" aria-hidden="true"><MailIcon className="input-icon-svg" /></span>
                            <input type="email" className="input-glass-icon" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div className="input-icon-group icon-dark">
                            <span className="input-icon" aria-hidden="true"><LockIcon className="input-icon-svg" /></span>
                            <input type={showPassword ? "text" : "password"} className="input-glass-icon" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
                            <span className="pass-toggle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "👁" : "👁‍🗨"}</span>
                        </div>
                        <div className="input-icon-group">
                            <span className="input-icon" aria-hidden="true"><CheckIcon className="input-icon-svg" /></span>
                            <input type={showConfirmPassword ? "text" : "password"} className="input-glass-icon" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required minLength={6} />
                            <span className="pass-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? "👁" : "👁‍🗨"}</span>
                        </div>
                        <button type="submit" className="btn-auth-gradient btn-signup-premium">Sign Up</button>
                    </form>
                    <div className="signup-footer">Already have an account? <Link href="/login">Login</Link></div>
                </div>
            </div>
        </div>
    );
}
