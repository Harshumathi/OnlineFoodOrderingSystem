"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
    userId: number;
    userName: string;
    email: string;
    phone: string;
    address: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: unknown) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function normalizeUser(raw: unknown): User | null {
    if (!raw || typeof raw !== "object") return null;
    const payload = raw as Record<string, unknown>;
    const data =
        (payload.user && typeof payload.user === "object" ? (payload.user as Record<string, unknown>) : payload);
    const userName =
        (data.userName as string) ||
        (data.username as string) ||
        (data.fullName as string) ||
        (data.name as string) ||
        (data.user_name as string) ||
        (data.User_Name as string) ||
        (typeof data.email === "string" ? data.email.split("@")[0] : "") ||
        "User";

    return {
        userId: Number(data.userId ?? data.user_id ?? data.User_ID ?? 0),
        userName,
        email: String(data.email ?? ""),
        phone: String(data.phone ?? ""),
        address: String(data.address ?? ""),
        role: String(data.role ?? "CUSTOMER"),
    };
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("zuzu_user");
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                const normalized = normalizeUser(parsed);
                if (normalized) {
                    setUser(normalized);
                } else {
                    setUser(null);
                }
            } catch {
                localStorage.removeItem("zuzu_user");
                setUser(null);
            }
        }
    }, []);

    const login = (userData: unknown) => {
        const normalized = normalizeUser(userData);
        if (!normalized) return;
        setUser(normalized);
        localStorage.setItem("zuzu_user", JSON.stringify(normalized));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("zuzu_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
