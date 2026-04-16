package com.fooddelivery.backend.model;

import com.fooddelivery.backend.model.OrderItem;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "`order`")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Order_ID")
	private Integer orderId;

	@Column(name = "User_ID")
	private Integer userId;

	@Column(name = "Restaurant_ID")
	private Integer restaurantId;

	@Column(name = "order_date")
	private Timestamp orderDate;

	@Column(name = "total_amount")
	private Double totalAmount;

	@Column(name = "Address")
	private String address;

	@Column(name = "payment_mode")
	private String paymentMode;

	@Column(name = "status")
	private String status;

	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "Order_Id") // This tells JPA to link using the Order_Id column in the orderitem table
	private List<OrderItem> orderItems;

	public Order() {
		super();
		this.orderDate = new Timestamp(System.currentTimeMillis());
		this.orderItems = new ArrayList<>();
	}

	public Order(Integer userId, Integer restaurantId, Timestamp orderDate, Double totalAmount, String address,
			String paymentMode, String status, List<OrderItem> orderItems) {
		super();
		this.userId = userId;
		this.restaurantId = restaurantId;
		this.orderDate = orderDate;
		this.totalAmount = totalAmount;
		this.address = address;
		this.paymentMode = paymentMode;
		this.status = status;
		this.orderItems = orderItems;
	}

	public Order(Integer orderId, Integer userId, Integer restaurantId, Timestamp orderDate, Double totalAmount,
			String address, String paymentMode, String status) {
		super();
		this.orderId = orderId;
		this.userId = userId;
		this.restaurantId = restaurantId;
		this.orderDate = orderDate;
		this.totalAmount = totalAmount;
		this.address = address;
		this.paymentMode = paymentMode;
		this.status = status;
	}

	public Integer getOrderId() {
		return orderId;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(Integer restaurantId) {
		this.restaurantId = restaurantId;
	}

	public Timestamp getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Timestamp orderDate) {
		this.orderDate = orderDate;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

	@Override
	public String toString() {
		return orderId + " " + userId + " " + restaurantId + " " + orderDate + " " + totalAmount + " " + status
				+ " " + paymentMode;
	}

}
