package com.fooddelivery.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fooddelivery.backend.model.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer>{

}
