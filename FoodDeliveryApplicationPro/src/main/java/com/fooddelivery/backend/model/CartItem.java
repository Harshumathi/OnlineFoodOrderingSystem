package com.fooddelivery.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cartitem")
public class CartItem {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "itemId")
	private Integer itemId;
	@Column(name = "name")
	private String name;
	@Column(name = "quantity")
	private Integer quantity;
	@Column(name = "price")
	private Double price;
	@Column(name = "imagePath")
	private String imagePath; 
	
	public CartItem() {

	}

	public CartItem(Integer itemId, String name, Integer quantity, Double price,String imagePath) {
		super();
		this.itemId = itemId;
		this.name = name;
		this.quantity = quantity;
		this.price = price;
		this.imagePath = imagePath;
	}

	public Integer getItemId() {
		return itemId;
	}

	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	 public String getImagePath() {
	        return imagePath;
	  }

	 public void setImagePath(String imagePath) {
	      this.imagePath = imagePath;
	  }
	
	@Override
	public String toString() {
		return itemId + " " + name + " " + quantity + " " + price;
	}

}
