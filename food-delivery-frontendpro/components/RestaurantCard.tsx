import Link from "next/link";
import { Restaurant } from "../types";
import { resolvePublicImage } from "@/lib/imageUrl";

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
    return (
        <Link href={`/restaurant/${restaurant.restaurantId}`}>
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
    );
}
