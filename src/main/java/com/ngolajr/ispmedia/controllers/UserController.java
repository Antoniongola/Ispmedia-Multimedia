package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.SignUpDto;
import com.ngolajr.ispmedia.entities.Utilizador;
import com.ngolajr.ispmedia.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(produces = "application/json", path = "/api")
@CrossOrigin("**")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;
    
    @PostMapping("/signup")
    public ResponseEntity<String> newUser(@RequestBody SignUpDto dto){
        if(service.cadastro(dto))
            return ResponseEntity.ok("User criado com sucesso!");

        return ResponseEntity.ok("Conta já existente");
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<Utilizador>updateUser(@RequestBody Utilizador user, @PathVariable String id){
        if(service.atualizarUser(user, id)){
            return ResponseEntity.ok(service.selecionarUser(user.getUsername()));
        }

        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id){
        if(service.apagarUser(id)){
            return ResponseEntity.ok("Utilizador apagado com sucesso!");
        }

        return ResponseEntity.ok("não foi possível apagar, verifique se o utilizador existe");
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Utilizador> selecionarUser(@PathVariable String id){
        return ResponseEntity.ok(service.selecionarUser(id));
    }

    @GetMapping("/user/")
    @PreAuthorize("hasAuthority('SCOPE_EDITOR')")
    public ResponseEntity<List<Utilizador>> selecionarTodosUsers(){
        return ResponseEntity.ok(service.selecionarUsers());
    }
    
}
