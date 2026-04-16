const PLACEHOLDER = "/Images/restaurant/placeholder-food.svg";

/**
 * Resolves DB/API image paths for <img src> under Next.js `public/`.
 * Handles bare filenames, `Images/...`, absolute URLs, and leading slashes.
 */
export function resolvePublicImage(path: string | null | undefined, folder: "restaurant" | "menu" = "restaurant"): string {
    if (path == null || !String(path).trim()) return PLACEHOLDER;
    const p = String(path).trim().replace(/\\/g, "/");
    const clean = p.split("?")[0];
    if (p.startsWith("http://") || p.startsWith("https://")) return p;
    if (clean.includes("/Images/restaurant/")) return `/Images/restaurant/${clean.split("/Images/restaurant/").pop() ?? ""}`;
    if (clean.includes("/Images/menu/")) return `/Images/menu/${clean.split("/Images/menu/").pop() ?? ""}`;
    if (clean.startsWith("/Images/restaurant/")) return clean;
    if (clean.startsWith("/Images/menu/")) return clean;
    if (clean.startsWith("Images/restaurant/")) return `/${clean}`;
    if (clean.startsWith("Images/menu/")) return `/${clean}`;
    if (clean.startsWith("Images/")) return `/${clean}`;
    if (clean.startsWith("/")) return clean;
    return `/Images/${folder}/${clean}`;
}
