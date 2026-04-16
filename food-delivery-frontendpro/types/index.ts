export interface Restaurant {
    restaurantId: number;
    name: string;
    cuisineType: string;
    deliveryTime: string;
    address: string;
    userId: number;
    rating: number;
    isActive: boolean;
    imagePath: string;
}

export interface User {
    userId: number;
    userName: string;
    password: string;
    email: string;
    phone: string;
    address: string;
    role: string;
}

export interface Menu {
    menuId: number;
    restaurantId: number;
    itemName: string;
    description: string;
    price: number;
    isAvailable: boolean;
    isVeg: boolean;
    imagePath: string;
}

export interface OrderItem {
    orderItemId: number;
    orderId: number;
    menuId: number;
    quantity: number;
    totalAmount: number;
}

export interface Order {
    orderId: number;
    userId: number;
    restaurantId: number;
    orderDate: string;
    totalAmount: number;
    address: string;
    paymentMode: string;
    status: string;
    orderItems: OrderItem[];
}
