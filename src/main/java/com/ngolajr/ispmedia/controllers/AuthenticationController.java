package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.AuthResponse;
import com.ngolajr.ispmedia.dtos.LoginDto;
import com.ngolajr.ispmedia.entities.Utilizador;
import com.ngolajr.ispmedia.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(produces = "application/json", path ="/api")
@CrossOrigin("**")
public class AuthenticationController {
    private final AuthenticationService authService;
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody LoginDto auth){
        if(authService.login(auth) != null)
            return ResponseEntity.ok(authService.login(auth));

        return ResponseEntity.ofNullable(null);
    }
}
