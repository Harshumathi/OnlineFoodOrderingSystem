package com.fooddelivery.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fooddelivery.backend.model.Restaurant;
import com.fooddelivery.backend.repository.RestaurantRepository;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "http://localhost:3000")
public class RestaurantController {

	@Autowired
	private RestaurantRepository restaurantRepository;

	@GetMapping
	public List<Restaurant> getAllRestaurants() {
		return restaurantRepository.findAll();
	}

	@GetMapping("/{id}")
	public Restaurant getRestaurantById(@PathVariable("id") Integer id) {
		return restaurantRepository.findById(id).orElse(null);
	}
}
