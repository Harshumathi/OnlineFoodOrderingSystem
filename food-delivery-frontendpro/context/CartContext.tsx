"use client"; 

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItemType {
    menuId: number;
    restaurantId: number;
    name: string;
    price: number;
    quantity: number;
    imagePath: string;
}

interface CartContextType {
    cart: CartItemType[];
    addToCart: (item: CartItemType) => void;
    removeFromCart: (menuId: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItemType[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("zuzu_cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("zuzu_cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (newItem: CartItemType) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.menuId === newItem.menuId);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.menuId === newItem.menuId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...newItem, quantity: 1 }];
        });
    };

    const removeFromCart = (menuId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.menuId !== menuId));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("zuzu_cart");
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
