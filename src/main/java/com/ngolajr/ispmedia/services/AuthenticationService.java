package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.dtos.AuthResponse;
import com.ngolajr.ispmedia.dtos.LoginDto;
import com.ngolajr.ispmedia.entities.enums.Roles;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final PasswordEncoder encoder;
    private final UtilizadorRepository repository;
    private final JwtEncoder jwtEncoder;

    public AuthResponse login(LoginDto dto){
        var user = repository.findByUsername(dto.username());

        if(user.isEmpty() || !isLoginCorrect(dto)){
            throw new BadCredentialsException("user or password errados");
        }

        var now = Instant.now();
        var expiresIn = 72000L;
        var scopes = user.get().getRoles()
                .stream()
                .map(Roles::name)
                .collect(Collectors.joining(" "));

        var claims = JwtClaimsSet.builder()
                .issuer("Ngola-ISPMEDIA")
                .subject(dto.username())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiresIn))
                .claim("scope", scopes)
                .build();

        String jwt = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        return new AuthResponse(jwt, expiresIn);
    }

    private boolean isLoginCorrect(LoginDto dto) {
        if(repository.existsById(dto.username())){
            if(encoder.matches(dto.password(), repository.findByUsername(dto.username()).get().getPassword()))
                return true;
        }

        return false;
    }
}
