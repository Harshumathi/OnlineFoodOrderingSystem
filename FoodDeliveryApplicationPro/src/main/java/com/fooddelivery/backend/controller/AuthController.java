package com.fooddelivery.backend.controller;

import com.fooddelivery.backend.dto.LoginRequest;
import com.fooddelivery.backend.dto.RegisterRequest;
import com.fooddelivery.backend.model.User;
import com.fooddelivery.backend.service.AuthService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> loginUser(@RequestBody LoginRequest loginRequest) {
		User user = authService.validateLogin(loginRequest);
		Map<String, String> response = new HashMap<>();
		
		if (user != null) {
			response.put("status", "success");
			response.put("message", "Login successful");
			return ResponseEntity.ok(response);
		} else {
			response.put("status", "error");
			response.put("message", "Invalid email or password");
			return ResponseEntity.status(401).body(response);
		}
	}

	@PostMapping("/register")
	public ResponseEntity<Map<String, String>> registerUser(@RequestBody RegisterRequest regRequest) {
		Map<String, String> response = new HashMap<>();
		try {
			authService.registerUser(regRequest);
			response.put("status", "success");
			response.put("message", "User registered successfully");
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.put("status", "error");
			response.put("message", "Registration failed: " + e.getMessage());
			return ResponseEntity.status(500).body(response);
		}
	}
}
