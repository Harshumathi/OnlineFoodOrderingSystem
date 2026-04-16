package com.fooddelivery.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import com.fooddelivery.backend.model.Menu;

public interface MenuRepository extends JpaRepository<Menu, Integer>{
    List<Menu> findByRestaurantId(Integer restaurantId);
}
