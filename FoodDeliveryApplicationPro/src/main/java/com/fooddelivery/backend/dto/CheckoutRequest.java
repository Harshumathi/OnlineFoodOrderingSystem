package com.fooddelivery.backend.dto;

import com.fooddelivery.backend.model.OrderItem;
import java.util.List;

public class CheckoutRequest {
    private int userId;
    private int restaurantId;
    private String address;
    private String paymentMode;
    private List<OrderItem> items; // The cart items sent from Next.js
	public int getUserId() {
		return userId;
	}
	
	public CheckoutRequest() {
	}
	
	
	
	public CheckoutRequest(int userId, int restaurantId, String address, String paymentMode, List<OrderItem> items) {
		super();
		this.userId = userId;
		this.restaurantId = restaurantId;
		this.address = address;
		this.paymentMode = paymentMode;
		this.items = items;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getRestaurantId() {
		return restaurantId;
	}
	public void setRestaurantId(int restaurantId) {
		this.restaurantId = restaurantId;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPaymentMode() {
		return paymentMode;
	}
	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}
	public List<OrderItem> getItems() {
		return items;
	}
	public void setItems(List<OrderItem> items) {
		this.items = items;
	}

    
}
