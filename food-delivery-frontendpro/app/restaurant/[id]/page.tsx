"use client";

import { use, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Restaurant, Menu } from "../../../types";
import { useCart } from "../../../context/CartContext";
import { resolvePublicImage } from "@/lib/imageUrl";
import Navbar from "@/components/Navbar";

export default function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { addToCart, cart } = useCart();

    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [menuItems, setMenuItems] = useState<Menu[]>([]);
    const [loading, setLoading] = useState(true);
    const [justAddedMenuId, setJustAddedMenuId] = useState<number | null>(null);
    const [showCartBar, setShowCartBar] = useState(false);

    const handleAddToCart = useCallback(
        (item: Menu) => {
            const imageSrc = resolvePublicImage(item.imagePath, "menu");
            addToCart({
                menuId: item.menuId,
                restaurantId: parseInt(id, 10),
                name: item.itemName,
                price: item.price,
                quantity: 1,
                imagePath: imageSrc,
            });
            setShowCartBar(true);
            setJustAddedMenuId(item.menuId);
            window.setTimeout(() => setJustAddedMenuId((cur) => (cur === item.menuId ? null : cur)), 1500);
        },
        [addToCart, id]
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Restaurant Info
                const resRest = await fetch(`http://localhost:8080/api/restaurants/${id}`);
                if (resRest.ok) {
                    setRestaurant(await resRest.json());
                }

                // Fetch Menu Items
                const resMenu = await fetch(`http://localhost:8080/api/menu/${id}`);
                if (resMenu.ok) {
                    setMenuItems(await resMenu.json());
                }
            } catch (e) {
                console.error("Failed to fetch restaurant data", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div style={{ color: "white", textAlign: "center", padding: "5rem" }}>Loading Exquisite Flavors...</div>;
    if (!restaurant) return <div style={{ color: "white", textAlign: "center", padding: "5rem" }}>Restaurant not found.</div>;

    return (
        <div className="app-container menu-page">
            <Navbar />

            <img
                src={resolvePublicImage(restaurant.imagePath)}
                alt={restaurant.name}
                className="menu-header-image"
                onError={(e) => {
                    e.currentTarget.src = "/Images/restaurant/placeholder-food.svg";
                }}
            />

            <div className="restaurant-branding">
                <h1 style={{ color: "white" }}>{restaurant.name}</h1>
                <p style={{ color: "var(--accent-green)", fontWeight: "bold" }}>{restaurant.cuisineType} • ⭐ {restaurant.rating}</p>
                <p style={{ color: "var(--text-gray)" }}>{restaurant.address}</p>
            </div>

            <div className="menu-list-grid">
                {menuItems.length > 0 ? (
                    menuItems.map((item) => (
                        <div className="menu-list-item" key={item.menuId}>
                            <img
                                src={resolvePublicImage(item.imagePath, "menu")}
                                alt={item.itemName}
                                className="menu-img-circle"
                                onError={(e) => {
                                    e.currentTarget.src = "/Images/restaurant/placeholder-food.svg";
                                }}
                            />
                            <div className="menu-item-details">
                                <h3>{item.itemName}</h3>
                                <p>{item.description}</p>
                                <div className="price">₹ {item.price}</div>
                            </div>
                            <button
                                type="button"
                                className="btn-add-cart"
                                onClick={() => handleAddToCart(item)}
                                aria-label={`Add ${item.itemName} to cart`}
                            >
                                <span>{justAddedMenuId === item.menuId ? "✓" : "+"}</span>{" "}
                                {justAddedMenuId === item.menuId ? "Added" : "Add"}
                            </button>
                        </div>
                    ))
                ) : (
                    <p style={{ color: "var(--text-gray)", textAlign: "center" }}>No menu items available for this restaurant.</p>
                )}
            </div>
            <div className={`menu-bottom-spacer ${showCartBar || cart.length > 0 ? "with-cart-bar" : ""}`} />

            <div className={`floating-cart-bar ${showCartBar || cart.length > 0 ? "show" : ""}`}>
                <div className="cart-bar-content">
                    <div className="cart-bar-icon-wrapper">🛒</div>
                    <div className="cart-bar-text">
                        <h4>Added to cart</h4>
                        <p>{cart.length} item(s) ready</p>
                    </div>
                </div>
                <Link href="/cart" className="btn-view-cart">View Cart</Link>
            </div>
        </div>
    );
}
