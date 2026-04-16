import Link from "next/link";
import { Restaurant } from "../types";
import { resolvePublicImage } from "@/lib/imageUrl";
import Navbar from "@/components/Navbar";
import HeroImageSwap from "@/components/HeroImageSwap";

export default async function Home() {
    let restaurants: Restaurant[] = [];
    try {
        const res = await fetch("http://localhost:8080/api/restaurants", { cache: "no-store" });
        if (res.ok) {
            restaurants = await res.json();
        }
    } catch (e) {
        console.error("Failed to fetch", e);
    }

    return (
        <div className="app-container">
            <Navbar />
            <header className="hero-banner">
                <div className="hero-layout">
                    <div className="hero-content">
                        <h1>EXQUISITE FLAVORS<br />DELIVERED.</h1>
                        <p>Order from top chefs & Michelin-starred restaurants.</p>
                    </div>
                    <HeroImageSwap />
                </div>
            </header>
            <div className="restaurant-grid" id="restaurant-container">
                {restaurants.length > 0 ? (
                    restaurants.map((restaurant) => (
                        <Link href={`/restaurant/${restaurant.restaurantId}`} key={restaurant.restaurantId}>
                            <div className="restaurant-card">
                                <div className="card-content-wrapper">
                                    <div className="card-image-container">
                                        <img src={resolvePublicImage(restaurant.imagePath)} alt={restaurant.name} className="card-image" />
                                    </div>
                                    <div className="card-info">
                                        <div className="card-header">
                                            <h3 className="restaurant-name">{restaurant.name}</h3>
                                            <div className="rating-badge">⭐ {restaurant.rating}</div>
                                        </div>
                                        <p className="cuisine-type">{restaurant.cuisineType}</p>
                                        <div className="meta-info">
                                            <span className="time-badge">⏱ {restaurant.deliveryTime}</span>
                                            <span className="address">{restaurant.address}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p style={{ color: "red", gridColumn: "1/-1", textAlign: "center" }}>No restaurants available.</p>
                )}
            </div>
        </div>
    );
}
