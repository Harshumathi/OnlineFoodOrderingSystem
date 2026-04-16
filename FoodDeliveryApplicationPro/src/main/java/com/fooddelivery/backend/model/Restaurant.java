package com.fooddelivery.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "restaurants")
public class Restaurant {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Restaurant_ID")
	private Integer restaurantId;

	@Column(name = "name")
	private String name;

	@Column(name = "cuisine_type")
	private String cuisineType;

	@Column(name = "delivery_time")
	private String deliveryTime;

	@Column(name = "address")
	private String address;

	@Column(name = "User_ID")
	private Integer userId;

	@Column(name = "rating")
	private Double rating;

	@Column(name = "Is_Active")
	private Boolean isActive;

	@Column(name = "image_path")
	private String imagePath;

	public Restaurant() {

	}

	public Restaurant(Integer restaurantId, String name, String cuisineType, String deliveryTime, String address,
			Integer userId, Double rating, Boolean isActive, String imagePath) {
		super();
		this.restaurantId = restaurantId;
		this.name = name;
		this.cuisineType = cuisineType;
		this.deliveryTime = deliveryTime;
		this.address = address;
		this.userId = userId;
		this.rating = rating;
		this.isActive = isActive;
		this.imagePath = imagePath;
	}

	public Integer getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(Integer restaurantId) {
		this.restaurantId = restaurantId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCuisineType() {
		return cuisineType;
	}

	public void setCuisineType(String cuisineType) {
		this.cuisineType = cuisineType;
	}

	public String getDeliveryTime() {
		return deliveryTime;
	}

	public void setDeliveryTime(String deliveryTime) {
		this.deliveryTime = deliveryTime;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Double getRating() {
		return rating;
	}

	public void setRating(Double rating) {
		this.rating = rating;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	@Override
	public String toString() {
		return restaurantId + " " + name + " " + cuisineType + " " + deliveryTime + " " + address + " " + userId
				+ " " + imagePath;
	}

}
