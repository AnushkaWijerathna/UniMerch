package com.vau.UniMerch.UniMerch.controller;

import com.vau.UniMerch.UniMerch.dto.req.LoginRequest;
import com.vau.UniMerch.UniMerch.dto.req.SignUpRequest;
import com.vau.UniMerch.UniMerch.dto.res.AuthResponse;
import com.vau.UniMerch.UniMerch.model.User;
import com.vau.UniMerch.UniMerch.repository.UserRepository;
import com.vau.UniMerch.UniMerch.Security.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/signup")
public AuthResponse signup(@RequestBody SignUpRequest request) {

    User user = new User();
    user.setFullName(request.getFullName());
    user.setEmail(request.getEmail());

    user.setPassword(encoder.encode(request.getPassword()));

    user.setRole(User.Role.valueOf(request.getRole()));

    userRepo.save(user);

    String token = jwtUtils.generateToken(user.getEmail());

    return new AuthResponse(
            user.getId(),
            token,
            user.getRole().name(),
            user.getEmail()
    );
}

    // LOGIN
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        User user = userRepo.findByEmail(request.getEmail());

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        boolean valid = encoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!valid) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtils.generateToken(user.getEmail());

        return new AuthResponse(
                user.getId(),
                token,
                user.getRole().name(),
                user.getEmail()
        );

    }
}
