package com.fooddelivery.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fooddelivery.backend.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer>{

}
