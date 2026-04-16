"use client";

import { useEffect, useState } from "react";

const HERO_IMAGES = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=80",
];

export default function HeroImageSwap() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 3000);
        return () => window.clearInterval(interval);
    }, []);

    return (
        <div className="hero-media-wrap">
            {HERO_IMAGES.map((img, idx) => (
                <img
                    key={img}
                    src={img}
                    alt="Featured food"
                    className={`hero-media-img ${idx === activeIndex ? "active" : ""}`}
                />
            ))}
            <div className="hero-media-dots">
                {HERO_IMAGES.map((_, idx) => (
                    <button
                        key={idx}
                        type="button"
                        className={`dot ${idx === activeIndex ? "active" : ""}`}
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`Show slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
