package com.fooddelivery.backend.controller;

import com.fooddelivery.backend.model.Menu;
import com.fooddelivery.backend.repository.MenuRepository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:3000")
public class MenuController {

	@Autowired
	private MenuRepository menuRepository;

	@GetMapping("/{restaurantId}")
	public List<Menu> getMenuByRestaurant(@PathVariable("restaurantId") Integer restaurantId) {
		return menuRepository.findByRestaurantId(restaurantId);
	}
}
