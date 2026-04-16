package com.fooddelivery.backend.service;

import com.fooddelivery.backend.dto.LoginRequest;
import com.fooddelivery.backend.dto.RegisterRequest;
import com.fooddelivery.backend.model.User;
import com.fooddelivery.backend.repository.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User validateLogin(LoginRequest request) {
        Optional<User> foundUser = userRepository.findByEmail(request.getEmail());
        if (foundUser.isPresent() && foundUser.get().getPassword().equals(request.getPassword())) {
            return foundUser.get();
        }
        return null; 
    }

    public User registerUser(RegisterRequest request) {
        User user = new User();
        user.setUserName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        return userRepository.save(user);
    }
}
