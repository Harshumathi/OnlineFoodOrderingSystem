package com.fooddelivery.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "menu")
public class Menu {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Menu_ID")
	private Integer menuId;

	@Column(name = "Restaurant_ID")
	private Integer restaurantId;

	@Column(name = "item_name")
	private String itemName;

	@Column(name = "description")
	private String description;

	@Column(name = "Price")
	private Double price;

	@Column(name = "Is_Available")
	private Boolean isAvailable;

	@Column(name = "Is_Veg")
	private Boolean isVeg;

	@Column(name = "image_path")
	private String imagePath;

	public Menu() {
		super();
	}

	public Menu(Integer menuId, Integer restaurantId, String itemName, String description, Double price,
			Boolean isAvailable, Boolean isVeg, String imagePath) {
		super();
		this.menuId = menuId;
		this.restaurantId = restaurantId;
		this.itemName = itemName;
		this.description = description;
		this.price = price;
		this.isAvailable = isAvailable;
		this.isVeg = isVeg;
		this.imagePath = imagePath;
	}

	public Integer getMenuId() {
		return menuId;
	}

	public void setMenuId(Integer menuId) {
		this.menuId = menuId;
	}

	public Integer getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(Integer restaurantId) {
		this.restaurantId = restaurantId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Boolean getIsAvailable() {
		return isAvailable;
	}

	public void setIsAvailable(Boolean isAvailable) {
		this.isAvailable = isAvailable;
	}

	public Boolean getIsVeg() {
		return isVeg;
	}

	public void setIsVeg(Boolean isVeg) {
		this.isVeg = isVeg;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	@Override
	public String toString() {
		return menuId + " " + restaurantId + " " + itemName + " " + description + " " + price + " " + isAvailable
				+ " " + imagePath;
	}

}
