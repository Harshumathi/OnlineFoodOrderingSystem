package com.fooddelivery.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fooddelivery.backend.repository.OrderRepository;
import com.fooddelivery.backend.repository.OrderItemRepository;
import com.fooddelivery.backend.model.Order;
import com.fooddelivery.backend.model.OrderItem;
import com.fooddelivery.backend.dto.CheckoutRequest;
import java.sql.Timestamp;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;

    public Order processCheckout(CheckoutRequest request) {
        // 1. Calculate the math
        double subtotal = 0;
        for (OrderItem item : request.getItems()) {
            subtotal += item.getTotalAmount();
        }
        double tax = subtotal * 0.10;
        double totalAmount = subtotal + tax + 5.0; // Adding delivery fee

        // 2. Build the Order
        Order newOrder = new Order();
        newOrder.setUserId(request.getUserId());
        newOrder.setRestaurantId(request.getRestaurantId());
        newOrder.setTotalAmount(totalAmount);
        newOrder.setAddress(request.getAddress());
        newOrder.setPaymentMode(request.getPaymentMode());
        newOrder.setStatus("Processing");
        newOrder.setOrderDate(new Timestamp(System.currentTimeMillis()));

        // 3. Save the Order to the database
        Order savedOrder = orderRepository.save(newOrder);

        // 4. Save every cart item to the OrderItem table
        for (OrderItem item : request.getItems()) {
            item.setOrderId(savedOrder.getOrderId()); // Link them to the new order
            orderItemRepository.save(item);
        }

        return savedOrder;
    }
}
